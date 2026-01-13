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
    const { houses, refreshHouses } = useContext(AdminContext);
    const { editHouse, loading, error } = useAdminHouses();

    // Buscamos la casa específica en nuestra lista del contexto
    const houseToEdit = houses.find(casa => casa._id === id);

    const handleEditar = async (formData, selectedFiles) => {
        const ok = await editHouse(id, formData, selectedFiles);
        if (ok) {
            refreshHouses(); // Refrescamos la lista 
            navigate('/admin/dashboard');
        }
    };

    if (!houseToEdit) return <p>No se ha encontrado la vivienda...</p>;

    return (
        <div className="admin-page">
            <AdminNavbar />
            <div className="admin-container">
                <header className="form-header">
                    <h2>Editar Vivienda</h2>
                    <p>Modifica los campos necesarios de <strong>{houseToEdit.titulo}</strong>.</p>
                </header>

                <main className="form-content">
                        <HouseForm
                            initialData={houseToEdit} // Aquí pasamos los datos viejos
                            onSubmit={handleEditar}
                            buttonText="Actualizar Vivienda"
                        />
                   
                </main>
            </div>
        </div>
    );
};