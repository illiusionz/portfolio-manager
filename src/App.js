// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage/HomePage';
import CompoundInterestCalculator from './components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from './components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const getCurrentTradingWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const start = new Date(today);
  start.setDate(today.getDate() - dayOfWeek + 1); // Monday
  const end = new Date(today);
  end.setDate(today.getDate() + (5 - dayOfWeek)); // Friday
  return { start, end };
};

const getDateRange = (range) => {
  const today = new Date();
  let start, end;
  end = today;

  switch (range) {
    case 'day':
      start = new Date(today);
      break;
    case 'week':
      start = new Date(today);
      start.setDate(today.getDate() - 7);
      break;
    case 'month':
      start = new Date(today);
      start.setMonth(today.getMonth() - 1);
      break;
    case 'year':
      start = new Date(today);
      start.setFullYear(today.getFullYear() - 1);
      break;
    default:
      start = new Date(today);
      start.setDate(today.getDate() - 7);
  }
  return { start, end };
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState(null);
  const [searchState, setSearchState] = useState({
    query: 'TSLA',
    startDate: getCurrentTradingWeek().start,
    endDate: getCurrentTradingWeek().end,
    range: 'week',
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('stockAppState'));
    if (savedState) {
      setSearchState({
        query: savedState.query,
        startDate: new Date(savedState.startDate),
        endDate: new Date(savedState.endDate),
        range: savedState.range || 'week',
      });
      fetchStockData(
        savedState.query,
        new Date(savedState.startDate),
        new Date(savedState.endDate)
      );
    } else {
      const { start, end } = getCurrentTradingWeek();
      setSearchState({ ...searchState, startDate: start, endDate: end });
      fetchStockData('TSLA', start, end);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stockAppState', JSON.stringify(searchState));
  }, [searchState]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchStockData = async (query, startDate, endDate) => {
    const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    const url = `https://api.polygon.io/v2/aggs/ticker/${query}/range/1/day/${start}/${end}?apiKey=${apiKey}`;

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
        setStockData(
          data.results.map((result) => ({
            date: result.t,
            open: result.o,
            close: result.c,
            high: result.h,
            low: result.l,
            volume: result.v,
          }))
        );
        setError(null);
      } else {
        setStockData([]);
        setError('No data found for the specified symbol.');
      }
    } catch (error) {
      console.error(error);
      setStockData([]);
      setError(error.message);
    }
  };

  const handleSearch = (query, startDate, endDate, range = 'week') => {
    setSearchState({ query, startDate, endDate, range });
    fetchStockData(query, startDate, endDate);
  };

  const handleRangeChange = (range) => {
    const { start, end } = getDateRange(range);
    setSearchState((prevState) => ({
      ...prevState,
      startDate: start,
      endDate: end,
      range,
    }));
    fetchStockData(searchState.query, start, end);
  };

  return (
    <Router>
      <div
        className={`d-flex ${isSidebarOpen ? '' : 'toggled'} ${
          isDarkMode ? 'dark-mode' : 'light-mode'
        }`}
        id='wrapper'>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div id='page-content-wrapper'>
          <Navbar
            fetchStockData={handleSearch}
            currentRange={searchState.range}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <div className='container-fluid'>
            <Routes>
              <Route
                path='/'
                element={
                  <HomePage
                    stockData={stockData}
                    error={error}
                    onRangeChange={handleRangeChange}
                    currentRange={searchState.range}
                    toggleDarkMode={toggleDarkMode}
                    isDarkMode={isDarkMode}
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
