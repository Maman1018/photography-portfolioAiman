// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Pages / Sections ---
import Hero from './components/Hero';
import Statement from './components/Statement';
import Genres from './components/Genres';
import Footer from './components/Footer';
import PhotographyPage from './pages/PhotographyPage';

// We wrap your previous homepage sections inside a single component
const Home = () => (
    <div className="app-container">
        <Hero />
        <Statement />
        <Genres />
        <Footer />
    </div>
);

function App() {
    return (
        <Router basename="/photography-portfolioAiman">
            {/* THE FIX: We tell React Router that the app lives inside this specific folder */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/photography" element={<PhotographyPage />} />
            </Routes>
        </Router>
    );
}

export default App;