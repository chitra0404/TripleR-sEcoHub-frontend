import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserTypeProvider } from './context/UserTypeContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <UserTypeProvider>
    <App />
    </UserTypeProvider>
    </Router>
  </React.StrictMode>,
)
