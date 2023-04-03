import React from 'react'
import { useNavigate } from 'react-router-dom';
import Icons from '../../../../assets/icons.svg';
import { useChangeState, useDeleteUser, useResetPassword } from '../../../../hooks';


interface UserSelected {
  fullName: string;
  email: string;
  id: string;
}

interface User{
  id: string;
  fullName: string;
  email: string;
  termsAndConditions: boolean;
  isActive: boolean;
  roles: string[];
  createdBy: User;
}

interface Props{
  user: User,
  openModal: React.Dispatch<React.SetStateAction<boolean>>
  setUserSelected: React.Dispatch<React.SetStateAction<UserSelected>>
}
export const Row = ({user, openModal, setUserSelected}:Props) => {
  const navigate = useNavigate();

  const { mutate: resetPassword } = useResetPassword();
  const { mutate: changeState } = useChangeState();
  const {mutate: deleteUser} = useDeleteUser();
  return (
    <tr>
      <td>{user.fullName}</td>
      <td>{user.email}</td>
      <td>{user.roles[0]}</td>
      <td>{user.createdBy?.fullName || ''}</td>
      <td >
        {user.isActive ? 'Activo' : 'Inactivo'}
      </td>
      <td >
        <div className='table__actions'>
          <button className='table__icon tooltip top' onClick={() => resetPassword(user.id)}>
            <span className='tooltip-text'>Nueva contraseña</span>
            <svg className={`icon`}>
              <use xlinkHref={`${Icons}#icon-key-outline`}></use>
            </svg>
          </button>
          <button className='table__icon tooltip top' onClick={() => {
            setUserSelected(user)
            openModal(true)
            }}>
            <span className='tooltip-text'>Editar</span>
            <svg className={`icon`}>
              <use xlinkHref={`${Icons}#icon-pencil`}></use>
            </svg>
          </button>
          <button className='table__icon tooltip top' onClick={() => changeState(user.id)}>
            <span className='tooltip-text'> {user.isActive ? 'Deshabilitar' : 'Habilitar'}</span>
            <svg className={`icon`}>
              <use xlinkHref={`${Icons}#icon-${user.isActive ? 'cancel-outline' : 'tick-outline'}`}></use>
            </svg>
          </button>
          <button className='table__icon tooltip top' onClick={() => navigate(`/dashboard/user/${user.id}/accounts`, { replace: true })}>
            <span className='tooltip-text'>Cuentas</span>
            <svg className={`icon`}>
              <use xlinkHref={`${Icons}#icon-cog-outline`}></use>
            </svg>
          </button>

          <button className='table__icon tooltip left' onClick={() => deleteUser(user.id)}>
            <span className='tooltip-text'>Eliminar</span>
            <svg className={`icon`}>
              <use xlinkHref={`${Icons}#icon-trash`}></use>
            </svg>
          </button>

        </div>
      </td>
    </tr>
  )
}



interface Algo<T> {
  objeto: T[];
  llave: Array<keyof T>,
  keySearch: keyof T;
}

// TODO
export const Table = <T extends Record<string, any>>({ llave, objeto, keySearch}: Algo<T>) => {
  
  const filter = (obj: T) => {
    
  
    return obj[keySearch].toString().includes('holder_1')
  }

  return(
    <>
      {
        objeto.filter(obj => filter(obj)).map( obj => (
          llave.map( ky => (
            
            <p>{obj[ky]}</p>
          ))
        ))
      }
    </>
  )
}

