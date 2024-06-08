// src/layout/Navbar.js
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ toggleSidebar, handleSymbolSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = async ({ value }) => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/tickers`,
        {
          params: {
            search: value,
            apiKey: '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq',
          },
        }
      );
      setSuggestions(response.data.results || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setQuery(suggestion.ticker);
    handleSymbolSearch(suggestion.ticker);
  };

  const onChange = (event, { newValue }) => {
    setQuery(newValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSymbolSearch(query);
  };

  const inputProps = {
    placeholder: 'Search for a stock',
    value: query,
    onChange: onChange,
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <button className='btn btn-primary' onClick={toggleSidebar}>
        Toggle Menu
      </button>
      <form className='form-inline my-2 my-lg-0' onSubmit={onSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion.ticker}
          renderSuggestion={(suggestion) => (
            <div>
              {suggestion.name} ({suggestion.ticker})
            </div>
          )}
          inputProps={inputProps}
          onSuggestionSelected={onSuggestionSelected}
        />
        <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
