import { useContext } from "react";
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';

//Hook que hace el fetch, recibe al usuario y le dice al UserProvider que lo guarde
export const useAuth = () => {
    // Consumir el "Estado Global" desde el Contexto
    const { login, logout, user, role, error, setError } = useContext(UserContext);
    
    const navigate = useNavigate();

    // Función para manejar el inicio de sesión
    const handleLogin = async (datosFormulario) => {
        // Limpiamos errores previos antes de intentar loguear
        setError(null);

        try {
            const respuesta = await fetch('http://localhost:4001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosFormulario),
                // PERMITIR COOKIES: para que el navegador guarde token HttpOnly
                credentials: 'include' 
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                // Si el back devuelve ok, guardamos el usuario en el estado global
                // No hace falta guardar el token manualmente, el navegador ya lo hizo en la cookie
                login(data.user);

                // Redirección inteligente por rol
                if (data.user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user/dashboard');
                }
            } else {
                // Si backend nos manda un error (400, 401, etc)
                setError(data.msg || "Credenciales incorrectas");
            }
        } catch (err) {
            console.error("Error en la petición:", err);
            setError("Error de conexión con el servidor");
        }
    };

    //retornar solo lo que los componentes necesitan usar
    return {
        user,
        role,
        error,
        handleLogin,
        logout
    };
};