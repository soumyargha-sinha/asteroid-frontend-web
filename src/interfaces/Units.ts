type MissDistanceUnits = 'kilometers' | 'meters' | 'miles' | 'feet' | 'astronomical' | 'lunar';
type VelocityUnits = 'kilometers_per_second' | 'kilometers_per_hour' | 'miles_per_hour';
type DiameterUnits = 'kilometers' | 'meters' | 'miles' | 'feet';

export interface Units {
    missDistance: MissDistanceUnits;
    velocity: VelocityUnits;
    diameter: DiameterUnits;
}

// export interface Units {
//     diameter?: 'kilometers' | 'meters' | 'miles' | 'feet';
//     velocity?: 'kilometers_per_second' | 'kilometers_per_hour' | 'miles_per_hour';
//     missDistance?: 'astronomical' | 'lunar' | 'kilometers' | 'miles';
// }