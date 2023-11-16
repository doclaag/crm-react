import { useLoaderData } from 'react-router-dom';
import { Client } from '../components';
import { getClients } from '../data/clients';

export function Loader() {
    const clients = getClients();

    return clients;
}

export const Home = () => {

    const clients = useLoaderData();

    return (
        <div className='px-4 py-6'>
            <h1 className='text-4xl font-black text-blue-900'>Clientes</h1>
            <p className='mt-3'>Administra tus Clientes</p>
            {
                clients.length ? (
                    <table className='w-full bg-white shadow mt-5 table-auto'>
                        <thead className='bg-blue-800 text-white'>
                            <tr>
                                <th className='p-2'>Cliente</th>
                                <th className='p-2'>Contacto</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clients.map(client => (
                                    <Client
                                        key={client.id}
                                        client={client}
                                    />
                                ))
                            }
                        </tbody>


                    </table>
                ) : (
                    <p className='text-gray-600 text-lg'>No hay Clientes aún</p>
                )
            }
        </div>
    );
};
