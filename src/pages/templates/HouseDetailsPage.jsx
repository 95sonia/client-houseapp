import '../../styles/HouseDetails.scss'
import { useContext, useMemo } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router';
import { AuthContext } from '../../context/AuthContext'; // Para saber rol
import { useUserHouses } from '../../hooks/useUserHouses';
import { useFetch } from '../../hooks/useFetch';

export const HouseDetailsPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Traemos datos y contextos
  const { user } = useContext(AuthContext); // user.role es admin o user
  const { addFavorito } = useUserHouses();

  // Construir URL dinámicamente usando .env
  const apiUrl = useMemo(() => {
    const base = import.meta.env.VITE_API_URL_BASE;

    if (pathname.includes('/admin/')) {
      return `${base}/admin/house/${id}`;
    } else if (pathname.includes('/user/')) {
      return `${base}/user/house/${id}`;
    } else {
      return `${base}/home/house/${id}`; // Ruta pública
    }
  }, [id, pathname]);

  // useFetch apuntando a la ruta pública que creamos en el Back
  const { data, loading, error } = useFetch(apiUrl);

  // Extraemos la casa de la propiedad 'data' que devuelve tu backend
  const house = data?.data;

  if (loading) return <div className="cargando">Cargando detalles...</div>;
  if (error) return <div className="error-msg">Error: {error}</div>;
  if (!house) return <div className="error-msg">Vivienda no encontrada.</div>;

  return (
    <>
      <main className="house-details-page">
        <section>
          {/*IMÁGENES DE LA CASA */}
          <h1>{house.titulo}</h1>
          <div classsName="main-img">
            <img src={house.imagenPrincipal} alt={house.titulo} className="main-img" />
          </div>

          <div className="secondary-imgs">
            {house.imagenes.map((img, index) => (
              <img key={index} src={img} alt={`Detalle ${index}`} />
            ))}
          </div>
        </section >

        <section className="info-wrapper">
          {/*INFO DE LA CASA */}
          <h3>Información de la vivienda: </h3>
          <div className="house-info">
            <span>{house.ubicacion}</span>
            <p>{house.descripcion}</p>
            <p className="price">{house.precioNoche}€ / noche</p>
            <span className={`badge ${house.estado}`}>{house.estado}</span>
          </div>
        </section>

        <section className="actions-section">
          {/*CASO ADMIN */}
          {user?.role === 'admin' && (
            <button className="btn-edit"
              onClick={() => navigate(`/admin/editHouse/${id}`)}
            > Editar Vivienda
            </button>)}

          {/*CASO USER */}
          {user?.role === 'user' && (
            <div className="user-buttons">
              <button className="btn-fav"
                onClick={() => addFavorito(id)}
              > ❤️ Guardar en Favoritos
              </button>

              <Link to={`/user/reservar/${id}`}
                className='btn-reserve'
              > Reservar Vivienda
              </Link>
            </div>
          )}

          {/* CASO: PÚBLICO -> No renderiza ningún btn, solo el aviso */}
          {!user && (
            <div className="public-notice">
              <p>Para reservar o guardar esta vivienda, por favor <Link to="/login">inicia sesión</Link>.</p>
            </div>
          )}

        </section>
      </main>
    </>
  )
}
