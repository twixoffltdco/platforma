import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router'
import { AppearanceProvider } from './context/appearance'
import { AppErrorBoundary } from './components/AppErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <AppearanceProvider>
        <RouterProvider router={router} />
      </AppearanceProvider>
    </AppErrorBoundary>
  </StrictMode>,
)
