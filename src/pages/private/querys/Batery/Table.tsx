import React, { useState } from 'react'
import { useBatery, useQueryStore } from '../../../../hooks';
import { AccountBatery, StateBatery } from '../../../../models';
import Icons from '../../../../assets/icons.svg'

export const Table = () => {
    const { accounts, type } = useQueryStore();
    const { data } = useBatery({ typeAccount: type, accounts });
    const [state, setState] = useState<string[]>(['with-out', 'with-restore', 'with-error']);
    const [textSearch, setTextSearch] = useState('');

    const filterWithOut = (account: AccountBatery) => {
        if (state.includes('with-out')) {
            return account.estado === StateBatery.WITHOUT;
        }
        return false;
    }
    const filterRestore = (account: AccountBatery) => {
        if (state.includes('with-restore')) {
            return account.estado === StateBatery.RESTORE;
        }
        return false;
    }
    const filterError = (account: AccountBatery) => {
        if (state.includes('with-error')) {
            return account.estado === StateBatery.ERROR;
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

    const filterName = (account: AccountBatery) => {
        return account.nombre.toLowerCase().includes(textSearch.toLowerCase());
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
                        className={`button-icon button-small open ${state.includes('with-out') && 'active'}`}
                        onClick={() => changeState('with-out')}
                    >
                        <svg className={`icon`}>
                            <use xlinkHref={`${Icons}#icon-check`}></use>
                        </svg>
                        
                    </button>
                    <button
                        className={`button-icon button-small without ${state.includes('with-restore') && 'active'}`}
                        onClick={() => changeState('with-restore')}
                    >
                        <svg className={`icon`}>
                            <use xlinkHref={`${Icons}#icon-alert-triangle`}></use>
                        </svg>
                    </button>
                    <button
                        className={`button-icon button-small close ${state.includes('with-error') && 'active'}`}
                        onClick={() => changeState('with-error')}
                    >
                        <svg className={`icon`}>
                            <use xlinkHref={`${Icons}#icon-alert-circle`}></use>
                        </svg>
                    </button>

                </div>
            </div>

            <div className='table-view-max'>
                <table >
                    <thead id='table-batery'>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Eventos recibidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data!.cuentas.filter(account => filterName(account) && (filterError(account) || filterRestore(account) || filterWithOut(account))).map((account, idx) => (
                                <tr key={idx}>
                                    <td data-label="#">{idx+1}</td>
                                    <td data-label="Nombre">{account.nombre}</td>
                                    <td data-label="Estado" className={
                                        (account.estado === StateBatery.WITHOUT)
                                            ?
                                            'state open'
                                            :
                                            (account.estado === StateBatery.RESTORE)
                                                ?
                                                'state sn'
                                                :
                                                'state close'
                                    }>
                                        {
                                            (account.estado === StateBatery.WITHOUT)
                                                ?
                                                'Sin eventos'
                                                :
                                                (account.estado === StateBatery.RESTORE)
                                                    ?
                                                    'Con restaure'
                                                    :
                                                    'Sin Restaure'

                                        }
                                    </td>
                                    <td data-label="Eventos recibidos">{account.numeroEventos}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
