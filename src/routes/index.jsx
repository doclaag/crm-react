import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage, Layout } from '../components';
import { Home, Loader as clientsLoader } from '../pages';
import { NewClient, action as newClientAction } from '../pages/NewClient';
import { EditClient, loader as editClientLoader, action as editClientAction } from '../pages/EditClient';
import { action as deleteClientAction } from '../components/Client';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: clientsLoader,
                errorElement: <ErrorPage />
            },
            {
                path: '/clientes/nuevo',
                element: <NewClient />,
                action: newClientAction,
                errorElement: <ErrorPage />
            }, {
                path: '/clientes/:clientId/editar',
                element: <EditClient />,
                loader: editClientLoader,
                action: editClientAction,
                errorElement: <ErrorPage />
            }, {
                path: '/clientes/:clientId/eliminar',
                action: deleteClientAction
            },
        ],
    },
]);