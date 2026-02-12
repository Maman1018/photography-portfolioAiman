import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SmoothScroll from './components/SmoothScroll.jsx' // Import it

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* Wrap App with the Smooth Scroll Physics */}
        <SmoothScroll>
            <App />
        </SmoothScroll>
    </React.StrictMode>,
)