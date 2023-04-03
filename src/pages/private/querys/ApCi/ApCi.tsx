import React, { useEffect, useRef } from 'react'
import { Insight } from '../../../../components/Insight';
import { Error } from '../../../../components/Error';
import { FloatButton } from '../../../../components/FloatButton';
import { Table } from './Table';
import { useApCi, useQueryStore } from '../../../../hooks';
import { downloadReport, FileType } from '../../../../services/download';
import { Id, toast } from 'react-toastify';
import { Loader3 } from '../../../../components/Loader3';
import { useTour } from '@reactour/tour';
import { steps } from './tour';



export const ApCi = () => {
    const { accounts, type, dateEnd, dateStart } = useQueryStore();
    const { isLoading, data, isError, error, refetch, isRefetching, isRefetchError } = useApCi({ typeAccount: type, accounts, dateStart, dateEnd });
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

        downloadReport('ap-ci', 'Reporte de apertura y cierre', format, dt)
    }
    const openTutorial = () => {
        setCurrentStep(0);
        setSteps(steps);
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
                    isError
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
                                    action: () => downloadFile(false, FileType.XLSX)
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
                                    Aperturas y cierres
                                    {
                                        (data!.cuentas.length === 1)
                                            ?
                                            ` de ${data?.cuentas[0].Nombre}`
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
                                            id={'ap-ci-open'}
                                            icon={'unlock'}
                                            classIcon={'open feather'}
                                            title={'Aperturas'}
                                            quantity={data!.cuentas[0].eventos?.filter(ev => ['O', 'OS'].includes(ev.CodigoAlarma)).length || 0}
                                            total={data!.cuentas[0].eventos?.length || 1}
                                            subTitle={'Aperturas recibidas'}
                                            showTotal={true}
                                        />
                                        <Insight
                                            id={'ap-ci-close'}
                                            icon={'lock'}
                                            classIcon={'not feather'}
                                            title={'Cierres'}
                                            quantity={data!.cuentas[0].eventos?.filter(ev => ['C', 'CS'].includes(ev.CodigoAlarma)).length || 0}
                                            total={data!.cuentas[0].eventos?.length || 1}
                                            subTitle={'Cierres recibidas'}
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
export default ApCi;