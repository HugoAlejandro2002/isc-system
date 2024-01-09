import axios from 'axios';

const API_URL = 'https://isc-system-backend.vercel.app/api';

const getPresidents = async () => {
    try {
        const response = await axios.get(`${API_URL}presidents`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los tutores:', error);
        throw error;
    }
};

export { getPresidents };
