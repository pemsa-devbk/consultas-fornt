import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthStore, useThemeStore } from '../hooks';
import { Status } from '../models';

export const PersistLogin = () => {

    const { checkAuthToken, token, finishCheckAuth, status } = useAuthStore();
    const { isDark } = useThemeStore();
    useEffect(() => {
        !!token ? checkAuthToken() : finishCheckAuth()
    }, [token])

    useEffect(() => {
        isDark ? document.body.classList.add('dark-theme') : ''
    }, [isDark])


    return (
        <>
            {
                (status === Status.CHEKING)
                    ?
                    <p>Loading</p>
                    :
                    <Outlet />
            }
        </>
    )
}
