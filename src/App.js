// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage/HomePage';
import CompoundInterestCalculator from './components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from './components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchStockData = async (query, startDate, endDate) => {
    const apiKey = config.polygonApiKey;
    const url = `https://api.polygon.io/v2/aggs/ticker/${query}/range/1/day/${startDate}/${endDate}?apiKey=${apiKey}`;

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
        setStockData(data.results);
        setError(null);
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
