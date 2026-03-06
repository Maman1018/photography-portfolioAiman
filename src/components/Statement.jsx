// src/components/Statement.jsx
import React from 'react';
import './Statement.css';

const Statement = () => {
    return (
        <section className="statement-section">

            {/* 1. THE NEW INTRO STATEMENT */}
            <h2 className="statement-intro">
                I'm a computer engineering <span className="font-caveat">student</span><br />
                &amp; <span className="font-caveat">web </span>
                <span className="font-caveat">designing</span> is my passion
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