export interface AccountBatery {
    nombre: string;
    numeroEventos: number;
    estado: StateBatery;
}
export enum StateBatery {
    WITHOUT = 'WITHOUT-EVENTS',
    RESTORE = 'RESTORE',
    ERROR = 'ERROR'
}