import React, { useEffect, useMemo, useState } from 'react'
import { getTimeForCountdown } from '../utils/requestUtils';
import InfoChip from './InfoChip';
import { Units } from '../interfaces/Units';
import styles from './Countdown.module.css';
import { asteroidConstants } from '../config/AsteroidConstants';

const Countdown = ({ data, units }: { data: any, units: Units }) => {
    const [countdownTime, setCountdownTime] = useState<number | null>(null);
    const [takeNewAsteroid, setTakeNewAsteroid] = useState(0);
    let nextAsteroid = useMemo(() => {
        if (data)
            for (let i = 0; i < data.length; i++) {
                if ((new Date(String(`${data[i].close_approach_data[0].close_approach_date_full}Z`)).getTime() - Date.now()) > 0) {
                    return {
                        ...data[i],
                        targetTime: new Date(String(`${data[i].close_approach_data[0].close_approach_date_full}Z`)).getTime()
                    }
                }
            }
        return null;
    }, [data, takeNewAsteroid]);
    useEffect(() => {
        if (nextAsteroid) {
            setCountdownTime(nextAsteroid.targetTime - Date.now());
            const countdownTimer = setInterval(() => {
                const timeTill = nextAsteroid.targetTime - Date.now();
                if (timeTill <= 0) {
                    clearInterval(countdownTimer);
                    setTakeNewAsteroid(prev => prev + 1);
                } else {
                    setCountdownTime(timeTill);
                }
            }, 1000);
            return () => clearInterval(countdownTimer);
        }
    }, [nextAsteroid]);
    return (
        <div className={styles["countdown-container"]}>
            <div className={styles['countdown-middle']}>
                {countdownTime && <div className={styles['countdown-panel']}>{getTimeForCountdown(nextAsteroid.targetTime - Date.now())}</div>}
                {!countdownTime && <p>Not Available</p>}
                {nextAsteroid && nextAsteroid.is_potentially_hazardous_asteroid ?
                    <InfoChip chipText='Potentially Hazardous' type='info-danger' /> :
                    <InfoChip chipText='Not Potentially Hazardous' type='info-safe' />}
            </div>
            {nextAsteroid && units.missDistance && (
                <div>
                    Miss Distance: {(Math.ceil(nextAsteroid.close_approach_data[0].miss_distance[units.missDistance] * 100) / 100) + ` ${asteroidConstants.unitShorthands[units.missDistance]}`}
                </div>
            )}
        </div>
    )
}

export default Countdown