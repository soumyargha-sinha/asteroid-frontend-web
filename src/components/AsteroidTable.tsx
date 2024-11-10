import React, { useCallback, useMemo, useState } from 'react'
import InfoChip from './InfoChip'
import { asteroidConstants } from '../config/AsteroidConstants';
import { CurrentSortConfig } from '../interfaces/CurrentSortConfig';
import { getUptoTwoDecimalPoints, sortDataByColumnKey } from '../utils/requestUtils';
import { Units } from '../interfaces/Units';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import styles from './AsteroidTable.module.css';

type MissDistanceUnits = 'kilometers' | 'meters' | 'miles' | 'feet' | 'astronomical' | 'lunar';
type VelocityUnits = 'kilometers_per_second' | 'kilometers_per_hour' | 'miles_per_hour';
type DiameterUnits = 'kilometers' | 'meters' | 'miles' | 'feet';

interface UnitConstants {
    missDistance: MissDistanceUnits;
    velocity: VelocityUnits;
    diameter: DiameterUnits;
}
type UnitsKey = 'kilometers' | 'meters' | 'miles' | 'feet' | 'kilometers_per_second' | 'kilometers_per_hour' | 'miles_per_hour' | 'astronomical' | 'lunar';

const AsteroidTable = React.memo(({ asteroidsProp, tableTitle, units }: { asteroidsProp: any[], tableTitle: string, units: Units }) => {
    const [asteroids, setAsteroids] = useState(asteroidsProp);
    const [filteredAsteroids, setFilteredAsteroids] = useState(asteroidsProp);
    const [currentPage, setCurrentPage] = useState(0);
    const [query, setQuery] = useState('');
    const [currentSortConfig, setCurrentSortConfig] = useState<CurrentSortConfig>({
        sortKey: 'datetime',
        sortDirection: 'asc',
        sortDataType: 'Date'
    });
    const itemsPerPage = asteroidConstants.tableConstants.itemsPerPage;
    const totalPages = Math.ceil(filteredAsteroids.length / itemsPerPage);
    const currentAsteroids = filteredAsteroids.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const getSortDirection = (newSortKey: string, sortConfig: CurrentSortConfig) => {
        if (newSortKey === sortConfig.sortKey) return sortConfig.sortDirection === 'asc' ? 'desc' : 'asc';
        else return sortConfig.sortDirection;
    }
    const nextPage = () => {
        if (currentPage < totalPages - 1)
            setCurrentPage((prevPage) => prevPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage((prevPage) => prevPage - 1);
    };
    const handleSorting = (e: any) => {
        const targetTh = e.target.closest('th[data-key]');
        if (targetTh) {
            const headerKey = targetTh.getAttribute('data-key');
            if (headerKey && asteroidConstants.tableConstants.headerColumns[headerKey]) {
                const sortDataType = asteroidConstants.tableConstants.headerColumns[headerKey].sortDataType;
                if (sortDataType && (sortDataType === 'String' || sortDataType === 'Number' || sortDataType === 'Date')) {
                    sortByColumnKey(headerKey, sortDataType);
                }
            }
        }
    }

    const sortByColumnKey = (newSortKey: string, newSortDataType: string) => {
        const newSortDirection = getSortDirection(newSortKey, currentSortConfig);
        setCurrentSortConfig({
            sortKey: newSortKey,
            sortDirection: newSortDirection,
            sortDataType: newSortDataType
        });
        const sortedData = sortDataByColumnKey(filteredAsteroids, newSortKey, newSortDirection, newSortDataType);
        setFilteredAsteroids(sortedData);
    };

    const debounce = (fn: any, delay: number) => {
        let timer: any;
        return function (...args: any[]) {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    const filterAsteroids = useCallback(
        (searchTerm: string) => {
            const lowercasedQuery = searchTerm.toLowerCase();
            const filtered = asteroids.filter((item: any) =>
                item.name.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredAsteroids(filtered);
            setCurrentPage(0);
        },
        [asteroids]
    );

    const debouncedFilterAsteroids = useMemo(() => debounce(filterAsteroids, 300), [filterAsteroids]);

    const handleSearchChange = (event: any) => {
        const { value } = event.target;
        setQuery(value);
        debouncedFilterAsteroids(value);
    };

    // todo: move all hardcoded column names and keys to constants file
    return (
        <>
            <div className={styles["table-header-container"]}>
                <h3 className={`${styles['table-title']} ${styles['table-header']}`}>{tableTitle}</h3>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={styles['table-container']}>
                <table>
                    <thead>
                        <tr onClick={(e) => handleSorting(e)}>
                            {asteroidConstants.tableConstants.headerKeys.map((headerKey: string) => (
                                <th key={headerKey} data-key={headerKey}>
                                    {asteroidConstants.tableConstants.headerColumns[headerKey].column}
                                    {asteroidConstants.tableConstants.headerColumns[headerKey].changeableUnit ?
                                        (' (' + asteroidConstants.unitShorthands[
                                            units[asteroidConstants.tableConstants.headerColumns[headerKey].unitType as 'missDistance' | 'velocity' | 'diameter']
                                        ] as UnitsKey + ')') : <></>}
                                    {currentSortConfig.sortKey == headerKey && ((currentSortConfig.sortDirection === 'desc') ? (<FaSortDown />) : (<FaSortUp />))}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentAsteroids.map((asteroid: any) => (
                            <tr key={asteroid.name}>
                                {asteroidConstants.tableConstants.headerKeys.map((headerKey: string) => {
                                    return asteroidConstants.tableConstants.headerColumns[headerKey].displayType !== 'chip' ?
                                        (
                                            <td key={headerKey}>
                                                {asteroidConstants.tableConstants.headerColumns[headerKey].changeableUnit ? (
                                                    (() => {
                                                        const unitType = asteroidConstants.tableConstants.headerColumns[headerKey].unitType;
                                                        const selectedUnit = units[unitType as keyof UnitConstants];
                                                        let value;
                                                        switch (headerKey) {
                                                            case 'missDistance':
                                                                value = asteroid.miss_distance[selectedUnit];
                                                                break;
                                                            case 'relativeVelocity':
                                                                value = asteroid.relative_velocity[selectedUnit];
                                                                break;
                                                            case 'estimatedDiameterMin':
                                                                value = asteroid.diameter.kilometers.estimated_diameter_min;
                                                                value = asteroid.diameter[selectedUnit].estimated_diameter_min;
                                                                break;
                                                            case 'estimatedDiameterMax':
                                                                value = asteroid.diameter[selectedUnit].estimated_diameter_max;
                                                                break;
                                                            default:
                                                                value = asteroid[headerKey];
                                                        }
                                                        return <p>{getUptoTwoDecimalPoints(value)} {asteroidConstants.unitShorthands[selectedUnit]}</p>;
                                                    })()
                                                ) : (
                                                    asteroid[headerKey]
                                                )}
                                            </td>

                                        ) :
                                        (<td key={headerKey}>
                                            <InfoChip
                                                chipText={asteroidConstants.tableConstants.headerColumns[headerKey]
                                                    .chipValues[String(asteroid[headerKey])].text}
                                                type={asteroidConstants.tableConstants.headerColumns[headerKey]
                                                    .chipValues[String(asteroid[headerKey])].class} />
                                        </td>);
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {asteroids && asteroids.length > 0 && (
                    <div className={styles["table-pagination"]}>
                        <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
                        <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</button>
                    </div>
                )}
            </div>
        </>
    )
});

export default AsteroidTable