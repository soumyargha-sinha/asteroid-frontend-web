// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AsteroidProvider } from './contexts/AsteroidContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import './theme.css';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';

const App = () => {
    return (
        <ThemeProvider>
            <AsteroidProvider>
                <Router>
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/terms-of-service" element={<TermsOfService />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        </Routes>
                    </MainLayout>
                </Router>
            </AsteroidProvider>
        </ThemeProvider>
    );
};

export default App;
