import { AccountBatery, AccountEvent, DataToSend } from '../models';
import { appInstance } from './axios';

export const getStateSuc = async (data: DataToSend) => {
    const resp = await appInstance.post<{ nombre: string; cuentas: AccountEvent[] }>('reports/state', {
        ...data
    });
    return resp.data;
}

export const getApCiWeek = async (data: DataToSend) => {
    const resp = await appInstance.post<{nombre: string, fechas: string[], cuentas: AccountEvent[]}>('reports/apci-week', {
        ...data
    });

    return resp.data;
}

export const getBatery = async (data: DataToSend) => {
    const resp = await appInstance.post<{ nombre: string, total: number, cuentas: AccountBatery[] }>('reports/batery', {
        ...data
    });

    return resp.data;
}

export const getApCI = async (data: DataToSend) => {
    const resp = await appInstance.post<{
        nombre: string, cuentas: AccountEvent[]
    }>('reports/ap-ci', {
        ...data
    });

    return resp.data;
}

export const getAlarm = async (data: DataToSend) => {
    const resp = await appInstance.post<{
        nombre: string, cuentas: AccountEvent[]
    }>('reports/event-alarm', {
        ...data
    });
    return resp.data;
}