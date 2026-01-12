import { useContext } from "react";
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
const apiUrl = import.meta.env.VITE_API_URL_BASE || 'https://server-houseapp.onrender.com';

//Hook que hace el fetch, recibe al usuario y le dice al UserProvider que lo guarde
export const useAuth = () => {
    // Consumir el "Estado Global" desde el Contexto
    const { login, logout, user, role, error, setError } = useContext(AuthContext);
    const navigate = useNavigate();

    // Función para manejar el inicio de sesión
    const handleLogin = async (datosFormulario) => {
        setError(null);// Limpiamos errores previos antes de intentar loguear

        try {
            const respuesta = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosFormulario),
                credentials: 'include'  // Prmitir cookies para que el navegador guarde token HttpOnly
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
            const respuesta = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Enviamos nombre, email, direccion, password, tlfno...
                body: JSON.stringify(datosRegistro)
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                // Si el registro es exitoso, redirigir al login 
                console.log("---¡Nuevo usuario registrado correctamente!---");
                navigate('/login');
            } else {
                if (data.errors) {
                    // Convertimos el objeto { nombre: {msg:...}...} en una lista
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

    const handleLogout = async () => {
        await logout(); // Esperar a que el provider borre user y cookie
        navigate('/home');  // Redireccionar a home publica despues del logout
    };

    return {
        // Estados
        user, //Para que el Dashboard sepa que mostrar
        role, //Para que el Dashboard sepa que mostrar
        error, //Para que Login y Registro puedan mostrar mensajes rojos si algo falla
        handleLogin, //Funciones
        handleRegister,
        handleLogout
    };
};