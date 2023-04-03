import React from 'react';
import Icons from '../assets/icons.svg';

interface Props {
    id: string;
    icon: string;
    classIcon: string;
    title: string;
    quantity: number;
    total: number;
    subTitle: string;
    showTotal?: boolean;
}

export const Insight = ({ id, icon, title, quantity, total, subTitle, classIcon, showTotal }: Props) => {
    return (
        <div className='insights__item' id={id}>
            <div className={`icon-content ${classIcon}`}>
                <svg className={`icon`}>
                    <use xlinkHref={`${Icons}#icon-${icon}`}></use>
                </svg>
            </div>
            <div className='middle'>
                <div className='left'>
                    <h3 className='middle-title'>{title}</h3>
                    <p className='middle-value'>{quantity}{showTotal ? `/${total}` : ''}</p>
                </div>
                <div className='progress'>
                    <svg viewBox='0 0 36 36' className='circular-chart orange'>
                        <path className="circle-bg"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                            strokeDasharray={`
                                    ${((quantity * 100) / total)}
                                    , 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <div className='number'>
                        <p>
                            {
                                ((quantity * 100) / total).toFixed(2) + '%'
                            }
                        </p>
                    </div>
                </div>
            </div>
            <small className='text-muted insights-description'>{subTitle}</small>
        </div>
    )
}
