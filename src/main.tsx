import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router'
import { AppearanceProvider } from './context/appearance'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppearanceProvider>
      <RouterProvider router={router} />
    </AppearanceProvider>
  </StrictMode>,
)
