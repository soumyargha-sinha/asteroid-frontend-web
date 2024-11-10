import { useState, useEffect } from 'react';
import { fetchAsteroidData } from '../services/asteroidService';
import { AsteroidData } from '../interfaces/AsteroidData';
import { getMonthStringFromDate, getStringFromDate, getUptoTwoDecimalPoints } from '../utils/requestUtils';
import { useLocalStorage } from './useLocalStorage';
import { asteroidConstants } from '../config/AsteroidConstants';

type AsteroidsListProp = {
    startDate: string;
    endDate: string;
}

export const useAsteroidData = ({ startDate, endDate }: AsteroidsListProp) => {
    const [data, setData] = useState<AsteroidData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { cachedData, setData: setCachedData } = useLocalStorage('asteroid_data', asteroidConstants.localStorageExpiryTime);

    useEffect(() => {
        if (cachedData) {
            setData(cachedData);
            setLoading(false);
        }
        else {
            const getAsteroidData = async (startDate: string, endDate: string) => {
                setLoading(true);
                try {
                    if (startDate !== '' || endDate !== '') {
                        const data = await fetchAsteroidData(startDate, endDate);
                        if (data?.asteroids) {
                            data.asteroidsTableData = data.asteroids.map((asteroid: any) => {
                                return {
                                    name: asteroid.name,
                                    datetime: getMonthStringFromDate(new Date(String(`${asteroid.close_approach_data[0].close_approach_date_full}Z`))),
                                    datetimeFull: getStringFromDate(new Date(String(`${asteroid.close_approach_data[0].close_approach_date_full}Z`))),
                                    missDistance: getUptoTwoDecimalPoints(asteroid.close_approach_data[0].miss_distance.kilometers),
                                    // estimatedDiameterMin: getUptoTwoDecimalPoints(asteroid.estimated_diameter.kilometers.estimated_diameter_min),
                                    // estimatedDiameterMax: getUptoTwoDecimalPoints(asteroid.estimated_diameter.kilometers.estimated_diameter_max),
                                    estimatedDiameterMin: Number(asteroid.estimated_diameter.kilometers.estimated_diameter_min),
                                    estimatedDiameterMax: Number(asteroid.estimated_diameter.kilometers.estimated_diameter_max),
                                    relativeVelocity: getUptoTwoDecimalPoints(asteroid.close_approach_data[0].relative_velocity.kilometers_per_second),
                                    dangerPotential: asteroid.is_potentially_hazardous_asteroid,
                                    diameter: asteroid.estimated_diameter,
                                    relative_velocity: asteroid.close_approach_data[0].relative_velocity,
                                    miss_distance: asteroid.close_approach_data[0].miss_distance
                                };
                            });
                        }
                        setData(data);
                        setCachedData(data);
                    }
                } catch (err) {
                    setError('Failed to fetch asteroid data');
                } finally {
                    if (startDate !== '' || endDate !== '')
                        setLoading(false);
                }
            };
            getAsteroidData(startDate, endDate);
        }
    }, [startDate, endDate]);

    return { data, loading, error };
};
