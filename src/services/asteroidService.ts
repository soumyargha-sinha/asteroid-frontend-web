import { API_ENDPOINTS } from '../config';
import { generateQueryStringForUrl } from '../utils/requestUtils';

export const fetchAsteroidData = async (startDate: string, endDate: string) => {
    try {
        const response = await fetch(
            `${API_ENDPOINTS.ASTEROIDS}${generateQueryStringForUrl({startDate, endDate})}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching asteroid data:', error);
        throw error;
    }
};