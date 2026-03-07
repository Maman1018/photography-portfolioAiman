// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// --- Components ---
import Hero from './components/Hero';
import Statement from './components/Statement';
import Genres from './components/Genres';
import Footer from './components/Footer';
import PhotographyPage from './pages/PhotographyPage';
import FloatingNav from './components/FloatingNav';
import PageTransition from './components/PageTransition';
import MobileBlocker from './components/MobileBlocker';

const Home = () => (
    <PageTransition>
        <div className="app-container">
            <Hero />
            <Statement />
            <Genres />
            <Footer />
        </div>
    </PageTransition>
);

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <>
            {/* THIS FIXES IT: FloatingNav will ONLY show on the Home page ('/') */}
            {location.pathname === '/' && <FloatingNav />}

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/photography"
                        element={
                            <PageTransition>
                                <PhotographyPage />
                            </PageTransition>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </>
    );
};

function App() {
    return (
        <MobileBlocker>
            <Router basename="/photography-portfolioAiman">
                {/* FloatingNav was removed from here and moved into AnimatedRoutes */}
                <AnimatedRoutes />
            </Router>
        </MobileBlocker>
    );
}

export default App;