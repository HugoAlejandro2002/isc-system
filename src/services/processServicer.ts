import axios from 'axios';

// const API_URL = 'http://localhost:8000/api';
const API_VERCEL = 'http://isc-system-backend.vercel.app/api';

const getProcess = async () => {
    try {
        const response = await axios.get(`${API_VERCEL}/student`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los procesos:', error);
        throw error;
    }
};

const getProcessById = async (processId: number) => {
    try {
        const response = await axios.get(`${API_VERCEL}/graduation/${processId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los procesos:', error);
        throw error;
    }

}

export { getProcess, getProcessById };
