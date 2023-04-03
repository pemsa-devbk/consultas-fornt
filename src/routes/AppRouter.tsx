import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard, PersistLogin, TermsGuard } from '../guards'
import { Loader2 } from '../components/Loader2';
import { TermsAndConditions } from '../pages/private/TermsAndConditions/TermsAndConditions';

const Login = lazy(() => import('../pages/public/login/Login'))
const Dashboard = lazy(() => import('../pages/private/Dashboard'))

export const AppRouter = () => {
    return (
        <Suspense fallback={<Loader2 center='F'/>}>
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route element={<AuthGuard privateRoute={false}/>}>
                        <Route path='home' element={<h1>hh</h1>} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/' element={<Navigate to='/login' />} />
                    </Route>
                    <Route element={<AuthGuard privateRoute={true} />}>                        
                        <Route element={<TermsGuard requiereTerms={false}/>}>
                            <Route path='terms-conditions' element={<TermsAndConditions />} />
                        </Route>
                        <Route element={<TermsGuard requiereTerms={true} />}>
                            <Route path='dashboard/*' element={
                                <Routes>
                                    <Route path='/*' element={<Dashboard />} />
                                </Routes>
                            }>
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    )
}