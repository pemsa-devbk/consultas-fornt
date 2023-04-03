import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getAccountsForUser, getMyGroups, getMyIndividualAccounts, hanldeAccounts, createCustomGroup } from '../services/accounts';
import { toast } from "react-toastify";


export const useIndividualAccounts = () => {
    return useQuery(["accounts", "individual"], getMyIndividualAccounts, {
        staleTime: 30000,
    })
}

export const useMyGroups = () => {
    return useQuery(["accounts", "groups"], getMyGroups, {
        staleTime: 30000
    })
}

export const useAccountsForUser = (id: string) => {
    return useQuery(["accounts", "user", id], () => getAccountsForUser(id), {
        staleTime: 30000
    })
}

// TODO: Verificar
export const useHanldeAccounts = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation(hanldeAccounts, {
        onSuccess: (response, task) => {
            queryClient.invalidateQueries(["accounts", "user", id]);
            toast.success('Cambios guardados');
        },
        onError: (err) => {
            console.log(err);
        }
    })
}

export const useCreateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation(createCustomGroup, {
        onSuccess(data, variables) {
            queryClient.invalidateQueries(["accounts", "groups"]);
            toast.success('Grupo creado');
        },
        onError(error, variables, context) {
            
        },
    })
}