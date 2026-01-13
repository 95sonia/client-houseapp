import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
const apiUrl = import.meta.env.VITE_API_URL_BASE;

/**
 * Proveedor de Autenticación de la aplicación.
 *
 * Este contexto se encarga de:
 * - Mantener el estado del usuario autenticado.
 * - Revalidar la sesión al recargar la aplicación (persistencia de login).
 * - Exponer funciones de login y logout a los componentes consumidores.
 * Permite controlar el acceso a determinadas páginas en función del rol del usuario.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} Proveedor del contexto de autenticación.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // ----FUNCIÓN REVALIDAR TOKEN------- (para no tener que volver a logearse al refrescar la pag)
    const revalidarToken = async () => {
        try {
            const resp = await fetch(`${apiUrl}/renew`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include' // para cookies HttpOnly 
            });

            const data = await resp.json();

            if (resp.ok) {
                setUser(data.user); // Recuperamos nombre, rol y tfono 

            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error al revalidar sesión", error);
            setUser(null);
        } finally {
            // Forzar el apagado del loading para que Login pueda intentarse
            setLoading(false);
        }
    };

    // Ejecutar fcion al cargar aplicación
    useEffect(() => {
        revalidarToken();
    }, []);

    // ------FUNCIÓN INICIAR SESIÓN----
    const login = (userData) => {
        setUser(userData);
        setError(null);
        setLoading(false);
    };

    // ----FUNCIÓN CERRAR SESIÓN------
    const logout = () => {
        setUser(null);
        setLoading(false);
        // Aquí podría añadir lógica para borrar cookie si back no lo hace
        // Para borrar una cookie HttpOnly, normalmente hay que llamar a una ruta del backend
        // Pero en el front, simplemente limpiamos el estado del usuario
    };

    return (
        <AuthContext.Provider value={{
            user,
            role: user?.role, // Extraemos el rol que viene del modelo de Mongoose
            error,
            loading,
            login,
            logout,
            setError
        }}>
            {children}
        </AuthContext.Provider>
    );
};