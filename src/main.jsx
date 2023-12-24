import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './components/store/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </AuthContextProvider>
)
