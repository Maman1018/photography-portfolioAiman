// src/components/Hero.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

// Placeholder images for the new side columns
const galleryImages = {
    leftTop: "/src/assets/1-Budapest.jpg",
    leftBottom: "/src/assets/3.1-Boldogko Castle.jpg",
    rightTop: "/src/assets/DSC03597.jpg",
    rightBottom: "/src/assets/DSC03769.jpg"
};

const Hero = () => {
    // --- 1. KEEPING YOUR STABLE NAVBAR LOGIC ---
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- 2. NEW SCROLL LOGIC (Only for the Grid, not the Navbar) ---
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Grid Animations
    const centerWidth = useTransform(scrollYProgress, [0.1, 0.35], ["100%", "40%"]);
    const sideOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const sideScale = useTransform(scrollYProgress, [0.2, 0.4], [0.9, 1]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        // NEW WRAPPER: Replaces 'hero-outer-container' with a tall scrolling area
        <div ref={containerRef} className="scroll-timeline-container">

            {/* STICKY VIEWPORT: Holds the screen still while you scroll */}
            <div className="sticky-viewport">

                {/* --- STABLE NAVBAR ---
                   This is your exact code. It sits outside the grid
                   so it is never affected by flexbox/grid layout changes.
                */}
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

                {/* --- NEW GRID LAYOUT --- */}
                <div className="gallery-grid">

                    {/* LEFT COLUMN */}
                    <motion.div
                        className="grid-col side-col"
                        style={{ opacity: sideOpacity, scale: sideScale }}
                    >
                        <div className="grid-item"><img src={galleryImages.leftTop} alt="" /></div>
                        <div className="grid-item"><img src={galleryImages.leftBottom} alt="" /></div>
                    </motion.div>

                    {/* CENTER COLUMN (Holds your original Image Frame) */}
                    <motion.div
                        className="grid-col center-col"
                        style={{ width: centerWidth }}
                    >
                        {/* --- YOUR ORIGINAL IMAGE CODE ---
                           I pasted your 'hero-frame-wrapper' logic here.
                        */}
                        <div className="hero-frame-wrapper">
                            <div className="hero-frame">
                                <div className="hero-overlay"></div>
                                <img src="/src/assets/DSC03755.jpg" alt="Architecture" className="hero-img" />

                                {/* Bottom UI (Fades out via Motion) */}
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

                    {/* RIGHT COLUMN */}
                    <motion.div
                        className="grid-col side-col"
                        style={{ opacity: sideOpacity, scale: sideScale }}
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