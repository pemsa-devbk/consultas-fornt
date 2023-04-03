import { appInstance } from './axios';

interface QueryUser {
    page?: number;
    term?: string
}

interface User{
    id: string;
    fullName: string;
    email: string;
    termsAndConditions: boolean;
    isActive: boolean;
    roles: string[];
    createdBy: User;
}

interface UserCreate {
    fullName: string;
    email: string;
    roles: string[];
}

interface UserEdit{
    id: string;
    fullName?: string;
    email?: string;
    password?: string;
    lastPassword?: string;
    roles?: string[];
}

export const getUsers = async ({page = 1, term}:QueryUser) => {
    const params = new URLSearchParams();
    if(term) params.append('term', term);
    params.append('page', page.toString());

    const resp = await appInstance.get<{users: User[]; total: number; loadMore: boolean}>(`/user/my-users`, {params});
    return resp.data;
}

export const postUser = async ( data: UserCreate) => {
    const resp = await appInstance.post<{user: User}>(`/user`, {
        ...data
    });

    return resp.data;
}

export const deleteUser = async(id: string) => {
    const resp = await appInstance.delete<{ status: boolean }>(`/user/delete/${id}`);
    return resp.data;
}

export const resetPassword = async(id: string) => {
    const resp = await appInstance.patch<{status: boolean}>(`/user/reset-password/${id}`);
    return resp.data;
}

export const changeState = async( id: string) => {
    const resp = await appInstance.patch<{message: string}>(`/user/change-state/${id}`);
    return resp.data;
}

export const updateUser = async (data: UserEdit) => {
    const {id, ...dataToSend} = data;
    const resp = await appInstance.patch<{user: User}>(`/user/update/${id}`, {
        ...dataToSend
    });

    return resp.data;
}