const BASE_URL = import.meta.env.ASTEROID_BACKEND_API_V1_BASE_URL;

export const API_ENDPOINTS = {
    ASTEROIDS: `${BASE_URL}`,
    ASTEROID_DETAILS: (id: string) => `${BASE_URL}/asteroids/${id}`,
};
