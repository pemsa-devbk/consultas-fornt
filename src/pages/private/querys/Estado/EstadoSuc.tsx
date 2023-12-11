import React, { useEffect, useRef } from 'react'
import { useTour } from '@reactour/tour'
import { steps } from './tour';
import { Table } from './Table';
import { Insight } from '../../../../components/Insight';
import { FloatButton } from '../../../../components/FloatButton';
import { Error } from '../../../../components/Error';
import { useQueryStore, useStateSuc } from '../../../../hooks';
import { downloadReport, FileType } from '../../../../services/download';
import { Id, toast } from 'react-toastify';
import { Loader3 } from '../../../../components/Loader3';

export const EstadoSuc = () => {
    const { accounts, type } = useQueryStore();
    const { isLoading, data, isError, refetch, error, isRefetching, isRefetchError } = useStateSuc({ typeAccount: type, accounts });
    const { setIsOpen, setSteps, setCurrentStep } = useTour();
    const toastId = useRef<null | Id>(null);

    const downloadFile = (showGraphs: boolean, format: FileType) => {
        const dt = {
            accounts,
            showGraphs,
            typeAccount: type
        }

        downloadReport('state', 'Reporte de estado de sucursales', format, dt)

    }

    const openTutorial = () => {
        setCurrentStep(0);
        setSteps!(steps);
        setIsOpen(true);
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
                        <div className='content' >
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
                                    Estado de sucursales
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
                                </div>
                            </div>

                            <div className='insights'>
                                <Insight id={'state-open'} icon={'unlock'} classIcon={'open feather'} title={'Abiertas'} quantity={data!.cuentas.filter(account => ['O', 'OS'].includes(account.evento?.CodigoAlarma || '')).length} total={data!.cuentas.length} subTitle={'Sucursales abiertas'} />

                                <Insight id={'state-close'} icon={'lock'} classIcon={'not feather'} title={'Cerradas'} quantity={data!.cuentas.filter(account => ['C', 'CS'].includes(account.evento?.CodigoAlarma || '')).length} total={data!.cuentas.length} subTitle={'Sucursales cerradas'} />

                                <Insight id={'state-without'} icon={'alert-triangle'} classIcon={'close feather'} title={'Sin estado'} quantity={data!.cuentas.filter(account => account.evento ? false : true).length} total={data!.cuentas.length} subTitle={'Sucursales sin estado'} />

                            </div>

                            <Table />

                        </div>
            }
        </>
    )
}
export default EstadoSuc;