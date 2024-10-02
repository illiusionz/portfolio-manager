// src/components/SymbolAutoSuggest/SymbolAutoSuggest.js
import './SymbolAutoSuggest.scss';
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDispatch, useSelector } from 'react-redux';
import { setSymbolAndFetchData } from '../../features/user/userThunks';
import { fetchSymbolSuggestions } from '../../features/stocks/stockThunks';
import { clearSuggestions } from '../../features/stocks/stockSlice';
import { selectUserSymbol } from '../../features/user/userSelectors';
import { debounce } from 'lodash';

const SymbolAutoSuggest = ({ onSymbolChange }) => {
  const dispatch = useDispatch();
  const selectedSymbol = useSelector(selectUserSymbol);
  const suggestions = useSelector((state) => state.stocks.suggestions || []);
  const [query, setQuery] = useState(''); // Local state for input value
  const [previousSymbol, setPreviousSymbol] = useState(null); // Keep track of the last symbol

  // Sync local query with Redux selectedSymbol on mount and whenever selectedSymbol changes
  useEffect(() => {
    const savedSymbol = localStorage.getItem('selectedStockSymbol');
    if (savedSymbol && !selectedSymbol) {
      dispatch(setSymbolAndFetchData(savedSymbol)); // Update Redux with the saved symbol
    }

    if (selectedSymbol) {
      setQuery(selectedSymbol);
    }
  }, [selectedSymbol, dispatch]);

  // Handle fetching suggestions based on current input value
  const onSuggestionsFetchRequested = ({ value }) => {
    if (value.length < 1) {
      dispatch(fetchSymbolSuggestions.fulfilled([])); // Clear suggestions in Redux
      return;
    }
    dispatch(fetchSymbolSuggestions(value)); // Fetch symbol suggestions
  };

  const onSuggestionsClearRequested = () => {
    dispatch(clearSuggestions()); // Clear suggestions from Redux
  };

  // Handle when a suggestion is selected from the dropdown
  const onSuggestionSelected = debounce((event, { suggestion }) => {
    const newSymbol = suggestion.ticker;

    // Only dispatch if the symbol is different from the previous one
    if (newSymbol !== previousSymbol) {
      setQuery(newSymbol);
      setPreviousSymbol(newSymbol); // Update the previous symbol
      dispatch(setSymbolAndFetchData(newSymbol)); // Dispatch symbol to Redux
      if (onSymbolChange) onSymbolChange(newSymbol); // Call parent callback
      localStorage.setItem('selectedStockSymbol', newSymbol);
      console.log('Selected symbol:', newSymbol);
    }
  }, 300);

  const inputProps = {
    placeholder: 'Search for a stock',
    value: query, // Sync the input field with local query state
    onChange: (event, { newValue }) => {
      setQuery(newValue); // Update local input state only when typing
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
