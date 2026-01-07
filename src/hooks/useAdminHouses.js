import { useState } from 'react';
import toast from 'react-hot-toast';

export const useAdminHouses = () => {
    const [loading, setLoading] = useState(false); // Mientras sube fotos xej pone Cargando..."
    const [error, setError] = useState(null);

    // FUNCIÓN PARA CREAR (POST)
    const createHouse = async (formData, selectedFiles) => {
        setLoading(true);
        setError(null); // Reseteamos el error al empezar
        const data = new FormData();

        //Pasar los textos del formulario (incluyendo imagenesRestantes si existieran)
        Object.keys(formData).forEach(key => {
            // Si mandamos un array (como imagenesRestantes), lo pasamos como String
            if (Array.isArray(formData[key])) {
                data.append(key, JSON.stringify(formData[key]));
            } else {
                data.append(key, formData[key]);
            }
        });

        // Pasar los archivos nuevos para Multer
        // Usamos selectedFiles directamente porque ya es el array que viene del Dropzone
        selectedFiles.forEach(file => {
            data.append('imagenes', file);
        });

        try {
            const respuesta = await fetch('http://localhost:4001/api/admin/createHouse', {
                method: 'POST',
                body: data,
                credentials: 'include' // Para que Back sepa quien eres (por la cookie)
            });

            const respuestaData = await respuesta.json();

            if (respuesta.ok) {
                toast.success('¡Vivienda creada correctamente!');
                return true;

            } else { // Aquí cogemos el error enviado desde el back
                const errorMsg = respuestaData.msg || "Error al crear la vivienda";
                toast.error(errorMsg); // Muestra el mnsje del check específico
                return false;
            }

        } catch (error) {
            console.log(error);
            setError("Error de conexión al crear la vivienda");
            toast.error("Error de conexión");

        } finally {
            setLoading(false);
        }
    };

    // FUNCIÓN PARA ELIMINAR (DELETE)
    const deleteHouse = async (id) => {
        setLoading(true);
        try {
            const respuesta = await fetch(`http://localhost:4001/api/admin/deleteHouse/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            // Devuelve true si se borró, false si no
            if (respuesta.ok) {
                toast.success('Vivienda eliminada correctamente');
                return true;
            } else {
                // Error del servidor (ej: 404 o 500)
                toast.error('El servidor no permitió borrar la vivienda');
                return false;
            }

        } catch (error) {
            toast.error('Fallo de conexión. Revisa el servidor');
            console.error("Error al borrar", error);
            return false;

        } finally {
            setLoading(false); // bloque finally se ejecuta siempre al acabar
        }
    };

    // FUNCIÓN PARA EDITAR (PUT)
    const editHouse = async (id, formData, selectedFiles) => {
        setLoading(true);
        const data = new FormData();

        // Pasamos los campos de texto
        Object.keys(formData).forEach(key => {
            // IMPORTANTE: imagenesRestantes es un array de URLs (Strings)
            // Lo pasamos a JSON para que llegue íntegro al Backend
            if (key === 'imagenesRestantes') {
                data.append(key, JSON.stringify(formData[key]));
            } else {
                data.append(key, formData[key]);
            }
        });

        // Pasar las fotos nuevas si las hay
        if (selectedFiles && selectedFiles.length > 0) {
            selectedFiles.forEach(file => {
                data.append('imagenes', file);
            });
        }

        try {
            const respuesta = await fetch(`http://localhost:4001/api/admin/editHouse/${id}`, {
                method: 'PUT',
                body: data,
                credentials: 'include'
            });

            const respuestaData = await respuesta.json(); // Leemos la respuesta del back

            if (respuesta.ok) {
                toast.success('Vivienda actualizada correctamente');
                return true;
            } else {
                // Checks del backend
                const errorMsg = respuestaData.msg || "Error al editar la vivienda";
                toast.error(errorMsg);
                setError(errorMsg);
                return false;
            }

        } catch (err) {
            setError("Error de conexión al editar la vivienda");
            toast.error("Error de conexión");
            return false;

        } finally {
            setLoading(false);
        }
    };

    // EXPORTAR las herramientas para que las pags las usen
    return {
        createHouse,
        deleteHouse,
        editHouse,
        loading,
        error
    };
};