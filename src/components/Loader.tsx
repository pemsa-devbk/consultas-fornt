import React from 'react'
type Center = 'F' | 'P'

interface Props{
    center: Center
}
export const Loader = ({center }:Props) => {
    
    return (
        <div 
            className={`center center-width center-height ${(center == 'F') ? 'container-fw container-fh' :'container-fph container-fpw'}`}
        >
            <div className='loader'>
                <div className='ring'></div>
                <div className='ring'></div>
                <div className='ring'></div>
                {/* <span className='loading-txt'>
                    {
                        showMessage ?
                            'Cargando...'
                            :''
                    }
                </span> */}
            </div>
        </div>
    )
}
