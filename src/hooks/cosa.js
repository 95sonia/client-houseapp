//Cómo se hace un fetch
fetch(url, {
    method: 'POST',
    body: data,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
    credentials: 'include'

})

// Condicional para hacer fetch
const consultaFetch = async (url, data, method = 'GET') => {

    try {
        let options;
        if (method === 'POST' || method === 'PUT') {
            options = {
                method,
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                credentials: 'include' // para las HttpOnly Cookies

            }
        } else if (method === 'GET' || method === 'DELETE') {
            options = {
                method,
                credentials: 'include'
            }
        }
        const respuesta = await fetch(url, options)
        // Si la respuesta es errónea
        //Si la respuesta es exitosa devolver datos en formato json 
        // Si algo falla -> capturar error y mostrar con catch
        // terminar estado de carga cuando la petición termina

    } catch (error) {
        console.log(error)
    }
}


