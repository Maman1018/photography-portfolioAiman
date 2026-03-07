// src/components/AboutDrawer.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, optimizeImg } from '../contentfulClient';
import './AboutDrawer.css';

const AboutDrawer = ({ isOpen, onClose }) => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        if (isOpen) {
            client.getEntries({ content_type: 'about', limit: 1 })
                .then(response => {
                    if (response.items.length > 0) {
                        const fields = response.items[0].fields;
                        setAboutData({
                            name: fields.name,
                            description: fields.description,
                            photo: fields.photo?.fields?.file?.url
                        });
                    }
                })
                .catch(err => console.error("Error fetching about data:", err));
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        className="drawer-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* THE DRAWER */}
                    <motion.div
                        className="about-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* TOP PADDED CONTENT AREA */}
                        <div className="drawer-inner-content">

                            {/* Header: About ... Close */}
                            <div className="drawer-header">
                                <span className="drawer-label">(About)</span>
                                <button className="drawer-close-text" onClick={onClose}>Close</button>
                            </div>

                            {/* Main Bio */}
                            <h2 className="about-name">{aboutData?.name || "Loading..."}</h2>
                            <p className="about-description">
                                {aboutData?.description || "..."}
                            </p>

                            {/* Divider Line */}
                            <hr className="drawer-divider" />

                            {/* Let's Connect Section */}
                            <div className="drawer-connect">
                                <span className="connect-title">Let's connect</span>
                                <div className="connect-links">
                                    <div className="social-left">
                                        <a href="https://www.instagram.com/maman1018/" target="_blank" rel="noreferrer">IG</a>
                                        <a href="https://www.facebook.com/aiman.izzat.92" target="_blank" rel="noreferrer">Facebook</a>
                                    </div>
                                    <a href="mailto:coolmaman59@gmail.com" className="email-right">Email</a>
                                </div>
                            </div>

                        </div>

                        {/* BOTTOM FULL-BLEED PICTURE */}
                        {aboutData?.photo && (
                            <div className="about-photo-container">
                                <img
                                    src={optimizeImg(aboutData.photo, 1200)}
                                    alt={aboutData.name}
                                    className="about-photo"
                                />
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AboutDrawer;