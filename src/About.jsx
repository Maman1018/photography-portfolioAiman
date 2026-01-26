import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/About.css';
import FuzzyText from './component/FuzzyText';
import profilePic from './assets/profilePicture.jpg';

function About() {
  const [activeSection, setActiveSection] = useState(0);
  const scrollRef = useRef(null);

  // Detect which section is currently visible to update indicators
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollY = scrollRef.current.scrollTop;
      const height = scrollRef.current.clientHeight;
      // Simple math: Scroll Position / Section Height = Index (0, 1, 2)
      const index = Math.round(scrollY / height);
      setActiveSection(index);
    }
  };

  return (
    <div className="about-page-wrapper">

      {/* THE MAIN GLASS CARD */}
      <div className="glass-card">

        {/* --- FIXED HEADER (Top) --- */}
        <div className="glass-header">
          {/* Back Button (Top Left inside glass) */}
          <Link to="/" className="glass-back-link">
            ← Home
          </Link>

          {/* Profile Section (Right side of header) */}
          <div className="header-profile">
            <div className="profile-frame-small">
              <img src={profilePic} alt="Aiman Izzat" />
              <div className="profile-glow-small"></div>
            </div>
            <div className="header-text">

                        {/* REPLACE THE FUZZYTEXT BLOCK WITH THIS: */}
                        <h1 className="header-name">
                          AIMAN IZZAT
                        </h1>

                        <p className="header-title">CS STUDENT & PHOTOGRAPHER</p>
                      </div>
          </div>
        </div>

        {/* --- SCROLLABLE BODY (Bottom) --- */}
        <div
          className="glass-body snap-container"
          ref={scrollRef}
          onScroll={handleScroll}
        >

          {/* SECTION 1: BIO */}
          <section className="snap-section">
            <div className="text-content">
              <h2>THE BIO</h2>
              <p>
                I am a Computer Science student with a passion for visual. That came from my passion in photography
                since I was a teenager. That life intersects with just liking computer and building them to
                enrolling myself into computer studies. I ask myself, which field in IT contributes to the beauty?
                Design
              </p>
            </div>
          </section>

          {/* SECTION 2: INSPIRATION */}
          <section className="snap-section">
            <div className="text-content">
              <h2>THE INSPIRATION</h2>

              <p>
                This portfolio is inspired  <em>Stranger Things</em> and Lynn Fisher. Her portfolio
                makes me realize again that design, can be beautiful when it's simple and it is always relatable.
                Other than that, this should last for some time until I got hooked on other shows.
                Probably
                <em>The Bear</em>.
              </p>
            </div>
          </section>

          {/* SECTION 3: ORBIT SYSTEM (References) */}
          {/* SECTION 3: THE WEBSITE */}
                    <section className="snap-section">
                       {/* Changed 'orbit-wrapper' to 'text-content' for better text styling */}
                       <div className="text-content">
                          <h3>THE WEBSITE</h3>
                          <p>
                            Among other things, this website is vibe-code in a week. It's amazing on what the AI can do,
                            and for someone who studies this field, it is much of a tool more than a replacement. For designers,
                            it's an advantage I believe they should take advantage of.
                          </p>
                       </div>
                    </section>

        </div>

        {/* --- INDICATORS (Bottom Left) --- */}
        <div className="glass-indicators">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`indicator-dot ${activeSection === i ? 'active' : ''}`}
            />
          ))}
          <span className="indicator-label">0{activeSection + 1}</span>
        </div>

      </div>
    </div>
  );
}

export default About;