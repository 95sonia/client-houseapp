import '../../styles/AdminDashboard.scss';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router';
import { AdminContext } from '../../context/AdminContext';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import { AdminHouseCard } from '../../components/admin/AdminHouseCard';
import { PlusCircle } from 'lucide-react';
import { useAdminHouses } from '../../hooks/useAdminHouses';

export const AdminDashboardPage = () => {
    const { houses, loading, refreshHouses, error } = useContext(AdminContext);

    // Traer la fción de borrar del hook
    const { deleteHouse } = useAdminHouses();

    //carga los datos al entrar
    useEffect(() => {
        refreshHouses();
    }, []); // Corchetes vacíos aseguran que solo se ejecute al cargar la pág

    const handleEliminar = async (id) => {
        const ok = await deleteHouse(id);
        if (ok) {
            // DESPUES DE ELIMINAR llamar servidor para traer nueva lista de casas
            refreshHouses();
        }
    };

    if (loading) return <div className="loading">Cargando la lista de viviendas...</div>;

    return (
        <div className="admin-page-dashboard">
            <AdminNavbar />

            <div className="admin-container">
                {/* Cabecera  */}
                <header className="dashboard-header">
                    <div className="house-number-info">
                        <h2>Bienvenido al Admin Dashboard</h2>
                        <p>Hay {houses.length} viviendas registradas</p>
                    </div>

                    <Link to="/admin/createHouse" className="btn-main-add">
                        <PlusCircle size={30} /> Añadir Nueva Vivienda </Link>
                </header>

                <main className="houses-grid">
                    {houses.length > 0 ? (
                        houses.map((house) => (
                            // Pasamos el objeto house completo al componente
                            <AdminHouseCard key={house._id} house={house}
                                // Pasamos la fción a la tarjeta
                                onDelete={() => handleEliminar(house._id)} />
                        ))
                    ) : (
                        <p className="no-data">No se ha encontrado ninguna vivienda </p>
                    )}
                </main>
            </div>
        </div>
    );
};