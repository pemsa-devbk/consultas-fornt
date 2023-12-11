import React, { useRef } from 'react'
import { useTour } from '@reactour/tour';
import { Insight } from '../../../../components/Insight';
import { StateBatery } from '../../../../models';
import { Table } from './Table';
import { Error } from '../../../../components/Error';
import { FloatButton } from '../../../../components/FloatButton';
import { steps } from './tour';
import { useBatery, useQueryStore } from '../../../../hooks';
import { downloadReport, FileType } from '../../../../services/download';
import { useEffect } from 'react';
import { Id, toast } from 'react-toastify';
import { Loader3 } from '../../../../components/Loader3';



export const Batery = () => {
    const { accounts, type } = useQueryStore();
    const { isLoading, data, isError, error, refetch, isRefetchError, isRefetching } = useBatery({ typeAccount: type, accounts });
    const { setIsOpen, setSteps, setCurrentStep } = useTour();
    const toastId = useRef<null | Id>(null);

    const downloadFile = (showGraphs: boolean, format: FileType) => {
        const dt = {
            accounts,
            showGraphs,
            typeAccount: type
        }
        downloadReport('batery', 'Reporte de baterías',format, dt)
    }


    const openTutorial = () => {
        setCurrentStep(0);
        setSteps!(steps);
        setIsOpen(true)
    }

    useEffect(() => {
        if (isRefetching) toastId.current = toast.loading("Obteniendo la información")

        if (!isRefetching) {
            toast.update(toastId.current!, { render: "Datos actualizados", type: "success", isLoading: false, autoClose: 3000 })
        }

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
                                    action: () => openTutorial()
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
                                    Problema de baterias
                                    {
                                        data!.nombre
                                            ?
                                            ` de ${data?.nombre}`
                                            :
                                            ''
                                    }
                                </p>
                                <div className='extra-information'>
                                    <p >Número de cuentas: {data?.total}</p>
                                </div>
                            </div>

                            <div className='insights'>
                                <Insight
                                    id={'batery-with-error'}
                                    icon={'alert-circle'}
                                    classIcon={'not feather'}
                                    title={'Sin Restaure'}
                                    quantity={data!.cuentas.filter(account => account.estado === StateBatery.ERROR).length}
                                    total={data!.total}
                                    subTitle={'Sin restaure de batería baja'}
                                />
                                <Insight
                                    id={'batery-with-restore'}
                                    icon={'alert-triangle'}
                                    classIcon={'close feather'}
                                    title={'Con restaure'}
                                    quantity={data!.cuentas.filter(account => account.estado === StateBatery.RESTORE).length}
                                    total={data!.total}
                                    subTitle={'Con restaure de batería baja'}
                                />
                                <Insight
                                    id={'batery-with-out'}
                                    icon={'check'}
                                    classIcon={'open feather'}
                                    title={'Sin eventos'}
                                    quantity={data!.cuentas.filter(account => account.estado === StateBatery.WITHOUT).length}
                                    total={data!.total}
                                    subTitle={'Sin eventos de batería baja'}
                                />
                            </div>

                            <Table />


                        </div>
            }
        </>
    )
}
export default Batery;