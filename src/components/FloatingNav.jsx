// src/components/FloatingNav.jsx
import React, { useState, useEffect } from 'react';
import './FloatingNav.css';

const FloatingNav = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const statementSection = document.getElementById('statement');
            if (statementSection) {
                // Show button if we scrolled past the top of the Statement section
                if (window.scrollY >= statementSection.offsetTop - window.innerHeight / 2) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth Scrolling Handlers
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const scrollToDome = () => {
        const heroContainer = document.querySelector('.scroll-timeline-container');
        if (heroContainer) {
            // The Dome reveals at exactly 45% of the Hero scroll timeline!
            const targetScroll = heroContainer.offsetHeight * 0.80;
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
    };

    const scrollToPhotography = () => {
        const genres = document.getElementById('photography');
        if (genres) genres.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToFooter = () => {
        const footer = document.getElementById('footer');
        if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={`floating-nav-wrapper ${isVisible ? 'visible' : ''}`}>
            <div className="floating-nav-glass">

                {/* 1. Home / Top */}
                <button className="nav-icon-btn tooltip" data-tip="Top" onClick={scrollToTop}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                </button>

                {/* 2. Dome Gallery */}
                <button className="nav-icon-btn tooltip" data-tip="Dome" onClick={scrollToDome}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
                </button>

                {/* 3. Genres */}
                <button className="nav-icon-btn tooltip" data-tip="Categories" onClick={scrollToPhotography}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                </button>

                {/* 4. Footer / Mail */}
                <button className="nav-icon-btn tooltip" data-tip="Contact" onClick={scrollToFooter}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </button>

                {/* Main Visible Arrow (Hidden on Hover) */}
                <div className="nav-main-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
                </div>

            </div>
        </div>
    );
};

export default FloatingNav;