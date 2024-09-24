// src/components/SymbolAutoSuggest/SymbolAutoSuggest.js
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDispatch, useSelector } from 'react-redux';
import { setSymbolAndFetchData } from '../../features/user/userThunks';
import { fetchSymbolSuggestions } from '../../features/stocks/stockThunks'; // Import the new thunk
import { clearSuggestions } from '../../features/stocks/stockSlice'; // Import the clearSuggestions action

import './SymbolAutoSuggest.scss';

const SymbolAutoSuggest = () => {
  const dispatch = useDispatch();
  const selectedSymbol = useSelector((state) => state.user.userSymbol); // Redux state for the selected symbol
  const suggestions = useSelector((state) => state.stocks.suggestions || []); // Redux state for suggestions
  const [query, setQuery] = useState(''); // Local state for the input value

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
  const onSuggestionsFetchRequested = ({ value }) => {
    if (value.length < 1) {
      dispatch(fetchSymbolSuggestions.fulfilled([])); // Clear suggestions in Redux
      return;
    }
    // Dispatch the thunk to fetch suggestions from the API
    dispatch(fetchSymbolSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    dispatch(clearSuggestions()); // Dispatch the clearSuggestions action
  };

  // Handle when a suggestion is selected from the dropdown
  const onSuggestionSelected = (event, { suggestion }) => {
    const selectedSymbol = suggestion.ticker;
    setQuery(selectedSymbol); // Update the input field to show the selected symbol
    dispatch(setSymbolAndFetchData(selectedSymbol)); // Dispatch to update Redux with the new symbol

    // Save the selected symbol to localStorage for persistence
    localStorage.setItem('selectedStockSymbol', selectedSymbol);
    console.log('Selected symbol:', selectedSymbol);
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
        suggestions={suggestions} // Use suggestions from Redux state
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
