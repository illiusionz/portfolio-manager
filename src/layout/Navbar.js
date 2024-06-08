import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './Navbar.css';

const Navbar = ({ toggleSidebar, handleSymbolSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = async ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.polygon.io/v3/reference/tickers?search=${inputValue}&active=true&sort=ticker&order=asc&limit=10&apiKey=6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq`
      );
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) =>
    `${suggestion.ticker} - ${suggestion.name}`;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.ticker} - {suggestion.name}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setQuery(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    handleSymbolSearch(suggestion.ticker);
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
      <form
        className='form-inline my-2 my-lg-0'
        onSubmit={(e) => e.preventDefault()}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
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
