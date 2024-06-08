// src/layout/Navbar.js
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import config from '../config';

const Navbar = ({ toggleSidebar, fetchStockData }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    }

    const response = await fetch(
      `https://api.polygon.io/v3/reference/tickers?search=${inputValue}&apiKey=${config.polygonApiKey}`
    );
    const data = await response.json();
    return data.results || [];
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setValue(suggestion.ticker);
    fetchStockData(suggestion.ticker, '2023-01-01', '2023-12-31'); // Adjust dates as needed
  };

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name} ({suggestion.ticker})
    </div>
  );

  const inputProps = {
    placeholder: 'Search',
    value,
    onChange: (e, { newValue }) => setValue(newValue),
  };

  const handleSearch = () => {
    if (value) {
      fetchStockData(value, '2023-01-01', '2023-12-31'); // Adjust dates as needed
    }
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <button className='btn btn-primary' onClick={toggleSidebar}>
        Toggle Menu
      </button>
      <form className='d-flex search-bar'>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion.ticker}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={onSuggestionSelected}
        />
        <button
          className='btn btn-outline-primary'
          type='button'
          onClick={handleSearch}>
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
