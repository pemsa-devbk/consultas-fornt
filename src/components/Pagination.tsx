import React from 'react'
import Icons from '../assets/icons.svg';

interface Props {
    elements: number;
    setPager: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    showResults: number;
    nextPage: () => void;
    prevPage: () => void;

}
export const Pagination = ({ elements, page, setPager, showResults, nextPage, prevPage }: Props) => {
    const pags = Math.ceil(elements / showResults);
    
    let paginas = [];
    for (let index = 1; index <= pags; index++) {
        paginas.push(index)
    }

    return (
        <tfoot className='pagination'>
            <tr>
                <td colSpan={42}>
                    <div className='pagination__content'>
                        <span className='table-text'>Total de datos: {elements}</span>
                        <div className='pagination__pager'>
                            <span onClick={prevPage} className="element">
                                <svg className='icon'>
                                    <use xlinkHref={`${Icons}#icon-chevron-left`}></use>
                                </svg>
                            </span>
                            {
                                (pags <= 7)
                                    ?
                                    paginas.map((el, idx) => (
                                        <span
                                            key={idx}
                                            onClick={() => setPager(el)}
                                            className={(page === el) ? 'page active element' : ' element page'}
                                        >
                                            {el}
                                        </span>
                                    ))
                                    :
                                    (page <= 3)
                                        ?
                                        <>
                                            <span
                                                onClick={() => setPager(0)}
                                                className={(page === 0) ? 'page active element' : ' element page'}

                                            >
                                                1
                                            </span>
                                            <span onClick={() => setPager(1)} className={(page === 1) ? 'page active element' : ' element page'}>2</span>
                                            <span onClick={() => setPager(2)} className={(page === 2) ? 'page active element' : ' element page'}>3</span>
                                            <span onClick={() => setPager(3)} className={(page === 3) ? 'page active element' : ' element page'}>4</span>
                                            <span onClick={() => setPager(4)} className={(page === 4) ? 'page active element' : ' element page'}>5</span>
                                            <span className="element">...</span>
                                            <span onClick={() => setPager(pags)} className={(page === pags) ? 'page active element' : ' element page'}>{pags}</span>
                                        </>
                                        :
                                        ((page + 3) >= pags)
                                            ?
                                            <>
                                                <span className="page element" onClick={() => setPager(0)}>1</span>
                                                <span className="element">...</span>
                                                <span onClick={() => setPager(pags - 4)} className={(page === pags - 4) ? 'page active element' : ' element page'}>{pags - 4}</span>
                                                <span onClick={() => setPager(pags - 3)} className={(page === pags - 3) ? 'page active element' : ' element page'}>{pags - 3}</span>
                                                <span onClick={() => setPager(pags - 2)} className={(page === pags - 2) ? 'page active element' : ' element page'}>{pags - 2}</span>
                                                <span onClick={() => setPager(pags - 1)} className={(page === pags - 1) ? 'page active element' : ' element page'}>{pags - 1}</span>
                                                <span onClick={() => setPager(pags)} className={(page === pags) ? 'page active element' : ' element page'}>{pags}</span>
                                            </>
                                            :
                                            <>
                                                <span className="page element" onClick={() => setPager(1)}>1</span>
                                                <span className="element">...</span>
                                                <span className="page element" onClick={() => setPager(page - 1)}>{page - 1}</span>
                                                <span className="page element active" onClick={() => setPager(page)}>{page}</span>
                                                <span className="page element" onClick={() => setPager(page + 1)}>{page + 1}</span>
                                                <span className="element">...</span>
                                                <span className="page element" onClick={() => setPager(pags)}>{pags}</span>
                                            </>

                            }
                            <span onClick={nextPage} className="element">
                                <svg className='icon'>
                                    <use xlinkHref={`${Icons}#icon-chevron-right`}></use>
                                </svg>
                            </span>
                        </div>
                    </div>
                </td>

            </tr>
        </tfoot>
    )
}
