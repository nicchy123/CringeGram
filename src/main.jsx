import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './Contexts/AuthProvider.jsx'
import CommonPropsProovider from './Contexts/CommonPropsProovider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CommonPropsProovider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </CommonPropsProovider>
  </React.StrictMode>,
)
