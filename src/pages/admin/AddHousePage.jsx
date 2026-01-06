import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext'; 
import { useNavigate } from 'react-router'; 
import { useAdminHouses } from '../../hooks/useAdminHouses';
import { HouseForm } from '../../components/admin/HouseForm';
import { AdminNavbar } from '../../components/admin/AdminNavbar';

export const AddHousePage = () => {
    // Traer la herramienta de crear y el estado de carga
    const { createHouse, loading, error } = useAdminHouses();
    const { consultaFetch } = useContext(AdminContext);  
    const navigate = useNavigate(); 

    // Esta fción recibe los datos del formulario y las fotos
    const handleCrear = async (formData, images) => {
        // El hook ya sabe navegar al dashboard si todo sale bien
        await createHouse(formData, images);
        // Si no ha habido error, refrescamos y volvemos
        await consultaFetch(); 
        navigate('/admin/dashboard');
    };

    return (
        <div className="admin-layout">
            <AdminNavbar />
            <div className="admin-container">
                <header className="form-header">
                    <h2>Añadir Nueva Vivivenda</h2>
                    <p>Rellena los datos y sube las fotos de la vivienda.</p>
                </header>

                <main className="form-content">
                    {/* Si el hook está trabajando, mostramos un mensaje */}
                    {loading ? (
                        <div className="loading-state">
                            <p>Subiendo imágenes... Por favor, espera.</p>
                        </div>
                    ) : (
                        <HouseForm 
                            onSubmit={handleCrear} 
                            buttonText="Guardar Vivienda" 
                        />
                    )}

                    {error && <p className="error-msg">{error}</p>}
                </main>
            </div>
        </div>
    );
};