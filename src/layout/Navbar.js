import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ReactCountryFlag from 'react-country-flag';
import './Navbar.css';
import exchangeType from '../utils/exchanges'; // A utility to map exchange codes to names

const Navbar = ({ toggleSidebar, handleSymbolSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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
      {/*<img
        src={suggestion.branding?.icon_url || 'default-icon-url'}
        alt={suggestion.ticker}
        className='stock-icon'
        onError={(e) => {
          e.target.src = 'default-icon-url';
        }}
      />*/}
      <span className='suggestion-ticker'>{suggestion.ticker}</span>
      <span className='suggestion-name'>{suggestion.name}</span>
      <span className='suggestion-exchange'>
        {exchangeType[suggestion.primary_exchange]}
        <ReactCountryFlag
          countryCode={suggestion.locale.toUpperCase()}
          svg
          className='flag-icon'
        />
      </span>
    </div>
  );

  const onChange = (event, { newValue }) => {
    setQuery(newValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const symbol = query.split(' - ')[0];
    handleSymbolSearch(symbol);
  };

  const inputProps = {
    placeholder: 'Search for a stock',
    value: query,
    onChange: onChange,
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <button className='btn btn-primary' onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <form className='form-inline my-2 my-lg-0' onSubmit={onSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
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
