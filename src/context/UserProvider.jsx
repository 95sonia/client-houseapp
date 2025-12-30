import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

//crear el Proveedor. Su funcion: dar información -> aqui se exponen los datos que queremos compartir a los consumers
//La información que quiero pasar a los hijos es el ususario y el rol - para que me permita entrar a ciertas pags
// (Contexto): Guarda al usuario en su "memoria" (state) para que el Navbar sepa quién eres.

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // ----FUNCIÓN REVALIDAR TOKEN------- (para no tener que volver a logearse al refrescar la pag)
    const revalidarToken = async () => {
        try {
            const resp = await fetch('http://localhost:4001/api/renew', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include' // Imprescindible para cookies HttpOnly 
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
    };

    // ----FUNCIÓN CERRAR SESIÓN------
    const logout = () => {
        setUser(null);
        // Aquí podría añadir lógica para borrar cookie si back no lo hace
        // Para borrar una cookie HttpOnly, normalmente hay que llamar a una ruta del backend
        // Pero en el front, simplemente limpiamos el estado del usuario
    };

    return (
        <UserContext.Provider value={{
            user,
            role: user?.role, // Extraemos el rol que viene del modelo de Mongoose
            error,
            login,
            logout,
            setError
        }}>
            {children}
        </UserContext.Provider>
    );
};