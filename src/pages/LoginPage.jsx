import '../styles/Auth.scss';
import { useAuth } from '../hooks/useAuth';
import { NavPublic } from '../components/NavPublic';
import loginImg from '../assets/images/login-house.jpg'

//única función de esta pag Login: capturar datos del formulario y llamar a una función
export const LoginPage = () => {
    const { handleLogin, error } = useAuth();

    const handleSubmit = async (ev) => {
        ev.preventDefault(); //prevenir el envio

        // capturar los datos del formulario usando los names de los inputs
        const datosFormulario = {
            email: ev.target.email.value,
            password: ev.target.password.value
        };

        await handleLogin(datosFormulario);
    };

    return (
        <>
            <NavPublic />
            <main className="auth-page-wrapper">
                <div className="auth-card">

                    <section className="auth-content">
                        <h1>Iniciar Sesión</h1>

                        <form onSubmit={handleSubmit} className="authForm">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="ejemplo@email.com" required />

                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" name="password" required />

                            {/* Solo se muestra si Hook detecta un error del backend */}
                            {error && <p className="error-msg">{error}</p>}

                            <button type="submit" className="btn">Entrar</button>
                        </form>

                        <p className="auth-footer">
                            ¿No tienes cuenta? <a href="/register">Regístrate</a>
                        </p>
                    </section>

                    <div className="auth-image">
                        <img
                            src={loginImg}
                            alt="Login HouseApp - Foto Casa vacaciones"
                        />
                    </div>

                </div>
            </main>
        </>
    );
};