// import React from 'react';
// import { LogOut, Users, Home, Calendar, Settings, User } from 'lucide-react';
// // Aquí importar hook de Auth para el logout más adelante
// // import { useAuth } from '../context/AuthContext'; 

// export const AdminNavbar = () => {
//     // const { logout } = useAuth(); 

//     return (
//         <nav className="admin-navbar">
//             <div className="nav-logo">
//                 <Home size={24} className="logo-icon" />
//                 <span>Admin Dashboard</span>
//             </div>

//             <div className="nav-links">
//                 <button className="nav-item active">
//                     <Home size={20} />
//                     <span>Viviendas</span>
//                 </button>
//                 <button className="nav-item">
//                     <Users size={20} />
//                     <span>Usuarios</span>
//                 </button>
//                 <button className="nav-item">
//                     <Calendar size={20} />
//                     <span>Reservas</span>
//                 </button>
//             </div>

//             <div className="nav-actions">
//                 <div className="user-profile">
//                     <User size={20} />
//                     <span>Admin</span>
//                 </div>
//                 <button className="btn-settings">
//                     <Settings size={20} />
//                 </button>
//                 {/* El botón de Logout*/}
//                 <button className="btn-logout" title="Cerrar Sesión">
//                     <LogOut size={20} />
//                 </button>
//             </div>
//         </nav>
//     );
// };


import { Home, User, Settings, LogOut, Menu } from 'lucide-react';
import '../../styles/AdminNavbar.scss'
// Aquí importar hook de Auth para el logout más adelante
// import { useAuth } from '../context/AuthContext'; 

export const AdminNavbar = () => {
    // const { logout } = useAuth(); 
    return (
        <nav className="admin-nav">
            <div className="nav-left">
                <Home className="logo-icon" size={24} />
                <h1>Admin Dashboard</h1>
            </div>

            <div className="nav-right">
                <button className="nav-icon-btn"><User size={20} /></button>
                <button className="nav-icon-btn"><Settings size={20} /></button>
                <button className="nav-mobile-menu"><Menu size={24} /></button>
                <button className="btn-logout" title="Cerrar Sesión"><LogOut size={20} /></button>
            </div>
        </nav>
    );
};