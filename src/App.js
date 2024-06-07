// src/App.js
import React, { useState } from 'react';
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchStockData = async (query) => {
    const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
    const date = '2023-06-01'; // Use a fixed historical date within the allowed timeframe
    const url = `https://api.polygon.io/v2/aggs/ticker/${query}/range/1/day/${date}/${date}?apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          `Error: ${response.status} ${response.statusText}. ${errorDetails.message}`
        );
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        setStockData({
          symbol: query,
          date: date,
          open: result.o,
          close: result.c,
          high: result.h,
          low: result.l,
          volume: result.v,
        });
        setError(null); // Clear any previous error
      } else {
        setStockData(null);
        setError('No data found for the specified symbol.');
      }
    } catch (error) {
      console.error(error);
      setStockData(null);
      setError(error.message);
    }
  };

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
                element={<HomePage stockData={stockData} error={error} />}
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
