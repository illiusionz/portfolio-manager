import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import './PercentageDifferenceCalculator.scss';
import { fetchStockPrice } from '../../features/stocks/stockThunks'; // Updated path
import { setUserSymbol } from '../../features/user/userSlice'; // Updated path
import {
  formatNumberWithCommas,
  formatCurrency,
  parseCurrency,
} from '../../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const PercentageDifferenceCalculator = () => {
  const symbol = useSelector((state) => state.user.symbol);
  const [query, setQuery] = useState(symbol || '');
  const [targetPrice, setTargetPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [percentageChange, setPercentageChange] = useState('0.00');
  const [isRotating, setIsRotating] = useState(false);
  const stockPrice = useSelector((state) => state.stocks.data); // Updated to use stocks.data
  const dispatch = useDispatch();

  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  useEffect(() => {
    calculatePercentageChange();
  }, [targetPrice, currentPrice]);

  useEffect(() => {
    if (symbol) {
      setQuery(symbol);
      dispatch(fetchStockPrice(symbol));
    }
  }, [symbol, dispatch]);

  useEffect(() => {
    if (stockPrice) {
      setCurrentPrice(formatCurrency(stockPrice.toFixed(2)));
    }
  }, [stockPrice]);

  const calculatePercentageChange = () => {
    if (!currentPrice || !targetPrice) {
      setPercentageChange('0.00');
      return;
    }
    const change =
      ((parseCurrency(targetPrice) - parseCurrency(currentPrice)) /
        parseCurrency(currentPrice)) *
      100;
    setPercentageChange(isNaN(change) ? '0.00' : change.toFixed(2));
  };

  const resetFields = () => {
    setQuery('');
    setTargetPrice('');
    setCurrentPrice('');
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

  const onSuggestionSelected = (event, { suggestion }) => {
    const selectedSymbol = suggestion.ticker;
    dispatch(setUserSymbol(selectedSymbol));
    dispatch(fetchStockPrice(selectedSymbol));
    setQuery(selectedSymbol);
    setTargetPrice('');
    setCurrentPrice('');
    setPercentageChange('0.00');
  };

  const handleTargetPriceChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setTargetPrice(formatCurrency(value));
  };

  const handleCurrentPriceChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setCurrentPrice(formatCurrency(value));
  };

  const refreshCurrentPrice = async () => {
    if (symbol) {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${apiKey}`
        );
        const currentPrice = response.data.results[0].c;
        setCurrentPrice(formatCurrency(currentPrice.toFixed(2)));
        console.log('Refreshing current price...');
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 500);
      } catch (error) {
        console.error('Error refreshing current price:', error);
      }
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
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className={`card-refresh ${isRotating ? 'rotating' : ''}`}
            onClick={refreshCurrentPrice}
          />
        </div>
        <div className='card-body'>
          <form onSubmit={(e) => e.preventDefault()}>
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
                type='text'
                id='currentPrice'
                className='form-control'
                value={currentPrice}
                onChange={handleCurrentPriceChange}
                placeholder='$0.00'
              />
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='targetPrice'>
                Target Price:
              </label>
              <input
                type='text'
                id='targetPrice'
                className='form-control'
                value={targetPrice}
                onChange={handleTargetPriceChange}
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
            <h6>
              <strong>Percent Change:</strong> {percentageChange}%
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageDifferenceCalculator;
