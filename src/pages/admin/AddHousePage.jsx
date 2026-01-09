import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useNavigate } from 'react-router';
import { useAdminHouses } from '../../hooks/useAdminHouses';
import { HouseForm } from '../../components/admin/HouseForm';
import { AdminNavbar } from '../../components/admin/AdminNavbar';

export const AddHousePage = () => {
    // Traer la herramienta de crear y el estado de carga
    const { createHouse, loading } = useAdminHouses();
    const { refreshHouses } = useContext(AdminContext);
    const navigate = useNavigate();

    // Esta fción recibe los datos del formulario y las fotos
    const handleCrear = async (formData, images) => {
        // El hook ya sabe navegar al dashboard si todo sale bien
        const exito = await createHouse(formData, images);
        // si ha salido bien, refrescamos y volvemos al dashboard
        //si algo falla nos quedamos en el formulario
        if (exito) {
            refreshHouses();
            navigate('/admin/dashboard');
        }
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
                    <HouseForm
                        onSubmit={handleCrear}
                        buttonText="Guardar Vivienda"
                    />
                </main>
            </div>
        </div>
    );
};