import { useQuery } from '@tanstack/react-query';
import { DataToSend } from '../models';
import { getStateSuc, getApCiWeek, getBatery, getApCI, getAlarm } from '../services/reports';


export const useStateSuc = (data: DataToSend) => {
    return useQuery(["state", data.typeAccount, {accounts: data.accounts}], () =>  getStateSuc(data), {
        staleTime: 30000
    })
}


export const useApCiWeek = (data: DataToSend) => {
    return useQuery(["ap-ci-week", data.typeAccount, { accounts: data.accounts }], () => getApCiWeek(data), {
        staleTime: 30000
    })
}

export const useBatery = (data: DataToSend) => {
    return useQuery(["batery", data.typeAccount, {accounts: data.accounts} ], () => getBatery(data), {
        staleTime: 30000
    })
}

export const useApCi = (data: DataToSend) => {
    return useQuery(["ap-ci", data.dateStart, data.dateEnd, data.typeAccount, { accounts: data.accounts }], () => getApCI(data), {
        staleTime: 30000
    })
}

export const useAlarm = (data: DataToSend) => {
    return useQuery(["alarm", data.dateStart, data.dateEnd, data.typeAccount, { accounts: data.accounts }], () => getAlarm(data), {
        staleTime: 30000
    })
}