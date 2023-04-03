import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Error } from '../../../components/Error';
import { Loader } from '../../../components/Loader';
import { Modal } from '../../../components/Modal';
import { useCreateGroup, useIndividualAccounts, useMyGroups, useThemeStore } from '../../../hooks';
import Select from 'react-select';

type Inputs = {
    accounts: [{
        label: string; value: number
    }];
    name: string;
}


const Groups = () => {

    const { primary, primary25, neutral, neutral80 } = useThemeStore();
    const { data: individualAccounts, isLoading: isLoadingIndividual } = useIndividualAccounts();
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { data, isLoading, isError, error } = useMyGroups();
    const { mutate: createGroup, reset, isSuccess } = useCreateGroup();

    const { handleSubmit, formState: { errors }, control, register, reset: resetForm } = useForm<Inputs>();

    const onSubmmit: SubmitHandler<Inputs> = (dataForm) => {
        createGroup({
            accounts:dataForm.accounts.map( ac => Number(ac.value)),
            name: dataForm.name
        })
    }

    useEffect(() => {
        if (isSuccess) {
            reset();
            resetForm();
        }
    }, [isSuccess])


    return (
        <>
            <Modal 
                show={showModal}
                showModal={setShowModal}
                title='Crear grupo personalizado'
                subtitle='RELLENE TODOS LOS CAMPOS'
            >
                <form className='form-full' onSubmit={handleSubmit(onSubmmit)}>
                    <div className='form__container flex'>
                        <label className='form__label-txt' htmlFor="name">Nombre:</label>
                        <input id='name' autoComplete='off' className='form__input-txt' type="text" placeholder='' {...register('name', { required: true })} />
                    </div>
                    <div className='form__container flex'>
                        <label htmlFor="" className='form__label-txt'>Cuentas</label>
                        <Controller
                            name='accounts'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    options={individualAccounts?.map(dt => ({ value: Number(dt.CodigoCte), label: dt.Nombre })) || []} isLoading={isLoadingIndividual}
                                    closeMenuOnSelect={false}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: primary,
                                            primary25: primary,
                                            neutral0: neutral,
                                            neutral80: neutral80,
                                            neutral20: neutral,
                                            neutral10: neutral
                                        },
                                    })}
                                    {...field}
                                    isMulti={true}
                                />
                            )}
                        />
                        {errors.accounts && <span className='form__required'>Seleccione al menos una cuenta</span>}
                    </div>
                    <div className='form__button'>
                        <button>
                            Guardar
                        </button>
                    </div>
                </form>
            </Modal>
            <div className='content'>
                <div className='title-content'>
                    <h1>Administración de grupos</h1>
                </div>

                <div className='table-search'>
                    <input
                        id='search-by-name'
                        type="text"
                        className='input-text'
                        placeholder='Buscar grupo'
                        value={search}
                        onChange={({ target }) => setSearch(target.value)}
                    />
                    <div className='filters'>
                        <button
                            className='button button-primary button-small'
                            onClick={() => setShowModal(true)}
                        >Nuevo grupo personalizado</button>
                    </div>
                </div>

                <div className='table-scroll'>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Código</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading
                                ?
                                    [1, 2, 3, 4, 5].map(num => (
                                        <tr key={num}>
                                            <td><div className='line'></div></td>
                                            <td><div className='line'></div></td>
                                            <td><div className='line'></div></td>
                                        </tr>

                                    ))
                                :
                                isError
                                ?
                                <tr>
                                    <td colSpan={3}>
                                        <Error error={error}/>
                                    </td>
                                </tr>
                                :
                                data.filter(gr => gr.Nombre.toLowerCase().includes(search.toLowerCase())).map( gr => (
                                    <tr key={`${gr.Codigo}-${gr.Tipo}`}>
                                        <td>{gr.Nombre}</td>
                                        <td>{gr.Codigo}</td>
                                        <td>{(gr.Tipo === 4) ? 'Grupo personalizado' : 'Grupo asignado por el administrador'}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Groups;