import React from 'react';
import '../styles/Home.scss'
import { Link } from 'react-router';
import { MapPin, Search } from 'lucide-react';

export const PublicHouseCard = ({ house }) => {
    return (
        <article className="house-item">
            <div className="img-container">
                <img src={house.imagenPrincipal} alt={house.titulo} />
            </div>

            <div className="house-info">
                <span className={`info ${house.estado}`}>{house.estado}</span>
                <h3>{house.titulo}</h3>
                <p className="location"><MapPin size={14} /> {house.ubicacion}</p>
                <p className="price">{house.precioNoche} € <span>/ noche</span></p>
            </div>

            <div className="actions">
                <Link to={`/home/house/${house._id}`} className="btn-detail ">
                    <Search size={16} /> Ver detalle
                </Link>
            </div>
        </article>
    );
};