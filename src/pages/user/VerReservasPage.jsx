import { useFetch } from '../../hooks/useFetch';
import '../../styles/UserVerReservasPage.scss';

const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const VerReservasPage = () => {
  const { data, loading } = useFetch(`${apiUrl}/user/reservas`);
  const reservas = data?.data || [];

  if (loading) return <p className="loading">Cargando tus viajes...</p>;

  return (
    <main className="mis-reservas-container">
      <header className="reservas-header">
        <h1>Mis <span>Reservas</span></h1>
        <p>Consulta el estado de tus reservas de viviendas vacacionales</p>
      </header>

      <section className="reservas-list">
        {reservas.length === 0 ? (
          <div className="no-reservas">
            <p>Aún no has realizado ninguna reserva.</p>
          </div>
        ) : (
          reservas.map((reserva, index) => (
            <div key={reserva._id} className="reserva-item">
              <div className="reserva-info">
                <span className="reserva-number">Reserva {index + 1}</span>
                <h2>{reserva.vivienda?.titulo}</h2>
                <p className="location">Ubicación: {reserva.vivienda?.ubicacion}</p>
                <p className="date">Entrada: {new Date(reserva.fechaEntrada).toLocaleDateString()}</p>
                <p className="date">Salida: {new Date(reserva.fechaSalida).toLocaleDateString()}</p>
                <p className="total-price"> Precio total: {reserva.precioTotal} €</p>
              </div>

              <div className="reserva-status">
                {/* clase dinámica según el estado */}
                <span className={`manage-status ${reserva.estado}`}>
                  {reserva.estado}
                </span>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};