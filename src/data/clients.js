export const getClients = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL);
    return await response.json();
};

export const getClient = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    return await response.json();
};


export const addClient = async (data) => {

    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        return error;
    }
};


export const updateClient = async (id, data) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        return error;
    }
};

export const deleteClient = async (id) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        return error;
    }
};
