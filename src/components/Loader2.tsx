import React from 'react'
type Center = 'F' | 'P'

interface Props {
    center: Center
}

export const Loader2 = ({ center }: Props) => {
    return (
        <div
            className={`center center-width center-height ${(center == 'F') ? 'container-fw container-fh' : 'container-fph container-fpw'}`}
        >
            <div className='loading'>
                <div className="circle_1"></div>
                <div className="circle_2"></div>
                <div className="circle_3"></div>
                <div className="circle_4"></div>
            </div>

        </div>
    )
}
