# HouseApp Client - Frontend React

Este es el **frontend de la aplicación HouseApp**, una web app construída en React para interactuar con el backend de reservas de viviendas vacacionales. Permite a usuarios explorar casas, ver detalles, guardar favoritos, reservar y gestionar su perfil. El administrador puede gestionar las viviendas, las reservas y los usuarios.

## Características principales

* Interfaz para exploración de viviendas.
* **Autenticación** con tokens JWT guardados en **cookies** y manejo de roles (admin / user).
* **Favoritos**: los usuarios pueden guardar casas que les interesan.
* **Reservas**: permite a usuarios realizar reservas indicando fechas e invitados.
* **Panel de administración**: gestión completa de casas, reservas y usuarios.
* Integración con el backend via API REST.

## Tecnologías utilizadas

* **React**: Biblioteca principal para construir interfaces de usuario.
* **React Router v6**: Para manejo de rutas.
* **Vite**: Herramienta para crear y servir la app con desarrollo rápido.
* **useFetch (custom)**: Para realizar llamadas a la API.
* **Context API**: Para gestionar autenticación y estado global.
* **Custom Hooks**: Para lógica reutilizable (fetch, auth, etc.)
* **React Image Gallery**: Para mostrar galería de imágenes de forma elegante.
* **SCSS**: Estilos modulares con Sass.

## Instalación y puesta en marcha

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/95sonia/client-houseapp.git
   cd client-houseapp

2. **Instalar dependencias:**
    ```bash
    yarn install

3. **Configurar variables de entorno:**

    Esta variable indica la URL base donde está desplegado tu backend.
    En desarrollo puedes usar http://localhost:4001 o el puerto configurado en tu backend.
    ```bash
    VITE_API_URL_BASE=

4. **Ejecutar la app en modo desarrollo:**
    ```bash
    yarn dev

La aplicación estará disponible por defecto en: http://localhost:5173

Desarrollado por Sonia N.M. - Enero 2026

