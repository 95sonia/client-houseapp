import { useAuth } from '../hooks/useAuth';
import '../styles/Auth.scss';

export const RegisterPage = () => {
    const { handleRegister, error } = useAuth();

    const handleSubmit = async (ev) => {
        ev.preventDefault(); //prevenir el envio

        // capturar los datos del formulario usando los names de los inputs
        const nuevoUsuario = {
            nombre: ev.target.nombre.value,
            email: ev.target.email.value,
            password: ev.target.password.value,
            telefono: ev.target.telefono.value
        };

        await handleRegister(nuevoUsuario);
    };

    return (

        <main className="auth-page-wrapper">
            <div className="auth-card">


                <section className="auth-content">
                    <h1>Crea tu cuenta</h1>
                    <p>Regístrate para alquilar una casa</p>

                    <form onSubmit={handleSubmit} className="authForm">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" required />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="correo@ejemplo.com" required />

                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" required />

                        <label htmlFor="telefono">Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" placeholder="Ej: 666123456" required />

                        {/* Solo se muestra si el Hook detecta un error del backend */}
                        {error && <p className="error-msg">{error}</p>}

                        <button type="submit" className="btn-submit">Registrarse</button>
                    </form>

                    <p className="auth-footer">
                        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
                    </p>

                </section>

                <div className="auth-image">
                    <img
                        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974"
                        alt="HouseApp Interior"
                    />
                </div>

            </div>
        </main>
    );
};