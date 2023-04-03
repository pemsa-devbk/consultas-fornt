import React, { useEffect, useState } from 'react'
import { useUsers } from '../../../hooks/users';
import { Pagination } from '../../../components/Pagination';
import { Modal } from '../../../components/Modal';
import { NewUser } from './components/NewUser';
import { Error } from '../../../components/Error';
import { Row } from './components/Row';


interface UserSelected {
    fullName: string;
    email: string;
    id: string;
}

// * Modales cambiar el diseño por algo mas apropiado al tema de la aplicación verificar el color del shade para los temas claros y obscuros
// ? Verificar los colores de la aplicación, aporbacion de los colores 
// ? Codigos de alarma para el rpeorte de evento de alarma 
// ? Funcionamiento de la aplicación 


export const Users = () => {
    const [search, setSearch] = useState('');
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const { usersQuery, nextPage, page, setPage, prevPage } = useUsers(text);
    const [userSelected, setUserSelected] = useState<UserSelected>({ email: '', fullName: '', id: '' });

    useEffect(() => {
        const time = setTimeout(() => {
            setText(search)
            setPage(1);
        }, 800)
        return () => clearTimeout(time)
    }, [search])


    return (
        <>
            <Modal
                show={showModal}
                showModal={setShowModal}
                title='Nuevo usuario'
                subtitle='RELLENE TODOS LOS CAMPOS'
            >
                <NewUser edit={false} />

            </Modal>

            <Modal
                show={showModalEdit}
                showModal={setShowModalEdit}
                title={`Usuario: ${userSelected.fullName}`}
                subtitle='RELLENE TODOS LOS CAMPOS'
            >
                <NewUser edit={true} user={userSelected} />
            </Modal>

            <div className='content'>
                <div className='title-content'>
                    <h1>Administración de usuarios</h1>
                </div>
                <div className='table-search'>
                    <input
                        id='search-by-name'
                        type="text"
                        className='input-text'
                        placeholder='Buscar usuario'
                        value={search}
                        onChange={({ target }) => setSearch(target.value)}
                    />
                    <div className='filters'>
                        <button
                        className='button button-primary button-small'
                        onClick={() => setShowModal(true)}
                    >Nuevo usuario</button>

                    </div>
                </div>

                <div className='table-scroll'>

                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Creado por</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className={usersQuery.isLoading ?'table-load' : ''}>
                            {
                                usersQuery.isLoading
                                    ?
                                    [1,2,3,4,5].map( num => (
                                        <tr key={num}>
                                            <td><div className='line'></div></td>
                                            <td><div className='line'></div></td>
                                            <td><div className='line'></div></td>
                                            <td><div className='line'></div></td>
                                            <td><div className='line'></div></td>
                                            <td><div className='line'></div></td>
                                        </tr>

                                    ))
                                    : usersQuery.isError
                                        ?
                                        <tr>
                                            <td colSpan={6}>
                                                <Error error={usersQuery.error} />
                                            </td>
                                        </tr>
                                        :
                                        usersQuery.data?.users.map(user => (
                                            <Row user={user} key={user.id} openModal={setShowModalEdit} setUserSelected={setUserSelected} />
                                        ))
                            }

                        </tbody>
                        
                        <Pagination elements={usersQuery.data?.total || 0} prevPage={prevPage} nextPage={nextPage} setPager={setPage} page={page} showResults={5}
                        />
                    </table>

                </div>
            </div>
        </>
    )
}

export default Users;
