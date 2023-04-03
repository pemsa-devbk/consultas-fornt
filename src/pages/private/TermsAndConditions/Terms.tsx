import React from 'react'

interface Props{
    setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const Terms = ( {setPage}: Props) => {
  return (
    <>
          <div className='box__title'>
            <h2>Términos y condiciones</h2>
          </div>
          <div className='box__content'>
            <p>Es obligación del usuario de la aplicación, así como del titular respectivo, informar cambios en el personal que emplea la aplicación, notificando altas y bajas de manera oportuna.</p>
            <p>
              La información proporcionada por la aplicación es de uso exclusivo para el usuario y PEMSA no es responsable del uso que dicho usuario haga de la información consultada.
            </p>
            <p>
              El acceso a la información para la consulta del cliente es independiente a la información resguarda en los servidores de PEMSA, y la falta de acceso a la misma no exime de ninguna manera al cliente del pago por el monitoreo de su sistema de alarma en adición a cualquier otro servicio contratado u obligaciones adquiridas con PEMSA.
            </p>
            <p>
              Para acceder a la aplicación se requiere de un registro previo con el formato correspondiente por parte del titular a el cual solicitará por conducto de su asesor comercial.
            </p>
            <p>
              PEMSA se reserva el derecho de brindar o denegar autorización de usuarios y titulares para el uso de su plataforma.
            </p>
            <p>
              La aplicación puede ser sometida a actualizaciones sin previo aviso.</p>
          </div>
          <div className='box__actions'>
              <button 
                className='button button-primary button-small'
                  onClick={() => setPage((lastPage) => lastPage + 1)}
            >
                Aviso de privacidad
            </button>
          </div>
    </>
  )
}
