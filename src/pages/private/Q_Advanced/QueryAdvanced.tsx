import React from 'react'
import Select from 'react-select';
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, TypeAccount } from '../../../models';
import { useIndividualAccounts, useQueryStore, useThemeStore } from '../../../hooks';


type Inputs = {
    accounts: [{
        label: string; value: number
    }];
    reporte: { label: string; value: string };
    dateStart: string;
    dateEnd: string;
}

export const QueryAdvanced = () => {
    const { data, isLoading } = useIndividualAccounts();
    const { primary, primary25, neutral, neutral80 } = useThemeStore();
    const {chargeAccounts} = useQueryStore();

    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, control, register, getValues, watch, setError} = useForm<Inputs>({
        defaultValues: {
            dateEnd: dayjs().format('YYYY-MM-DD'),
            dateStart: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        }
    });
    const watchReport = watch("reporte");
    
    const onSubmmit: SubmitHandler<Inputs> = (dataForm) => {
        const orderAccounts = dataForm.accounts.map(acc => acc.value).sort( function(a,b) {
            return a-b;
        });
        if ([PrivateRoutes.ALARM, PrivateRoutes.AP_CI].includes(getValues('reporte.value'))){
            if (dayjs(dataForm.dateEnd, 'YYYY-MM-DD').diff(dayjs(dataForm.dateStart, 'YYYY-MM-DD'), 'day') > 30) {
                setError("dateStart", { type: "value", message: "Fechas no" })
                return;
            }
        }

        chargeAccounts(orderAccounts, TypeAccount.SINGLE, dataForm.dateStart, dataForm.dateEnd);
        navigate(`/dashboard/${dataForm.reporte.value}`, { replace: true });
    }

    return (
        <div className='center center-width center-height container-fph container-fpw'>
            <form className='card-form' onSubmit={handleSubmit(onSubmmit)}>
                <h2 className='form-title'>Consulta multiple</h2>
                <div className='form__container flex'>
                    <label htmlFor="" className='form__label-txt'>Cuentas</label>
                    <Controller 
                        name='accounts'
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Select
                                options={data?.map(dt => ({ value: Number(dt.CodigoCte), label: dt.Nombre })) || []} isLoading={isLoading}
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
                    { errors.accounts && <span className='form__required'>Seleccione al menos una cuenta</span>}
                </div>
                <div className='form__container flex'>
                    <label htmlFor="" className='form__label-txt'>Tipo de consulta</label>
                    <Controller
                        name='reporte'
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Select
                                options={[{value: PrivateRoutes.ALARM, label: 'Evento de Alarma'}, {value: PrivateRoutes.AP_CI, label: 'Apertura y cierre'},{ value: PrivateRoutes.BATERY, label: 'Problemas de bateria' }, { value: PrivateRoutes.STATE_SUC, label: 'Estado de sucursales' }, { value: PrivateRoutes.AP_CI_WEEK, label: 'Horario aperturas y cierres' }]}
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
                <div className={`form__hide ${[PrivateRoutes.ALARM, PrivateRoutes.AP_CI].includes(getValues('reporte.value')) ? 'show' : ''}`}>
                    <p className='form-information'>Seleccione el rango de consulta, solo puede consultar 30 días naturales</p>
                    <div className='form__date'>
                        <div className='form__container flex'>
                            <label htmlFor="" className='form__label-txt'>Fecha inicial</label>
                            <input className='input-date' type="date" {...register("dateStart", {
                                validate: {
                                    required: value => {
                                        if( !value && [PrivateRoutes.AP_CI, PrivateRoutes.ALARM].includes(getValues('reporte.value'))) return '';
                                        return true;
                                    }
                                }, 
                            })} />
                            {errors.dateStart && <span className='form__required'>Seleccione una fecha</span>}
                        </div>
                        <div className='form__container flex'>
                            <label htmlFor="" className='form__label-txt'>Fecha final</label>
                            <input className='input-date' type="date" {...register("dateEnd",{
                                validate: {
                                    required: value => {
                                        if (!value && [PrivateRoutes.AP_CI, PrivateRoutes.ALARM].includes(getValues('reporte.value'))) return '';
                                        return true;
                                    }
                                }
                            })} />
                            {errors.dateEnd && <span className='form__required'>Seleccione una fecha</span>}
                        </div>

                    </div>
                </div>


                <div className='form__button'>
                    <button>Consultar</button>
                </div>
            </form>
        </div>
    )
}

export default QueryAdvanced;
