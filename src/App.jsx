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

// We create a wrapper component for the routes to use 'useLocation'
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
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
    );
};

function App() {
    return (
        <Router basename="/photography-portfolioAiman">
            <FloatingNav />
            <AnimatedRoutes />
        </Router>
    );
}

export default App;