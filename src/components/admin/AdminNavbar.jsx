import '../../styles/AllNavbar.scss'
import { Link } from 'react-router';
import { Home, User, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AdminNavbar = () => {
    const { user, handleLogout } = useAuth()

    return (
        <nav className="all-navbar">
            <div className="nav-container">
                <Link to="/admin/dashboard" className="nav-logo">HOUSE<span> APP</span></Link>
    
                <ul className="nav-links">
                    <li><Link to="/admin/dashboard" title="Viviendas"><Home size={20} /><span>Viviendas</span></Link></li>
                    <li><Link to="/admin/users" title="Usuarios"><User size={20} /><span> Usuarios </span></Link></li>
                    <li><Link to="/admin/reservas" title="Reservas"><Calendar size={20} /><span> Reservas</span></Link></li>
                </ul>
                <div className="nav-user-actions">
                    <button onClick={handleLogout} className="btn-logout" title="Salir"><LogOut size={20} /> <span className="salir"> Salir</span></button>
                </div>

            </div>
        </nav >
    );
};