import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { TypeAccount } from '../models';
import { PrivateRoutes } from '../models/routes';
import { useQueryStore } from '../hooks/useQueryStore';


export const AccountGuard = () => {

    const { accounts, type } = useQueryStore();

    return (accounts.length === 0 || type === TypeAccount.WITHOUT)
        ? <Navigate to='/' />
    :   <Outlet />
    
}
