// src/layout/Navbar.js
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './Layout.css';

const Navbar = ({ toggleSidebar, fetchStockData }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    // Fetch suggestions based on input value
    setSuggestions([]);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Search button clicked');
    console.log('Search input:', value);
    fetchStockData(value);
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light border-bottom'>
      <button className='btn btn-primary' onClick={toggleSidebar}>
        Toggle Menu
      </button>
      <form className='d-flex' onSubmit={handleSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
          inputProps={{
            placeholder: 'Search for a stock',
            value,
            onChange: handleInputChange,
          }}
        />
        <button className='btn btn-outline-success' type='submit'>
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
