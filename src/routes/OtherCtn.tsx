import { TourProvider } from '@reactour/tour';
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { useThemeStore } from '../hooks/useThemeStore';

interface Props {
    children: JSX.Element | JSX.Element[]
}
export const OtherCtn = ({children}: Props) => {
    const {isDark, neutral, primary} = useThemeStore();
  return (
    <>
          <ToastContainer
              position='bottom-right'
              autoClose={5000}
              hideProgressBar={true}
              pauseOnHover
              draggable
              theme={isDark?'dark': 'light'}
          />
          <TourProvider
            steps={[]}
            styles={{
                popover: (base) => ({
                    ...base,
                    background: neutral,
                    "--reactour-accent": primary
                })
            }}
          >
            {children}
          </TourProvider>
    </>
  )
}
