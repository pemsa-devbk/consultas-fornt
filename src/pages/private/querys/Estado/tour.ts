import { StepType } from "@reactour/tour";

export const steps: React.SetStateAction<StepType[]> = [
    {
        selector: '.title',
        content: 'Con esta consulta podra validar el cierre o apertura de las sucursales.'
    },
    {
        selector: '#state-open',
        content: 'Sucursales que se mantienen abiertas sin un evento de cierre.',
    },
    {
        selector: '#state-close',
        content: 'Sucursales que se mantienen cerradas sin un evento de apertura.'
    },
    {
        selector: '#state-without',
        content: 'Sucursales que no reflejan evento de apertura ni cierre.',
    },
    {
        selector: '#search-by-name',
        content: 'Puede buscar la cuenta que desea por nombre',
    },
    {
        selector: '.filters',
        content: 'Seleccione los filtros a aplicar, si el recuadro esta relleno el filtro esta activo',
    },
    {
        selector: 'button.open',
        content: 'Precione para ocultar/mostrar las sucursales abiertas',
        position: 'bottom',
    },
    {
        selector: 'button.close',
        content: 'Precione para ocultar/mostrar las sucursales cerradas',
    },
    {
        selector: 'button.without',
        content: 'Precione para ocultar/mostrar las sucursales sin estado',
    },
    // {
    //     selector: '.detail',
    //     content: 'Precione en la palabra "Detalles" para mostrar el reporte de apertura y cierre de los ultimos 7 días de la sucursal',
    // }
    {
        selector: '#table-details',
        content: 'Tabla con detalles del estado de las sucursales',
    }
]