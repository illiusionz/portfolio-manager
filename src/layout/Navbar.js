import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Autosuggest from 'react-autosuggest';
import stockSuggestions from '../utils/stockSuggestions';
import './Navbar.css';

function Navbar({
  fetchStockData,
  currentRange,
  onRangeChange,
  isDarkMode,
  toggleDarkMode,
  toggleSidebar,
}) {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setQuery(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(stockSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setQuery(suggestion.symbol);
  };

  const handleSearch = () => {
    fetchStockData(query, startDate, endDate);
  };

  const inputProps = {
    placeholder: 'Search stock...',
    value: query,
    onChange: onChange,
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <button className='btn btn-outline-secondary' onClick={toggleSidebar}>
        <i className='fas fa-bars'></i>
      </button>
      <form className='d-flex' onSubmit={(e) => e.preventDefault()}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={(suggestion) => suggestion.symbol}
          renderSuggestion={(suggestion) => (
            <div>
              {suggestion.name} ({suggestion.symbol})
            </div>
          )}
          inputProps={inputProps}
        />
        <button className='btn btn-outline-primary' onClick={handleSearch}>
          Search
        </button>
      </form>
      <div className='navbar-date-picker'>
        <label>Date Range</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <button className='btn btn-outline-secondary' onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
}

export default Navbar;
