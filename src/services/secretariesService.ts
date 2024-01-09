import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const getSecretaries = async () => {
    try {
        const response = await axios.get(`${API_URL}secretaries`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los tutores:', error);
        throw error;
    }
};

export { getSecretaries };
