import { useAuth } from '../hooks/useAuth';
import './Login.css';

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
        <main className="authContainer">
            <h1>Iniciar Sesión</h1>

            <form onSubmit={handleSubmit} className="authForm">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="ejemplo@email.com" required />

                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" required />

                {/* Solo se muestra si el Hook detecta un error del backend */}
                { error && <p className="error-msg">{ error }</p> }

                <button type="submit" className="btn">Entrar</button>
            </form>
        </main>
    );
};