// src/components/DividendInfo/DividendInfo.js
import './DividendInfo.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatNumberWithCommas, parseCurrency } from '../../utils/format';
import { setUserSymbol } from '../../features/user/userSlice';
import { selectUserSymbol } from '../../features/user/userSelectors';
import { selectTheme } from '../../features/theme/themeSelectors';
import SymbolAutoSuggest from '../shared/SymbolAutoSuggest';

const DividendInfo = () => {
  const dispatch = useDispatch();
  const userSymbol = useSelector(selectUserSymbol);
  const watchlist = useSelector((state) => state.watchlist.symbols);
  const [dividends, setDividends] = useState([]);
  const [numberOfShares, setNumberOfShares] = useState('');
  const [calculatedDividend, setCalculatedDividend] = useState(null);
  const theme = useSelector(selectTheme);

  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  useEffect(() => {
    const fetchDividends = async () => {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v3/reference/dividends?ticker=${userSymbol}&apiKey=${apiKey}`
        );
        setDividends(response.data.results || []);
      } catch (error) {
        console.error('Error fetching dividend data:', error);
      }
    };

    if (userSymbol) {
      fetchDividends();
    }
  }, [userSymbol]);

  // Handle the selection of a new stock symbol
  const handleSymbolSelection = (selectedSymbol) => {
    dispatch(setUserSymbol(selectedSymbol));
    fetchDividends(selectedSymbol);
  };

  const fetchDividends = async (selectedSymbol) => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/dividends?ticker=${selectedSymbol}&apiKey=${apiKey}`
      );
      setDividends(response.data.results || []);
      setCalculatedDividend(null); // Reset the calculated dividend when symbol changes
    } catch (error) {
      console.error('Error fetching dividend data:', error);
    }
  };

  const handleCalculate = () => {
    const selectedDividend = dividends.find(
      (dividend) => dividend.ticker === userSymbol.toUpperCase()
    );
    if (selectedDividend && numberOfShares) {
      const totalDividend =
        parseFloat(selectedDividend.cash_amount) *
        parseCurrency(numberOfShares);
      setCalculatedDividend(totalDividend.toFixed(2));
    }
  };

  const handleReset = () => {
    setNumberOfShares('');
    setCalculatedDividend(null);
    setDividends([]);
  };

  const handleNumberOfSharesChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setNumberOfShares(formatNumberWithCommas(value));
  };

  const handleWatchlistSelectChange = async (e) => {
    const selectedSymbol = e.target.value;
    setUserSymbol(selectedSymbol);
    handleSymbolSelection(selectedSymbol);
  };

  return (
    <div className='card dividend-info'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Stock Dividend Information</h5>
      </div>
      <div className='card-body'>
        <form className=''>
          <div className='form-group'>
            <label className='form-label' htmlFor='symbol'>
              Stock Symbol:{' '}
            </label>
            <SymbolAutoSuggest onSymbolSelect={handleSymbolSelection} />
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='watchlist'>
              Watchlist:{' '}
            </label>
            <select
              className='form-control'
              value={userSymbol || ''}
              onChange={handleWatchlistSelectChange}>
              <option value='' disabled>
                Select a Stock from Watchlist
              </option>
              {watchlist.map((ticker) => (
                <option key={ticker} value={ticker}>
                  {ticker}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='numberOfShares'>
              Number of Shares:{' '}
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Number of Shares'
              value={numberOfShares}
              onChange={handleNumberOfSharesChange}
            />
          </div>
          <div className='button-group d-flex'>
            <button
              type='button'
              className='btn btn-danger btn-stretch'
              onClick={handleReset}>
              Reset
            </button>
            <button
              type='button'
              className='btn btn-primary btn-stretch'
              onClick={handleCalculate}>
              Calculate
            </button>
          </div>
        </form>
        <div className='result'>
          <h5>
            <strong>Total Dividend:</strong> $
            {formatNumberWithCommas(calculatedDividend) || '0.00'}
          </h5>
        </div>
        <div className='table-responsive'>
          <table
            className={`table table-striped mt-3 ${
              theme === 'theme-dark' ? 'table-dark' : ''
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
    </div>
  );
};

export default DividendInfo;
