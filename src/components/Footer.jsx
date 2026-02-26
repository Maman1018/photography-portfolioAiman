// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <--- Import Link
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">

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
                        {/* FIX: Use React Router Link! */}
                        <li><Link to="/photography">Photography</Link></li>
                        <li><a href="#resume">Resume</a></li>
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
                <span>Created by AIMAN IZZAT with the help of Gemini</span>
            </div>
        </footer>
    );
};

export default Footer;