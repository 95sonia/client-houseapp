import { Link } from 'react-router'

export const Nav = () => {

    return (
        <>
            <nav>
                <ul>
                    <li> <Link to='/'> Inicio </Link></li>
                    <li> <Link to='/login'> Login </Link></li>
                    <li><Link to='/register'> Registro</Link></li>
                </ul>
            </nav >

        </>
    )
}

