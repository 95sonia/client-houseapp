import React from 'react'
import { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AuthContext } from '../../context/AuthContext'; // Para saber rol
import { useUserHouses } from '../../hooks/useUserHouses';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import { UserNavbar } from '../../components/user/UserNavbar';
// falta public navbar


export const HouseDetailsPage = () => {

  // Traemos datos y contextos
  const { houses } = useContext(AdminContext);
  const { user } = useContext(AuthContext); // user.role es admin o user
  const { addFavorito, reservarHouse } = useUserHouses();

  // Buscar la casa
  const house = houses.find(casa => casa._id === id);
  if (!house) return <p>Cargando detalles de la vivienda...</p>;

  return (
    <>
      <h1>AQUÍ ESTAN LOS DETALLES DE UNA CASA</h1>
      <p>Inicia sesión o Regístrate para reservar la vivienda</p>

      <div>
        {/*METER EN NAVBAR SEGUN EL ROL O SI ES PUBLIC ..   !user ? ---> Si NO hay usuario (usuario es null o undefined)"*/}
        {!user ? <NavPublic /> : user.role === 'admin' ? <AdminNavbar /> : <UserNavbar />}

        <section>
          {/*IMÁGENES DE LA CASA */}
        </section>

        <section>
          {/*INFO DE LA CASA */}
        </section>


        <section>
          {/*BOTONES CONDICIONALES: EDITAR ADMIN, GUARDAR FAVORITO Y RESERVAR USER, PUBLIC NINGUN BOTON */}
          {/*Condicional con estructura: 
          user?.role === 'admin' && . meter los botones que quieras dentro y dentro la funcion onClick={() => addFavorito(id) por ej o el navigate a una ruta*/}
          Condicionales con estructura:
          {user?.role === 'admin' && (<button>  </button>)}

          {user?.role === 'user' && (<button>  </button>)}
        </section>


      </div>
    </>
  )
}
