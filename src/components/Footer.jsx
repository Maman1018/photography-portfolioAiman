// src/components/Footer.jsx
import React from 'react';
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
                    <a href="mailto:your@email.com" className="contact-btn">Get in touch &rarr;</a>
                </div>

                {/* Column 2: Navigation */}
                <div className="footer-links-col">
                    <h4>Navigate</h4>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#photography">Photography</a></li>
                        <li><a href="#design">Design</a></li>
                        <li><a href="#resume">Resume</a></li>
                    </ul>
                </div>

                {/* Column 3: Social */}
                <div className="footer-links-col">
                    <h4>Social</h4>
                    <ul>
                        <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                        <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
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