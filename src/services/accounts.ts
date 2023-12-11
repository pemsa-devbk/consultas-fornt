import { appInstance } from './axios';
import { IndividualAccount, GroupAccount } from '../models';

interface User {
    id: string;
    fullName: string;
    email: string;
    termsAndConditions: boolean;
    isActive: boolean;
    roles: string[];
}

interface HanldeAccountRequest{
    id: string;
    accounts: {
        idAccount: number;
        typeAccount: number;
    }[];
}

interface CreateCustomGroup{
    name: string;
    accounts: number[];
}

export const getMyIndividualAccounts = async() => {
    const resp = await appInstance.get<{accounts: IndividualAccount[]}>('/accounts/individual');
    return resp.data.accounts;
}

export const getMyGroups = async () => {
    const resp = await appInstance.get<{ groups: GroupAccount[] }>('/accounts/groups');
    return resp.data.groups;
}

export const getAccountsForUser = async(id: string) => {
    const resp = await appInstance.get<{ user: User, groups: GroupAccount[], accounts: IndividualAccount[] }>(`/accounts/user/${id}`);
    return resp.data;
}

export const hanldeAccounts = async (data: HanldeAccountRequest) => {
    
    const resp = await appInstance.post<{ user: User, groups: GroupAccount[], accounts: IndividualAccount[] }>(`/accounts/handle/${data.id}`, {accounts: data.accounts});
    return resp.data;
}

export const createCustomGroup = async (data:CreateCustomGroup ) => {
    const resp = await appInstance.post<{}>('/accounts/create-group', data)

    return resp.data;
}