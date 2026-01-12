import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useFetch } from './useFetch';
const apiUrl = import.meta.env.VITE_API_URL_BASE || 'https://server-houseapp.onrender.com';

export const useAdminHouses = () => {
    const { data, loading, error, consultaFetch } = useFetch()

    // FUNCIÓN PARA CREAR (POST)
    const createHouse = async (formData, selectedFiles) => {
        try {
            const dataEnviar = new FormData();
            //Pasar los textos del formulario (incluyendo imagenesRestantes si existieran)
            Object.keys(formData).forEach(key => {
                // Si mandamos un array (como imagenesRestantes), lo pasamos como String
                if (Array.isArray(formData[key])) {
                    dataEnviar.append(key, JSON.stringify(formData[key]));
                } else {
                    dataEnviar.append(key, formData[key]);
                }
            });
            // Pasar los archivos nuevos para Multer
            // Usamos selectedFiles directamente porque ya es el array que viene del Dropzone
            selectedFiles.forEach(file => {
                dataEnviar.append('imagenes', file);
            });
            await consultaFetch(`${apiUrl}/admin/createHouse`, 'POST', dataEnviar)
            toast.success('¡Vivienda creada correctamente!');
            return true;

        } catch (err) {
            toast.error(err.message || "Error al crear la vivienda");
            return false;
        }
    }

    // try {
    //     const respuesta = await fetch('http://localhost:4001/api/admin/createHouse', {
    //         method: 'POST',
    //         body: data,
    //         credentials: 'include' // Para que Back sepa quien eres (por la cookie)
    //     });

    //     const respuestaData = await respuesta.json();

    //     if (respuesta.ok) {
    //         toast.success('¡Vivienda creada correctamente!');
    //         return true;

    //     } else { // Aquí cogemos el error enviado desde el back
    //         const errorMsg = respuestaData.msg || "Error al crear la vivienda";
    //         toast.error(errorMsg); // Muestra el mnsje del check específico
    //         return false;
    //     }

    // } catch (error) {
    //     console.log(error);
    //     setError("Error de conexión al crear la vivienda");
    //     toast.error("Error de conexión");

    // } finally {
    //     setLoading(false);
    // }
    //};

    // FUNCIÓN PARA ELIMINAR (DELETE)
    const deleteHouse = async (id) => {
        try {
            await consultaFetch(`${apiUrl}/admin/deleteHouse/${id}`, 'DELETE')
            toast.success('Vivienda eliminada correctamente');
            return true;

        } catch (err) {
            toast.error(err.message || "Error al eliminar");
            return false;
        }
    };

    // FUNCIÓN PARA EDITAR (PUT)
    const editHouse = async (id, formData, selectedFiles) => {
        try {
            const dataEnviar = new FormData();
            // Pasamos los campos de texto
            Object.keys(formData).forEach(key => {
                // IMPORTANTE: imagenesRestantes es un array de URLs (strings)
                // Pasar a JSON para que llegue íntegro al Backend
                if (key === 'imagenesRestantes') {
                    dataEnviar.append(key, JSON.stringify(formData[key]));
                } else {
                    dataEnviar.append(key, formData[key]);
                }
            });

            // Pasar las fotos nuevas si las hay
            if (selectedFiles && selectedFiles.length > 0) {
                selectedFiles.forEach(file => {
                    dataEnviar.append('imagenes', file);
                });
            }

            await consultaFetch(`${apiUrl}/admin/editHouse/${id}`, 'PUT', dataEnviar);
            toast.success('Vivienda actualizada correctamente');
            return true;

        } catch (err) {
            toast.error(err.message || "Error al editar");
            return false;
        }
    };

    // EXPORTAR las herramientas para que las pags las usen
    return {
        createHouse,
        deleteHouse,
        editHouse,
        loading,
        error,
        data
    };
};