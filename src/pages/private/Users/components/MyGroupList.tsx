import React, { useState } from 'react'
import { Loader } from '../../../../components/Loader';
import { useMyGroups } from '../../../../hooks/accounts';
import Icons from '../../../../assets/icons.svg'
import { GroupAccount } from '../../../../models';

interface AccountManager {
    Codigo: number;
    Abonado: string;
    Nombre: string;
    Tipo: number;
}
interface Props {
    accounts: AccountManager[];
    addAccount: (account: AccountManager) => void;
}
export const MyGroupList = ({ accounts, addAccount }: Props) => {
    const { data, isLoading, isError} = useMyGroups();
    const [textSearch, setTextSearch] = useState('');

    const filterName = (group: GroupAccount) => {
        return group.Nombre.toLowerCase().includes(textSearch.toLowerCase());
    }
    return (
        <>

            <div className='list-header'>
                <h3 className='list-title'>
                    Cuentas grupales
                </h3>
                <input
                    type="text"
                    placeholder='Buscar'
                    value={textSearch}
                    onChange={({ target }) => setTextSearch(target.value)}
                />
            </div>
            {
                isLoading
                    ?
                    <Loader center='P'/>
                    :
                    isError
                    ?
                    <div className='list__error'>
                        <p>Error al cargar las cuentas</p>
                    </div>
                    :
                    <div className='items-container'>
                        {
                            data?.filter(group => !accounts.find(ac => ac.Codigo === group.Codigo && ac.Tipo === group.Tipo) && (filterName(group))).map((group, idx) => (
                                <div className='list-item' key={`${idx}-group-login`}>
                                    <div
                                        className='list-item__icon add'
                                        onClick={() => addAccount({
                                            Abonado: '',
                                            Codigo: group.Codigo,
                                            Nombre: group.Nombre,
                                            Tipo: group.Tipo
                                        })}
                                    >
                                        <svg className={`side-nav__icon`}>
                                            <use xlinkHref={`${Icons}#icon-plus-outline`}></use>
                                        </svg>
                                    </div>
                                    <div className='list-item__right'>
                                        <div className='info'>
                                            <h3>{group.Nombre}</h3>
                                            <small className='text-muted'>Cuenta grupal</small>
                                        </div>
                                        <h3></h3>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </>
    )
}
