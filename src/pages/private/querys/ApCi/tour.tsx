import { StepType } from "@reactour/tour";

export const steps: React.SetStateAction<StepType[]> = [
    {
        selector: '.title',
        content: 'Esta consulta muestra todos los eventos recibidos de apertura y cierre en la central de monitoreo.'
    },
    {
        selector: '#ap-ci-open',
        content: 'Porcentaje de eventos de aperturas recibidos sobre el total de eventos.',
    },
    {
        selector: '#ap-ci-close',
        content: 'Porcentaje de eventos de cierres recibidos sobre el total de eventos.',
    },
    {
        selector: '.table-details',
        content: 'Tabla con el historial de eventos recibidos.',
    }
]