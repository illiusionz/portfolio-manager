// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProviders from './app/AppProviders';
//import { Provider } from 'react-redux';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProviders store={store}>
      <App />
    </AppProviders>
  </React.StrictMode>
);

reportWebVitals();
