import { Routes, Route, Navigate } from 'react-router';
import { UserDashboardPage } from '../pages/user/UserDashboardPage';
import { FavoritosPage } from '../pages/user/FavoritosPage';
import { VerReservasPage } from '../pages/user/VerReservasPage';
import { ReservarCasaPage } from '../pages/user/ReservarCasaPage';
import { HouseDetailsPage } from '../pages/templates/HouseDetailsPage';
import { UserPerfilPage } from '../pages/user/UserPerfilPage';
import { UserNavbar } from '../components/user/UserNavbar';

export const UserRoutes = () => {
        return (<>
                <UserNavbar /> {/* Se ve en todas las rutas de usuario */}
                <Routes>
                        {/* Panel Principal -> Ver todas las casas*/}
                        <Route path='dashboard' element={<UserDashboardPage />} />

                        {/*Ver detalle de una casa*/}
                        <Route path='house/:id' element={<HouseDetailsPage />} />

                        {/* Reservar una vivienda*/}
                        <Route path='reservar/:id' element={<ReservarCasaPage />} />

                        {/* Ver Reservas realizadas*/}
                        <Route path='reservas' element={<VerReservasPage />} />

                        {/* Ver Mis favoritos */}
                        <Route path='favoritos' element={<FavoritosPage />} />

                        {/* Mi Perfil de usuario -> para modificar datos*/}
                        <Route path='perfil' element={<UserPerfilPage />} />

                        {/* Redirección por defecto para rutas de user no encontradas */}
                        <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
                </Routes>
        </>)
}
