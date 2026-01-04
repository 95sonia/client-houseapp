import { useAuth } from '../hooks/useAuth';
import '../styles/Auth.scss';

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
        <main className="auth-page-wrapper">
            <div className="auth-card">

                <section className="auth-content">
                    <h1>Iniciar Sesión</h1>
                    <p>Bienvenido de nuevo a HouseApp</p>

                    <form onSubmit={handleSubmit} className="authForm">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="ejemplo@email.com" required />

                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" required />

                        {/* Solo se muestra si el Hook detecta un error del backend */}
                        {error && <p className="error-msg">{error}</p>}

                        <button type="submit" className="btn">Entrar</button>
                    </form>

                    <p className="auth-footer">
                        ¿No tienes cuenta? <a href="/register">Regístrate</a>
                    </p>

                </section>

                <div className="auth-image">
                    <img
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                        alt="Casa de vacaciones HouseApp"
                    />
                </div>

            </div>
        </main>
    );
};