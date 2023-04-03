import React, { useEffect } from 'react'
import Select from 'react-select';
import * as dayjs from 'dayjs'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, TypeAccount } from '../../../models';
import { useIndividualAccounts, useQueryStore, useThemeStore } from '../../../hooks';

type Inputs = {
  account: { label: string; value: number};
  reporte: {label: string; value: string};
  dateStart: string;
  dateEnd: string;
}

export const QueryAccount = () => {
  const {data, isLoading} = useIndividualAccounts();
  const { chargeAccounts } = useQueryStore();
  const {primary, primary25, neutral, neutral80} = useThemeStore();

  const navigate = useNavigate();
  const { handleSubmit, formState: { errors }, control, register, setError } = useForm<Inputs>({
    defaultValues:{
      dateEnd: dayjs().format('YYYY-MM-DD'),
      dateStart: dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
    },
  });

  const onSubmmit: SubmitHandler<Inputs> = (dataForm) => {
    if(dayjs(dataForm.dateEnd,'YYYY-MM-DD').diff(dayjs(dataForm.dateStart, 'YYYY-MM-DD'), 'days') > 30 ){
      setError("dateStart", {type: "value", message: "Fechas no"})
      return;
    }
    chargeAccounts([dataForm.account.value], TypeAccount.SINGLE, dataForm.dateStart, dataForm.dateEnd);
    navigate(`/dashboard/${dataForm.reporte.value}`, { replace: true });
  }  
  

  return (
    <div className='center center-width center-height container-fph container-fpw'>
      <form className='card-form' onSubmit={handleSubmit(onSubmmit)}>
        <h2 className='form-title'>Consulta por cuenta</h2>
        <div className='form__container flex' >
          <label htmlFor="" className='form__label-txt'>Cuenta</label>
          <Controller 
            name='account'
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <Select 
                options={data?.map(dt => ({ value: Number(dt.CodigoCte), label: dt.Nombre})) || []} isLoading={isLoading} 
                theme={(theme) => ({
                  ...theme,
                  colors:{
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
          {errors.account && <span className='form__required'>Seleccione una cuenta</span>}
        </div>
        <p className='form-information'>Seleccione el rango de consulta, solo puede consultar 30 días naturales</p>
        <div className='form__date'>
          <div className='form__container flex'>
            <label htmlFor="" className='form__label-txt'>Fecha inicial</label>
            <input className='input-date' type="date" {...register('dateStart', { required: true })} />
            {errors.dateStart && <span className='form__required'>Seleccione una fecha</span>}
          </div>
          <div className='form__container flex'>
            <label htmlFor="" className='form__label-txt'>Fecha final</label>
            <input className='input-date' type="date" {...register('dateEnd', { required: true })}/>
            {errors.dateEnd && <span className='form__required'>Seleccione una fecha</span>}
          </div>

        </div>

        <div className='form__container flex'>
          <label htmlFor="" className='form__label-txt'>Tipo de consulta</label>
          <Controller 
            name='reporte'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select 
                options={[{ value: PrivateRoutes.ALARM, label: 'Evento de Alarma' }, { value: PrivateRoutes.AP_CI, label: 'Apertura y cierre' }]}
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
export default QueryAccount;