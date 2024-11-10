import React from 'react';
import { CardProps } from '../interfaces/CardProps';
import styles from './Card.module.css';

export const Card: React.FC<CardProps> = React.memo(({ title, styleData, data, children }) => {
    return (
        <div className={`${styles['card']} 
     ${styles[styleData?.topBorder || '']} 
     ${styles[styleData?.expand ? 'expand-' + styleData.expand : '']} 
     ${styles[styleData?.contentType || '']}`
        }>
            {title && <h3 className={`${styles['card-title']}`}>{title}</h3>}
            {data && <p>{data}</p>}
            {children ? children : <></>}
        </div>
    )
});
