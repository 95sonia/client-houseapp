//import '../styles/Home.scss';
import React, { useContext } from 'react';
import { PublicContext } from '../context/PublicContext';
import { PublicHouseCard } from '../components/PublicHouseCard';


export const HomePage = () => {
    // Solo extraemos lo que necesitamos
    const { houses, loading } = useContext(PublicContext);

    if (loading) return <div className="loading">Cargando destinos...</div>;

    return (
        <main className="home-container">
            <header className="home-header">
                <h1>Descubre tu <br /> <span>próximo destino</span></h1>
            </header>

            <section className="houses-grid">
                {houses.map(house => (
                    <PublicHouseCard key={house._id} house={house} />
                ))}
            </section>
        </main>
    );
};