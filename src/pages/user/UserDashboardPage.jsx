import '../../styles/UserDashboard.scss'
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useUserHouses } from '../../hooks/useUserHouses';
import { UserHouseCard } from '../../components/user/UserHouseCard';
import { Search } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL_BASE || 'https://server-houseapp.onrender.com';

export const UserDashboardPage = () => {
    // Estado para el buscador
    const [busqueda, setBusqueda] = useState('');
    // Traer las casas usando useFetch (hook reutilizable)
    const { data, loading, consultaFetch } = useFetch(`${apiUrl}/user/dashboard`);
    //Traer los favoritos guardados en el usuario
    const { data: dataFavs, consultaFetch: fetchFavs } = useFetch(`${apiUrl}/user/favoritos`);
    const { addFavorito, deleteFavorito } = useUserHouses();

    const handleFavoritos = async (id, estaEnFavoritos) => {
        // Si ya está en favs -> borrar, si no -> añadir.
        const exito = estaEnFavoritos ? await deleteFavorito(id) : await addFavorito(id);

        if (exito) {
            fetchFavs(`${apiUrl}/user/favoritos`, 'GET'); // Refrescar datos para corazón cambie de color
        }
    };

    if (loading) return <p>Cargando viviendas...</p>;

    // Lógica del FILTRO (includes busca si string está dentro, devuelve true o false)
    const viviendasFiltradas = data?.data?.filter(house =>
        house.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
        house.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Extraer solo IDs favoritos en un Set para comparar rápido y sin errores
    const misFavoritosIds = new Set(dataFavs?.data?.map(fav => fav._id));
    return (
        <main className="dashboard-user">
            <header className="dashboard-header">
                <h2>Busca el mejor alojamiento para tu próxima escapada</h2>
                <div className="buscador-contenedor">
                    <Search className="icono-lupa" size={20} />
                    <input type="text" placeholder="¿A dónde quieres ir?"
                        value={busqueda} onChange={(ev) => setBusqueda(ev.target.value)}
                    />
                </div>
            </header>

            <section className="houses-grid">
              {(viviendasFiltradas || []).map(house => {
                    // Si la casa está en el array de favs del usuario, es true
                    const esFav = dataFavs?.data?.some(fav => fav._id === house._id);

                    return (
                        <UserHouseCard
                            key={house._id}
                            house={house}
                            esFavorito={esFav}
                            onhandleFavorito={() => handleFavoritos(house._id, esFav)}
                        />
                    )
                })}
            </section>
        </main>
    );
};