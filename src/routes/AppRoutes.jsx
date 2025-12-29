import { Route, Routes, Navigate } from 'react-router'
import { PublicRoutes } from './PublicRoutes';
// import { UserRoutes } from './UserRoutes';
// import { AdminRoutes } from './AdminRoutes';
// import { ProtectedRoute } from './ProtectedRoute';
import { UserDashboardPage } from '../pages/user/UserDashboardPage'; //borrar despues al proteger las rutas

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                {/* Rutas Públicas usamos /* para indicar que dentro de PublicRoutes hay más definiciones de rutas */}
                <Route path="/*" element={<PublicRoutes />} />

             
                {/* Cuando actives las demás, se verán así: */}
                {/* <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}>
                    <AdminRoutes />
                </ProtectedRoute>
            } /> 
            */}

             {/* <Route path="/user" element={<ProtectedRoute allowedRoles={['user']}>
                    <UserRoutes />
                </ProtectedRoute>
            } /> 
            */}

            {/* LUEGO BORRAR ESTA RUTA Y USAR LAS PROTECCIONES, solo era para ver que funciona login */}
            <Route path="/user/dashboard" element={<UserDashboardPage />} />

                {/* Ruta por defecto -> Si no encuentra ruta, mandar a Inicio */}
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>

        </>
    )
}
