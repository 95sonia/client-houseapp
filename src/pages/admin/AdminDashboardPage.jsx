import '../../styles/AdminDashboard.scss';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import { AdminHouseCard } from '../../components/admin/AdminHouseCard';
import { PlusCircle } from 'lucide-react';

export const AdminDashboardPage = () => {
    const { houses, loading, error } = useContext(AdminContext);

    if (loading) return <div className="loading">Cargando viviendas...</div>;

    return (
        <div className="admin-layout">
            <AdminNavbar />
            <div className="admin-container">
                {/* Cabecera  */}
                <header className="dashboard-header">
                    <div className="stats-info">
                        <h2>Hay {houses.length} viviendas registradas</h2>
                    </div>

                    <button className="btn-main-add">
                        <PlusCircle size={30} />
                        <span>Añadir Nueva Vivienda</span>
                    </button>
                </header>

                <main className="houses-grid">
                    {houses.length > 0 ? (
                        houses.map((house) => (
                            // Pasamos el objeto house completo al componente
                            <AdminHouseCard key={house._id} house={house} />
                        ))
                    ) : (
                        <p className="no-data">No se han encontrado casas </p>
                    )}
                </main>
            </div>
        </div>
    );
};