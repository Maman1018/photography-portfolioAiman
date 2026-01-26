import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import FuzzyText from './component/FuzzyText';
import Shuffle from './component/Shuffle';
import DustEffect from './component/DustEffect';

function Home() {

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';


  // 1. Controls if the component is physically in the DOM
  const [mountSubtitle, setMountSubtitle] = useState(false);

  // 2. Controls if the component is "Stable" (true) or "Exploding" (false)
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // Timer 1 (3s): Put text on screen AND set it to visible
    const startTimer = setTimeout(() => {
      setMountSubtitle(true);
      setShowSubtitle(true);
    }, 3000);

    // Timer 2 (10s): Tell DustEffect to explode!
    // IMPORTANT: We do NOT remove 'mountSubtitle' yet. The text must exist to be exploded.
    const endTimer = setTimeout(() => {
      setShowSubtitle(false);
    }, 10000);

    // Optional: Cleanup (12s) - Remove from DOM after dust settles
    const cleanupTimer = setTimeout(() => {
      setMountSubtitle(false);
    }, 40000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
      clearTimeout(cleanupTimer);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
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
        <div className={`cinematic-subtitle ${mountSubtitle ? 'fade-in' : ''}`}>
           {/* Only render if 'mountSubtitle' is true */}
           {mountSubtitle && (
             <DustEffect isVisible={showSubtitle}>
               {/* Inside here, we render UNCONDITIONALLY so it doesn't vanish before explosion */}
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
                 autoPlay={true}
               />
             </DustEffect>
           )}
        </div>
      </div>
    </div>
  );
}

export default Home;