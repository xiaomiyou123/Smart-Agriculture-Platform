import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DeepAgriProvider } from './ai/DeepAgriContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DeepAgriProvider>
      <App />
    </DeepAgriProvider>
  </StrictMode>,
)
