import React, { useState } from 'react'
import { useAlarm, useQueryStore } from '../../../../hooks';
import Icons from '../../../../assets/icons.svg'
import { Event } from '../../../../models/account-event.model';




export const Table = () => {
    const { accounts, type, dateEnd, dateStart } = useQueryStore();
    const { data } = useAlarm({ typeAccount: type, accounts, dateStart, dateEnd });
    const [state, setState] = useState<string[]>(['apci', 'alarm', 'test', 'batery', 'other']);

    const filterApci = (event: Event) => {
        if (state.includes('apci')) {
            return ["C", "CS", "O", "OS", "UR11", "US11"].includes(event.CodigoAlarma)
        }
        return false
    }
    const filterAlarm = (event: Event) => {
        if (state.includes('alarm')) {
            return ["A", "ACZ", "ASA", "ATR", "CPA", "FIRE", "GA", "P", "SAS", "SMOKE", "VE"].includes(event.CodigoAlarma)
        }
        return false
    }
    const filterTest = (event: Event) => {
        if (state.includes('test')) {
            return ["AGT", "AT", "ATP", "AUT", "TST", "TST0", "TST1", "TST3", "TSTR", "TX0"].includes(event.CodigoAlarma)
        }
        return false
    }
    const filterBatery = (event: Event) => {
        if (state.includes('batery')) {
            return ["BB"].includes(event.CodigoAlarma)
        }
        return false
    }

    const filterOther = (event: Event) => {
        if (state.includes('other')) {
            return ['1381', "24H", "ACR", "BPS", "CAS", "CN", "CTB", "ET*", "FC*", "FCA", "FT", "FT*", "IA*", "MED", "PA", "PAF", "PR", "PRB", "RAS", "REB", "RES", "RFC", "RON", "S99", "STL", "SUP", "TAM", "TB", "TEL", "TESE", "TESS", "TPL", "TRB"].includes(event.CodigoAlarma)
        }
        return false
    }

    const changeState = (filter: string) => {
        if (state.includes(filter)) {
            setState(() => state.filter(st => st !== filter));
        } else {
            setState(() => [...state, filter])
        }
    }

    return (
        <>
            {
                (data?.cuentas.length === 1) &&
                <div className='table-search'>
                    <div></div>
                    <div className='filters'>
                        <button
                            className={`button-icon button-small open ${state.includes('apci') && 'active'}`}
                            onClick={() => changeState('apci')}
                        >
                            <svg className={`icon`}>
                                <use xlinkHref={`${Icons}#icon-shield`}></use>
                            </svg>
                        </button>
                        <button
                            className={`button-icon button-small close ${state.includes('alarm') && 'active'}`}
                            onClick={() => changeState('alarm')}
                        >
                            <svg className={`icon`}>
                                <use xlinkHref={`${Icons}#icon-bell`}></use>
                            </svg>
                        </button>
                        <button
                            className={`button-icon button-small test ${state.includes('test') && 'active'}`}
                            onClick={() => changeState('test')}
                        >
                            <svg className={`icon`}>
                                <use xlinkHref={`${Icons}#icon-tool`}></use>
                            </svg>
                        </button>
                        <button
                            className={`button-icon button-small without ${state.includes('batery') && 'active'}`}
                            onClick={() => changeState('batery')}
                        >
                            <svg className={`icon`}>
                                <use xlinkHref={`${Icons}#icon-battery`}></use>
                            </svg>
                        </button>

                        <button
                            className={`button-icon button-small other ${state.includes('other') && 'active'}`}
                            onClick={() => changeState('other')}
                        >
                            <svg className={`icon`}>
                                <use xlinkHref={`${Icons}#icon-help-circle`}></use>
                            </svg>
                        </button>

                    </div>
                </div>
            }
            {
                data?.cuentas.map((account, idx) => (


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
                        <div className='table-content scroll scroll__x scroll__y' key={account.CodigoCte}>
                            <table>
                                <thead className='table-details'>
                                    <tr>
                                        <th colSpan={8}>{account.Nombre}</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={8}>{account.Direccion}</th>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Partición</th>
                                        <th>Evento</th>
                                        <th>N Usuario</th>
                                        <th>Zona</th>
                                        <th>Nombre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        account.eventos?.filter(ev => filterApci(ev) || filterAlarm(ev) || filterTest(ev) || filterBatery(ev) || filterOther(ev)).map((event, idx) => (
                                            <tr key={`${account.CodigoCte}-${idx}`}>
                                                <td>{idx + 1}</td>
                                                <td>{event.FechaOriginal}</td>
                                                <td>{event.Hora}</td>
                                                <td>{event.Particion}</td>
                                                <td>{event.DescripcionEvent}</td>
                                                <td>{event.CodigoUsuario}</td>
                                                <td>{event.CodigoZona}</td>
                                                <td>{event.NombreUsuario + event.DescripcionZona}</td>
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
