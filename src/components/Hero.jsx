// src/components/Hero.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client, optimizeImg } from '../contentfulClient';
import './Hero.css';
import AboutDrawer from './AboutDrawer';

import DomeGallery from '../reactBits/DomeGallery';

const Hero = () => {
    const [scrolled, setScrolled] = useState(false);

    // State to hold your 5 specific Hero photos
    const [heroData, setHeroData] = useState(null);
    const [domeImages, setDomeImages] = useState([]);

    const [isAboutOpen, setIsAboutOpen] = useState(false);


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

                // Put this right below: const photos = response.items;
                console.log("1. ALL DATA:", photos);
                console.log("2. FIRST ITEM'S FIELDS:", photos[0]?.fields);
                console.log("3. IS THERE AN IMAGE URL?:", photos[0]?.fields?.image?.fields?.file?.url);

                const getImg = (position) => {
                    const match = photos.find(p => p.fields.heroPosition === position);
                    const imgData = match?.fields?.image;

                    // 🚨 THE FIX: If it's a list (Array), grab the first item [0].
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

                // 2. SETUP THE UNLIMITED DOME GALLERY IMAGES
                const domeUrls = photos
                    // Find ONLY the entries where the toggle is checked "Yes"
                    .filter(p => p.fields.showInDomeGallery === true)
                    // 🚨 THE FIX: Use flatMap to unpack all images inside those entries
                    .flatMap(p => {
                        const imgData = p.fields.image;
                        const imagesArray = Array.isArray(imgData) ? imgData : (imgData ? [imgData] : []);

                        // Extract the URL for every single image
                        return imagesArray.map(singleImg => {
                            const url = singleImg?.fields?.file?.url;
                            return url ? optimizeImg(url, 2000) : null;
                        });
                    })
                    .filter(Boolean); // Remove any empty/null values

                setDomeImages(domeUrls);
            })
            .catch(err => console.error("Error fetching hero images:", err));
    }, []);


    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- PHASE 1: THE ASSEMBLE ---
    const centerWidth = useTransform(scrollYProgress, [0, 0.2], ["100%", "40%"]);
    const sideY = useTransform(scrollYProgress, [0.1, 0.2], ["100vh", "0px"]);
    const sideOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
    const sideScale = useTransform(scrollYProgress, [0.1, 0.2], [0.5, 1]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

    // --- PHASE 2: THE MUSEUM VOID ---
    const gridScale = useTransform(scrollYProgress, [0.3, 0.4], [1, 0.8]);
    const leftFlyX = useTransform(scrollYProgress, [0.3, 0.4], ["0vw", "-20vw"]);
    const rightFlyX = useTransform(scrollYProgress, [0.3, 0.4], ["0vw", "20vw"]);
    const gridOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);
    const gridZIndex = useTransform(scrollYProgress, (pos) => (pos < 0.4 ? 30 : 5));
    const gridPointer = useTransform(scrollYProgress, [0.3, 0.35], ["auto", "none"]);

    // --- PHASE 3: THE DOME REVEAL ---
    const domeScale = useTransform(scrollYProgress, [0.38, 0.48], [0.8, 1]);
    const curtainOpacity = useTransform(scrollYProgress, [0.38, 0.48], [1, 0]);
    const domePointer = useTransform(scrollYProgress, [0.45, 0.48], ["none", "auto"]);
    const instructionsOpacity = useTransform(scrollYProgress, [0.35, 0.4], [0, 1]);

    return (
        <>
            {/* THE NAVBAR */}
                <div className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
                    <div className="camera-icon-box nav-anim-item nav-camera">
                        <div className="camera-lens"></div><div className="camera-flash"></div>
                    </div>
                    <h1 className="brand-name nav-anim-item nav-brand-full">AIMAN IZZAT</h1>
                    <h1 className="brand-name nav-anim-item nav-brand-short">AI</h1>
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

                        {/* LAYER 1: The Original Hero Grid */}
                        <motion.div
                            style={{
                                opacity: gridOpacity,
                                scale: gridScale,
                                pointerEvents: gridPointer,
                                position: 'absolute', inset: '20px',
                                zIndex: gridZIndex,
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <div className="gallery-grid">
                                {/* LEFT COLUMN */}
                                <motion.div className="grid-col side-col" style={{ opacity: sideOpacity, scale: sideScale, y: sideY, x: leftFlyX }}>
                                    <div className="grid-item">
                                        {heroData?.leftTop && <img src={optimizeImg(heroData.leftTop, 800)} alt="" decoding="sync" loading="eager" />}
                                    </div>
                                    <div className="grid-item">
                                        {heroData?.leftBottom && <img src={optimizeImg(heroData.leftBottom, 800)} alt="" decoding="sync" loading="eager" />}
                                    </div>
                                </motion.div>

                                {/* CENTER COLUMN */}
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

                                {/* RIGHT COLUMN (Duplicate has been removed!) */}
                                <motion.div className="grid-col side-col" style={{ opacity: sideOpacity, scale: sideScale, y: sideY, x: rightFlyX }}>
                                    <div className="grid-item">
                                        {heroData?.rightTop && <img src={optimizeImg(heroData.rightTop, 800)} alt="" decoding="sync" loading="eager"/>}
                                    </div>
                                    <div className="grid-item">
                                        {heroData?.rightBottom && <img src={optimizeImg(heroData.rightBottom, 800)} alt="" decoding="sync" loading="eager"/>}
                                    </div>
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
                            {/* 🚨 THE FIX: Only mount Dome if it found images from the Contentful toggle! */}
                            {domeImages.length > 0 && (
                                <DomeGallery
                                    images={domeImages} // Pass the new array here!
                                    overlayBlurColor="#F4F3F2"
                                    grayscale={false}
                                />
                            )}
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