import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAccountsForUser, useHanldeAccounts } from '../../../hooks/accounts';
import { MyGroupList } from './components/MyGroupList';
import { MyIndividualList } from './components/MyIndividualList';
import Icons from '../../../assets/icons.svg'
import { Error } from '../../../components/Error';
import { Loader3 } from '../../../components/Loader3';

interface AccountManager {
    Codigo: number;
    Abonado: string;
    Nombre: string;
    Tipo: number;
}
export const UserAccounts = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, error } = useAccountsForUser(id || '');
    const [accounts, setAccounts] = useState<AccountManager[]>([]);
    const {mutate: hanldeAccounts} = useHanldeAccounts(id || '');

    const deleteAccount = (account: AccountManager) => {
        setAccounts( (old) => old.filter( acc => !(acc.Codigo === account.Codigo && acc.Tipo === account.Tipo)))
    }

    const addAccount = (account: AccountManager) => {
        if(accounts.find( acc => ( acc.Codigo === account.Codigo && acc.Tipo === account.Tipo))) return;
        setAccounts ( (old) => [...old, account])
    }

    const saveChanges = () => {
        hanldeAccounts({id: id!, accounts: accounts.map( acc => ({idAccount: acc.Codigo, typeAccount: acc.Tipo}))})
    }
    
    useEffect(() => {
      if(data){
        setAccounts( [...data.accounts.map( account => ({
            Codigo: Number(account.CodigoCte),
            Abonado: account.CodigoAbonado,
            Nombre: account.Nombre,
            Tipo: 1
        })), ...data.groups.map( group => ({
            Codigo: group.Codigo,
            Abonado: '',
            Nombre: group.Nombre,
            Tipo: group.Tipo
        }))])
      }
    }, [data])
    
    return (
        <>
            {
                isLoading
                    ?
                    <Loader3 center='P'/>
                    :
                    isError
                    ?
                    <Error  error={error}/>
                    :
                    <div className='content'>
                        <div className='title-content'>
                            <h1>Usuario: {data?.user.fullName}</h1>

                        </div>

                        <div className='button-save'>
                            <button onClick={() => saveChanges()}>Guardar cambios</button>
                        </div>

                        <div className='multi-list'>
                            <div className='list'>
                                <div className='list-header'>
                                    <h3 className='list-title'>
                                        Cuentas usuario
                                    </h3>
                                    <input type="text" placeholder='Buscar' />
                                </div>
                                <div className='items-container'>
                                    {
                                        accounts.map( (account, idx) => (
                                            <div className='list-item' key={`${idx}-user-accounts`}>
                                                <div className='list-item__icon delete' onClick={() => deleteAccount(account)}>
                                                    <svg className={`side-nav__icon`}>
                                                        <use xlinkHref={`${Icons}#icon-minus-outline`}></use>
                                                    </svg>
                                                </div>
                                                <div className='list-item__right'>
                                                    <div className='info'>
                                                        <h3>{account.Nombre}</h3>
                                                        <small className='text-muted'>
                                                            {
                                                                (account.Tipo === 1)
                                                                ?
                                                                'Cuenta individual'
                                                                :
                                                                    (account.Tipo <= 3)
                                                                    ?
                                                                    'Cuenta grupal'
                                                                    :
                                                                    'Grupo personalizado'
                                                            }
                                                        </small>
                                                    </div>
                                                    <h3>{account.Abonado}</h3>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    
                                </div>
                            </div>
                            <div className='list'>
                                <MyGroupList accounts={accounts} addAccount={addAccount} />
                            </div>
                            <div className='list'>
                                <MyIndividualList accounts={accounts} addAccount={addAccount} />
                            </div>
                        </div>

                    </div>
            }
        </>
    )
}

export default UserAccounts;
