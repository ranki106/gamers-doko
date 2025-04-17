import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./i18n.jsx"
import React from 'react'

createRoot(document.getElementById('root')).render(
    <React.Suspense fallback="Loading...">
        <StrictMode>
            <App />
        </StrictMode>
    </React.Suspense>
)
