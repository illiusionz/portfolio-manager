// src/layout/Navbar.js
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './Navbar.css';

const Navbar = ({ toggleSidebar, handleSymbolSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    // Example: predefined list of stock symbols
    const predefinedSymbols = ['AAPL', 'TSLA', 'GOOGL', 'AMZN', 'MSFT'];

    return inputLength === 0
      ? []
      : predefinedSymbols.filter(
          (symbol) => symbol.toLowerCase().slice(0, inputLength) === inputValue
        );
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
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <div>{suggestion}</div>}
          inputProps={inputProps}
        />
        <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
