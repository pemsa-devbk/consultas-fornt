import React, { useState } from 'react'
import { Loader } from '../../../../components/Loader';
import { useIndividualAccounts } from '../../../../hooks/accounts';
import Icons from '../../../../assets/icons.svg'
import { IndividualAccount } from '../../../../models';


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

export const MyIndividualList = ({ accounts, addAccount }: Props) => {
    const { data, isLoading, isError } = useIndividualAccounts();
    const [textSearch, setTextSearch] = useState('');

    const filterName = (account: IndividualAccount) => {
        return account.Nombre.toLowerCase().includes(textSearch.toLowerCase());
    }

    return (
        <>

            <div className='list-header'>
                <h3 className='list-title'>
                    Cuentas individuales
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
                    <Loader  center='F'/>
                    :
                    isError
                        ?
                        <div className='list__error'>
                            <p>Error al cargar las cuentas</p>
                        </div>
                        :
                    <div className='items-container'>
                        {
                            data?.filter(account => !accounts.find(ac => ac.Codigo === Number(account.CodigoCte) && ac.Tipo === 1) && (filterName(account))).map((account, idx) => (
                                <div className='list-item' key={`${idx}-account-login`} >
                                    <div
                                        className='list-item__icon add'
                                        onClick={() => addAccount({
                                            Abonado: account.CodigoAbonado,
                                            Codigo: Number(account.CodigoCte),
                                            Nombre: account.Nombre,
                                            Tipo: 1
                                        })}
                                    >
                                        <svg className={`side-nav__icon`}>
                                            <use xlinkHref={`${Icons}#icon-plus-outline`}></use>
                                        </svg>
                                    </div>
                                    <div className='list-item__right'>
                                        <div className='info'>
                                            <h3>{account.Nombre}</h3>
                                            <small className='text-muted'>Cuenta individual</small>
                                        </div>
                                        <h3>{account.CodigoAbonado}</h3>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
            }
        </>
    )
}
