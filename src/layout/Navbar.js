// src/layout/Navbar.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import './Layout.css';

function Navbar({
  fetchStockData,
  onRangeChange,
  currentRange,
  isDarkMode,
  toggleDarkMode,
}) {
  const [searchQuery, setSearchQuery] = useState('TSLA');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [suggestions, setSuggestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: 'TSLA',
    label: 'TSLA - Tesla, Inc.',
  });

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('stockAppState'));
    if (savedState) {
      setSearchQuery(savedState.query);
      setStartDate(new Date(savedState.startDate));
      setEndDate(new Date(savedState.endDate));
      setSelectedOption({
        value: savedState.query,
        label: `${savedState.query}`,
      });
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (selectedOption && startDate && endDate) {
      fetchStockData(selectedOption.value, startDate, endDate);
    }
  };

  const fetchSuggestions = async (query) => {
    const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
    const url = `https://api.polygon.io/v3/reference/tickers?search=${query}&active=true&sort=ticker&order=asc&limit=10&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setSuggestions(
        data.results.map((item) => ({
          value: item.ticker,
          label: `${item.ticker} - ${item.name}`,
        }))
      );
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 1) {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light border-bottom'>
      <div className='container-fluid'>
        <span className='navbar-text'>Search Stock</span>
        <form className='d-flex ms-3' onSubmit={handleSearchSubmit}>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            onInputChange={setSearchQuery}
            options={suggestions}
            className='form-control me-2'
            placeholder='Search'
            isClearable
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className='form-control me-2'
            placeholderText='Start Date'
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className='form-control me-2'
            placeholderText='End Date'
          />
          <button className='btn btn-outline-primary' type='submit'>
            Search
          </button>
        </form>
        <div className='d-flex ms-auto'>
          <button
            className={`btn btn-outline-secondary me-2 ${
              currentRange === 'day' ? 'active' : ''
            }`}
            onClick={() => onRangeChange('day')}>
            Day
          </button>
          <button
            className={`btn btn-outline-secondary me-2 ${
              currentRange === 'week' ? 'active' : ''
            }`}
            onClick={() => onRangeChange('week')}>
            Week
          </button>
          <button
            className={`btn btn-outline-secondary me-2 ${
              currentRange === 'month' ? 'active' : ''
            }`}
            onClick={() => onRangeChange('month')}>
            Month
          </button>
          <button
            className={`btn btn-outline-secondary me-2 ${
              currentRange === 'year' ? 'active' : ''
            }`}
            onClick={() => onRangeChange('year')}>
            Year
          </button>
          <button
            className='btn btn-outline-secondary'
            onClick={toggleDarkMode}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
