import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


export const ProtectedRoute = ({ allowedRoles, children }) => {

    const { user, role, loading } = useContext(UserContext);
    console.log("Roles permitidos (desde front):", allowedRoles);

    if (loading) return <div>Cargando...</div>; // evita que el usuario vea un salto al login mientras el UserProvider recupera los datos

    // Si no hay usuario (no hay token válido en la cookie), ir a login (si user existe, es porque hay token válido en la cookie)
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si hay roles definidos y usuario no tiene el permiso, ir a inicio
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    // Si está autenticado y rol es correcto, -> puede pasar a las sigs rutas, 
    // Si hay hijos directos los renderizamos, si es una ruta anidada renderizar outlet
    return children ? children : <Outlet />;
};

//------------ACLARACIÓN sobre el token------------:
//Con cookies HttpOnly, el token no se guarda en una variable del front. La prueba de que el token existe es que el obj user no es null. 
//Si el token de la cookie fuera falso o hubiera expirado, la función revalidarToken habría puesto el user en null
//el Frontend no ve el token (por seguridad, para evitar ataques XSS), pero sabe que usuario está autenticado porque el obj user tiene datos