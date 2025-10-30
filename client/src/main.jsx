import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './app.css'
import App from './App.jsx'

// Sync theme with system preference (automatic dark mode)
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const applySystemTheme = () => {
    document.documentElement.classList.toggle('dark', mediaQuery.matches)
  }
  applySystemTheme()
  // Listen for changes
  try {
    mediaQuery.addEventListener('change', applySystemTheme)
  } catch (_) {
    // Safari fallback
    mediaQuery.addListener(applySystemTheme)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
