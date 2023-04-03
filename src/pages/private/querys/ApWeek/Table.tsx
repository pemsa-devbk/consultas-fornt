import React from 'react'
import { useApCiWeek, useQueryStore } from '../../../../hooks';
import {ApCi} from './ApCi';

export const Table = () => {
    const { accounts, type } = useQueryStore();
    const { data } = useApCiWeek({ typeAccount: type, accounts });
    return (
        <div className='table-dropup'>
            <div className='table-content scroll scroll__x scroll__y'>
                <table>
                    <thead id='table-details'>

                        <tr>
                            <th colSpan={2}></th>
                            {
                                data?.fechas.map(date => (
                                    <th colSpan={2} key={`${date}-full`}>
                                        {date}
                                    </th>
                                ))
                            }
                        </tr>

                        <tr>
                            <th colSpan={2}></th>
                            {
                                data?.fechas.map(date => (
                                    <th colSpan={2} key={`${date}-day-week`}>
                                        {
                                            new Date(Date.UTC(Number(date.split('-')[0]), Number(date.split('-')[1]) - 1, Number(date.split('-')[2]) + 1)).toLocaleString(undefined, { weekday: 'long' }).toString()
                                        }
                                    </th>
                                ))
                            }
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Ap</th>
                            <th>Ci</th>
                            <th>Ap</th>
                            <th>Ci</th>
                            <th>Ap</th>
                            <th>Ci</th>
                            <th>Ap</th>
                            <th>Ci</th>
                            <th>Ap</th>
                            <th>Ci</th>
                            <th>Ap</th>
                            <th>Ci</th>
                            <th>Ap</th>
                            <th>Ci</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.cuentas.map((account, idx) => (
                                <tr key={`${account.CodigoCte}-${idx}`}>
                                    <td>{idx + 1}</td>
                                    <td>{account.Nombre}</td>

                                    {
                                        data.fechas.map((date,i) => (
                                        <ApCi key={`${date}-${idx}-${i}`} account={account} date={date}/>
                                        ))
                                    }

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
