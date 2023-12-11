import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../hooks';
import { PrivateRoutes, Status } from '../../../models';
import { useForm, SubmitHandler } from 'react-hook-form';
import logo from '../../../assets/logo.png'
import { Slider } from './components/Slider';
import { Theme } from './components/Theme';
import { Modal } from '../../../components/Modal';
import { urlDocs } from '../../../services/axios';

type Inputs = {
    email: string;
    password: string;
}

const Login = () => {

    const navigate = useNavigate();
    const { status, errorMessage, startLogin } = useAuthStore();
    const [showModal, setShowModal] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (dataForm) => {
        startLogin(dataForm, () => navigate(`/${PrivateRoutes.DASHBOARD}`, { replace: true }));
    }

    // TODO Funciones para el modal de descarga
    const openModal = () => {
        const modal = document.querySelector('#modal');
        modal?.classList.add('show-modal');
    }
    const closeModal = () => {
        const modal = document.querySelector('#modal');
        modal?.classList.remove('show-modal');
    }

    return (
        <div className='login-screen container-fw container-fh center center-width center-height'>
            {/* {
                (/Android/i.test(navigator.userAgent))
                &&
                <div id='modal' className='modal-container show-modal '>
                    <div className='modal-shade'></div>
                    <div className='modal small-modal'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h4 className='modal-title'>Texto 1</h4>
                                <button className='close-modal' onClick={closeModal}>
                                    <i className='icon-close'>x</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            } */}
            <Theme />
            <Modal 
                title={'Reinicio de contraseña'} 
                showModal={ setShowModal } 
                show={showModal} 
                subtitle={''}                
            >
                <p>Comunicate con tu titular para realizar el proceso de reinicio de contraseña.</p>
            </Modal>
            <div className='login-container'>
                <section className='login center center-width'>
                    <div className='login-content'>

                        <div className='login__logo'>
                            <img className='logo' src={logo} alt="LOGO_PEMSA" />
                        </div>
                        <h2 className='login--title'>Bienvenido</h2>

                        <p className='login--leyend'>Ingrese sus datos, para iniciar sesión.</p>
                        <p className={`login--status ${(errorMessage.length > 0) && 'error'}`}>
                            {
                                (status === Status.STARTSESSION) ? 'Iniciando sesión...'
                                    :
                                    (errorMessage.length > 0) && errorMessage[0]
                            }
                        </p>

                        <form action="" className='form-full' onSubmit={handleSubmit(onSubmit)}>
                            <div className='form__container'>
                                <input
                                    id='e-mail'
                                    autoComplete='off'
                                    className='form__input-text'
                                    type="email"
                                    placeholder=' '
                                    {...register("email", { required: { value: true, message: 'El campo correo eléctronico es obligatorio' }, })}
                                />
                                <label className='form__label-text' htmlFor="e-mail">Correo:</label>
                                {errors.email && <span className='form__required'>{errors.email.message}</span>}
                            </div>
                            <div className='form__container'>
                                <input
                                    id='password'
                                    className='form__input-text'
                                    type="password"
                                    placeholder=' '
                                    {...register("password", { required: { value: true, message: 'La contraseña es requerida' } })}
                                />
                                <label className='form__label-text' htmlFor="password">Contraseña:</label>
                                {errors.password && <span className='form__required'>{errors.password.message}</span>}
                            </div>
                            <p className='forgot' onClick={ () => setShowModal(true)}>Olvidaste tu contraseña</p>


                            <button className='btn btn-solid btn-full'>Iniciar sesión</button>
                        </form>
                        <p className='login--register'>¿No tienes cuenta?, <a href={`${urlDocs}/docs/REGISTRO-PLATAFORMA.pdf`} target="_blank">mira el proceso aquí</a></p>
                        <br />
                        <br />
                        <center>
                            <p>PRELMO por PEMSA</p>
                        </center>
                    </div>
                </section>
                <section className='media'>
                    <Slider />
                </section>
            </div>
        </div>
    )
}

export default Login;