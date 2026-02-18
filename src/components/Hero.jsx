// src/components/Hero.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

import imgLeftTop from '../assets/1-Budapest.jpg';
import imgLeftBottom from '../assets/3.1-Boldogko Castle.jpg';
import imgRightTop from '../assets/DSC03597.jpg';
import imgRightBottom from '../assets/DSC03769.jpg';
import imgHero from '../assets/DSC03755.jpg';

const galleryImages = {
    leftTop: imgLeftTop,
    leftBottom: imgLeftBottom,
    rightTop: imgRightTop,
    rightBottom: imgRightBottom
};

const Hero = () => {
    // Navbar Logic
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll Logic
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- ANIMATION TIMELINE (Native Scroll Optimized) ---

    // 1. Shrink (0% -> 30%)
    //    Happens in the first screen of scrolling.
    const centerWidth = useTransform(scrollYProgress, [0, 0.3], ["100%", "40%"]);

    // 2. The Hold (30% -> 60%)
    //    We intentionally put NO animation triggers here.
    //    The user scrolls, the image stays pinned at 40% width.
    //    This creates the "Stop" you are looking for.

    // 3. Sides Enter (60% -> 90%)
    //    They slide up ONLY after we have waited.
    //    We use a large Y value (100vh) to mimic the "Heavy Assembly" feel.
    const sideY = useTransform(scrollYProgress, [0.4, 0.6], ["100vh", "0px"]);
    const sideOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]); // Fade in quickly at start of move
    const sideScale = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]);

    // UI Fade
    const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <div ref={containerRef} className="scroll-timeline-container">
            <div className="sticky-viewport">

                {/* Navbar */}
                <div className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
                    <div className="nav-slot left">
                        <button className="menu-btn-simple">
                            <div className="line"></div><div className="line"></div>
                        </button>
                    </div>
                    <div className="nav-slot center">
                        <h1 className="brand-name">AIMAN IZZAT</h1>
                        <div className="camera-icon-box">
                            <div className="camera-lens"></div><div className="camera-flash"></div>
                        </div>
                    </div>
                    <div className="nav-slot right">
                        <nav className="frame-links">
                            <a href="#designs">Design</a>
                            <a href="#photography">Photography</a>
                        </nav>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="gallery-grid">

                    {/* Left Column */}
                    <motion.div
                        className="grid-col side-col"
                        style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
                    >
                        <div className="grid-item"><img src={galleryImages.leftTop} alt="" /></div>
                        <div className="grid-item"><img src={galleryImages.leftBottom} alt="" /></div>
                    </motion.div>

                    {/* Center Column */}
                    <motion.div
                        className="grid-col center-col"
                        style={{ width: centerWidth }}
                    >
                        <div className="hero-frame-wrapper">
                            <div className="hero-frame">
                                <div className="hero-overlay"></div>
                                <img src={imgHero} alt="Architecture" className="hero-img" decoding="sync" loading="eager" />

                                <div className={`frame-ui-bottom ${scrolled ? 'hidden' : ''}`}>
                                    <div className="line-separator"></div>
                                    <div className="bottom-row">
                                        <span className="arrow-down">↓</span>
                                        <span className="scroll-label">Scroll down</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        className="grid-col side-col"
                        style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}
                    >
                        <div className="grid-item"><img src={galleryImages.rightTop} alt="" /></div>
                        <div className="grid-item"><img src={galleryImages.rightBottom} alt="" /></div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Hero;