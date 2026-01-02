import { Route, Routes, Navigate } from 'react-router';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
// import {  } from '../pages/admin/..........'; 

export const AdminRoutes = () => {
    return (
        <Routes>
            {/* Ruta principal del panel de admin: /admin/dashboard */}
            <Route path="dashboard" element={<AdminDashboardPage />} />

            {/* Aquí irán resto de rutas ej donde usaremos Multer para las imágenes  */}
            {/* <Route path="add-house" element={<AddHousePage />} /> */}

            {/* Comodín interno para rutas de admin no encontradas */}
            <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
    );
};