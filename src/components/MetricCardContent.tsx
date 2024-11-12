import React from 'react';
import Spinner from './Spinner';
import styles from './MetricCardContent.module.css';

const MetricCardContent: React.FC<any> = React.memo(({ data }: any) => {
    return (
        <div className={styles['flex-center']}>
            {data !== null && (<>
                {data.metricTitle && <p className={styles['metric-title']}>{data.metricTitle}</p>}
                {data.metricValue !== null && data.metricTitle && <h2 className={styles['metric-value']}>{data.metricValue}</h2>}
                {data.metricValue !== null && !data.metricTitle && <h2 className={`${styles['metric-value']} ${styles['single-value-metric']}`}>{data.metricValue}</h2>}
                {data.metricType && <p className={styles['metric-type']}>{data.metricType}</p>}
            </>)}
            {data == null && (<div className={styles['loader-container']}><Spinner /></div>)}
        </div>
    )
});

export default MetricCardContent