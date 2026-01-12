import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'react-hot-toast';
import '../../styles/AdminReservasPage.scss';

const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const AdminReservasPage = () => {
  // 1. Usamos la ruta /admin/reservas (ajustar según tu prefijo de router)
  const { data, loading, consultaFetch } = useFetch(`${apiUrl}/admin/reservas`);

  // Accedemos a data.reservas (porque asi lo he puesto en controlador back getAllReservas)
  const listaReservas = data?.reservas || [];

  const handleCambiarEstado = async (id, nuevoEstado) => {
    // Enviar nuevo estado al controlador editReservaById
    const exito = await consultaFetch(`${apiUrl}/admin/reservas/${id}`, 'PUT', {
      estado: nuevoEstado
    });

    if (exito) {
      toast.success(`Estado actualizado a: ${nuevoEstado}`);
      // Refrescar la lista llamando de nuevo a la consulta GET
      consultaFetch(`${apiUrl}/admin/reservas`);
    }
  };

  if (loading) return <p className="loading">Cargando todas las reservas...</p>;

  return (
    <main className="admin-reservas-page">
      <header className="admin-header">
        <h1>Gestión de <span>Reservas</span></h1>
        <p>Panel de control para confirmar o cancelar solicitudes</p>
      </header>

      <div className="admin-reservas-list">
        {listaReservas.length === 0 ? (
          <p className="empty">No hay ninguna reserva realizada en el sistema.</p>
        ) : (
          listaReservas.map((res) => (
            <article key={res._id} className="admin-card">
              <div className="card-info">
                <div className="user-details">
                  <strong>Cliente:</strong> {res.usuario?.nombre}
                  <span>({res.usuario?.email})</span>
                </div>
                <h2>{res.vivienda?.titulo}</h2>
                <p className="location">{res.vivienda?.ubicacion}</p>
                <div className="dates">
                  <span>{new Date(res.fechaEntrada).toLocaleDateString()}</span>
                  <span> hasta </span>
                  <span>{new Date(res.fechaSalida).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="card-actions">
                <div className={`status-manage ${res.estado}`}>
                  {res.estado}
                </div>
                <div className="buttons">
                  <button className="btn-confirm" onClick={() => handleCambiarEstado(res._id, 'confirmada')}
                    disabled={res.estado === 'confirmada'}
                  >Confirmar </button>
                  <button className="btn-cancel" onClick={() => handleCambiarEstado(res._id, 'cancelada')}
                    disabled={res.estado === 'cancelada'}
                  >Cancelar </button>

                  <button className="btn-pendiente" onClick={() => handleCambiarEstado(res._id, 'pendiente')}
                    disabled={res.estado === 'pendiente'}
                  > Pendiente </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
};