// src/components/Hero.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

// --- YOUR COMPONENTS ---
import DomeGallery from '../reactBits/DomeGallery';

// --- YOUR IMAGES ---
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

// We put the same images in an array to pass into the Dome!
const domeImagesList = [imgHero, imgLeftTop, imgLeftBottom, imgRightTop, imgRightBottom];

const Hero = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- PHASE 1: THE ASSEMBLE (0% -> 60%) ---
    const centerWidth = useTransform(scrollYProgress, [0, 0.3], ["100%", "40%"]);
    const sideY = useTransform(scrollYProgress, [0.4, 0.6], ["100vh", "0px"]);
    const sideOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
    const sideScale = useTransform(scrollYProgress, [0.3, 0.6], [0.5, 1]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    // --- PHASE 2: THE MUSEUM VOID (65% -> 85%) ---

    // 1. Grid gently pushes backward (shrinks)
    const gridScale = useTransform(scrollYProgress, [0.65, 0.72], [1, 0.8]);

    // 2. The side columns drift outward gracefully and slowly
    const leftFlyX = useTransform(scrollYProgress, [0.65, 0.72], ["0vw", "-20vw"]);
    const rightFlyX = useTransform(scrollYProgress, [0.65, 0.72], ["0vw", "20vw"]);

    // 3. Grid fades out QUICKLY.
    const gridOpacity = useTransform(scrollYProgress, [0.65, 0.72], [1, 0]);
    const gridPointer = useTransform(scrollYProgress, [0.65, 0.66], ["auto", "none"]);

    // --- THE KILL SWITCH ---
    // The millisecond opacity hits 0, we force the browser to completely hide the elements.
    // This stops the Dome from accidentally reflecting the invisible images.
    const gridVisibility = useTransform(scrollYProgress, [0.7, 0.85], ["visible", "hidden"]);

    // --- THE VOID ---
    // Gap from 0.72 to 0.78 where the screen is perfectly clean.

    // 4. Dome enters: Fades in elegantly from the empty space
    const domeScale = useTransform(scrollYProgress, [0.78, 0.85], [1.1, 1]);
    const domeOpacity = useTransform(scrollYProgress, [0.78, 0.85], [0, 1]);
    const domePointer = useTransform(scrollYProgress, [0.84, 0.85], ["none", "auto"]);

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

                {/* LAYER 1: The Original Hero Grid */}
                <motion.div
                    style={{
                        opacity: gridOpacity,
                        visibility: gridVisibility, // <--- APPLIED HERE
                        scale: gridScale,
                        pointerEvents: gridPointer,
                        position: 'absolute', inset: '20px',
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}
                >
                    <div className="gallery-grid">
                        {/* LEFT COLUMN */}
                        <motion.div
                            className="grid-col side-col"
                            style={{ opacity: sideOpacity, scale: sideScale, y: sideY, x: leftFlyX }}
                        >
                            <div className="grid-item"><img src={galleryImages.leftTop} alt="" decoding="sync" loading="eager" /></div>
                            <div className="grid-item"><img src={galleryImages.leftBottom} alt="" decoding="sync" loading="eager" /></div>
                        </motion.div>

                        {/* CENTER COLUMN */}
                        <motion.div className="grid-col center-col" style={{ width: centerWidth }}>
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

                        {/* RIGHT COLUMN */}
                        <motion.div
                            className="grid-col side-col"
                            style={{ opacity: sideOpacity, scale: sideScale, y: sideY, x: rightFlyX }}
                        >
                            <div className="grid-item"><img src={galleryImages.rightTop} alt="" decoding="sync" loading="eager"/></div>
                            <div className="grid-item"><img src={galleryImages.rightBottom} alt="" decoding="sync" loading="eager"/></div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* LAYER 2: The Dome Gallery */}
                <motion.div
                    style={{
                        opacity: domeOpacity,
                        scale: domeScale,
                        pointerEvents: domePointer,
                        position: 'absolute', inset: 0,
                        zIndex: 10,
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}
                >
                    <DomeGallery
                        images={domeImagesList}
                        overlayBlurColor="#F4F3F2"
                        grayscale={false}
                    />
                </motion.div>

            </div>
        </div>
    );
};

export default Hero;