import { useState } from "react";
import { UserContext } from "./UserContext";

//crear el Proveedor. Su funcion: dar información -> aqui se exponen los datos que queremos compartir a los consumers
//La información que quiero pasar a los hijos es el ususario y el rol - para que me permita entrar a ciertas pags
// (Contexto): Guarda al usuario en su "memoria" (state) para que el Navbar sepa quién eres.

export const UserProvider = ({ children }) => {
    //no necesito useCookies para el token porque es HttpOnly
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // Función para iniciar sesión
    const login = (userData) => {
        setUser(userData);
        setError(null);
    };

    // Función para cerrar sesión
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