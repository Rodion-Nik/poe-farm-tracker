import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Stats from './stats/Stats.jsx'
import Farm from './farm/Farm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Farm />
  </StrictMode>,
)
