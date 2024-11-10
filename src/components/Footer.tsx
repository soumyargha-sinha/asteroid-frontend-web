import React from 'react'
import styles from './Footer.module.css';
import { FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className={`container main-content-width ${styles["footer-container"]}`}>
                <div className={styles["footer-left"]}>
                    Made with <FaHeart className={styles['inline-icon']} /> by{' '}
                    <a href="https://github.com/soumyargha-sinha/" target="_blank" rel="noopener noreferrer">
                        me.
                    </a>
                </div>
                <div className={styles["footer-right"]}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/terms-of-service">Terms of Service</NavLink>
                    <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                </div>
            </div>
        </footer>
    )
}

export default Footer