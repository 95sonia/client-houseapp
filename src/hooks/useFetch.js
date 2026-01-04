import { useState, useEffect } from 'react'

export const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Funcion para pedir los datos al back:
    const consultaFetch = async () => {
        try {
            setLoading(true);
            const respuesta = await fetch(url, {
                credentials: 'include' // para las HttpOnly Cookies
            });

            if (!respuesta.ok) {
                throw new Error("Error en la petición");
            }
            const datos = await respuesta.json();
            setData(datos);
            setLoading(false);

        } catch (error) {
            console.error("Error al consultar la API:", error);
            setLoading(false);
        }
    };

    //useEffect solo se ejecuta una vez al montar el componente
    useEffect(() => {
        consultaFetch();
    }, [url]); // Si URL cambia -> vuelve a pedir los datos

    // Retornar todo lo necesario y función para que el Provider pueda usarla
    return { data, loading, error, consultaFetch };
};

