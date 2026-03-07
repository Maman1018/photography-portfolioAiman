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
                    {/* BACKDROP: Dims the background and handles "click anywhere outside" */}
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
                        {/* CLOSE BUTTON (X) */}
                        <button className="drawer-close" onClick={onClose}>&times;</button>

                        <div className="drawer-content">
                            <h2 className="about-name">{aboutData?.name || "Loading..."}</h2>

                            <p className="about-description">
                                {aboutData?.description || "..."}
                            </p>

                            {aboutData?.photo && (
                                <div className="about-photo-container">
                                    <img
                                        src={optimizeImg(aboutData.photo, 1200)}
                                        alt={aboutData.name}
                                        className="about-photo"
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AboutDrawer;