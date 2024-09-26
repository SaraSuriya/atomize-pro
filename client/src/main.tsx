import React, { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.js'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)