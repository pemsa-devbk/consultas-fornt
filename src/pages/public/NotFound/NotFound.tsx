import React from 'react'
import { NavLink } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='content'>
      <div className='codeHttp'>
        <h2 className='codeHttp-title'>404</h2>
        <p className='codeHttp-subtitle-1'>La pagina no fue encontrada....</p>
        <p className='codeHttp-subtitle-2'>El enlace puede ser incorrecto...</p>
        <p className='codeHttp-subtitle-3'>o la pagina fue eliminada</p>
        <NavLink to="/" className='button button-primary button-med'>Regresar</NavLink>
      </div>
    </div>
  )
}
