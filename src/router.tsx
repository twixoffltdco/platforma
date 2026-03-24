import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Watch from './pages/Watch';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Placeholder from './pages/Placeholder';

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
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/explore',
    element: <Placeholder title="Навигатор" />,
  },
  {
    path: '/subscriptions',
    element: <Placeholder title="Подписки" />,
  },
  {
    path: '/history',
    element: <Placeholder title="История" />,
  },
  {
    path: '/liked',
    element: <Placeholder title="Понравившиеся" />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
