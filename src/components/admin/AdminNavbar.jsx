import '../../styles/AdminNavbar.scss'
import { Home, User, Settings, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AdminNavbar = () => {
   const { user, handleLogout } = useAuth()

    return (
        <nav className="admin-nav">
            <div className="nav-left">
                <Home className="logo-icon" size={24} />
                <h1>Admin Dashboard</h1>
            </div>

            <div className="nav-right">
                <button className="nav-icon-btn"><User size={20} />Viviendas</button>
                <button className="nav-icon-btn"><User size={20} />Usuarios</button>
                <button className="nav-icon-btn"><Settings size={20} />Reservas</button>
                <button className="nav-mobile-menu"><Menu size={24} /></button>
                <button onClick={handleLogout} className="btn-logout"><LogOut size={20} /></button>
            </div>
        </nav>
    );
};