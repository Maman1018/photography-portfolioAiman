import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import FuzzyText from './component/FuzzyText';
import Shuffle from './component/Shuffle'; // <--- 1. Import it

function Home() {
  // State to control visibility
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // Timer 1: Wait 3 seconds, then SHOW the subtitle
    const startTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 3000);

    // Timer 2: Wait 3s (delay) + 7s (reading time), then HIDE it
    // Total: 10 seconds from page load
    const endTimer = setTimeout(() => {
      setShowSubtitle(false);
    }, 10000);

    // Cleanup timers if user leaves page
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="hero-title">
          <FuzzyText baseIntensity={0.05} hoverIntensity={0.2} enableHover>
            AIMAN
          </FuzzyText>
          <span className="offset-name">
            <FuzzyText baseIntensity={0.05} hoverIntensity={0.2} enableHover>
              IZZAT
            </FuzzyText>
          </span>
        </h1>

        <p className="hero-subtitle">
          Still an inspiring learner.
        </p>

        <nav className="toc-list">
          <Link to="/photography" className="toc-item">
            <span className="toc-label">PHOTOGRAPHY</span>
            <span className="toc-dots"></span>
            <span className="toc-number">I</span>
          </Link>
          <a href="mailto:coolmaman59@email.com" className="toc-item">
            <span className="toc-label">CONTACT</span>
            <span className="toc-dots"></span>
            <span className="toc-number">II</span>
          </a>
          <Link to="/about" className="toc-item">
            <span className="toc-label">ABOUT</span>
            <span className="toc-dots"></span>
            <span className="toc-number">III</span>
          </Link>
        </nav>

        {/* --- THE SUBTITLE --- */}
        {/* We use conditional rendering (&&) so it physically mounts/unmounts */}
        <div className={`cinematic-subtitle ${showSubtitle ? 'fade-in' : 'fade-out'}`}>
           {showSubtitle && (
             <Shuffle

               text="It's Stranger Things, I know, a part of my teenage year is finally completed, considers this an homage"
                 shuffleDirection="right"
                 duration={0.5}
                 animationMode="evenodd"
                 shuffleTimes={1}
                 ease="power3.out"
                 stagger={0.03}
                 threshold={0.1}
                 triggerOnce={true}
                 triggerOnHover
                 respectReducedMotion={true}
                 loop={false}
                 loopDelay={0}
             />
           )}
        </div>
      </div>
    </div>
  );
}

export default Home;