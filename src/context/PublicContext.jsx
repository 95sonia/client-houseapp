import React, { createContext } from 'react';
import { useFetch } from '../hooks/useFetch';

export const PublicContext = createContext();

export const PublicProvider = ({ children }) => {
    
    // Usar hook Fetch pasándole URL de las casas
    const { data, loading, error, consultaFetch } = useFetch('http://localhost:4001/home');

    //console.log("Datos que vienen del back:", data);     // para ver cómo se llama en back la data

    // Extraer array de casas de "data" (despues pongo .data porque asi lo he llamado en back)
    const houses = data?.data || [];

    return (
        <PublicContext.Provider value={{ houses, loading, error, consultaFetch }}>
            {children}
        </PublicContext.Provider>
    );
};