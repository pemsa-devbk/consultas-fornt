import React, { useEffect, useRef } from 'react'
import { useTour } from '@reactour/tour';
import Select from 'react-select';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../../models';
import { useMyGroups, useQueryStore, useThemeStore } from '../../../hooks';

type Inputs = {
    group: {
        label: string; value: {
            codigo: number;
            tipo: number;
        }
    };
    reporte: {label: string; value: string};
}


export const QueryGroup = () => {
    const { data, isLoading, isError, error } = useMyGroups();
    const { primary, primary25, neutral, neutral80 } = useThemeStore();
    const { chargeAccounts } = useQueryStore();
    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, control } = useForm<Inputs>();
    // const { setIsOpen, setSteps} = useTour(); // Tutorial step
    
    const onSubmmit: SubmitHandler<Inputs> = (dataForm) => {
        chargeAccounts([dataForm.group.value.codigo], dataForm.group.value.tipo)
        navigate(`/dashboard/${dataForm.reporte.value}`, { replace: true });
    }

    // TODO ADD ERROR FOR 401
    useEffect(() => {
      
      
    }, [isError])
    
    
    // For the changes
    // const base = useRef(null);
    // useEffect( () => {
    //     if(base.current){
    //         setSteps(getSteps(base.current))
    //     }
    // }, [base, setSteps])


    return (
        <div className='center center-width center-height container-fph container-fpw'>
            <form className='card-form' onSubmit={handleSubmit(onSubmmit)}>
                <h2 className='form-title'>Consulta por grupo</h2>
                <div className='form__container flex' id='select-1'>
                    <label htmlFor="" className='form__label-txt'>Grupo</label>
                    <Controller
                        name='group'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                options={data?.map(dt => ({ value: { codigo: dt.Codigo, tipo: dt.Tipo }, label: dt.Nombre })) || []} isLoading={isLoading}
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
                    {errors.group && <span className='form__required'>Seleccione una cuenta</span>}
                </div>

                <div className='form__container flex' id='select-2'>
                    <label htmlFor="" className='form__label-txt'>Tipo de consulta</label>
                    <Controller 
                        name='reporte'
                        control={control}
                        rules={{ required: true }}
                        render={({field}) => (
                            <Select
                                options={[
                                    { value: PrivateRoutes.BATERY, label: 'Problemas de bateria' }, { value: PrivateRoutes.STATE_SUC, label: 'Estado de sucursales' }, { value: PrivateRoutes.AP_CI_WEEK, label: 'Horario aperturas y cierres' }]}
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
                    {errors.reporte && <span className='form__required'>Seleccione el tipo de consulta</span>}
                </div>

                <div className='form__button'>
                    <button>Consultar</button>
                </div>
            </form>
        </div>
    )
}

export default QueryGroup;
