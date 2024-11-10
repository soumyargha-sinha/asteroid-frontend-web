import { asteroidConstants } from "../config/AsteroidConstants";
import { isToday } from "./requestUtils";
type MissDistanceUnits = 'kilometers' | 'meters' | 'miles' | 'feet' | 'astronomical' | 'lunar';
type VelocityUnits = 'kilometers_per_second' | 'kilometers_per_hour' | 'miles_per_hour';
type DiameterUnits = 'kilometers' | 'meters' | 'miles' | 'feet';

interface UnitConstants {
    missDistance: MissDistanceUnits;
    velocity: VelocityUnits;
    diameter: DiameterUnits;
}
export const calculateNearestAsteroid = (data: any, unitConstants: UnitConstants) => {
    return data.reduce((nearest: any, asteroid: any) => {
        return !nearest || Number(asteroid.close_approach_data[0].miss_distance[unitConstants.missDistance]) < Number(nearest.close_approach_data[0].miss_distance[unitConstants.missDistance])
            ? asteroid
            : nearest
    }, null);
};

export const calculateFarthestAsteroid = (data: any, unitConstants: UnitConstants) => {
    return data.reduce((farthest: any, asteroid: any) =>
        !farthest || asteroid.close_approach_data[0].miss_distance[asteroidConstants.unitShorthands[unitConstants.missDistance]] > farthest.close_approach_data[0].miss_distance[asteroidConstants.unitShorthands[unitConstants.missDistance]]
            ? asteroid
            : farthest
        , null);
};

export const filterPotentiallyHazardousAsteroids = (data: any) => {
    return data.filter((asteroid: any) => asteroid.is_potentially_hazardous_asteroid);
}

export const getFilteredAsteroidData = (data: any) => {
    const potentiallyHazardousAsteroids = [], potentiallyHazardousAsteroidsToday = [], asteroidsToday = [], dailyAsteroidsCount: any = {},
        nonHazardousAsteroids = [];
    for (let i = 0; i < data.length; i++) {
        // count daily hazardous vs non-hazardous asteroids
        let dateKeyString = new Date(`${data[i].close_approach_data[0].close_approach_date_full}Z`).toISOString().split('T')[0];
        if (dailyAsteroidsCount[dateKeyString]) {
            if (data[i].is_potentially_hazardous_asteroid)
                dailyAsteroidsCount[dateKeyString].hazardous += 1;
            else
                dailyAsteroidsCount[dateKeyString].nonHazardous += 1;
        } else {
            dailyAsteroidsCount[dateKeyString] = data[i].is_potentially_hazardous_asteroid ?
                { hazardous: 1, nonHazardous: 0 } : { hazardous: 0, nonHazardous: 1 };
        }
        // If today's, add to today's list, today's potentially-hazardous list
        if (isToday(new Date(`${data[i].close_approach_data[0].close_approach_date_full}Z`))) {
            asteroidsToday.push(data[i]);
            if (data[i].is_potentially_hazardous_asteroid) potentiallyHazardousAsteroidsToday.push(data[i]);
        }
        // Add to overall potentially hazardous list
        if (data[i].is_potentially_hazardous_asteroid) potentiallyHazardousAsteroids.push(data[i]);
        else nonHazardousAsteroids.push(data[i].is_potentially_hazardous_asteroid);
    }
    return { potentiallyHazardousAsteroids, potentiallyHazardousAsteroidsToday, asteroidsToday, dailyAsteroidsCount, nonHazardousAsteroids };
}

// export const getBucketedAsteroidData = (data) => {

// }

export const getAsteroidCountsByDayOfWeek = (asteroids: any) => {
    const countByDay = asteroids.reduce((countStore: any, currentAsteroid: any) => {
        if (!countStore) countStore = {};
        const currentDayOfWeek = getDayOfWeek(new Date(`${currentAsteroid.close_approach_data[0].close_approach_date_full}Z`));
        if (countStore[currentDayOfWeek])
            countStore[currentDayOfWeek] += 1;
        else
            countStore[currentDayOfWeek] = 1;
        return countStore;
    }, null);
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].forEach((day: string) => {
        if (!countByDay[day]) countByDay[day] = 0;
    });
    return countByDay;
}

function getDayOfWeek(inputDate: Date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // return daysOfWeek[inputDate.getUTCDay()];
    return daysOfWeek[inputDate.getDay()];
}