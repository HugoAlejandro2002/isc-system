import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const getReviewers = async () => {
    try {
        const response = await axios.get(`${API_URL}reviewers`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los revisores:', error);
        throw error;
    }
};

export { getReviewers };
