import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Watch from './pages/Watch'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/watch/:id',
    element: <Watch />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
