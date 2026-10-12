// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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
            {/* FloatingNav only on the landing page */}
            {location.pathname === '/home' && <FloatingNav />}

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <PageTransition>
                                <PhotographyPage />
                            </PageTransition>
                        }
                    />
                    <Route path="/home" element={<Home />} />
                    {/* Old links keep working */}
                    <Route path="/photography" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

function App() {
    return (
        <MobileBlocker>
            <Router basename="/photography-portfolioAiman">
                <AnimatedRoutes />
            </Router>
        </MobileBlocker>
    );
}

export default App;