import { StepType } from "@reactour/tour";

export const steps: React.SetStateAction<StepType[]> = [
    {
        selector: '.title',
        content: 'En este reporte podrá analizar el estado de la batería con respecto a los eventos recibidos durante el último mes.'
    },
    {
        selector: '#batery-with-error',
        content: 'Sucursales que reflejaron eventos de falla de batería sin un restaure posterior.',
    },
    {
        selector: '#batery-with-restore',
        content: 'Sucursales que reflejaron eventos de falla de batería con un restaure posterior.'
    },
    {
        selector: '#batery-with-out',
        content: 'Sucursales que en el último mes no reportan eventos de falla de batería.',
    },
    {
        selector: '#search-by-name',
        content: 'Puede buscar la cuenta que desea por nombre.',
    },
    {
        selector: '.filters',
        content: 'Seleccione los filtros a aplicar, si el recuadro esta relleno el filtro esta activo.',
    },
    {
        selector: 'button.open',
        content: 'Precione para ocultar/mostrar las sucursales sin eventos de falla de batería.',
        position: 'bottom',
    },
    {
        selector: 'button.without',
        content: 'Precione para ocultar/mostrar las sucursales con restaure de falla de batería.',
    },
    {
        selector: 'button.close',
        content: 'Precione para ocultar/mostrar las sucursales sin restaure de falla de batería.',
    },
    {
        selector: '#table-batery',
        content: 'Tabla con detalles de los eventos de falla de batería recibidos',
    }
]