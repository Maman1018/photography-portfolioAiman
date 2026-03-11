import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SmoothScroll from './components/SmoothScroll.jsx'
import { ThemeProvider } from './ThemeContext.jsx' // 🚨 IMPORT THE PROVIDER

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* 🚨 WRAP EVERYTHING IN THE THEME PROVIDER */}
        <ThemeProvider>
            <SmoothScroll>
                <App />
            </SmoothScroll>
        </ThemeProvider>
    </React.StrictMode>,
)