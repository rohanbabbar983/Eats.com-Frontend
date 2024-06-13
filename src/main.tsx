import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes.tsx'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'sonner'
 const queryclient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    },
  }

 });
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryclient}>
          <Auth0ProviderWithNavigate>
              <AppRoutes/>
              <Toaster visibleToasts={1} duration={2000} position='top-right' richColors/>
          </Auth0ProviderWithNavigate>  
        
      </QueryClientProvider>
      
    </Router>
  </React.StrictMode>,
)
