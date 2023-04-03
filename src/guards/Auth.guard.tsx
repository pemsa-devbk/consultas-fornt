import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import { PublicRoutes, Status, PrivateRoutes } from '../models';

interface Props {
    privateRoute: boolean;
}

export const AuthGuard = ({ privateRoute }: Props) => {

  const { status } = useAuthStore();
    
  return privateRoute
    ?
    (status === Status.UNAUTHENTICATED)
      ?
      <Navigate replace to={`${PublicRoutes.LOGIN}`} />
      :
      <Outlet />
    :
    (status === Status.AUTHENTICATED)
      ?
      <Navigate to={PrivateRoutes.DASHBOARD} />
      : <Outlet />
}
