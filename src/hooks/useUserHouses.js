import { useState } from 'react';
import toast from 'react-hot-toast';

export const useUserHouses = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // FUNCIÓN PARA AÑADIR FAVORITOS
    const addFavorito = async (houseId) => {
        setLoading(true);
        try {
            const respuesta = await fetch(`http://localhost:4001/api/user/favoritos/${houseId}`, {
                method: 'POST',
                credentials: 'include'
            });
            const data = await respuesta.json();

            if (respuesta.ok) {
                toast.success(data.msg); // "Añadido a favoritos" o "Eliminado"
                return true;
            } else {
                toast.error(data.msg || "Error al actualizar favorito");
                return false;
            }
        } catch (error) {
            toast.error("Error de conexión");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // ELIMINAR FAVORITO
    const deleteFavorito = async (houseId) => {
        setLoading(true);
        try {
            const respuesta = await fetch(`http://localhost:4001/api/user/favoritos/${houseId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await respuesta.json();

            if (respuesta.ok) {
                toast.success(data.msg);
                return true;
            } else {
                toast.error(data.msg || "Error al eliminar favorito");
                return false;
            }
        } catch (err) {
            toast.error("Error de conexión");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // RESERVAR UNA CASA
    const reservarHouse = async (houseId, reservaData) => {
        setLoading(true);
        try {
            const respuesta = await fetch(`http://localhost:4001/api/user/reservar/${houseId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservaData),
                credentials: 'include'
            });
            const data = await respuesta.json();

            if (respuesta.ok) {
                toast.success(data.msg);
                return true;
            } else {
                toast.error(data.msg || "No se pudo realizar la reserva");
                return false;
            }
        } catch (err) {
            toast.error("Error de conexión");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        addFavorito,
        addFavorito,
        deleteFavorito,
        reservarHouse,
        loading,
        error
    };
};