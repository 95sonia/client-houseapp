import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AdminContext } from '../../context/AdminContext';
import { useAdminHouses } from '../../hooks/useAdminHouses';
import { HouseForm } from '../../components/admin/HouseForm'; 
import { AdminNavbar } from '../../components/admin/AdminNavbar'; 
import toast from 'react-hot-toast';


export const EditHousePage = () => {
    const { id } = useParams(); // Pillamos el ID de la URL
    const navigate = useNavigate();
    const { houses, consultaFetch } = useContext(AdminContext);
    const { editHouse, loading, error } = useAdminHouses();

    // Buscamos la casa específica en nuestra lista del contexto
    const houseToEdit = houses.find(h => h._id === id);

    const handleEditar = async (formData, selectedFiles) => {
        const ok = await editHouse(id, formData, selectedFiles);
        if (ok) {
            toast.success('¡Vivienda actualizada correctamente!'),
                await consultaFetch(); // Refrescamos la lista 
            navigate('/admin/dashboard');
        } else {
            // Si falla, avisamos del error
            toast.error('Error al guardar los cambios');
        }
    };

    if (!houseToEdit) return <p>No se ha encontrado la vivienda...</p>;

    return (
        <div className="admin-layout">
            <AdminNavbar />
            <div className="admin-container">
                <header className="form-header">
                    <h2>Editar Vivienda</h2>
                    <p>Modifica los campos necesarios de <strong>{houseToEdit.titulo}</strong>.</p>
                </header>

                <main className="form-content">
                    {loading ? (
                        <p>Guardando cambios...</p>
                    ) : (
                        <HouseForm
                            initialData={houseToEdit} // Aquí pasamos los datos viejos
                            onSubmit={handleEditar}
                            buttonText="Actualizar Vivienda"
                        />
                    )}
                    {error && <p className="error-msg">{error}</p>}
                </main>
            </div>
        </div>
    );
};