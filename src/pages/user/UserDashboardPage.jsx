import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export const UserDashboardPage = () => {
    // Sacamos el usuario del contexto global
    const { user } = useContext(UserContext);
    return (
        <div>
            <h2>USERDASHBOARD</h2>

            {/* Si el usuario existe, mostrar su nombre */}
            {user && <h2>Bienvenido, {user.nombre} !</h2>}

            <p>Aquí podrás ver tus alquileres vacacionales pronto.</p>
        </div>
    )
}
