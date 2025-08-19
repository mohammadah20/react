import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'appwrite'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
     
     
)
