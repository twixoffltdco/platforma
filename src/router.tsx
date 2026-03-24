import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Watch from './pages/Watch';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Placeholder from './pages/Placeholder';
import RouteError from './pages/RouteError';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'watch/:id',
        element: <Watch />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'explore',
        element: <Placeholder title="Навигатор" />,
      },
      {
        path: 'subscriptions',
        element: <Placeholder title="Подписки" />,
      },
      {
        path: 'history',
        element: <Placeholder title="История" />,
      },
      {
        path: 'liked',
        element: <Placeholder title="Понравившиеся" />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
