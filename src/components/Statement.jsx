// src/components/Statement.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Statement.css';

const Statement = () => {
    // --- ANIMATION SETTINGS FOR "student" ---
    const studentWord = "student";

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } }
    };

    // --- LOGIC FOR THE SWAPPING WORDS ---
    const words = ["web designing", "photography"];
    const [wordIndex, setWordIndex] = useState(0);
    const timerRef = useRef(null);

    // Starts the 3-second auto-swap timer
    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setWordIndex((prev) => (prev === 0 ? 1 : 0));
        }, 3000);
    };

    useEffect(() => {
        startTimer();
        // Cleanup the timer when the component unmounts
        return () => clearInterval(timerRef.current);
    }, []);

    // Handles the manual click and resets the timer
    const handleWordClick = () => {
        clearInterval(timerRef.current); // Stop the current timer
        setWordIndex((prev) => (prev === 0 ? 1 : 0)); // Swap the word
        startTimer(); // Start a fresh 3-second countdown
    };

    return (
        <section className="statement-section">

            {/* 1. THE NEW INTRO STATEMENT */}
            <h2 className="statement-intro">
                I'm a computer engineering{" "}

                {/* THE TYPING ANIMATION */}
                <motion.span
                    className="font-caveat"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                >
                    {studentWord.split("").map((char, index) => (
                        <motion.span key={index} variants={letterVariants}>
                            {char}
                        </motion.span>
                    ))}
                </motion.span>
                <br />

                {/* THE INTERACTIVE SWAPPING WORDS */}
                &amp;{" "}
                <span className="word-slider-container" onClick={handleWordClick}>
                    {/* INVISIBLE PLACEHOLDER: Locks the sentence width to the longest word so it NEVER shifts! */}
                    <span className="font-caveat" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
                        web designing
                    </span>

                    {/* THE ANIMATED WORDS */}
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={wordIndex}
                            className="font-caveat hover-underline slider-word"
                            initial={{ y: 25, opacity: 0 }}       // Starts slightly below and invisible
                            animate={{ y: 0, opacity: 1 }}        // Slides up to center
                            exit={{ y: -25, opacity: 0 }}         // Slides up and fades out
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Smooth cinematic easing
                        >
                            {words[wordIndex]}
                        </motion.span>
                    </AnimatePresence>
                </span>
                {" "}is my passion
            </h2>

            {/* 2. THE SUBTLE SUBTITLE */}
            <h3 className="statement-small">
                Moments • Emotions • Memories
            </h3>

            {/* 3. THE GIANT EXISTING TEXT */}
            <h1 className="statement-big">
                I capture
            </h1>

        </section>
    );
};

export default Statement;