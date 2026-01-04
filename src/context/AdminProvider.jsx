import { AdminContext } from './AdminContext';
import { useFetch } from '../hooks/useFetch';

export const AdminProvider = ({ children }) => {

    // pedir datos al servidor -> usar el hook useFetch creado para ello
    const { data, loading, error, consultaFetch } = useFetch('http://localhost:4001/api/admin/dashboard');

    // Esto evita que el .map() de la página rompa la app.
    const houses = data?.ok ? data.data : [];

    // Preparamos el objeto que vamos a compartir abajo
    const value = {
        houses,
        loading,
        error,
        consultaFetch // función para refrescar los datos cada vez que modifiques una casa
    };

    //return envuelve toda la app
    return (
        <AdminContext.Provider value={value}> {/*value es lo que estamos transmitiendo a los hijos */}
            {children}
        </AdminContext.Provider>
    )
}
