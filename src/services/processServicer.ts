import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const getProcess = async () => {
    try {
        const response = await axios.get(`${API_URL}process`);
        return response.data[0];
    } catch (error) {
        console.error('Error al obtener los procesos:', error);
        throw error;
    }
};

export { getProcess };
