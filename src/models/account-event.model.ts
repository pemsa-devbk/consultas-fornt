export interface AccountEvent {
    CodigoCte: string;
    CodigoAbonado: string;
    Nombre: string;
    Direccion: string;
    eventos?: Event[] | Event[]; 
}
export interface AccountOneEvent {
    CodigoCte: string;
    CodigoAbonado: string;
    Nombre: string;
    Direccion: string;
    evento?: Event;
}

export interface EventState {
    FechaOriginal: string;
    Hora: string;
    CodigoEvento: string;
    CodigoAlarma: string;
    DescripcionAlarm: string;
    CodigoZona: string;
    DescripcionZona: string;
    CodigoUsuario: string;
    NombreUsuario: string;
    DescripcionEvent: string;
    Particion: number;
}
export interface Event extends EventState {
    ClaveMonitorista: string;
    NomCalifEvento: string;
    FechaPrimeraToma: string;
    HoraPrimeraToma: string;
    FechaFinalizo: string;
    HoraFinalizo: string;
}