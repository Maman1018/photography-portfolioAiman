import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // <--- Changed from BrowserRouter
import App from './App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* HashRouter handles the subdirectory automatically, no 'basename' needed */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)