import { Link } from 'react-router'

export const NavPublic = () => {
  return (
    <>
      <header>
        <div className="nav-container">
          <Link to="/home" className="nav-logo">HOUSE<span> APP</span></Link>
          <nav>
            <ul>
              <li> <Link to='/home'> Inicio </Link></li>
              <li> <Link to='/login'> Login </Link></li>
              <li><Link to='/register'> Registro</Link></li>
            </ul>
          </nav >
        </div>
      </header>
    </>
  )
}