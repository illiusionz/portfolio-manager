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

const getDateRange = (range) => {
  const today = new Date();
  let start, end;
  end = today;

  switch (range) {
    case '1m':
      start = new Date(today);
      start.setMinutes(today.getMinutes() - 1);
      break;
    case '5m':
      start = new Date(today);
      start.setMinutes(today.getMinutes() - 5);
      break;
    case '15m':
      start = new Date(today);
      start.setMinutes(today.getMinutes() - 15);
      break;
    case '30m':
      start = new Date(today);
      start.setMinutes(today.getMinutes() - 30);
      break;
    case '45m':
      start = new Date(today);
      start.setMinutes(today.getMinutes() - 45);
      break;
    case '1h':
      start = new Date(today);
      start.setHours(today.getHours() - 1);
      break;
    case '2h':
      start = new Date(today);
      start.setHours(today.getHours() - 2);
      break;
    case '3h':
      start = new Date(today);
      start.setHours(today.getHours() - 3);
      break;
    case '4h':
      start = new Date(today);
      start.setHours(today.getHours() - 4);
      break;
    case '1d':
      start = new Date(today);
      break;
    case '5d':
      start = new Date(today);
      start.setDate(today.getDate() - 5);
      break;
    case '1w':
      start = new Date(today);
      start.setDate(today.getDate() - 7);
      break;
    case '1M':
      start = new Date(today);
      start.setMonth(today.getMonth() - 1);
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
    startDate: getDateRange('1w').start,
    endDate: getDateRange('1w').end,
    range: '1w',
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('stockAppState'));
    if (savedState) {
      setSearchState({
        query: savedState.query,
        startDate: new Date(savedState.startDate),
        endDate: new Date(savedState.endDate),
        range: savedState.range || '1w',
      });
      fetchStockData(
        savedState.query,
        new Date(savedState.startDate),
        new Date(savedState.endDate)
      );
    } else {
      const { start, end } = getDateRange('1w');
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

  const handleSearch = (query, startDate, endDate, range = '1w') => {
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
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        <div id='page-content-wrapper'>
          <Navbar
            fetchStockData={handleSearch}
            currentRange={searchState.range}
            onRangeChange={handleRangeChange}
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
