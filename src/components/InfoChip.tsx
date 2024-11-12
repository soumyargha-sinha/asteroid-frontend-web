// import React from 'react'
import styles from './InfoChip.module.css';

const InfoChip = ({ chipText, type }: any) => {
    return (
        <span className={`${styles['info-chip']} ${styles[type || 'info-default']}`}>{chipText}</span>
    )
}

export default InfoChip