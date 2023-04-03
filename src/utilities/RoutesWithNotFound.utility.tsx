import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/public/NotFound/NotFound';


interface Props {
    children: JSX.Element[] | JSX.Element;
}

export const RoutesWithNotFound = ({children}:Props) => {
  return (
    <Routes>
        {children}
        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
