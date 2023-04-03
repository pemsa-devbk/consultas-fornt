import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from '../../../components/Modal';
import { useAuthStore, useUpdateuser } from '../../../hooks';


type Inputs = {
    password: string;
    lastPassword: string;
}

const Profile = () => {
    const { user } = useAuthStore();
    const [showModal, setShowModal] = useState(false);

    const updateUser = useUpdateuser();


    const {
        handleSubmit,
        formState: { errors },
        control, register,
        reset: resetForm,
    } = useForm<Inputs>();

    const onSubmmit: SubmitHandler<Inputs> = (dataForm) => {
        updateUser.mutate({
            id: user.id,
            ...dataForm
        })
    }

    useEffect(() => {
      resetForm();
      updateUser.reset();
    }, [updateUser.isSuccess])
    

    return (
        <>
            <Modal
                show={showModal}
                showModal={setShowModal}
                title='Cambiar contraseña'
                subtitle='RELLENE TODOS LOS CAMPOS'
            >

                <form onSubmit={handleSubmit(onSubmmit)} className='form-full'>
                    <div className='form__container flex'>
                        <label className='form__label-txt' htmlFor="lastPassword">Contraseña actual:</label>
                        <input id='lastPassword' autoComplete='off' className='form__input-txt' type="password" placeholder='' {...register('lastPassword', { required: true })} />
                    </div>
                    <div className='form__container flex'>
                        <label className='form__label-txt' htmlFor="password">Nueva contraseña:</label>
                        <input id='password' autoComplete='off' className='form__input-txt' type="password" placeholder='' {...register('password', { required: true })} />
                    </div>
                    <div className='form__button'>
                        <button>
                            Actualizar
                        </button>
                    </div>
                </form>
            </Modal>
            <div className='center center-width center-height container-fph container-fpw'>
                <div className='card-profile'>
                    <div className='img'>
                        <p>{user.fullName.charAt(0)}</p>
                    </div>
                    <h2 className='user-name'>{user.fullName}</h2>
                    <p className='text-muted user-email'>{user.email}</p>

                    <button
                        className='button button-full button-primary'
                        onClick={() => setShowModal(true)}
                    >Cambiar contraseña</button>
                </div>
            </div>
        </>
    )
}

export default Profile;
