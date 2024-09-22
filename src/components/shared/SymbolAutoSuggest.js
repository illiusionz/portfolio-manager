import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSymbolAndFetchData } from '../../features/user/userThunks';
import './SymbolAutoSuggest.scss';

const SymbolAutoSuggest = () => {
  const dispatch = useDispatch();
  const selectedSymbol = useSelector((state) => state.user.symbol); // Redux state for the selected symbol
  const [query, setQuery] = useState(''); // Local state for the input value
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  // Sync the local query state with the Redux selectedSymbol on mount and whenever selectedSymbol changes
  useEffect(() => {
    // Check localStorage for a saved stock symbol and update Redux
    const savedSymbol = localStorage.getItem('selectedStockSymbol');
    if (savedSymbol && !selectedSymbol) {
      dispatch(setSymbolAndFetchData(savedSymbol)); // Update Redux with the saved symbol
    }

    if (selectedSymbol) {
      setQuery(selectedSymbol); // Update local input if Redux has the symbol
    }
  }, [selectedSymbol, dispatch]);

  // Fetch suggestions based on the current input value
  const onSuggestionsFetchRequested = async ({ value }) => {
    if (value.length < 1) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/tickers?search=${value}&active=true&sort=ticker&order=asc&limit=10&apiKey=${apiKey}`
      );
      setSuggestions(response.data.results || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => setSuggestions([]);

  // Handle when a suggestion is selected from the dropdown
  const onSuggestionSelected = (event, { suggestion }) => {
    const selectedSymbol = suggestion.ticker;
    setQuery(selectedSymbol); // Update the input field to show the selected symbol
    dispatch(setSymbolAndFetchData(selectedSymbol)); // Dispatch to update Redux with the new symbol

    // Save the selected symbol to localStorage for persistence
    localStorage.setItem('selectedStockSymbol', selectedSymbol);
  };

  const inputProps = {
    placeholder: 'Search for a stock',
    value: query, // Sync the input field with the local query state
    onChange: (event, { newValue }) => {
      setQuery(newValue); // Update the local input state only when typing
    },
  };

  return (
    <div className='symbol-auto-suggest'>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.ticker}
        renderSuggestion={(suggestion) => (
          <div className='suggestion-item'>
            <span className='suggestion-ticker'>{suggestion.ticker}</span>
            <span className='suggestion-name'>{suggestion.name}</span>
          </div>
        )}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected} // Dispatch to Redux and persist to localStorage on suggestion selection
      />
    </div>
  );
};

export default SymbolAutoSuggest;
