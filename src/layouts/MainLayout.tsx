import React, { ReactNode } from 'react';
import Footer from '../components/Footer';
// import { Navbar } from '../components/Navbar';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <div className="top-logo">
                <span>CosmoDanob</span>
            </div>
            {/* <Navbar /> */}
            <main className='main-container'>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
