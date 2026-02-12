// src/components/SmoothScroll.jsx
import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css'; // Optional: Basic CSS reset for Lenis

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        // 1. Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2, // The higher the value, the "heavier" the scroll feels (Default is 1.0)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious easing
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1, // How sensitive the mouse wheel is
            smoothTouch: false, // Mobile usually feels better with native scroll
            touchMultiplier: 2,
        });

        // 2. Connect to the Animation Loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        // The content inside still behaves normally, just scrolled differently
        <div style={{ width: '100%', overflow: 'hidden' }}>
            {children}
        </div>
    );
};

export default SmoothScroll;