import React from 'react';
import { Link } from 'react-router';
import { Edit, Trash2, MapPin, Search } from 'lucide-react';

export const AdminHouseCard = ({ house, onDelete }) => {

    // 1. Creamos la función de confirmación
    const handleConfirmDelete = () => {
        const mensaje = '¿Seguro que quieres eliminar la vivienda?';

        if (window.confirm(mensaje)) {
            // Si acepta, llamamos a la prop original
            onDelete(house._id);
        } // Si cancela, no hacemos nada y la casa se queda ahí
    };

    return (
        <article className="house-item">
            <div className="img-container">
                <img src={house.imagenPrincipal} alt={house.titulo} />

                {/* Botón editar */}
                <Link to={`/admin/editHouse/${house._id}`} className="edit-overlay btn-edit-icon">
                    <Edit size={16} />
                </Link>
            </div>

            <div className="house-info">
                <span className={`badge ${house.estado}`}>{house.estado}</span>
                <h3>{house.titulo}</h3>
                <p className="location"> <MapPin size={14} /> {house.ubicacion} </p>
                <p className="price">{house.precioNoche} € <span>/ noche</span></p>

                <div className="admin-actions">
                    <button className="btn-reservas">
                        <Search size={16} /> <p>Ver detalle</p>
                    </button>
                    <button className="btn-delete" title="Eliminar" onClick={handleConfirmDelete}>
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </article>
    );
};