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
        setError(null);// Limpiamos errores previos antes de intentar loguear

        try {
            const respuesta = await fetch('http://localhost:4001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosFormulario),
                credentials: 'include'  // Prmitir cookis para que el navegador guarde token HttpOnly
            });

            const data = await respuesta.json();
            console.log("------datos recibidos del servidor(estoy en useAuth Front):------", data);

            if (respuesta.ok) {
                // Si el back devuelve ok, guardamos el usuario en el estado global
                // No hace falta guardar el token manualmente, el navegador ya lo hizo en la cookie
                login(data.user);

                // Redirección por rol
                if (data.user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user/dashboard');
                }
            } else {
                // Si backend nos manda un error (400, 401....)
                setError(data.msg || "Credenciales incorrectas");
            }

        } catch (err) {
            console.error("Error en la petición:", err);
            setError("Error de conexión con el servidor");
        }
    };

    // Función para manejar el Registro nuevo user
    const handleRegister = async (datosRegistro) => {
        setError(null); // Limpiamos errores previos

        try {
            const respuesta = await fetch('http://localhost:4001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Enviamos nombre, email, password y tlfn
                body: JSON.stringify(datosRegistro)
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                // Si el registro es exitoso, redirigir al login 
                console.log("---¡Nuevo usuario registrado correctamente!---");
                navigate('/login');
            } else {
                // Si el backend devuelve un error (por ej si email ya existe), lo capturamos
                //setError(data.msg || "Error al crear la cuenta");
                if (data.errors) {
                    // Convertimos el objeto { nombre: {msg:...}, email: {msg:...} } en una lista
                    const listaErrores = Object.values(data.errors);
                    // Mostramos el primer mensaje de la lista 
                    setError(listaErrores[0].msg);
                } else {
                    // Si es un error manual enviado desde el controlador 
                    setError(data.msg || "Error al crear la cuenta");
                }
            }
        } catch (err) {
            setError("No se pudo conectar con el servidor");
        }
    };

    return {
        // Estados
        user, //Para que el Dashboard sepa que mostrar
        role, //Para que el Dashboard sepa que mostrar
        error, //Para que Login y Registro puedan mostrar mensajes rojos si algo falla
        handleLogin,
        handleRegister,
        logout
    };
};