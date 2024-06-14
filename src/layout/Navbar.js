import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSun,
  faMoon,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import flagIcons from '../utils/flagIcons';
import exchangeType from '../utils/exchanges';
import { fetchStockPrice } from '../redux/actions/stockActions';
import { setUserSymbol } from '../redux/actions/userActions';
import { addToWatchlist } from '../redux/actions/watchlistActions';
import { setTheme } from '../redux/actions/themeActions';
import profileImage from '../assets/images/user-image.jpg';

const Navbar = ({ toggleSidebar, handleSymbolSearch, toggleTheme }) => {
  const symbol = useSelector((state) => state.user.symbol); // Get the selected symbol from the state
  const [query, setQuery] = useState(symbol || '');
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const watchlist = useSelector((state) => state.watchlist.symbols);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

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
    const selectedSymbol = suggestion.ticker;
    dispatch(setUserSymbol(selectedSymbol));
    dispatch(fetchStockPrice(selectedSymbol));
    setQuery(selectedSymbol);
    handleSymbolSearch(selectedSymbol);
    //localStorage.setItem('lastStock', selectedSymbol);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const symbol = query.split(' - ')[0];
    dispatch(setUserSymbol(symbol));
    dispatch(fetchStockPrice(symbol));
  };

  const onAddToWatchlist = () => {
    const symbol = query.split(' - ')[0];
    if (symbol && !watchlist.includes(symbol)) {
      dispatch(addToWatchlist(symbol));
    }
  };

  const inputProps = {
    placeholder: 'Search for a stock',
    value: query,
    onChange: onChange,
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className='navbar navbar-expand-lg'>
      <button className='btn btn-primary' onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <form className='form-inline my-2 my-lg-0' onSubmit={onSubmit}>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
          />
        </div>
        <button className='btn btn-primary ms-1 my-2 my-sm-0' type='submit'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button
          className='btn btn-primary ms-1  my-2 my-sm-0'
          type='button'
          onClick={onAddToWatchlist}>
          Add to Watch List
        </button>
      </form>
      <button
        className='btn btn-light ms-auto my-2 my-sm-0 theme-toggle'
        type='button'
        onClick={handleToggleTheme}>
        <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
      </button>
      <ul className='navbar-nav navbar-align'>
        <li className='nav-item dropdown'>
          <div
            className='nav-link dropdown-toggle'
            onClick={toggleDropdown}
            aria-expanded={dropdownVisible}>
            <img src={profileImage} alt='User' className='user-image' />
            <span className='user-name'>Jeff Liu</span>
          </div>
          <div
            className={`dropdown-menu dropdown-menu-end ${
              dropdownVisible ? 'show' : ''
            }`}>
            <a className='dropdown-item' href='/profile'>
              Profile
            </a>
            <a className='dropdown-item' href='/analytics'>
              Analytics
            </a>
            <div className='dropdown-divider'></div>
            <a className='dropdown-item' href='/settings'>
              Settings &amp; Privacy
            </a>
            <a className='dropdown-item' href='/help'>
              Help
            </a>
            <a className='dropdown-item' href='/signout'>
              Sign out
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
