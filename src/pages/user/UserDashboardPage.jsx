import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const UserDashboardPage = () => {
    // Sacamos el usuario del contexto global
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h2>USERDASHBOARD</h2>

            {/* Si el usuario existe, mostrar su nombre */}
            {user && <h2>!Hola, {user.nombre} !</h2>}

            <p>Aquí podrás ver tus alquileres vacacionales pronto.</p>
        </div>
    )
}
