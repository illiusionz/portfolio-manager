import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage/HomePage';
import CompoundInterestCalculator from './components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from './components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const getDateRange = (range) => {
  const today = new Date();
  let start, end;
  end = today;

  switch (range) {
    default:
      start = new Date(today);
      start.setDate(today.getDate() - 7);
  }
  return { start, end };
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stockData, setStockData] = useState([]);
  const [stockInfo, setStockInfo] = useState(null); // For storing stock information
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
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode'; // Apply dark mode class
  }, [searchState, isDarkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchStockData = async (
    query,
    startDate = searchState.startDate,
    endDate = searchState.endDate
  ) => {
    const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    const url = `https://api.polygon.io/v2/aggs/ticker/${query}/range/1/day/${start}/${end}?apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      console.log('Fetch URL:', url); // Debug log
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          `Error: ${response.status} ${response.statusText}. ${errorDetails.message}`
        );
      }
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      if (data.results && data.results.length > 0) {
        const formattedData = data.results
          .map((result) => ({
            time: result.t / 1000, // Ensure UNIX timestamp in seconds
            value: result.c !== undefined ? result.c : undefined, // Ensure value is not undefined
          }))
          .filter(
            (item) => item.time !== undefined && item.value !== undefined
          ); // Filter out invalid items
        console.log('Formatted Stock Data:', formattedData); // Debug log
        setStockData(formattedData);
        setError(null);
        fetchStockInfo(query); // Fetch stock info
      } else {
        setStockData([]);
        setError('No data found for the specified symbol.');
      }
    } catch (error) {
      console.error('Fetch Error:', error); // Debug log
      setStockData([]);
      setError(error.message);
    }
  };

  const fetchStockInfo = async (query) => {
    const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
    const url = `https://api.polygon.io/v2/aggs/ticker/${query}/range/1/day/2023-01-09/2023-01-09?apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setStockInfo(data.results[0]);
      } else {
        setStockInfo(null);
        setError('No stock info found.');
      }
    } catch (error) {
      console.error('Fetch Stock Info Error:', error); // Debug log
      setStockInfo(null);
      setError(error.message);
    }
  };

  const handleSearch = (query) => {
    setSearchState({ ...searchState, query: query.toUpperCase() });
    fetchStockData(query.toUpperCase());
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
            <HeroSection stockData={stockData} />
            <Routes>
              <Route
                path='/'
                element={
                  <HomePage
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
