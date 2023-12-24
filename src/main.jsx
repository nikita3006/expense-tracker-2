import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';

import ReduxStore from './components/store/Reduxstore.jsx';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={ReduxStore}>
      
              <App />
        
    </Provider>
  </BrowserRouter>
)
