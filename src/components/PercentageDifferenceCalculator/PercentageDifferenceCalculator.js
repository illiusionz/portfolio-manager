import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import './PercentageDifferenceCalculator.css';
import { fetchStockPrice } from '../../redux/actions/stockActions';
import { setUserSymbol } from '../../redux/actions/userActions'; // Ensure the correct path
import { formatNumberWithCommas } from '../../utils/format';

const PercentageDifferenceCalculator = () => {
  const symbol = useSelector((state) => state.user.symbol); // Get the selected symbol from the state
  const [query, setQuery] = useState(symbol || '');
  const [targetPrice, setTargetPrice] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [percentageChange, setPercentageChange] = useState('0.00');
  const stockPrice = useSelector((state) => state.user.stockPrice);
  const dispatch = useDispatch();

  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  useEffect(() => {
    calculatePercentageChange();
  }, [targetPrice, stockPrice]);

  const calculatePercentageChange = () => {
    if (!stockPrice || !targetPrice) {
      setPercentageChange('0.00');
      return;
    }
    const change = ((targetPrice - stockPrice) / stockPrice) * 100;
    setPercentageChange(change.toFixed(2));
  };

  const resetFields = () => {
    setQuery('');
    setTargetPrice('');
    setPercentageChange('0.00');
    setSuggestions([]);
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
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

  const onSuggestionSelected = async (event, { suggestion }) => {
    const selectedSymbol = suggestion.ticker;
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${selectedSymbol}/prev?adjusted=true&apiKey=YOUR_API_KEY`
      );
      const priceData = response.data.results[0];
      dispatch(setUserSymbol(selectedSymbol));
      dispatch(fetchStockPrice(selectedSymbol));
      setQuery(selectedSymbol);
      setTargetPrice('');
      setPercentageChange('0.00');
    } catch (error) {
      console.error('Error fetching price data:', error);
    }
  };

  const inputProps = {
    placeholder: 'Search for a stock',
    value: query,
    onChange: onChange,
  };

  return (
    <div className='percentage-difference-calculator'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title mb-0'>Stock Price % Change</h5>
        </div>
        <div className='card-body'>
          <form className='' onSubmit={(e) => e.preventDefault()}>
            <div className='form-group'>
              <label className='form-label' htmlFor='stockName'>
                Stock Name:
              </label>
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
            <div className='form-group'>
              <label className='form-label' htmlFor='currentPrice'>
                Current Price:
              </label>
              <input
                type='number'
                id='currentPrice'
                className='form-control'
                value={stockPrice || ''}
                readOnly
              />
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='targetPrice'>
                Target Price:
              </label>
              <input
                type='number'
                id='targetPrice'
                className='form-control'
                value={formatNumberWithCommas(targetPrice)}
                onChange={(e) =>
                  setTargetPrice(e.target.value.replace(/,/g, ''))
                }
                placeholder='$0.00'
              />
            </div>

            <div className='button-group'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={calculatePercentageChange}>
                Calculate
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={resetFields}>
                Reset
              </button>
            </div>
          </form>
          <div className='result mt-3'>
            <h5>
              <strong>Percent Change:</strong>{' '}
              {formatNumberWithCommas(percentageChange)}%
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageDifferenceCalculator;
