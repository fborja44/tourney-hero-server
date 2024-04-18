import React from 'react'
import ReactDOM from 'react-dom/client'
import AppProvider from './components/AppProvider.js'
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>,
)
