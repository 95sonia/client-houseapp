import { AdminContext } from './AdminContext';
import { useFetch } from '../hooks/useFetch';
const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const AdminProvider = ({ children }) => {

    // pedir datos al servidor -> usar el hook useFetch creado para ello
    const { data, loading, error, consultaFetch } = useFetch(`${apiUrl}/admin/dashboard`);

    // Esto evita que el .map() de la página rompa la app.
    const houses = data?.data || []

    // función para refrescar los datos cada vez que modifiques una casa
    const refreshHouses = () => {
        // pasar 'GET' y la URL completa
        consultaFetch(`${apiUrl}/admin/dashboard`, 'GET');
    };

    // Preparamos el objeto que vamos a compartir abajo
    const value = {
        houses,
        loading,
        error,
        refreshHouses
    };

    //return envuelve toda la app
    return (
        <AdminContext.Provider value={value}> {/*value es lo que estamos transmitiendo a los hijos */}
            {children}
        </AdminContext.Provider>
    )
}
