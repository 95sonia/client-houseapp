import { Route } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import {UserDashboardPage} from '../pages/user/UserDashboardPage';


export const UserRoutes = () => {

        <Route path='/user/dashboard' element={<UserDashboardPage />} />
}
