import React from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from './redux/store'
import { AppRouter } from './routes/AppRouter'
import { OtherCtn } from './routes/OtherCtn'


function App() {
  const queryClient = new QueryClient({
    defaultOptions:{
      mutations:{
        retryDelay: 5000
      },
      queries:{
        retryDelay: 5000
      }
    }
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <OtherCtn>
          <AppRouter />
        </OtherCtn>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
