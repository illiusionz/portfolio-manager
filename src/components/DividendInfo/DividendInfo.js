import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  formatNumberWithCommas,
  formatCurrency,
  parseCurrency,
} from '../../utils/format';
import { setUserSymbol } from '../../features/user/userSlice'; // Updated path
import { fetchStockPrice } from '../../features/stocks/stockThunks'; // Updated path

import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './DividendInfo.scss';

const DividendInfo = () => {
  const symbol = useSelector((state) => state.user.symbol); // Get the selected symbol from the state
  const watchlist = useSelector((state) => state.watchlist.symbols); // Get the watchlist from the state
  const [query, setQuery] = useState(symbol || '');
  const [dividends, setDividends] = useState([]);
  const [numberOfShares, setNumberOfShares] = useState('');
  const [calculatedDividend, setCalculatedDividend] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  useEffect(() => {
    const fetchDividends = async () => {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v3/reference/dividends?ticker=${symbol}&apiKey=${apiKey}`
        );
        setDividends(response.data.results || []);
      } catch (error) {
        console.error('Error fetching dividend data:', error);
      }
    };

    if (symbol) {
      setQuery(symbol);
      fetchDividends();
    }
  }, [symbol]);

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
        `https://api.polygon.io/v3/reference/dividends?ticker=${selectedSymbol}&apiKey=${apiKey}`
      );
      dispatch(setUserSymbol(selectedSymbol));
      setDividends(response.data.results || []);
      setQuery(selectedSymbol);
    } catch (error) {
      console.error('Error fetching dividend data:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchSymbol = query.split(' - ')[0];
    try {
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/dividends?ticker=${searchSymbol}&apiKey=${apiKey}`
      );
      setDividends(response.data.results || []);
    } catch (error) {
      console.error('Error fetching dividend data:', error);
    }
  };

  const handleCalculate = () => {
    const selectedDividend = dividends.find(
      (dividend) => dividend.ticker === query.toUpperCase()
    );
    if (selectedDividend && numberOfShares) {
      const totalDividend =
        parseFloat(selectedDividend.cash_amount) *
        parseCurrency(numberOfShares);
      setCalculatedDividend(totalDividend.toFixed(2));
    }
  };

  const handleReset = () => {
    setQuery('');
    setNumberOfShares('');
    setCalculatedDividend(null);
    setDividends([]);
    setSuggestions([]);
  };

  const handleNumberOfSharesChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setNumberOfShares(formatNumberWithCommas(value));
  };

  const handleSelectChange = async (e) => {
    const selectedSymbol = e.target.value;
    setQuery(selectedSymbol);
    dispatch(setUserSymbol(selectedSymbol));
    try {
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/dividends?ticker=${selectedSymbol}&apiKey=${apiKey}`
      );
      setDividends(response.data.results || []);
    } catch (error) {
      console.error('Error fetching dividend data:', error);
    }
  };

  const inputProps = {
    placeholder: 'Search for a stock',
    value: query,
    onChange: onChange,
  };

  return (
    <div className='card dividend-info'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Stock Dividend Information</h5>
      </div>
      <div className='card-body'>
        <form className='form-inline my-2 my-lg-0' onSubmit={handleSearch}>
          <div className='form-group me-5'>
            <input
              type='text'
              className='form-control mx-2'
              placeholder='Number of Shares'
              value={numberOfShares}
              onChange={handleNumberOfSharesChange}
            />
            <button
              type='button'
              className='btn btn-primary my-2 my-sm-0 ml-2'
              onClick={handleCalculate}>
              Calculate Dividend
            </button>
          </div>
          <div className='form-group me-5'>
            <select
              className='form-control'
              value={query}
              onChange={handleSelectChange}>
              <option value='' disabled>
                Select a Stock
              </option>
              {watchlist.map((ticker) => (
                <option key={ticker} value={ticker}>
                  {ticker}
                </option>
              ))}
            </select>
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
          <button
            className='btn btn-primary my-2 my-sm-0 ms-3 mx-3'
            type='submit'>
            Search
          </button>
          <button
            type='button'
            className='btn btn-danger my-2 my-sm-0 ml-2'
            onClick={handleReset}>
            Reset
          </button>
        </form>
        <div className='mt-3'>
          <h5>
            <strong>Total Dividend:</strong> $
            {formatNumberWithCommas(calculatedDividend) || '0.00'}
          </h5>
        </div>
        <table
          className={`table table-striped mt-3 ${
            theme === 'dark' ? 'table-dark' : ''
          }`}>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Cash Amount</th>
              <th>Declaration Date</th>
              <th>Dividend Type</th>
              <th>Ex-Dividend Date</th>
              <th>Frequency</th>
              <th>Pay Date</th>
              <th>Record Date</th>
            </tr>
          </thead>
          <tbody>
            {dividends.map((dividend, index) => (
              <tr key={index}>
                <td>{dividend.ticker}</td>
                <td>{dividend.cash_amount}</td>
                <td>{dividend.declaration_date}</td>
                <td>{dividend.dividend_type}</td>
                <td>{dividend.ex_dividend_date}</td>
                <td>{dividend.frequency}</td>
                <td>{dividend.pay_date}</td>
                <td>{dividend.record_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DividendInfo;
