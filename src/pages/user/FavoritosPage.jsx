import '../../styles/UserFavsPage.scss'
import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useUserHouses } from '../../hooks/useUserHouses';
import { UserHouseCard } from '../../components/user/UserHouseCard';
import { Heart } from 'lucide-react'

const apiUrl = import.meta.env.VITE_API_URL_BASE || 'https://server-houseapp.onrender.com';

export const FavoritosPage = () => {
  //Traemos las casas favoritas al cargar
  const { data, loading, error } = useFetch(`${apiUrl}/user/favoritos`);
  const { deleteFavorito } = useUserHouses();
  //Estado local para poder quitar la card de la pantalla al instante
  const [misFavoritos, setMisFavoritos] = useState([]);

  useEffect(() => {
    // Si data existe y tiene propiedad .data (donde el back mete el array)
    if (data && data.data) {
      setMisFavoritos(data.data); // Guardar solo el array de casas
    }
  }, [data]);

  const handleRemove = async (id) => {
    const ok = await deleteFavorito(id);
    if (ok) {
      //Filtramos el estado para que la casa desaparezca de la vista
      setMisFavoritos(prev => prev.filter(house => house._id !== id));
    }
  };

  if (loading) return <p>Cargando tus favoritos...</p>;

  return (
    <main className="home-container">

      {/* SECCIÓN DE ENCABEZADO */}
      <header className="favs-header">
        <div className="header-content">
          <h1>Mis <span>Favoritos</span> <Heart size={50} color={'#ff4b5c'} /></h1>
        </div>
      </header>

      <div className="houses-grid">
        {misFavoritos && misFavoritos.length > 0 ? (
          misFavoritos.map(house => (
            <UserHouseCard
              key={house._id}
              house={house}
              esFavorito={true}
              onhandleFavorito={() => handleRemove(house._id)}
            />
          ))
        ) : (
           // Si hay el error específico que te da el back o el array llega vacío
          <p className='error-empty-favs'>No tienes favoritos todavía.</p>
        )}
      </div>
    </main>
  );
};