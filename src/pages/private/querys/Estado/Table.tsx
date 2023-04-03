import React, { useState } from 'react'
import { useStateSuc } from '../../../../hooks/reports';
import { useQueryStore } from '../../../../hooks/useQueryStore';
import { AccountEvent } from '../../../../models';
import Icons from '../../../../assets/icons.svg'


export const Table = () => {
    const { accounts, type } = useQueryStore();
    const { data } = useStateSuc({ typeAccount: type, accounts });
    const [state, setState] = useState<string[]>(['open', 'close', 'without']);
    const [textSearch, setTextSearch] = useState('');

    const filterOpen = (accoutn: AccountEvent) => {
        if (state.includes('open')) {
            return accoutn.eventos?.find(ev => ['O', 'OS'].includes(ev.CodigoAlarma))
        }
        return false;
    }
    const filterClose = (accoutn: AccountEvent) => {
        if (state.includes('close')) {
            return accoutn.eventos?.find(ev => ['C', 'CS'].includes(ev.CodigoAlarma))
        }
        return false;
    }
    const filterWithOut = (accoutn: AccountEvent) => {
        if (state.includes('without')) {
            return accoutn.eventos ? false : true;
        }
        return false;
    }
    const changeState = (filter: string) => {
        if (state.includes(filter)) {
            setState(() => state.filter(st => st !== filter));
        } else {
            setState(() => [...state, filter])
        }
    }
    const filterName = (accoutn: AccountEvent) => {
        return accoutn.Nombre.toLowerCase().includes(textSearch.toLowerCase());
    }

    return (
        <>
            <h2 className='title-table'>Sucursales</h2>

            <div className='table-search'>
                <input
                    id='search-by-name'
                    type="text"
                    className='input-text'
                    placeholder='Buscar sucursal'
                    value={textSearch}
                    onChange={({ target }) => setTextSearch(target.value)}
                />
                <div className='filters'>
                    <button
                        className={`button-icon button-small open ${state.includes('open') && 'active'}`}
                        onClick={() => changeState('open')}
                    >
                        <svg className={`icon`}>
                            <use xlinkHref={`${Icons}#icon-unlock`}></use>
                        </svg>
                    </button>
                    <button
                        className={`button-icon button-small close ${state.includes('close') && 'active'}`}
                        onClick={() => changeState('close')}
                    >
                        <svg className={`icon`}>
                            <use xlinkHref={`${Icons}#icon-lock`}></use>
                        </svg>
                    </button>
                    <button
                        className={`button-icon button-small without ${state.includes('without') && 'active'}`}
                        onClick={() => changeState('without')}
                    >
                        <svg className={`icon`}>
                            <use xlinkHref={`${Icons}#icon-alert-triangle`}></use>
                        </svg>
                    </button>

                </div>
            </div>

            <div className='table-view-max'>
                <table >
                    <thead id='table-details'>
                        <tr>
                            <th>Abonado</th>
                            <th>Nombre</th>
                            <th>Fecha y Hora</th>
                            <th>Estado</th>
                            <th>Usuario</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.cuentas.filter(account => filterName(account) && (filterOpen(account) || filterClose(account) || filterWithOut(account))).map((accoutn, idx) => (
                                <tr key={`${accoutn.CodigoCte}-${idx}`}>
                                    <td data-label="Abonado">{accoutn.CodigoAbonado}</td>
                                    <td data-label="Nombre">{accoutn.Nombre}</td>
                                    <td data-label="Fecha y Hora">{accoutn.eventos ? accoutn.eventos[0].FechaOriginal + ' ' + accoutn.eventos[0].Hora.substring(0, 5) : '--'}</td>
                                    <td data-label="Estado"
                                        className={
                                            accoutn.eventos
                                                ? (['O', 'OS'].includes(accoutn.eventos[0].CodigoAlarma))
                                                    ?
                                                    'state open'
                                                    :
                                                    'state close'
                                                : 'state sn'

                                        }
                                    >
                                        {
                                            accoutn.eventos
                                                ? (['O', 'OS'].includes(accoutn.eventos[0].CodigoAlarma))
                                                    ?
                                                    'Abierto'
                                                    :
                                                    'Cerrado'
                                                : 'Sin Estado'}
                                    </td>
                                    <td data-label="usuario">{accoutn.eventos ? accoutn.eventos[0].NombreUsuario : '--'}</td>
                                    {/* <td data-label="" className='detail'>Detalles</td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div></>
    )
}
