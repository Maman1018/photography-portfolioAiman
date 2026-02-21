// src/App.jsx
import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import Statement from './components/Statement';
import Genres from './components/Genres';
import Footer from './components/Footer'; // Import Footer

function App() {
    return (
        <SmoothScroll>
            <div className="app-container">
                <Hero />
                <Statement />
                <Genres />

                {/* Final Section */}
                <Footer />
            </div>
        </SmoothScroll>
    );
}

export default App;