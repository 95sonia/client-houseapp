import { Route, Routes, Navigate } from 'react-router';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AddHousePage } from '../pages/admin/AddHousePage';
import { EditHousePage } from '../pages/admin/EditHousePage';
// import { ReservasPage } from '../pages/admin/ReservasPage';

export const AdminRoutes = () => {
    return (
        <Routes>
            {/* Ruta panel principal /admin/dashboard */}
            <Route path="dashboard" element={<AdminDashboardPage />} />

            {/*Añadir casa /admin/create-house */}
            {/* Aquí es donde usaremos Multer para el array de imágenes*/}
            <Route path="createHouse" element={<AddHousePage />} />

            {/*Editar casa /admin/edit-house/:id */}
            <Route path="editHouse/:id" element={<EditHousePage />} />

            {/*Gestión de Reservas  /admin/reservas */}
            <Route path="reservas" element={<div>Vista Reservas</div>} />

            {/* para rutas de admin no encontradas */}
            <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
    );
};