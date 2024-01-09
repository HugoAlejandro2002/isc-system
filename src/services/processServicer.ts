import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const getProcess = async () => {
    try {
        const response = await axios.get(`${API_URL}student`);        
        return response.data;
    } catch (error) {
        console.error('Error al obtener los procesos:', error);
        throw error;
    }
};

export { getProcess };
