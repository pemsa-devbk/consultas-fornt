import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { changeState, deleteUser, getUsers, postUser, resetPassword, updateUser } from '../services/users';
import { hanldeError } from '../utilities/hanldeError';
import { useThemeStore } from './useThemeStore';



export const useUsers = (term: string) => {
    const [page, setPage] = useState(1);
    const usersQuery = useQuery(['users', {page, term}], () => getUsers({page, term}), {
        staleTime: 30000,
    });
    
    const nextPage = () => {
        if(!usersQuery.data?.loadMore) return;
        setPage( page + 1)
    }

    const prevPage = () => {
        if(page > 1) setPage(page -1);
    }
    

    return {
        // Properties
        usersQuery,
        // Getter
        page,
        //Methods
        setPage,
        nextPage,
        prevPage
    }
    // return useQuery(["users", {page: queryUser.page, term: queryUser.term}], () => getUsers(queryUser), {
    //     staleTime: 30000,keepPreviousData: true
    // })
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation( postUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users'])
            toast.success('Usuario creado');
        },
        onError:(error) => {
            const {error: msgError} = hanldeError(error);
            toast.error(`Error al crear el usuario, error ${msgError}`);
        }
    })
}

export const useUpdateuser = () => {
    const queryClient = useQueryClient();
    return useMutation(updateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users'])
            toast.success('Datos actualizados');
        },
        onError: () => {
            toast.error('Error al editar el usuario');
        }
    })
}

export const useChangeState = () => {
    const queryClient = useQueryClient();
    const {isDark} = useThemeStore();
    return useMutation(changeState, {
        onSuccess: (response, idUser) => {
            toast.success(response.message);
            queryClient.invalidateQueries(['users'])
        },
        onError: (err) => {
            toast.error('Error al cambiar el estado');
        }
    })
}

export const useResetPassword = () => {
    return useMutation(resetPassword, {
        onSuccess: (response, idUser) => {
            toast.success('Contaseña enviada al correo el usuario');
        },
        onError: (err) => {
            toast.error('Error al establecer una nueva contraseña');
        }
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteUser, {
        onSuccess: (response, idUser) => {
            queryClient.invalidateQueries(['users'],{exact: false})
            toast.success('Usuario eliminado');
        },
        onError: (err) => {
            toast.error('Error al eliminar el usuario');
        }
    })
}