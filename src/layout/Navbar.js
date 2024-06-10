import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import flagIcons from '../utils/flagIcons'; // A utility to map locale to flag URLs
import exchangeType from '../utils/exchanges'; // A utility to map locale to flag URLs

const Navbar = ({ toggleSidebar, handleSymbolSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchBrandingAndLocale = async (ticker) => {
    try {
      const response = await fetch(
        `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq`
      );
      const data = await response.json();
      return data.results || {};
    } catch (error) {
      console.error('Error fetching branding and locale:', error);
      return {};
    }
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    try {
      const response = await fetch(
        `https://api.polygon.io/v3/reference/tickers?search=${value}&active=true&sort=ticker&order=asc&limit=10&apiKey=6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq`
      );
      const data = await response.json();
      const results = data.results || [];

      const suggestionsWithBranding = await Promise.all(
        results.map(async (suggestion) => {
          const brandingData = await fetchBrandingAndLocale(suggestion.ticker);
          return {
            ...suggestion,
            branding: brandingData.branding,
            locale: brandingData.locale,
          };
        })
      );

      setSuggestions(suggestionsWithBranding);
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
    <div className='suggestion-item'>
      <span className='suggestion-ticker'>{suggestion.ticker}</span>
      <span className='suggestion-name'>{suggestion.name}</span>
      <span className='suggestion-exchange'>
        {exchangeType[suggestion.primary_exchange]}
        <img
          src={flagIcons[suggestion.locale] || 'default-flag-url'}
          alt={suggestion.locale}
          className='flag-icon'
        />
      </span>
    </div>
  );

  const onChange = (event, { newValue }) => {
    setQuery(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    const symbol = suggestion.ticker;
    handleSymbolSearch(symbol);
  };

  const inputProps = {
    placeholder: 'Search for a stock',
    value: query,
    onChange: onChange,
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <button className='btn btn-primary' onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
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
          inputProps={inputProps}
          onSuggestionSelected={onSuggestionSelected}
        />
        <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <div className='user-profile' onClick={toggleDropdown}>
        <img src='path-to-user-image' alt='User' className='user-image' />
        <span className='user-name'>Chris Wood</span>
        <FontAwesomeIcon icon={faUser} />
        <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
          <a href='#profile' className='dropdown-item'>
            Profile
          </a>
          <a href='#settings' className='dropdown-item'>
            Settings
          </a>
          <a href='#help' className='dropdown-item'>
            Help
          </a>
          <a href='#signout' className='dropdown-item'>
            Sign out
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
