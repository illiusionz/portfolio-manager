import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage/HomePage';
import AssetManagement from './containers/AssetManagement/AssetManagement';
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
  const [symbol, setSymbol] = useState(
    localStorage.getItem('lastStock') || 'TSLA'
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchStockData = async (query, startDate, endDate) => {
    console.log(`Fetching stock data for: ${query}`);
    const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
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
      console.log('Stock data fetched successfully:', data);
      if (data.results && data.results.length > 0) {
        setStockData(data.results);
        setError(null);
        setSymbol(query);
        localStorage.setItem('lastStock', query);
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

  const handleSymbolSearch = (query) => {
    fetchStockData(query, '2023-01-01', '2023-12-31');
  };

  useEffect(() => {
    fetchStockData(symbol, '2023-01-01', '2023-12-31');
  }, []);

  return (
    <Router>
      <div className={`d-flex ${isSidebarOpen ? '' : 'toggled'}`} id='wrapper'>
        <Sidebar />
        <div id='page-content-wrapper'>
          <Navbar
            toggleSidebar={toggleSidebar}
            handleSymbolSearch={handleSymbolSearch}
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
