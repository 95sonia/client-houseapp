import '../../styles/HouseDetails.scss'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Importar estilos propios de la libreria (ver docu npm)
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
    const base = import.meta.env.VITE_API_URL_BASE || 'https://server-houseapp.onrender.com';

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

  // --------- Preparar el array para la GALERÍA ------------------
  const imagesForGallery = useMemo(() => {
    if (!house) return [];

    return house.imagenes.map((img) => ({ // Usar el array de imágenes para evitar repetir la principal
      original: img,
      thumbnail: img,
      originalAlt: house.titulo,
      thumbnailAlt: `Miniatura ${house.titulo}`
    }));
  }, [house]);
  //-------------------------FIN DE GALERÍA--------------------------

  if (loading) return <div className="cargando">Cargando detalles...</div>;
  if (error) return <div className="error-msg">Error: {error}</div>;
  if (!house) return <div className="error-msg">Vivienda no encontrada.</div>;

  return (
    <>
      <main className="house-details-page">
        <section className="gallery-section">
          {/*IMÁGENES DE LA CASA */}
          <h1>{house.titulo}</h1>
          <div className="gallery-container">
            <ImageGallery
              items={imagesForGallery}
              showPlayButton={false} // muestra boton de play
              showFullscreenButton={true} // muestra botón de pantalla completa
              autoPlay={true} // cambian las fotos solas
              slideInterval={3000} // cambia la foto cada 3 segundos
              slideDuration={450} //duración miliseg de la transición
              thumbnailPosition="bottom" // bottom para ver miniaturas debajo
              showIndex={true} // muestra "1 de 5" por ej
              originalClass="featured-image"  // imgs se ajusten al ancho del contenedor
            />
          </div>
        </section >

        <section className="info-wrapper">
          {/*INFO DE LA CASA */}
          <h3>Información de la vivienda: </h3>
          <div className="house-info">
            <span>{house.ubicacion}</span>
            <p>{house.descripcion}</p>
            <p className="price">{house.precioNoche}€ / noche</p>
            <span className={`info ${house.estado}`}>{house.estado}</span>
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
