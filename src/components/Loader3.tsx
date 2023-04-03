import React from 'react'
type Center = 'F' | 'P'

interface Props {
    center: Center
}

export const Loader3 = ({ center }: Props) => {
    return (
        <div
            className={`center center-width center-height ${(center == 'F') ? 'container-fw container-fh' : 'container-fph container-fpw'}`}
        >
            <div className='load'>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
            </div>
        </div>
    )
}
