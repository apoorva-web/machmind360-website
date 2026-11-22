import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PosDemo from './PosDemo.jsx'

const isPosDemo = window.location.pathname.replace(/\/+$/, '') === '/pos-demo'
if (isPosDemo) document.title = 'Restaurant POS Demo · MachMind360'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isPosDemo ? <PosDemo /> : <App />}
  </StrictMode>,
)
