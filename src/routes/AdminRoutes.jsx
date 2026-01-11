import { Route, Routes, Navigate } from 'react-router';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AddHousePage } from '../pages/admin/AddHousePage';
import { EditHousePage } from '../pages/admin/EditHousePage';
import { AdminReservasPage } from '../pages/admin/AdminReservasPage';
import { HouseDetailsPage } from '../pages/templates/HouseDetailsPage';

export const AdminRoutes = () => {
    return (
        <Routes>
            {/* Panel principal /admin/dashboard */}
            <Route path="dashboard" element={<AdminDashboardPage />} />

            {/* Ver detalle de una casa /admin/house/:id */}
            <Route path='house/:id' element={<HouseDetailsPage />} />

            {/*Añadir casa /admin/createHouse */}
            <Route path="createHouse" element={<AddHousePage />} />

            {/*Editar casa /admin/editHouse/:id */}
            <Route path="editHouse/:id" element={<EditHousePage />} />

            {/*Gestión de Reservas /admin/reservas */}
            <Route path="reservas" element={<AdminReservasPage />} />

            {/* -----------------FALTA LA RUTA DE Gestión de USUARIOS ----------------------*/}

            {/* para rutas de admin no encontradas */}
            <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
    );
};