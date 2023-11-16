import { useNavigate, Form, useLoaderData, useActionData, redirect } from 'react-router-dom';
import { Form as ClientForm, Error } from '../components';
import { getClient, updateClient } from '../data/clients';

export const loader = async ({ params }) => {
    const client = await getClient(params.clientId);
    if (Object.values(client).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'El cliente no fue encontrado'
        });
    }
    return client;
};

export const action = async ({ request, params }) => {
    const formData = await request.formData();

    const data = Object.fromEntries(formData);
    const email = formData.get('email');

    const errors = [];
    if (Object.values(data).includes('')) {
        errors.push('Todos los campos son obligatorios');
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        errors.push('El email no es válido');
    }

    if (Object.keys(errors).length) {
        return errors;
    }

    await updateClient(params.clientId, data);

    return redirect('/');
};

export const EditClient = () => {

    const navigate = useNavigate();
    const client = useLoaderData();
    const errors = useActionData();


    return (
        <>
            <h1 className='text-4xl font-black text-blue-900'>Editar Cliente</h1>
            <p className='mt-3'>A continuación pordras modificar los datos de un cliente</p>

            <div className='flex justify-end'>
                <button
                    type='button'
                    className='bg-blue-800 text-white px-3 py-1 font-bold uppercase hover:bg-blue-900 rounded-lg'
                    onClick={() => navigate(-1)}
                >
                    Volver
                </button>
            </div>

            <div className='bg-white shadow rounded-md md: w-3/4 mx-auto px-5 py-10 mt-20'>

                {errors?.length && errors.map((error, i) =>
                    <Error key={i}>
                        {error}
                    </Error>
                )}

                <Form
                    method='post'
                    noValidate
                >
                    <ClientForm
                        client={client}
                    />
                    <input
                        type='submit'
                        className='bg-blue-800 w-full mt-5 p-3 text-white uppercase font-bold hover:bg-blue-900 rounded-lg cursor-pointer'
                        value='Guardar Cambios'
                    />
                </Form>
            </div>
        </>
    );
};
