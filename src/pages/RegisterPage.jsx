import '../styles/Auth.scss';
import { useAuth } from '../hooks/useAuth';
import { NavPublic } from '../components/NavPublic';
import registroImg from '../assets/images/registro_salon.jpg'

export const RegisterPage = () => {
    const { handleRegister, error } = useAuth();

    const handleSubmit = async (ev) => {
        ev.preventDefault(); //prevenir el envio

        // capturar los datos del formulario usando los NAMES de los inputs - antes de hacer la petición, para crear el obj que vamos a mandar al back
        const nuevoUsuario = {
            nombre: ev.target.nombre.value,
            direccion: ev.target.direccion.value,
            fechaNacimiento: ev.target.fechaNacimiento.value,
            email: ev.target.email.value,
            password: ev.target.password.value,
            telefono: ev.target.telefono.value
        };

        await handleRegister(nuevoUsuario);
        console.log(nuevoUsuario, '---------desde RegisterPage front------------')
    };

    return (
        <><NavPublic />
            <main className="auth-page-wrapper">
                <div className="auth-card">
                    <section className="auth-content">
                        <h1>Crea tu cuenta</h1>
                        <p>Regístrate para alquilar una casa</p>

                        <form onSubmit={handleSubmit} className="authForm">
                            <label>Nombre</label>
                            <input type="text" id="nombre" name="nombre" required />

                            <label>Dirección</label>
                            <input type="text" id="direccion" name="direccion" required />

                            <label>Fecha de nacimiento</label>
                            <input type="date" id="fechaNacimiento" name="fechaNacimiento" required />

                            <label>Email</label>
                            <input type="email" id="email" name="email" required />

                            <label>Teléfono móvil</label>
                            <input type="tel" id="telefono" name="telefono" required />

                            <label>Contraseña</label>
                            <input type="password" id="password" name="password" required />

                            {/* Solo se muestra si el Hook detecta un error del backend */}
                            {error && <p className="error-msg">{error}</p>}

                            <button type="submit" className="btn-submit">Registrarse</button>
                        </form>

                        <p className="auth-footer">¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
                    </section>

                    <div className="auth-image">
                        <img
                            src={registroImg}
                            alt="Regístrate en HouseApp. Imagen salón casa"
                        />
                    </div>
                </div>
            </main>
        </>
    );
};