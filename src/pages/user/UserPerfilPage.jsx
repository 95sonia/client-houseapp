import React from 'react'
import { UserPerfilForm } from '../../components/user/UserPerfilForm'
import { Link } from 'react-router';

export const UserPerfilPage = () => {
  return (
    <>
      <h2>PERFIL DEL USUARIO</h2>

      {/*<button> <Link to='/user/perfil' > Editar </Link></button>
      No se si poner un botón que me redirija a editar despues de ver mis datos.
      El problema es que la ruta de ver y editar mi perfil es la misma...igual debería cambiarla
      O poner el formulario directamente.
      */}
      <UserPerfilForm />

    </>
  )
}
