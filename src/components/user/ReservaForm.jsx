import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const ReservaForm = ({ houseId }) => {
  const { consultaFetch, error } = useFetch();

  const [reserva, setReserva] = useState({
    fechaEntrada: '',
    fechaSalida: '',
    numeroHuespedes: 1
  });

  const handleChange = (ev) => {
    setReserva({ ...reserva, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const exito = await consultaFetch(`${apiUrl}/user/reservar/${houseId}`, 'POST', reserva);

    if (exito) {
      toast.success('¡Reserva confirmada!');
    }
  };

  return (
    <form className="ReservaForm" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Fecha de entrada</label>
        <input type="date" name="fechaEntrada" onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>Fecha de salida</label>
        <input type="date" name="fechaSalida" onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>Huéspedes</label>
        <input type="number" name="numeroHuespedes" min="1" value={reserva.numeroHuespedes} onChange={handleChange} required />
      </div>

      {/* Mostramos el error del backend  */}
      {error && <p className="error-msg">{error}</p>}
      
      <button type="submit" className="btn-confirmar">Confirmar Reserva</button>
    </form>
  );
};