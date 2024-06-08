import React, { useState, useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchStockSuggestions } from '../services/polygonService';
import './Navbar.css';

const Navbar = ({ fetchStockData }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [lastSuggestions, setLastSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.length > 1) {
      fetchStockSuggestions(query).then((results) => {
        setSuggestions(results);
        setLastSuggestions(results);
      });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchStockData(query);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.ticker);
    fetchStockData(suggestion.ticker);
    setSuggestions([]);
  };

  const handleFocus = () => {
    if (lastSuggestions.length > 0) {
      setSuggestions(lastSuggestions);
    }
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'>
          Stock Portfolio Manager
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <form
            className='d-flex ms-auto search-container'
            onSubmit={handleSearch}
            ref={searchRef}>
            <div className='search-wrapper'>
              <input
                className='form-control'
                type='search'
                placeholder='Search for stocks...'
                aria-label='Search'
                value={query}
                onChange={(e) => setQuery(e.target.value.toUpperCase())}
                onFocus={handleFocus}
              />
              {suggestions.length > 0 && (
                <ul className='list-group'>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.ticker}
                      className='list-group-item list-group-item-action'
                      onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion.name} ({suggestion.ticker})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className='btn btn-outline-success' type='submit'>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
