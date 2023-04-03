import React, { useRef } from 'react'
import Icons from '../assets/icons.svg';

interface List{
    icon: string;
    action: () => void;
    text: string;
    hide?: boolean;
}
interface Props{
    lists: List[]
}

export const FloatButton = ({lists}:Props) => {

    const btnFloat = useRef<HTMLDivElement>(null);

    const hanldeBtnFloat = () => {
        btnFloat.current?.classList.toggle('active');
    }

    return (
        <div className='btn-float' ref={btnFloat} onClick={hanldeBtnFloat}>
            <span>+</span>
            <ul>
                {
                    lists.filter(li => !li.hide).map( (li, idx) => (
                        <li onClick={() => li.action()} key={idx}>
                            <svg className='icon'>
                                <use xlinkHref={`${Icons}#icon-${li.icon}`}></use>
                            </svg>
                            {li.text}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
