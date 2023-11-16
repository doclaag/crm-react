import { Outlet, Link, useLocation } from 'react-router-dom';


export const Layout = () => {

    const location = useLocation();

    return (
        <div className='md:flex md:min-h-screen'>
            <aside className='md:w-1/4 bg-blue-900 px-5 py-10'>
                <h2 className='text-white text-4xl font-black text-center'>CRM - Clientes</h2>
                <nav className='mt-10'>
                    <div className='p-1'>
                        <Link to='/' className={`${location.pathname === '/' ? 'text-blue-300' : 'text-white'} block mt-2 hover:text-blue-300 text-2xl`}>
                            Inicio
                        </Link>
                    </div>
                    <div className='p-1'>
                        <Link to='/clientes/nuevo' className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} block mt-2 hover:text-blue-300 text-2xl`}>
                            Clientes
                        </Link>
                    </div>
                </nav>
            </aside>

            <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
                <div className='md:px-5 md:py-10'>
                    <Outlet />
                </div>
            </main>


        </div>
    );
};