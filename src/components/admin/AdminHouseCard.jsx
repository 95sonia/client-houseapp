import React from 'react';
import { Edit, Trash2, Calendar, MapPin } from 'lucide-react';

export const AdminHouseCard = ({ house }) => {
    return (
        <article className="house-item">
            <div className="img-container">

                <img src={house.imagenPrincipal} alt={house.titulo} />
                <button className="edit-overlay" title="Editar vivienda">
                    <Edit size={20} />
                </button>
            </div>

            <div className="house-info">
                <span className={`badge ${house.estado}`}>{house.estado}</span>
                <h3>{house.titulo}</h3>

                <p className="location">
                    <MapPin size={14} /> {house.ubicacion}
                </p>

                <p className="price">{house.precioNoche} € <span>/ noche</span></p>

                <div className="admin-actions">
                    <button className="btn-reservas">
                        <Calendar size={16} />
                        <span>Reservas</span>
                    </button>
                    <button className="btn-delete" title="Eliminar">
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </article>
    );
};