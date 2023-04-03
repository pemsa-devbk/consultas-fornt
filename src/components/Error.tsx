import React from 'react'
import { hanldeError } from '../utilities/hanldeError';

interface Props{
    error: any;
}
export const Error = ({error}:Props) => {
    const {code, error: textError} = hanldeError(error);
    
  return (
    <div className='content'>
      <div className='codeHttp'>
        <h2 className='codeHttp-title'>{code}</h2>
        <p className='codeHttp-subtitle-1'>Ocurrio un error....</p>
        <p className='codeHttp-subtitle-2'>Consulte con su proveedor</p>
        <p className='codeHttp-subtitle-3'>{textError}</p>

      </div>
    </div>
  )
}
