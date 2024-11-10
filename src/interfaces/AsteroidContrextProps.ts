import { AsteroidData } from "./AsteroidData";

export interface AsteroidContextProps {
    dateParameters: any;
    data: AsteroidData | null;
    loading: boolean;
    error: string | null;
    nearestAsteroid: any;
    farthestAsteroid: any;
    filteredAsteroidsData: any;
    dayOfTheWeekCounts: any;
    diameterUnit?: string; velocityUnit?: string; missDistanceUnit?: string; 
    updateDiameterUnit?: any;
    updateVelocityUnit?: any;
    updateMissDistanceUnit?: any;
}
