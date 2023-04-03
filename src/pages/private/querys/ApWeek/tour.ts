import { StepType } from "@reactour/tour";

export const steps: React.SetStateAction<StepType[]> = [
    {
        selector: '.title',
        content: 'Consulta que muestra, al momento de generar la consulta, la primera apertura y cierre de sucursal, en caso de quedar abierto no se mostrara un horario de cierre. Se consideran los últimos 7 días.'
    },
    {
        selector: '#ap-week-1',
        content: 'Porcentaje de aperturas recibidas sobre aperturas totales esperadas.',
    },
    {
        selector: '#ap-week-2',
        content: 'Porcentaje de cierres recibidos sobre cierres totales esperados.'
    },
    {
        selector: '#table-details',
        content: 'Tabla con los horarios registrados.',
    }
]