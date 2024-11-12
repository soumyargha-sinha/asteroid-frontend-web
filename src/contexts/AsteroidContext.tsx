import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { useAsteroidData } from '../hooks/useAsteroidData';
import { calculateNearestAsteroid, calculateFarthestAsteroid, getFilteredAsteroidData, getAsteroidCountsByDayOfWeek } from '../utils/asteroidCalculations';
import { AsteroidContextProps } from '../interfaces/AsteroidContrextProps';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AsteroidContext = createContext<AsteroidContextProps | undefined>(undefined);

export const AsteroidProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const dateParameters = { startDate, endDate, setStartDate, setEndDate };

    const defaultDiameterUnit = 'miles';
    const defaultVelocityUnit = 'miles_per_hour';
    const defaultMissDistance = 'miles';
    const expiryTimeInMs = 60 * 60 * 1000;

    const { cachedData: diameterUnit, setData: setDiameterUnit } = useLocalStorage('diameterUnit', expiryTimeInMs);
    const { cachedData: velocityUnit, setData: setVelocityUnit } = useLocalStorage('velocityUnit', expiryTimeInMs);
    const { cachedData: missDistanceUnit, setData: setMissDistanceUnit } = useLocalStorage('missDistanceUnit', expiryTimeInMs);

    const finalDiameterUnit = diameterUnit || defaultDiameterUnit;
    const finalVelocityUnit = velocityUnit || defaultVelocityUnit;
    const finalMissDistance = missDistanceUnit || defaultMissDistance;

    const unitValues = useMemo(() => ({ diameter: finalDiameterUnit, missDistance: finalMissDistance, velocity: finalVelocityUnit }), [
        finalDiameterUnit, finalVelocityUnit, finalMissDistance
    ]);

    const { data, loading, error } = useAsteroidData({ startDate, endDate });

    const memoizedNearestAsteroid = useMemo(() => {
        return data && data.asteroids ? calculateNearestAsteroid(data.asteroids, unitValues) : null;
    }, [data]);

    const memoizedFarthestAsteroid = useMemo(() => {
        return data && data.asteroids ? calculateFarthestAsteroid(data.asteroids, unitValues) : null;
    }, [data]);

    const memoizedFilteredAsteroidsData = useMemo(() => {
        return data && data.asteroids ? getFilteredAsteroidData(data.asteroids) : null;
    }, [data]);

    const memoizedDayOfTheWeekCounts = useMemo(() => {
        return data && data.asteroids ? getAsteroidCountsByDayOfWeek(data.asteroids) : null;
    }, [data]);

    const [nearestAsteroid, setNearestAsteroid] = useState<any>(null);
    const [farthestAsteroid, setFarthestAsteroid] = useState<any>(null);
    const [filteredAsteroidsData, setFilteredAsteroidsData] = useState<any>(null);
    const [dayOfTheWeekCounts, setDayOfTheWeekCounts] = useState<any>(null);

    useEffect(() => {
        setNearestAsteroid(memoizedNearestAsteroid);
    }, [memoizedNearestAsteroid]);

    useEffect(() => {
        setFarthestAsteroid(memoizedFarthestAsteroid);
    }, [memoizedFarthestAsteroid]);

    useEffect(() => {
        setFilteredAsteroidsData(memoizedFilteredAsteroidsData);
        setDayOfTheWeekCounts(memoizedDayOfTheWeekCounts);
    }, [memoizedFilteredAsteroidsData]);

    const updateDiameterUnitValue = (newUnit: string) => {
        setDiameterUnit(newUnit);
    };

    const updateVelocityUnitValue = (newUnit: string) => {
        setVelocityUnit(newUnit);
    };

    const updateMissDistanceUnitValue = (newUnit: string) => {
        setMissDistanceUnit(newUnit);
    };

    return (
        <AsteroidContext.Provider value={{
            dateParameters,
            data, loading, error,
            nearestAsteroid, farthestAsteroid, filteredAsteroidsData, dayOfTheWeekCounts,
            diameterUnit: finalDiameterUnit, velocityUnit: finalVelocityUnit, missDistanceUnit: finalMissDistance,
            updateDiameterUnit: updateDiameterUnitValue, updateVelocityUnit: updateVelocityUnitValue, updateMissDistanceUnit: updateMissDistanceUnitValue
        }}>
            {children}
        </AsteroidContext.Provider>
    );
};

export const useAsteroidContext = () => {
    const context = useContext(AsteroidContext);
    if (!context) throw new Error('Context not found!');
    return context;
};
