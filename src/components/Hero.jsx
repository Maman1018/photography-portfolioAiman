// src/components/Hero.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client, optimizeImg } from '../contentfulClient';
import './Hero.css';
import AboutDrawer from './AboutDrawer';
import DomeGallery from '../reactBits/DomeGallery';

// 🚨 IMPORT OUR NEW GLOBAL HOOK
import { useTheme } from '../ThemeContext';

const Hero = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    // 🚨 THE DECOUPLED BRAIN: Pull state and function from the Global Context!
    const { isDarkMode, toggleTheme } = useTheme();

    // State to track if the logo is being hovered (this stays local because it's just for the button animation)
    const [isHovered, setIsHovered] = useState(false);

    // State to hold your 5 specific Hero photos
    const [heroData, setHeroData] = useState(null);
    const [domeImages, setDomeImages] = useState([]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // FETCH HERO IMAGES FROM CONTENTFUL
    useEffect(() => {
        client.getEntries({ content_type: 'photo' })
            .then(response => {
                const photos = response.items;

                const getImg = (position) => {
                    const match = photos.find(p => p.fields.heroPosition === position);
                    const imgData = match?.fields?.image;
                    const actualImg = Array.isArray(imgData) ? imgData[0] : imgData;
                    return actualImg?.fields?.file?.url || null;
                };

                setHeroData({
                    center: getImg('center'),
                    leftTop: getImg('leftTop'),
                    leftBottom: getImg('leftBottom'),
                    rightTop: getImg('rightTop'),
                    rightBottom: getImg('rightBottom')
                });

                // SETUP THE UNLIMITED DOME GALLERY IMAGES
                const domeUrls = photos
                    .filter(p => p.fields.showInDomeGallery === true)
                    .flatMap(p => {
                        const imgData = p.fields.image;
                        const imagesArray = Array.isArray(imgData) ? imgData : (imgData ? [imgData] : []);
                        return imagesArray.map(singleImg => {
                            const url = singleImg?.fields?.file?.url;
                            return url ? optimizeImg(url, 2000) : null;
                        });
                    })
                    .filter(Boolean);

                setDomeImages(domeUrls);
            })
            .catch(err => console.error("Error fetching hero images:", err));
    }, []);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- PHASE 1: THE ASSEMBLE (0 to 0.2) ---
    const centerWidth = useTransform(scrollYProgress, [0, 0.2], ["100%", "40%"]);
    const sideY = useTransform(scrollYProgress, [0.1, 0.2], ["100vh", "0px"]);
    const sideOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
    const sideScale = useTransform(scrollYProgress, [0.1, 0.2], [0.5, 1]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

    // --- PHASE 2: THE MUSEUM VOID (0.25 to 0.55) ---
    const gridBlur = useTransform(scrollYProgress, [0.25, 0.4, 0.55], ["blur(0px)", "blur(30px)", "blur(30px)"]);
    const gridOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.55], [1, 1, 0]);

    const gridPointer = useTransform(scrollYProgress, [0.25, 0.4], ["auto", "none"]);

    const gridDisplay = useTransform(scrollYProgress, (pos) => (pos >= 0.6 ? "none" : "flex"));

    // --- PHASE 3: THE DOME REVEAL (0.25 to 0.55) ---
    const domeScale = useTransform(scrollYProgress, [0.25, 0.55], [0.8, 1]);
    const curtainOpacity = useTransform(scrollYProgress, [0.25, 0.4], [1, 0]);

    const domePointer = useTransform(scrollYProgress, [0.45, 0.55], ["none", "auto"]);
    const instructionsOpacity = useTransform(scrollYProgress, [0.28, 0.55], [0, 1]);

    return (
        <>
            {/* THE NAVBAR */}
            <div className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
                <div className="camera-icon-box nav-anim-item nav-camera">
                    <div className="camera-lens"></div><div className="camera-flash"></div>
                </div>

                <h1 className="brand-name nav-anim-item nav-brand-full">AIMAN IZZAT</h1>

                {/* THE BUTTON */}
                <h1
                    className="brand-name nav-anim-item nav-brand-short"
                    onClick={toggleTheme} /* Still magically works via context! */
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        margin: 0,
                        zIndex: 50,
                        overflow: 'hidden',
                        backgroundColor: isHovered
                            ? (isDarkMode ? '#F4F3F2' : '#121212')
                            : 'transparent'
                    }}
                    title="Toggle Theme"
                >
                    <span style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        color: '#F4F3F2',
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                        transform: isHovered ? 'translateX(-30px)' : 'translateX(0)',
                        opacity: isHovered ? 0 : 1,
                    }}>
                        AI
                    </span>

                    <span style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                        transform: isHovered ? 'translateX(0)' : 'translateX(30px)',
                        opacity: isHovered ? 1 : 0,
                    }}>
                        {isDarkMode ? (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        ) : (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        )}
                    </span>
                </h1>

                <div className="nav-slot right" style={{ marginLeft: 'auto', zIndex: 10 }}>
                    <nav className="frame-links">
                        <button
                            onClick={() => setIsAboutOpen(true)}
                            className="nav-about-btn"
                        >
                            About
                        </button>
                        <Link to="/photography">Photography</Link>
                    </nav>
                </div>
            </div>

            {/* THE HERO SCROLL EXPERIENCE */}
            <div ref={containerRef} className="scroll-timeline-container">
                <div className="sticky-viewport">
                    <motion.div
                        style={{
                            opacity: gridOpacity,
                            filter: gridBlur,
                            pointerEvents: gridPointer,
                            display: gridDisplay,
                            position: 'absolute', inset: '20px',
                            zIndex: 30,
                            justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <div className="gallery-grid">
                            <motion.div className="grid-col side-col" style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}>
                                <div className="grid-item">
                                    {heroData?.leftTop && <img src={optimizeImg(heroData.leftTop, 800)} alt="" decoding="sync" loading="eager" />}
                                </div>
                                <div className="grid-item">
                                    {heroData?.leftBottom && <img src={optimizeImg(heroData.leftBottom, 800)} alt="" decoding="sync" loading="eager" />}
                                </div>
                            </motion.div>

                            <motion.div className="grid-col center-col" style={{ width: centerWidth }}>
                                <div className="hero-frame-wrapper">
                                    <div className="hero-frame">
                                        <div className="hero-overlay"></div>
                                        {heroData?.center && <img src={optimizeImg(heroData.center, 3000)} alt="Architecture" className="hero-img" decoding="sync" loading="eager" />}
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

                            <motion.div className="grid-col side-col" style={{ opacity: sideOpacity, scale: sideScale, y: sideY }}>
                                <div className="grid-item">
                                    {heroData?.rightTop && <img src={optimizeImg(heroData.rightTop, 800)} alt="" decoding="sync" loading="eager"/>}
                                </div>
                                <div className="grid-item">
                                    {heroData?.rightBottom && <img src={optimizeImg(heroData.rightBottom, 800)} alt="" decoding="sync" loading="eager"/>}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{
                            scale: domeScale,
                            pointerEvents: domePointer,
                            position: 'absolute', inset: 0,
                            zIndex: 10,
                            backgroundColor: 'var(--bg-color, #F4F3F2)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        {domeImages.length > 0 && (
                            <DomeGallery
                                images={domeImages}
                                overlayBlurColor={isDarkMode ? '#121212' : '#F4F3F2'}
                                grayscale={false}
                            />
                        )}
                        <motion.div
                            style={{
                                position: 'absolute',
                                inset: '-20%',
                                backgroundColor: 'var(--curtain-color, #F4F3F2)',
                                opacity: curtainOpacity,
                                pointerEvents: 'none',
                                zIndex: 20
                            }}
                        />
                    </motion.div>

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

            <AboutDrawer isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        </>
    );
};

export default Hero;