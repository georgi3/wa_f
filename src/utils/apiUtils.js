export const apiCall = async (url, method, headers = {}, body = null) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: body ? JSON.stringify(body) : null
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
};

export const processUserData = (data) => {
    return {
        refresh: data.access,
        access: data.access,
        token: data.token,
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        address: data?.address,
        carType: data?.car_type,
        phone: data?.phone,
        organization: data?.organization,
        zipCode: data?.zip_code,
    };
};