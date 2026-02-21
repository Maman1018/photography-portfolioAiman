// src/App.jsx
import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import Statement from './components/Statement'; // <--- Importing the new section

function App() {
    return (
        <SmoothScroll>
            <div className="app-container">
                {/* Section 1: The 1200vh Scroll Experience & Dome */}
                <Hero />

                {/* Section 2: The Still Typography Pause */}
                <Statement />
            </div>
        </SmoothScroll>
    );
}

export default App;