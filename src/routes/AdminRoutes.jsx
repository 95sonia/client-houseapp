import { Route, Routes, Navigate } from 'react-router';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AddHousePage } from '../pages/admin/AddHousePage';
import { EditHousePage } from '../pages/admin/EditHousePage';
import { AdminReservasPage } from '../pages/admin/AdminReservasPage';
import { AdminGestionUsersPage } from '../pages/admin/AdminGestionUsersPage';
import { HouseDetailsPage } from '../pages/templates/HouseDetailsPage';
import { AdminNavbar } from '../components/admin/AdminNavbar';

export const AdminRoutes = () => {
    return (
        <>
            <AdminNavbar /> {/* Se ve en todas las rutas de admin */}
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

                {/*Ver todos los Usuarios /admin/usuarios */}
                <Route path="users" element={<AdminGestionUsersPage />} />

                 {/* -----------------FALTAN MAS RUTAS DE Gestión de USUARIOS ----------------------*/}

                {/* para rutas de admin no encontradas */}
                <Route path="*" element={<Navigate to="dashboard" />} />
            </Routes>
        </>);
};