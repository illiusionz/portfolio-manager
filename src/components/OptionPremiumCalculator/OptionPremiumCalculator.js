import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import './OptionPremiumCalculator.scss';
import { fetchStockPrice } from '../../features/stocks/stockThunks';
import { setUserSymbol } from '../../features/user/userSlice';
import {
  formatNumberWithCommas,
  formatCurrency,
  parseCurrency,
} from '../../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const OptionPremiumCalculator = () => {
  const symbol = useSelector((state) => state.user.symbol);
  const [query, setQuery] = useState(symbol || '');
  const [strikePrice, setStrikePrice] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [numberOfContracts, setNumberOfContracts] = useState(1);
  const [amountOfWeeks, setAmountOfWeeks] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [totalPremium, setTotalPremium] = useState(0);
  const [totalCapital, setTotalCapital] = useState(0);
  const [percentageReturn, setPercentageReturn] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const stockPrice = useSelector((state) => state.stocks.data); // Updated to use stocks.data
  const dispatch = useDispatch();

  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  useEffect(() => {
    if (symbol) {
      setQuery(symbol);
      dispatch(fetchStockPrice(symbol));
    }
  }, [symbol, dispatch]);

  useEffect(() => {
    if (stockPrice) {
      setStrikePrice(formatCurrency(stockPrice.toFixed(2)));
    }
  }, [stockPrice]);

  const resetFields = () => {
    setQuery('');
    setStrikePrice('');
    setPremiumAmount('');
    setNumberOfContracts(1);
    setAmountOfWeeks(1);
    setTotalPremium(0);
    setTotalCapital(0);
    setPercentageReturn(0);
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
      setStrikePrice('');
      setPremiumAmount('');
      dispatch(setUserSymbol(selectedSymbol));
      dispatch(fetchStockPrice(selectedSymbol));
      setQuery(selectedSymbol);
    } catch (error) {
      console.error('Error fetching price data:', error);
    }
  };

  const handleStrikePriceChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setStrikePrice(formatCurrency(value));
  };

  const handlePremiumAmountChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setPremiumAmount(formatCurrency(value));
  };

  const handleNumberOfContractsChange = (event) => {
    const value = event.target.value;
    setNumberOfContracts(value);
  };

  const handleAmountOfWeeksChange = (event) => {
    const value = event.target.value;
    setAmountOfWeeks(value);
  };

  useEffect(() => {
    calculateTotalPremium();
  }, [strikePrice, premiumAmount, numberOfContracts, amountOfWeeks]);

  const calculateTotalPremium = () => {
    const strike = parseCurrency(strikePrice);
    const premium = parseCurrency(premiumAmount) * 100;
    const total = numberOfContracts * premium * amountOfWeeks;
    setTotalPremium(isNaN(total) ? 0 : total);
    const capitalUsed = numberOfContracts * strike * 100;
    setTotalCapital(isNaN(capitalUsed) ? 0 : capitalUsed);
    const percentage = (total / capitalUsed) * 100;
    setPercentageReturn(isNaN(percentage) ? 0 : percentage);
  };

  const refreshCurrentPrice = () => {
    if (symbol) {
      dispatch(fetchStockPrice(symbol));
      console.log('Refreshing current price...');
      setIsRotating(true);
      setTimeout(() => setIsRotating(false), 500); // Reset the rotation after animation
    }
  };

  const inputProps = {
    placeholder: 'Search for a stock',
    value: query,
    onChange: onChange,
  };

  return (
    <div className='option-premium-calculator'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title mb-0'>Option Premium Calculator</h5>
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className={`card-refresh ${isRotating ? 'rotating' : ''}`}
            onClick={refreshCurrentPrice}
          />
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
              <label className='form-label' htmlFor='strikePrice'>
                Stock Strike Price:
              </label>
              <input
                type='text'
                id='strikePrice'
                className='form-control'
                value={strikePrice}
                onChange={handleStrikePriceChange}
                placeholder='$0.00'
              />
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='premiumAmount'>
                Premium Amount:
              </label>
              <input
                type='text'
                id='premiumAmount'
                className='form-control'
                value={premiumAmount}
                onChange={handlePremiumAmountChange}
                placeholder='$0.00'
              />
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='numberOfContracts'>
                Number of Contracts:
              </label>
              <input
                type='number'
                id='numberOfContracts'
                className='form-control'
                value={numberOfContracts}
                onChange={handleNumberOfContractsChange}
              />
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='amountOfWeeks'>
                Amount of Weeks:
              </label>
              <input
                type='number'
                id='amountOfWeeks'
                className='form-control'
                value={amountOfWeeks}
                onChange={handleAmountOfWeeksChange}
              />
            </div>
            <div className='button-group'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={calculateTotalPremium}>
                Calculate
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={resetFields}>
                Reset
              </button>
            </div>
            <div className='result'>
              <h6>
                <strong>Total Premium Collected:</strong>+$
                {formatNumberWithCommas(totalPremium.toFixed(2))}
              </h6>
              <h6>
                <strong>Total Capital Used:</strong>$
                {formatNumberWithCommas(totalCapital.toFixed(2))}
              </h6>
              <h6>
                <strong>Average Return:</strong>+
                {formatNumberWithCommas(percentageReturn.toFixed(2))}%
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OptionPremiumCalculator;
