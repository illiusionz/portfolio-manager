// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import CompoundInterestCalculator from './components/CompoundInterestCalculator';
import PercentageDifferenceCalculator from './components/PercentageDifferenceCalculator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`d-flex ${isSidebarOpen ? '' : 'toggled'}`} id='wrapper'>
        <div className='border-end bg-dark' id='sidebar-wrapper'>
          <div className='sidebar-heading text-white'>Portfolio Manager</div>
          <div className='list-group list-group-flush'>
            <Link
              className='list-group-item list-group-item-action bg-dark text-white'
              to='/'>
              Home
            </Link>
            <Link
              className='list-group-item list-group-item-action bg-dark text-white'
              to='/compound-interest-calculator'>
              Compound Interest Calculator
            </Link>
            <Link
              className='list-group-item list-group-item-action bg-dark text-white'
              to='/percentage-difference'>
              Percentage Difference Calculator
            </Link>
          </div>
        </div>
        <div id='page-content-wrapper'>
          <nav className='navbar navbar-expand-lg navbar-light bg-light border-bottom'>
            <div className='container-fluid'>
              <button
                className='btn btn-primary'
                id='sidebarToggle'
                onClick={toggleSidebar}>
                Toggle Menu
              </button>
              <form className='d-flex ms-3'>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                />
                <button className='btn btn-outline-primary' type='submit'>
                  Search
                </button>
              </form>
            </div>
          </nav>
          <div className='container-fluid'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route
                path='/compound-interest-calculator'
                element={<CompoundInterestCalculator />}
              />
              <Route
                path='/percentage-difference'
                element={<PercentageDifferenceCalculator />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
