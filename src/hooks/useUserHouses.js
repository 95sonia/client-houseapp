import { useState } from 'react';
import toast from 'react-hot-toast';
import { useFetch } from './useFetch';
const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const useUserHouses = () => {
    // FUNCIÓN PARA AÑADIR FAVORITOS

    const { loading, error, consultaFetch } = useFetch(); //extraer las herramientas del useFetch
    const addFavorito = async (houseId) => {
        try {
            // Usamos tu consultaFetch universal
            const data = await consultaFetch(`${apiUrl}/user/favoritos/${houseId}`, 'POST');

            // Si llega aquI, es que respuesta.ok true
            toast.success(data.msg || "Vivienda añadida a favoritos");
            return true;
        } catch (err) {
            // El error ya fue capturado y relanzado por useFetch
            console.log(err)
            toast.error(err.message); // Opcional
            return false;
        }
    };




    // ELIMINAR FAVORITO
    const deleteFavorito = async (houseId) => {
        try {
            const data = await consultaFetch(`${apiUrl}/user/favoritos/${houseId}`, 'DELETE');
            toast.success(data.msg || "Eliminado de favoritos");
            return true;
        } catch (err) {
            console.log(err)
            return false;
        }
    };

    // Para decidir si añadir o quitar de favs
    const toggleFavorito = async (houseId, esFavoritoYa) => {
        if (esFavoritoYa) {
            return await deleteFavorito(houseId);
        } else {
            return await addFavorito(houseId);
        }
    };

    // RESERVAR UNA CASA
    const reservarHouse = async (houseId, reservaData) => {
        try {
            // pasar reservaData como el body
            const data = await consultaFetch(
                `${apiUrl}/user/reservar/${houseId}`,
                'POST',
                reservaData
            );

            toast.success(data.msg || "Reserva realizada con éxito");
            return true;
        } catch (err) {
            toast.error(err.message || "Error al realizar la reserva");
            return false;
        }
    };
    // setLoading(true);
    // try {
    //     const respuesta = await fetch(`http://localhost:4001/user/reservar/${houseId}`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(reservaData),
    //         credentials: 'include'
    //     });
    //     const data = await respuesta.json();

    //     if (respuesta.ok) {
    //         toast.success(data.msg);
    //         return true;
    //     } else {
    //         toast.error(data.msg || "No se pudo realizar la reserva");
    //         return false;
    //     }
    // } catch (err) {
    //     toast.error("Error de conexión");
    //     return false;
    // } finally {
    //     setLoading(false);
    // }


    return {
        addFavorito,
        deleteFavorito,
        toggleFavorito,
        reservarHouse,
        loading,
        error
    };
};