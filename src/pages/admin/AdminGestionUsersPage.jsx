import '../../styles/AdminGestionUsers.scss'
import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import toast from 'react-hot-toast';
import { Pencil, Trash2 } from 'lucide-react'

const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const AdminGestionUsersPage = () => {
    const { loading, consultaFetch } = useFetch();
    const [usuarios, setUsuarios] = useState([]);

    const getUsuarios = async () => {
        try {
            const res = await consultaFetch(`${apiUrl}/admin/users`, 'GET');
            if (res?.ok) {
                setUsuarios(res.usuarios);
            }
        } catch (error) {
            toast.error("Error al cargar la lista de usuarios");
        }
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <div className="admin-container">
            <h1>Gestión de <span>Usuarios</span></h1>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((user) => (
                        <tr key={user._id}>
                            <td>{user.nombre}</td>
                            <td>{user.email}</td>
                            <td>{user.telefono || '---'}</td>
                            <td>
                                <span className={`badge ${user.role}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => console.log('Editar', user._id)}><Pencil /></button>
                                <button onClick={() => console.log('Borrar', user._id)}> <Trash2 /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};