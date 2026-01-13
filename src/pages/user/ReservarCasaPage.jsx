import '../../styles/Auth.scss'
import React from 'react'
import { ReservaForm } from '../../components/user/ReservaForm'
import { useParams } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
//import '../../styles/ReservarCasaPage.scss';

const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const ReservarCasaPage = () => {
    // Obtener ID de la URL
    const { id } = useParams();

    //Traer datos de la casa para mostrar título y precio 
    const { data, loading } = useFetch(`${apiUrl}/user/house/${id}`);
    const house = data?.data;

    if (loading) return <p className="loading">Cargando datos de la vivienda...</p>;

    return (
        <main className="reservar-casa-wrapper">
            <div className="auth-card">
                <header className="reserva-header">
                    <h1>Reserva tu estancia en <span>{house?.titulo} </span></h1>
                    <p className="price-info">Precio por noche: {house?.precioNoche} €</p>
                </header>
                <section className="auth-content">
                {/*pasar id casa al Formulario para que sepa a qué URL disparar el POST*/}
                <ReservaForm houseId={id} />
                </section>
            </div>
        </main>
    );
};