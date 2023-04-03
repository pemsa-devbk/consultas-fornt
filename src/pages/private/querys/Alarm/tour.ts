import { StepType } from "@reactour/tour";

export const steps: React.SetStateAction<StepType[]> = [
    {
        selector: '.title',
        content: 'Esta consulta muestra todos los eventos recibidos del sistema de alarma en la central de monitoreo.'
    },
    {
        selector: '#alarm-ap-ci',
        content: 'Porcentaje de eventos de aperturas y cierres recibidos sobre el total de eventos.',
    },
    {
        selector: '#alarm-alarm',
        content: 'Porcentaje de eventos de alarma recibidos sobre el total de eventos.',
    },
    {
        selector: '#alarm-test',
        content: 'Porcentaje de eventos de prueba de vida del panel de alarma y comunicadores alternos recibidos sobre el total de eventos.',
    },
    {
        selector: '#alarm-batery',
        content: 'Porcentaje de eventos de falla de batería recibidos sobre el total de eventos.',
    },
    {
        selector: '#alarm-other',
        content: 'Porcentaje del resto de eventos recibidos sobre el total de eventos.',
    },
    {
        selector: '.filters',
        content: 'Seleccione los filtros a aplicar, si el recuadro esta relleno el filtro esta activo.',
    },
    {
        selector: 'button.open',
        content: 'Precione para ocultar/mostrar los eventos de apertura y cierre.',
    },
    {
        selector: 'button.close',
        content: 'Precione para ocultar/mostrar los eventos de alarma.',
    },
    {
        selector: 'button.test',
        content: 'Precione para ocultar/mostrar los eventos de pruebas de vida.',
    },
    {
        selector: 'button.without',
        content: 'Precione para ocultar/mostrar los eventos de falla de batería.',
    },
    {
        selector: 'button.other',
        content: 'Precione para ocultar/mostrar el resto de los eventos.',
    },
    {
        selector: '.table-details',
        content: 'Tabla con el historial de eventos recibidos.',
    }
]