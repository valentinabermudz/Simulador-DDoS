import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DDoSSimulator from './DDoSSimulator.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DDoSSimulator />
  </StrictMode>,
)
