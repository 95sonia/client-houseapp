import { Routes, Route, Navigate } from 'react-router';
import { UserDashboardPage } from '../pages/user/UserDashboardPage';


export const UserRoutes = () => {
        return (
                <Routes>
                        <Route path='dashboard' element={<UserDashboardPage />} />
                        <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
        )
}
