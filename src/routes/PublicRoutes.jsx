import { Routes, Route } from 'react-router';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HouseDetailsPage } from '../pages/templates/HouseDetailsPage';

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path='/home' element={<HomePage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='/home/house/:id' element={<HouseDetailsPage />} />
        </Routes>
    );
};  





