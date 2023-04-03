import React from 'react'
import { useApCi, useQueryStore } from '../../../../hooks';
import Icons from '../../../../assets/icons.svg'

export const Table = () => {
    const { accounts, type, dateEnd, dateStart } = useQueryStore();
    const { data} = useApCi({ typeAccount: type, accounts, dateStart, dateEnd });
    return (
        <>
        {
            data?.cuentas.map((account,idx) => (
                <div className='table-dropup' key={account.CodigoCte}>
                    
                    {
                        (data.cuentas.length > 1)
                        &&
                        <>
                            <input id={`${account.CodigoCte}-${idx}`} className='dp' type="checkbox" />
                            <label className='collapse-table' htmlFor={`${account.CodigoCte}-${idx}`}>
                                <svg className={`icon`}>
                                    <use xlinkHref={`${Icons}#icon-chevrons-down`}></use>
                                </svg>
                            </label>
                        </>
                    }

                    <div className='table-content scroll scroll__x scroll__y'>
                        <table>
                            <thead className='table-details'>
                                <tr>
                                    <th colSpan={7}>{account.Nombre}</th>
                                </tr>
                                <tr>
                                    <th colSpan={7}>{account.Direccion}</th>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Partición</th>
                                    <th>Evento</th>
                                    <th>N Usuario</th>
                                    <th>Nombre de usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    account.eventos?.map((event, idx) => (
                                        <tr key={`${account.CodigoCte}-${event.FechaOriginal}-${event.Hora}-${idx}`}>
                                            <td>{idx + 1}</td>
                                            <td>{event.FechaOriginal}</td>
                                            <td>{event.Hora}</td>
                                            <td>{event.Particion}</td>
                                            <td>{event.DescripcionEvent}</td>
                                            <td>{event.CodigoUsuario}</td>
                                            <td>{event.NombreUsuario}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            ))
        }
        </>
    )
}
