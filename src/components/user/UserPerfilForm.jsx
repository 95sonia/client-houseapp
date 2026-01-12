import React from 'react'

export const UserPerfilForm = () => {

  return (
    <>
      <h2>Componente formulario perfil usuario</h2>
      <form className='userperfil-form'>

        <label >Nombre</label>
        {/*EN CADA INPUT HAY QUE PONER value={formData.nombre} por ejemplo */}
        <input type="text" id="nombre" name="nombre" /*{value={'Probando...'} onChange={'Funcion que maneje el cambio'}}*/ />

        <label >Dirección</label>
        {/*EN CADA INPUT HAY QUE PONER value={formData.nombre} por ejemplo */}
        <input type="text" id="direccion" name="direccion" /*{value={'Probando...'} onChange={'Funcion que maneje el cambio'}}*/ />

        <label >Fecha de nacimiento</label>
        {/*EN CADA INPUT HAY QUE PONER value={formData.nombre} por ejemplo */}
        <input type="date" id="fechaNacimiento" name="fechaNacimiento" /*{value={'Probando...'} onChange={'Funcion que maneje el cambio'}}*/ />

        <label >Email</label>
        <input type="email" id="email" name="email" /*{value={'Probando...'} onChange={'Funcion que maneje el cambio'}}*/ />

        <label >Teléfono</label>
        <input type="tel" id="telefono" name="telefono" /*{value={'Probando...'} onChange={'Funcion que maneje el cambio'}}*/ />

        {/* Solo se muestra si el Hook detecta un error del backend 
   {error && <p className="error-msg">{error}</p>}*/}
        <button type="submit" className="btn-submit">Guardar cambios</button>

      </form>
    </>
  )
}
