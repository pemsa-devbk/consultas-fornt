import React, { useEffect, useRef } from 'react'
import { useTour } from '@reactour/tour';
import { Insight } from '../../../../components/Insight';
import { FloatButton } from '../../../../components/FloatButton';
import { Error } from '../../../../components/Error';
import { steps } from './tour';
import { Table } from './Table';
import { useApCiWeek, useQueryStore } from '../../../../hooks';
import { downloadReport, FileType } from '../../../../services/download';
import { Id, toast } from 'react-toastify';
import { Loader3 } from '../../../../components/Loader3';



export const ApCiWeek = () => {
    const { accounts, type } = useQueryStore();
    const { isLoading, data, isError, refetch, error, isRefetching, isRefetchError } = useApCiWeek({ typeAccount: type, accounts });
    const toastId = useRef<null | Id>(null);


    const { setIsOpen, setSteps, setCurrentStep } = useTour();
    const downloadFile = (showGraphs: boolean, format: FileType) => {
        const dt = {
            accounts,
            showGraphs,
            typeAccount: type
        }

        downloadReport('ap-ci-week', 'Reporte horario de aperturas y cierres', format, dt)
    }

    const openTutorial = () => {
        setCurrentStep(0);
        setSteps(steps);
        setIsOpen(true);
    }

    useEffect(() => {
        if (isRefetching) toastId.current = toast.loading("Obteniendo la información")

        if (!isRefetching) {
            isRefetchError 
                ? toast.update(toastId.current!, { render: "Error al actualizar los datos", type: "error", isLoading: false, autoClose: 3000 })
            : toast.update(toastId.current!, { render: "Datos actualizados", type: "success", isLoading: false, autoClose: 3000 })
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
                                    action: () => downloadFile(true, FileType.PDF)
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
                                    Horario de aperturas y cierres
                                    {
                                        data!.nombre
                                            ?
                                            ` de ${data?.nombre}`
                                            :
                                            ''
                                    }
                                </p>
                                <div className='extra-information'>
                                    <p >Número de cuentas: {data?.cuentas.length}</p>
                                    <p>Eventos 7 días antes de la fecha: <b>{data!.fechas[data!.fechas.length - 1]}</b></p>
                                </div>
                            </div>

                            <div className='insights'>
                                <Insight
                                    classIcon='open feather'
                                    icon='unlock'
                                    id='ap-week-1'
                                    quantity={
                                        data!.cuentas.reduce((prev, curr) => {
                                            let algo: number[] = data!.fechas.flatMap(date => {
                                                return curr.eventos?.find(ev => ev.FechaOriginal === date && ['O', 'OS'].includes(ev.CodigoAlarma)) ? 1 : 0;
                                            })
                                            let suma = algo.reduce((a, b) => a + b)
                                            return prev + suma;

                                        }, 0)
                                    }
                                    subTitle="Aperturas recibidas"
                                    title='Aperturas'
                                    total={data!.cuentas.length * 7}
                                    showTotal={true}
                                />
                                <Insight
                                    classIcon='not feather'
                                    icon='lock'
                                    id='ap-week-2'
                                    quantity={
                                        data!.cuentas.reduce((prev, curr) => {
                                            let algo: number[] = data!.fechas.flatMap(date => {
                                                return curr.eventos?.find(ev => ev.FechaOriginal === date && ['C', 'CS'].includes(ev.CodigoAlarma)) ? 1 : 0;
                                            })
                                            let suma = algo.reduce((a, b) => a + b)
                                            return prev + suma;

                                        }, 0)
                                    }
                                    subTitle="Cierres recibidos"
                                    title='Cierres'
                                    total={data!.cuentas.length * 7}
                                    showTotal={true}
                                />
                            </div>

                            <h2 className='title-table'>Sucursales</h2>
                            <Table/>
                        </div>
            }
        </>
    )
}
export default ApCiWeek;