// src/components/MobileBlocker.jsx
import React, { useState, useEffect } from 'react';
import './MobileBlocker.css';

const MobileBlocker = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            // 768px is the standard breakpoint for tablets and phones
            setIsMobile(window.innerWidth <= 768);
        };

        // Check immediately on first load
        checkScreenSize();

        // Listen for window resizing (in case someone shrinks their browser window)
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // If it is a mobile screen, render ONLY the blocker screen
    if (isMobile) {
        return (
            <div className="mobile-blocker-container">
                <div className="mobile-blocker-content">
                    <h1 className="blocker-logo">AIMAN IZZAT</h1>
                    <p className="blocker-message">
                        Hello there, thank you for getting on my page.
                        For the intended visual experience, please view this portfolio on a desktop screen.
                    </p>
                </div>
            </div>
        );
    }

    // If it's a desktop screen, render the actual website (the 'children')
    return children;
};

export default MobileBlocker;