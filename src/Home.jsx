import { Link } from 'react-router-dom';
import './styles/Home.css'; // We will create this specific style next
import FuzzyText from './component/FuzzyText'


function Home() {
  return (
    <div className="landing-container">
      <div className="landing-content">
          <h1 className="hero-title">
            <FuzzyText
              baseIntensity={0.0}
              hoverIntensity={0.2}
              enableHover
            >
              AIMAN
            </FuzzyText>

            <span className="offset-name">
              <FuzzyText
                baseIntensity={0.0}
                hoverIntensity={0.2}
                enableHover
              >
                IZZAT
              </FuzzyText>
            </span>
          </h1>

        <p className="hero-subtitle">
          Still an inspiring learner.
        </p>

        <nav className="toc-list">
                  {/* Link 1: Work */}
                  <Link to="/photography" className="toc-item">
                    <span className="toc-label">PHOTOGRAPHY</span>
                    <span className="toc-dots"></span>
                    <span className="toc-number">I</span>
                  </Link>

                  {/* Link 2: Contact */}
                  <a href="mailto:your@email.com" className="toc-item">
                    <span className="toc-label">CONTACT</span>
                    <span className="toc-dots"></span>
                    <span className="toc-number">II</span>
                  </a>

                  {/* Link 3: About */}
                  <Link to="/photography" className="toc-item">
                    <span className="toc-label">ABOUT</span>
                    <span className="toc-dots"></span>
                    <span className="toc-number">III</span>
                  </Link>

        </nav>
      </div>
    </div>
  );
}

export default Home;