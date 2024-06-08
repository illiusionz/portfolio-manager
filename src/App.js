// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage/HomePage';
import CompoundInterestCalculator from './components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from './components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState('AAPL');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchStockData = async (query) => {
    const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
    const url = `https://api.polygon.io/v2/aggs/ticker/${query}/range/1/day/2023-01-01/2023-12-31?apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setStockData(data.results);
      setSymbol(query);
      localStorage.setItem('lastStock', query);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error fetching stock data');
    }
  };

  useEffect(() => {
    const lastStock = localStorage.getItem('lastStock');
    if (lastStock) {
      fetchStockData(lastStock);
    }
  }, []);

  return (
    <Router>
      <div className={`d-flex ${isSidebarOpen ? '' : 'toggled'}`} id='wrapper'>
        <Sidebar />
        <div id='page-content-wrapper'>
          <Navbar
            toggleSidebar={toggleSidebar}
            fetchStockData={fetchStockData}
          />
          <div className='container-fluid'>
            <Routes>
              <Route
                path='/'
                element={
                  <HomePage
                    stockData={stockData}
                    error={error}
                    symbol={symbol}
                  />
                }
              />
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
