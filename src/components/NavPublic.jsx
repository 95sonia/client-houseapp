import '../styles/AllNavbar.scss'
import { Link } from 'react-router';
import { Home, UserCircle, NotebookPen } from 'lucide-react';

export const NavPublic = () => {
  return (
    <>
      <nav className="all-navbar">
        <div className="nav-container">
          <Link to="/home" className="nav-logo"> HOUSE <span> APP </span> <Home size={27} /> </Link>
          <nav>
            <ul className="nav-links">
              <li> <Link to='/home' title="Inicio"> <span>Inicio </span></Link></li>
              <li> <Link to='/login' title="Login"> <UserCircle size={20} /> <span>Login </span></Link></li>
              <li><Link to='/register' title="Registro"><NotebookPen size={20} /> <span>Registro</span></Link></li>
            </ul>
          </nav >
        </div >
      </nav >
    </>
  )
}