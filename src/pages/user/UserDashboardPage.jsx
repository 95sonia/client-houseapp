import '../../styles/UserDashboard.scss'
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useUserHouses } from '../../hooks/useUserHouses';
import { UserHouseCard } from '../../components/user/UserHouseCard';
import { Search } from 'lucide-react';

export const UserDashboardPage = () => {
    // Estado para el buscador
    const [busqueda, setBusqueda] = useState('');

    // Traer las casas usando useFetch (hook reutilizable)
    const { data, loading, consultaFetch } = useFetch('http://localhost:4001/api/user/dashboard');
    const { addFavorito, deleteFavorito } = useUserHouses();

    const handleFavoritos = async (id, estaEnFavoritos) => {
        // Si ya está en favs -> borrar, si no -> añadir.
        const exito = estaEnFavoritos ? await deleteFavorito(id) : await addFavorito(id);

        if (exito) {
            consultaFetch(); // Refrescar datos para corazón cambie de color
        }
    };

    if (loading) return <p>Cargando viviendas...</p>;

    // Lógica del FILTRO 
    const viviendasFiltradas = data?.data?.filter(house =>
        house.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
        house.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main className="dashboard-user">
            <header className="dashboard-header">
                <h2>Busca el mejor alojamiento para tu próxima escapada</h2>
                <div className="buscador-contenedor">
                    <Search className="icono-lupa" size={20} />
                    <input type="text" placeholder="¿A dónde quieres ir? Escribe una Provincia"
                        value={busqueda} onChange={(ev) => setBusqueda(ev.target.value)}
                    />
                </div>
            </header>

            <section className="houses-grid">
                {viviendasFiltradas.map(house => (
                    <UserHouseCard
                        key={house._id}
                        house={house}
                        esFavorito={house.esFavorito}// comprobar si ID está en array de favs del usuario
                        onhandleFavorito={() => handleFavoritos(house._id, house.esFavorito)}
                    />
                ))}
            </section>
        </main>
    );
};