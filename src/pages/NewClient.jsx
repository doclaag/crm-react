import { useNavigate, Form, useActionData, redirect } from 'react-router-dom';
import { Form as ClientForm, Error } from '../components';
import { addClient } from '../data/clients';

export async function action({ request }) {
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

    await addClient(data);

    return redirect('/');
}

export const NewClient = () => {

    const errors = useActionData();

    const navigate = useNavigate();

    console.log(errors);
    return (
        <>
            <h1 className='text-4xl font-black text-blue-900'>Nuevo Cliente</h1>
            <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>

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
                    <ClientForm />
                    <input
                        type='submit'
                        className='bg-blue-800 w-full mt-5 p-3 text-white uppercase font-bold hover:bg-blue-900 rounded-lg cursor-pointer'
                        value='Registrar Cliente'
                    />

                </Form>


            </div>




        </>
    );
};