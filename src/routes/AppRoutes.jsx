import { Route, Routes, Navigate } from 'react-router'
import { PublicRoutes } from './PublicRoutes';
import { UserRoutes } from './UserRoutes';
import { AdminRoutes } from './AdminRoutes';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                {/* Rutas Públicas usamos /* para indicar que dentro de PublicRoutes hay más rutas definidas */}
                <Route path="/*" element={<PublicRoutes />} />

                {/* Rutas Protegidas admin*/}
                <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']}>
                    <AdminRoutes />
                </ProtectedRoute>
                } />

                {/* Rutas Protegidas user*/}
                <Route path="/user/*" element={<ProtectedRoute allowedRoles={['user']}>
                    <UserRoutes />
                </ProtectedRoute>
                } />

                {/* Ruta por defecto -> Si no encuentra ruta, mandar a Inicio */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

        </>
    )
}
