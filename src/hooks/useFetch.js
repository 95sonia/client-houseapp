import { useState, useEffect } from 'react';

export const useFetch = (urlInicial) => {
    //urlInicial es la que uso para traer todas las casas
    // la url de abajo es la que usamos para borrar, editar...para hacer las acciones
    //manejar los 3 estados comunes en cualquier app:
    const [data, setData] = useState(null); // cuando los datos han sido recibidos
    const [loading, setLoading] = useState(true); // mientras los datos se cargan
    const [error, setError] = useState(null); // si algo falla, red o servidor

    const consultaFetch = async (url, method = 'GET', body = null) => {
        //method = 'GET' es valor por defecto si no pones nada, NO para que siempre lo sea
        try {
            setLoading(true); // poner el estado de carga antes de hacer la petición
            setError(null);
            const options = {
                method,
                credentials: 'include', // para las HttpOnly Cookies
                //headers: {} Le dicen al servidor qué tipo de datos estás enviando (por ej:  "Content-type": "application/json; charset=UTF-8")
            };
            // Condicional xq para enviar img usamos data = formData en vez de body
            if (body) { // Si hay body y ES formData (imágenes), solo pasamos el body. El navegador pondrá el Content-Type solo
                if (body instanceof FormData) {
                    options.body = body;
                } else { // Si es un obj normal, sí ponemos el header de JSON
                    options.headers = { "Content-Type": "application/json; charset=UTF-8" };
                    options.body = JSON.stringify(body);
                }
            }

            //Hacer peticición FETCH y esperar la respuesta 
            const respuesta = await fetch(url, options);
            //Si la respuesta es exitosa devolver datos en formato json y esperar su resolución = PARSEAR la respuesta
            const datos = await respuesta.json();

            // Si la respuesta es errónea
            if (!respuesta.ok) {
                throw new Error(datos.msg || 'Error en la petición fetch')
            };

            setData(datos);  // Guardar los datos recibidos en el estado
            return datos;
                
            // Si algo falla -> capturar error y mostrar con catch
        } catch (error) {
            console.log('Error al consultar API', error);
            setError(error.message);
            throw error; // Relanza error para q useAdminHouses lo capture en su propio catch
        } finally { // terminar estado de carga cuando la petición termina
            setLoading(false);
        }
    }
    //useEffect solo se ejecuta una vez al montar el componente
    useEffect(() => { //para peticiones GET que carguen autom/ fotos
        if (urlInicial) {
            consultaFetch(urlInicial, 'GET');// Si URL cambia -> vuelve a pedir los datos
        }
    }, [urlInicial]);

    // Retornar todo lo necesario y función para que el Provider pueda usarla
    return {
        data,
        loading,
        error,
        consultaFetch
    };
};

//Funcion para pedir los datos al back (la cambio porque Hector me dice que meta un condicional)
// const consultaFetch = async () => {
//     try {
//         setLoading(true);
//         const respuesta = await fetch(url, {
//             credentials: 'include' // para las HttpOnly Cookies
//         });

//         if (!respuesta.ok) {
//             throw new Error("Error en la petición");
//         }
//         const datos = await respuesta.json();
//         setData(datos);
//         setLoading(false);

//     } catch (error) {
//         console.error("Error al consultar la API:", error);
//         setLoading(false);
//     }
// };