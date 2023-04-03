import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import { PublicRoutes, Status, PrivateRoutes } from '../models';

interface Props {
    requiereTerms: boolean;
}



export const TermsGuard = ({ requiereTerms }: Props) => {

    const { user:{termsAndConditions}, token } = useAuthStore();
    
    

    return requiereTerms
        ?
        (termsAndConditions && !!token)
            ?
            <Outlet />
            :
            <Navigate replace to={`${PrivateRoutes.TERMS_CONDITIONS}`} />
        :
            (termsAndConditions && !!token)
            ?
            <Navigate replace to={`${PrivateRoutes.HOME}`} />
            :
            <Outlet />
}
