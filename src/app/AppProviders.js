// src/app/AppProviders.js
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from './store';

const AppProviders = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <Router>{children}</Router>
    </ReduxProvider>
  );
};

export default AppProviders;
