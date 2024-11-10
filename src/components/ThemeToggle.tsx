import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? '🌙' : '☀️'}
        </button>
    );
};
