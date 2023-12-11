import React, { useEffect, useRef } from 'react'
import { Insight } from '../../../../components/Insight';
import { Error } from '../../../../components/Error';
import { FloatButton } from '../../../../components/FloatButton';
import { Table } from './Table';
import { useAlarm, useQueryStore } from '../../../../hooks';
import { downloadReport, FileType } from '../../../../services/download';
import { Id, toast } from 'react-toastify';
import { Loader3 } from '../../../../components/Loader3';
import { useTour } from '@reactour/tour';
import { steps } from './tour';


export const Alarm = () => {
  const { accounts, type, dateEnd, dateStart } = useQueryStore();
  const { isLoading, data, isError, error, refetch, isRefetching, isRefetchError } = useAlarm({ typeAccount: type, accounts, dateStart, dateEnd });
  const toastId = useRef<null | Id>(null);
  const { setIsOpen, setSteps, setCurrentStep } = useTour();



  const downloadFile = (showGraphs: boolean, format: FileType) => {
    const dt = {
      accounts,
      dateStart,
      dateEnd,
      showGraphs,
      typeAccount: type
    }
    downloadReport('alarm', 'Reporte de evento de alarma', format, dt)
  }

  const openTutorial = () => {
    setCurrentStep(0);
    setSteps!(steps);
    setIsOpen(true);
  }

  useEffect(() => {
    if (isRefetching) toastId.current = toast.loading("Obteniendo la información")

    if (!isRefetching) toast.update(toastId.current!, { render: "Datos actualizados", type: "success", isLoading: false, autoClose: 3000 })


    return () => toast.update(toastId.current!, { render: '', isLoading: false, autoClose: 1 })
  }, [isRefetching])

  return (
    <>
      {
        isLoading
          ?
          <Loader3 center='P' />
          :
          (isError || isRefetchError)
            ?
            <div className='center-container'>
              <Error error={error} />
            </div>
            :
            <div className='content'>
              <FloatButton lists={[
                {
                  icon: 'tool',
                  text: 'Tutorial',
                  action: () => openTutorial(),
                  hide: data.cuentas.length > 1
                },
                {
                  icon: 'download',
                  text: 'Descargar PDF',
                  action: () => downloadFile(false, FileType.PDF)
                },
                {
                  icon: 'download',
                  text: 'Descargar con grafica PDF',
                  action: () => downloadFile(true, FileType.PDF),
                  hide: data.cuentas.length > 1
                },
                {
                  icon: 'download',
                  text: 'Descargar Excel',
                  action: () => downloadFile(false, FileType.XLSX),
                },
                {
                  icon: 'rotate-ccw',
                  text: 'Recargar',
                  action: () => refetch()
                }
              ]}
              />
              <div className='title-content'>
                <p className='title'>
                  Evento de alarma
                  {
                    (data?.cuentas.length === 1)
                      ?
                      ` de ${data.cuentas[0].Nombre}`
                      :
                      ''
                  }
                </p>
                <div className='extra-information'>
                  <p>Entre las fechas {dateStart} a {dateEnd}</p>
                </div>
              </div>
              {
                (data?.cuentas.length === 1)
                  ?
                  <div className='insights'>
                    <Insight
                      id={'alarm-ap-ci'}
                      icon={'shield'}
                      classIcon={'open feather'}
                      title={'Ap/Ci'}
                      quantity={data!.cuentas[0].eventos?.filter(ev => ["C", "CS", "O", "OS", "UR11", "US11"].includes(ev.CodigoAlarma)).length || 0}
                      total={data.cuentas[0].eventos?.length || 1}
                      subTitle={'Aperturas y cierres recibidos'}
                      showTotal={true}
                    />
                    <Insight
                      id={'alarm-alarm'}
                      icon={'bell'}
                      classIcon={'not feather'}
                      title={'Alarmas'}
                      quantity={data!.cuentas[0].eventos?.filter(ev => ["A", "ACZ", "ASA", "ATR", "CPA", "FIRE", "GA", "P", "SAS", "SMOKE", "VE"].includes(ev.CodigoAlarma)).length || 0}
                      total={data.cuentas[0].eventos?.length || 1}
                      subTitle={'Alarmas recibidas'}
                      showTotal={true}
                    />

                    <Insight
                      id={'alarm-test'}
                      icon={'tool'}
                      classIcon={'test feather'}
                      title={'Pruebas'}
                      quantity={data!.cuentas[0].eventos?.filter(ev => ["AGT", "AT", "ATP", "AUT", "TST", "TST0", "TST1", "TST3", "TSTR", "TX0"].includes(ev.CodigoAlarma)).length || 0}
                      total={data.cuentas[0].eventos?.length || 1}
                      subTitle={'Pruebas recibidas'}
                      showTotal={true}
                    />

                    <Insight
                      id={'alarm-batery'}
                      icon={'battery'}
                      classIcon={'close feather'}
                      title={'Baterías'}
                      quantity={data!.cuentas[0].eventos?.filter(ev => ['BB', 'RBB'].includes(ev.CodigoAlarma)).length || 0}
                      total={data.cuentas[0].eventos?.length || 1}
                      subTitle={'Eventos de bateria recibidos'}
                      showTotal={true}
                    />
                    <Insight
                      id={'alarm-other'}
                      icon={'help-circle'}
                      classIcon={'other feather'}
                      title={'Otros'}
                      quantity={data!.cuentas[0].eventos?.filter(ev => ["1381", "24H", "ACR", "BPS", "CAS", "CN", "CTB", "ET*", "FC*", "FCA", "FT", "FT*", "IA*", "MED", "PA", "PAF", "PR", "PRB", "RAS", "REB", "RES", "RFC", "RON", "S99", "STL", "SUP", "TAM", "TB", "TEL", "TESE", "TESS", "TPL", "TRB"].includes(ev.CodigoAlarma)).length || 0}
                      total={data.cuentas[0].eventos?.length || 1}
                      subTitle={'Otros eventos recibidos'}
                      showTotal={true}
                    />

                  </div>
                  :
                  <></>
              }
              <Table />
            </div>
      }
    </>
  )
}
export default Alarm;