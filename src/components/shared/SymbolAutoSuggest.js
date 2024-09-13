import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserSymbol } from '../../features/user/userSlice';
import { fetchStockPrice } from '../../features/stocks/stockThunks';

const SymbolAutoSuggest = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  const dispatch = useDispatch();
  const selectedSymbol = useSelector((state) => state.user.symbol);

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

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.ticker;

  const renderSuggestion = (suggestion) => (
    <div className='suggestion-item'>
      <span className='suggestion-ticker'>{suggestion.ticker}</span>
      <span className='suggestion-name'>{suggestion.name}</span>
    </div>
  );

  const onChange = (event, { newValue }) => {
    setQuery(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    const symbol = suggestion.ticker;
    dispatch(setUserSymbol(symbol)); // Update the global state with selected symbol
    dispatch(fetchStockPrice(symbol)); // Fetch stock price using the new symbol
  };

  const inputProps = {
    placeholder: 'Search for a stock',
    value: query || selectedSymbol,
    onChange: onChange,
  };

  return (
    <div className='symbol-auto-suggest'>
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
  );
};

export default SymbolAutoSuggest;
