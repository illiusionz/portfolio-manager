// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProviders from './app/AppProviders';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './tailwind.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);

reportWebVitals();
