    import React from 'react';
    import { Link } from 'react-router';
    import { Heart, MapPin, CalendarCheck } from 'lucide-react';

    export const UserHouseCard = ({ house, esFavorito, onhandleFavorito }) => {

        return (
            <article className="house-item">
                <div className="img-container">
                    <img src={house.imagenPrincipal} alt={house.titulo} />

                    {/* btn Favoritos encima de la foto */}
                    <button className={`capa-favorito ${esFavorito ? 'active' : ''}`}
                        onClick={onhandleFavorito}
                    >
                        <Heart size={20} fill={esFavorito ? "currentColor" : "none"} />
                    </button>
                </div>

                <div className="house-info">
                    <h3>{house.titulo}</h3>
                    <p className="location"> <MapPin size={14} /> {house.ubicacion} </p>
                    <p className="price">{house.precio} € <span>/ noche</span></p>

                    <div className="user-actions">
                        <Link to={`/user/house/${house._id}`} className="btn-detail">
                            Ver detalle
                        </Link>
                        <Link to={`/user/reservar/${house._id}`} className="btn-reserve">
                            <CalendarCheck size={18} /> Reservar
                        </Link>
                    </div>
                </div>
            </article>
        );
    };