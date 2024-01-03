import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const getModes = async () => {
    try {
        const response = await axios.get(`${API_URL}modes`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las modalidades:', error);
        throw error;
    }
};

export { getModes };
