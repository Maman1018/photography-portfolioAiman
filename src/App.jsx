// src/App.jsx
import Hero from './components/Hero';

function App() {
    return (
        <div className="app-container">
            {/* The New Figma Design Hero */}
            <Hero />

            {/* Placeholder for next sections so you can scroll to test animation */}
            <div style={{height: '100vh', background: '#F4F3F2', padding: '100px 40px'}}>
                <h2 style={{fontSize: '3rem', color: '#333'}}>
                    The story continues here...
                </h2>
            </div>
        </div>
    );
}

export default App;