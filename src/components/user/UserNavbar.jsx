import '../../styles/UserNavBar.scss'
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router';
import { Heart, Calendar, LogOut, Home, HandCoins, UserCircle } from 'lucide-react';


export const UserNavbar = () => {
  const { user, handleLogout } = useAuth()

  return (
    <nav className="user-navbar">
      <div className="nav-container">
        <Link to="/user/dashboard" className="nav-logo">HOUSE<span> APP</span></Link>

        <ul className="nav-links">
          <li><Link to="/user/dashboard"><Home size={20} /><span>Home</span></Link></li>
          <li><Link to="/user/favoritos"><Heart size={20} /><span>Favoritos</span></Link></li>
          <li><Link to="/user/reservas"><Calendar size={20} /><span> Mis Reservas</span></Link></li>
          <li><Link to="/user/dashboard"><HandCoins size={20} /><span> Ofertas </span></Link></li>
        </ul>

        <div className="nav-user-actions">
          <Link to="/user/perfil" className="perfil-link"><UserCircle size={24} /><span className="user-name"> Mi perfil</span></Link>
          <button onClick={handleLogout} className="btn-logout" ><LogOut size={20} /> <span className="salir"> Salir</span></button>
        </div>

      </div>
    </nav>
  );
};