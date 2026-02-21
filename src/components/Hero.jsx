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

    // --- PHASE 1: THE ASSEMBLE ---
    // Recalculated for 1200vh so the speed feels exactly the same as before
    const centerWidth = useTransform(scrollYProgress, [0, 0.2], ["100%", "40%"]);
    const sideY = useTransform(scrollYProgress, [0.1, 0.2], ["100vh", "0px"]);
    const sideOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
    const sideScale = useTransform(scrollYProgress, [0.1, 0.2], [0.5, 1]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

    // --- PHASE 2: THE MUSEUM VOID ---
    const gridScale = useTransform(scrollYProgress, [0.4, 0.48], [1, 0.8]);
    const leftFlyX = useTransform(scrollYProgress, [0.4, 0.48], ["0vw", "-20vw"]);
    const rightFlyX = useTransform(scrollYProgress, [0.4, 0.48], ["0vw", "20vw"]);
    const gridOpacity = useTransform(scrollYProgress, [0.4, 0.48], [1, 0]);
    const gridPointer = useTransform(scrollYProgress, [0.4, 0.44], ["auto", "none"]);

    // --- THE KILL SWITCH ---
    // Triggers instantly at 0.48 when opacity hits 0
    const gridVisibility = useTransform(scrollYProgress, [0.55, 0.6], ["visible", "hidden"]);

    // --- DOME ENTERS ---
    // Dome finishes loading at 0.58 (58% of the way down).
    // This leaves from 0.58 to 1.0 (about 5 full mouse wheel scrolls) purely for exploring the Dome!
    const domeScale = useTransform(scrollYProgress, [0.48, 0.58], [1.1, 1]);
    const domePointer = useTransform(scrollYProgress, [0.48, 0.58], ["none", "auto"]);

    const curtainOpacity = useTransform(scrollYProgress, [0.48, 0.58], [1, 0]);

    const instructionsOpacity = useTransform(scrollYProgress, [0.49, 0.58], [0, 1]);

    return (
        <> {/* <--- ADD THIS FRAGMENT WRAPPER */}

            {/* THE NAVBAR: Now moved completely outside of the scroll containers! */}
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

            {/* THE HERO SCROLL EXPERIENCE */}
            <div ref={containerRef} className="scroll-timeline-container">
                <div className="sticky-viewport">

                    {/* LAYER 1: The Original Hero Grid */}
                    <motion.div
                        style={{
                            opacity: gridOpacity,
                            visibility: gridVisibility,
                            scale: gridScale,
                            pointerEvents: gridPointer,
                            position: 'absolute', inset: '20px',
                            zIndex: 30,
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
                    <motion.div
                        style={{
                            position: 'absolute',
                            inset: '-20%',
                            backgroundColor: '#F4F3F2',
                            opacity: curtainOpacity,
                            pointerEvents: 'none',
                            zIndex: 20
                        }}
                    />
                </motion.div>

                {/* LAYER 3: Dome Instructions Overlay */}
                {/* Fades in exactly when the Dome does */}
                <motion.div
                    className="dome-instructions"
                    style={{ opacity: instructionsOpacity }}
                >
                    <span>Click & Drag to explore</span>
                    <span className="instruction-dot"></span>
                    <span>Tap to expand</span>
                </motion.div>

            </div>
        </div>
        </>
    );
};

export default Hero;