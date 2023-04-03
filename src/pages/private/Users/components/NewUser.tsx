import React, { useEffect, useMemo } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateUser, useUpdateuser } from '../../../../hooks/users';
import { useThemeStore } from '../../../../hooks/useThemeStore';
import { useAuthStore } from '../../../../hooks/useAuthStore';
import Select from 'react-select';
import { Roles } from '../../../../models';

type Inputs = {
    fullName: string;
    email: string;
    roles: { label: string; value: string };
}

interface Props{
    user?: {
        fullName: string;
        email: string;
        id: string;
    }
    edit: boolean;
}

export const NewUser = ({user, edit}:Props) => {

    const { user: { roles } } = useAuthStore();
    const { primary, neutral, neutral80 } = useThemeStore();
    const { mutate: createUser, reset, isSuccess } = useCreateUser();
    const updateUser = useUpdateuser();
    const { 
        handleSubmit, 
        formState: { errors }, 
        control, register, 
        reset: resetForm,
        
    } = useForm<Inputs>({
        defaultValues: useMemo( () => {
            return { ...user, roles:{ value: 'user', label: 'Usuario' }};
        }, [user, edit])
    });

    const onSubmmit: SubmitHandler<Inputs> = (dataForm) => {
        if(!edit){
            createUser({
                email: dataForm.email,
                fullName: dataForm.fullName,
                roles: [dataForm.roles.value]
            })
        }else{
            updateUser.mutate({
                id: user!.id,
                email: dataForm.email,
                fullName: dataForm.fullName,
                roles: [dataForm.roles.value]
            })
        }
    }

   useEffect(() => {
       resetForm({ ...user, roles: { value: 'user', label: 'Usuario' } });
   }, [user])
   
    

    useEffect(() => {
        if (isSuccess) {
            reset();
            resetForm();
        }
    }, [isSuccess])

    return (
        <form className='form-full' onSubmit={handleSubmit(onSubmmit)}>

            <div className='form__container flex'>
                <label htmlFor="" className='form__label-txt'>Rol de usuario</label>
                <Controller
                    name='roles'
                    control={control}
                    rules={{ required: true }}
                    defaultValue={{ value: 'user', label: 'Usuario' }}
                    render={({ field }) => (
                        <Select
                            isDisabled={!roles.includes(Roles.ADMIN)}
                            options={[
                                { value: 'user', label: 'Usuario' }, { value: 'holder', label: 'Titular' }, { value: 'admin', label: 'Administrador' }]}
                            defaultValue={{ value: 'user', label: 'Usuario' }}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: primary,
                                    primary25: primary,
                                    neutral0: neutral,
                                    neutral80: neutral80,
                                    neutral20: neutral,
                                },
                            })}
                            {...field}
                        />
                    )}
                />
            </div>

            <div className='form__container flex'>
                <label className='form__label-txt' htmlFor="name">Nombre completo:</label>
                <input id='name' autoComplete='off' className='form__input-txt' type="text" placeholder='' {...register('fullName', { required: true })} />
            </div>
            <div className='form__container flex'>

                <label className='form__label-txt' htmlFor="e-mail">Correo:</label>
                <input id='e-mail' autoComplete='off' className='form__input-txt' type="email" placeholder=' ' {...register('email', { required: true })} />

            </div>

            <div className='form__button'>
                <button>
                    {
                        edit
                        ?
                        'Editar'
                        :
                        'Registrar'
                    }
                </button>
            </div>
        </form>
    )
}
