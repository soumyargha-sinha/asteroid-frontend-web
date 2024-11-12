import React, { useEffect, useMemo, useState } from 'react';
import { useAsteroidContext } from '../contexts/AsteroidContext';
import { Card } from '../components/Card';
import { getStartAndEndDateStrings, getStringFromDate } from '../utils/requestUtils';
import Countdown from '../components/Countdown';
import MetricCardContent from '../components/MetricCardContent';
import DonutChart from '../components/charts/DonutChart';
import LineChart from '../components/charts/LineChart';
import DistanceVelocityScatterPlot from '../components/charts/DistanceVelocityScatterPlot';
import AsteroidTable from '../components/AsteroidTable';
import { asteroidConstants } from '../config/AsteroidConstants';
import { Units } from '../interfaces/Units';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import styles from './HomePage.module.css';
import { ThemeToggle } from '../components/ThemeToggle';
import Spinner from '../components/Spinner';

export const HomePage = () => {
    const { dateParameters, data, loading, nearestAsteroid, filteredAsteroidsData, dayOfTheWeekCounts, diameterUnit, velocityUnit, missDistanceUnit, updateDiameterUnit, updateVelocityUnit, updateMissDistanceUnit } = useAsteroidContext();
    const { startDate, endDate, setStartDate, setEndDate } = dateParameters;
    const [showUnits, setShowUnits] = useState(false);

    const unitValues = asteroidConstants.unitValues;
    const selectedUnits: Units = useMemo(() => {
        return {
            diameter: diameterUnit as Units["diameter"],
            velocity: velocityUnit as Units["velocity"],
            missDistance: missDistanceUnit as Units["missDistance"]
        };
    }, [diameterUnit, velocityUnit, missDistanceUnit]);

    const nearestAsteroidProps = useMemo(() => ({
        metricTitle: nearestAsteroid?.name,
        metricValue: (Math.ceil(nearestAsteroid?.close_approach_data[0].miss_distance[missDistanceUnit as string] * 100) / 100) + ` ${asteroidConstants.unitShorthands[selectedUnits.missDistance]}`,
        metricType: 'Closest Approach'
    }), [nearestAsteroid, selectedUnits]);

    const hazardousThisWeekProps = useMemo(() => ({
        metricValue: filteredAsteroidsData?.potentiallyHazardousAsteroids.length,
        metricType: 'Hazardous(?) This Week'
    }), [filteredAsteroidsData]);

    const approachingTodayProps = useMemo(() => ({
        metricValue: filteredAsteroidsData?.asteroidsToday.length,
        metricType: 'Approaching Today'
    }), [filteredAsteroidsData]);

    const hazardousTodayProps = useMemo(() => ({
        metricValue: filteredAsteroidsData?.potentiallyHazardousAsteroidsToday.length,
        metricType: 'Hazardous(?) Today'
    }), [filteredAsteroidsData]);

    const topBorderCardProp = useMemo(() => ({ topBorder: 'card-top-bordered' }), []);
    const graphCardProp = useMemo(() => ({ contentType: 'graph' }), []);
    const tableCardProp = useMemo(() => ({ tableCard: 'table-card' }),[]);

    // const [testdata, setTestdata] = useState(1);
    const handleDiameterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateDiameterUnit(e.target.value);
    };

    const handleVelocityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateVelocityUnit(e.target.value);
    };

    const handleMissDistanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateMissDistanceUnit(e.target.value);
    };
    useEffect(() => {
        if (startDate === '' || endDate === '') {
            const generatedDateStrings = getStartAndEndDateStrings(0, 7);
            setStartDate(generatedDateStrings.startDate);
            setEndDate(generatedDateStrings.endDate);
        }
    }, []);

    const dangerThisWeekMemoizedContent = useMemo(() => filteredAsteroidsData ? (<>
        <div className={styles['number-metric-container']}>
            <div className={styles["number-metric"]}>
                <p className={styles["metric-title-p"]}>Hazardous</p>
                <p className={styles["metric-p"]}>{filteredAsteroidsData?.potentiallyHazardousAsteroids.length}</p>
            </div>
            <div className={styles["number-metric"]}>
                <p className={styles["metric-title-p"]}>Non-Hazardous</p>
                <p className={styles["metric-p"]}>{filteredAsteroidsData?.nonHazardousAsteroids.length}</p>
            </div>
        </div>
        <LineChart
            data1={Object.values(filteredAsteroidsData?.dailyAsteroidsCount).map((count: any) => count.hazardous)}
            data2={Object.values(filteredAsteroidsData?.dailyAsteroidsCount).map((count: any) => count.nonHazardous)}
            label1={`Potentially Hazardous`}
            label2={`Non-hazardous`}
            days={Object.keys(filteredAsteroidsData?.dailyAsteroidsCount)}
        />
    </>) : (<></>), [filteredAsteroidsData]);

    const memoizedScatterPlotContent = useMemo(() => data && selectedUnits ? (<DistanceVelocityScatterPlot asteroids={data.asteroids} units={selectedUnits} />) : (<></>), [data, selectedUnits]);

    const memoizedWeekCount = useMemo(() => dayOfTheWeekCounts ? (<DonutChart
        centerText={String(Object.values(dayOfTheWeekCounts).reduce((acc: any, curr: any) => acc + curr, 0))}
        dataValues={Object.values(dayOfTheWeekCounts)}
        labels={Object.keys(dayOfTheWeekCounts)}
    />) : (<></>), [dayOfTheWeekCounts]);

    const memoizedAsteroidTable = useMemo(() => data ? (<AsteroidTable asteroidsProp={data.asteroidsTableData} tableTitle={`Asteroids approaching in a week`} units={selectedUnits} />) : (<></>), [data, selectedUnits]);

    const [metricNearest, metricHazardous, metricToday, metricHazardousToday] = [
        useMemo(() => <MetricCardContent data={nearestAsteroid ? nearestAsteroidProps : null} />, [nearestAsteroid, selectedUnits]),
        useMemo(() => <MetricCardContent data={filteredAsteroidsData ? hazardousThisWeekProps : null} />, [filteredAsteroidsData]),
        useMemo(() => <MetricCardContent data={filteredAsteroidsData ? approachingTodayProps : null} />, [filteredAsteroidsData]),
        useMemo(() => <MetricCardContent data={filteredAsteroidsData ? hazardousTodayProps : null} />, [filteredAsteroidsData]),
    ]
    
    const today = new Date();
    const startDateString = getStringFromDate(today).split(' ')[0];
    today.setDate(today.getDate() + 7);
    const endDateString = getStringFromDate(today).split(' ')[0];

    return (
        <section className={styles['homepage-main']}>
            <div className={"container main-content-width"}>
                <div className={styles["status-bar"]}>
                    <p>Showing data for {startDateString} to {endDateString}</p>
                    <div className={styles["action-button"]}>
                        <div className={styles["button-container"]}>
                            <button onClick={() => setShowUnits(prev => !prev)}>Change Units&nbsp;{showUnits ? <FaSortUp /> : <FaSortDown />}</button>
                            <ThemeToggle />
                        </div>
                        {showUnits && (
                            <div className={styles['form-container']}>
                                <div className={styles['form-group']}>
                                    <label>Diameter</label>
                                    <select value={diameterUnit} onChange={handleDiameterChange}>
                                        {unitValues.diameter.map((unit) => (
                                            <option key={unit.value} value={unit.value}>
                                                {unit.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles['form-group']}>
                                    <label>Velocity</label>
                                    <select value={velocityUnit} onChange={handleVelocityChange}>
                                        {unitValues.velocity.map((unit) => (
                                            <option key={unit.value} value={unit.value}>
                                                {unit.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles['form-group']}>
                                    <label>Miss Distance</label>
                                    <select value={missDistanceUnit} onChange={handleMissDistanceChange}>
                                        {unitValues.missDistance.map((unit) => (
                                            <option key={unit.value} value={unit.value}>
                                                {unit.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles["metric-panel"]}>
                    <div className={`${styles["card-holder"]} ${styles["grid-2"]}`}>
                        <Card styleData={topBorderCardProp}>
                            {metricNearest}
                        </Card>
                        <Card styleData={topBorderCardProp}>
                            {metricHazardous}
                        </Card>
                    </div>
                    <div>
                        <Card title={'Next Approaching In'} styleData={topBorderCardProp}>
                            {data && <Countdown data={data.asteroids} units={selectedUnits} />}
                            {!data && <Spinner />}
                        </Card>
                    </div>
                    <div className={`${styles["card-holder"]} ${styles["grid-2"]}`}>
                        <Card styleData={topBorderCardProp}>
                            {metricToday}
                        </Card>
                        <Card styleData={topBorderCardProp}>
                            {metricHazardousToday}
                        </Card>
                    </div>
                </div>
                <div className={styles["data-panel"]}>
                    <Card title={`Danger This Week`} styleData={graphCardProp}>
                        {filteredAsteroidsData && (
                            dangerThisWeekMemoizedContent
                        )}
                        {!filteredAsteroidsData && <Spinner />}
                    </Card>
                    <Card title={`Miss Distance vs Relative Velocity`}>
                        {data && (memoizedScatterPlotContent)}
                        {!data && <Spinner />}
                    </Card>
                    <Card title={`Approaching This Week`} styleData={graphCardProp}>
                        {dayOfTheWeekCounts && (memoizedWeekCount)}
                        {!dayOfTheWeekCounts && <Spinner />}
                    </Card>
                </div>
                <div className={`${styles["data-panel"]} ${styles["grid-3-1"]}`}>
                    <Card styleData={tableCardProp}>
                        {data && (memoizedAsteroidTable)}
                        {!data && <Spinner />}
                    </Card>
                    <Card>
                        <div className={styles["quote-block"]}>
                            <h3>"Cowards die many times before their deaths; so the fear of asteroids is genuine"
                            </h3>
                            <p>- not Shakespeare</p>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};
