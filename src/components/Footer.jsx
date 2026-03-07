// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../contentfulClient'; // <-- Import your Contentful client
import './Footer.css';

const Footer = () => {
    // State to hold the dynamic Resume URL
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        // Fetch the specific 'resume' content model from Contentful
        client.getEntries({ content_type: 'resume', limit: 1 })
            .then(response => {
                if (response.items.length > 0) {
                    const fileData = response.items[0].fields.file;

                    // Safely extract the URL (just in case Contentful returns an array or object)
                    const actualFile = Array.isArray(fileData) ? fileData[0] : fileData;
                    const url = actualFile?.fields?.file?.url;

                    if (url) {
                        setResumeUrl(url);
                    }
                }
            })
            .catch(error => console.error("Error fetching resume:", error));
    }, []);

    return (
        <footer className="footer-section" id="footer">

            {/* Central Camera Logo */}
            <div className="footer-logo-area">
                <div className="footer-camera-box">
                    <div className="footer-camera-lens"></div>
                    <div className="footer-camera-flash"></div>
                </div>
            </div>

            <div className="footer-top">
                {/* Column 1: Bio */}
                <div className="footer-bio">
                    <h3>Let’s create something timeless.</h3>
                    <p>
                        Available for freelance opportunities and collaborations worldwide.
                        Capturing emotions, moments, and memories through a unique lens.
                    </p>
                    <a href="mailto: coolmaman59@gmail.com" className="contact-btn">Get in touch &rarr;</a>
                </div>

                {/* Column 2: Navigation */}
                <div className="footer-links-col">
                    <h4>Navigate</h4>
                    <ul>
                        <li><Link to="/">About</Link></li>
                        <li><Link to="/photography">Photography</Link></li>
                        {/* 🚨 THE FIX: Dynamic Resume Link */}
                        <li>
                            <a
                                href={resumeUrl || "#"}
                                target={resumeUrl ? "_blank" : "_self"}
                                rel="noreferrer"
                            >
                                Resume
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Social */}
                <div className="footer-links-col">
                    <h4>Social</h4>
                    <ul>
                        <li><a href="https://www.instagram.com/maman1018/" target="_blank" rel="noreferrer">Instagram</a></li>
                        <li><a href="https://www.facebook.com/aiman.izzat.92" target="_blank" rel="noreferrer">Facebook</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <span>&copy; 2026 AIMAN IZZAT</span>
                <span>Created by AIMAN IZZAT (with React and CSS) </span>
            </div>
        </footer>
    );
};

export default Footer;