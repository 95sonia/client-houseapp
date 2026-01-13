import '../../styles/Auth.scss'; // reutilizo el scss del formulario de registro
import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import toast from 'react-hot-toast';
const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const UserPerfilPage = () => {
  const { loading, error, consultaFetch } = useFetch();

  //Estado para el modo edición
  const [editable, setEditable] = useState(false);

  //Un único estado para todo el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    fechaNacimiento: '',
    email: '',
    telefono: ''
  });

  //Función para cargar y rellenar (GET)
  const cargarPerfil = async () => {
    try {
      const res = await consultaFetch(`${apiUrl}/user/perfil`, 'GET');

      if (res?.ok && res.user) {
        setFormData({
          nombre: res.user.nombre || '',
          direccion: res.user.direccion || '',
          // split para limpiar el formato de fecha Mongo YYYY-MM-DD
          fechaNacimiento: res.user.fechaNacimiento ? res.user.fechaNacimiento.split('T')[0] : '',
          email: res.user.email || '',
          telefono: res.user.telefono || ''
        });
      }
    } catch (error) {
      toast.error('No se pudo cargar la información');
    }
  };

  //Se ejecuta solo al montar el componente
  useEffect(() => {
    cargarPerfil();
  }, []);

  //Manejador de cambios en inputs
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    });
  };

  // Enviar cambios (PUT)
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      // Envia el objeto plano formData
      const res = await consultaFetch(`${apiUrl}/user/perfil`, 'PUT', formData);
      if (res?.ok) {
        toast.success('¡Perfil actualizado!');
        setEditable(false);
      }
    } catch (error) {
      toast.error(error.message || 'Error al actualizar el perfil');
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  return (
    <main className="auth-page-wrapper user-page-wrapper">
      <div className="auth-card">
        <section className="auth-content">
          <h1>Mis <span>datos</span> de usuario</h1>

          {!editable ? (
            // VISTA DE LECTURA
            <div className="perfil-info">
              <p><span>Nombre:</span> {formData.nombre}</p>
              <p><span>Dirección: </span>{formData.direccion}</p>
              <p><span>Fecha de nacimiento: </span>{formData.fechaNacimiento}</p>
              <p><span>Email: </span>{formData.email}</p>
              <p><span>Teléfono:</span> {formData.telefono}</p>
              <button className="btn-submit" onClick={() => setEditable(true)}>
                Editar Perfil
              </button>
            </div>
          ) : (
            // VISTA DE FORMULARIO A ENVIAR
            <form className='userperfil-form authForm' onSubmit={handleSubmit}>
              <label>Nombre</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />

              <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
              <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
              {/* Solo se muestra si el Hook detecta un error del backend*/}
              {error && <p className="error-msg">{error}</p>}
              <div className="button-group">
                <button type="submit" className="btn-submit">Guardar</button>
                <button type="button" className="btn-submit" onClick={() => setEditable(false)}>Cancelar</button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}