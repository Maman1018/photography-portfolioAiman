// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Trigger effect slightly earlier for smoother transition
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="hero-outer-container">

            {/* --- THE UNIFIED NAVBAR ---
          This container will shrink from "Full Width" to "Floating Pill"
      */}
            <div className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>

                {/* Left: Hamburger */}
                <div className="nav-slot left">
                    <button className="menu-btn-simple">
                        <div className="line"></div>
                        <div className="line"></div>
                    </button>
                </div>

                {/* Center: Brand Name swaps with Camera Icon */}
                <div className="nav-slot center">
                    <h1 className="brand-name">AIMAN IZZAT</h1>

                    <div className="camera-icon-box">
                        <div className="camera-lens"></div>
                        <div className="camera-flash"></div>
                    </div>
                </div>

                {/* Right: Links */}
                <div className="nav-slot right">
                    <nav className="frame-links">
                        <a href="#designs">Design</a>
                        <a href="#photography">Photography</a>
                    </nav>
                </div>

            </div>

            {/* The Framed Image Area */}
            <div className="hero-frame-wrapper">
                <div className="hero-frame">
                    <div className="hero-overlay"></div>
                    <img src="/src/assets/DSC03755.jpg" alt="Architecture" className="hero-img" />

                    {/* Bottom UI remains inside the frame */}
                    <div className="frame-ui-bottom">
                        <div className="line-separator"></div>
                        <div className="bottom-row">
                            <span className="arrow-down">↓</span>
                            <span className="scroll-label">Scroll down</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;