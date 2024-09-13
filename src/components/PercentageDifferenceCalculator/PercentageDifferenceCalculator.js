import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './_percentageDifferenceCalculator.scss';
import { fetchStockPrice } from '../../features/stocks/stockThunks';
import { setUserSymbol } from '../../features/user/userSlice';
import {
  formatNumberWithCommas,
  formatCurrency,
  parseCurrency,
} from '../../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import SymbolAutoSuggest from '../shared/SymbolAutoSuggest'; // Using shared SymbolAutoSuggest component
import { setSymbolAndFetchData } from '../../features/user/userThunks'; // Unified action

const PercentageDifferenceCalculator = () => {
  const symbol = useSelector((state) => state.user.symbol); // Using symbol from Redux
  const stockPrice = useSelector((state) => state.stocks.data); // Get stock price from Redux
  const dispatch = useDispatch();

  const [targetPrice, setTargetPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [percentageChange, setPercentageChange] = useState('0.00');
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    calculatePercentageChange();
  }, [targetPrice, currentPrice]);

  useEffect(() => {
    if (symbol) {
      dispatch(setSymbolAndFetchData(symbol)); // Use the unified action
    }
  }, [symbol, dispatch]);

  useEffect(() => {
    if (stockPrice) {
      setCurrentPrice(formatCurrency(stockPrice.toFixed(2))); // Set the strike price based on stock price
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
    setTargetPrice('');
    setCurrentPrice(formatCurrency(stockPrice.toFixed(2)));
    setPercentageChange('0.00');
  };

  const onSymbolSelected = (selectedSymbol) => {
    dispatch(setSymbolAndFetchData(symbol)); // Use the unified action
    resetFields();
  };

  const handleTargetPriceChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setTargetPrice(formatCurrency(value));
  };

  const refreshCurrentPrice = () => {
    if (symbol) {
      dispatch(fetchStockPrice(symbol))
        .unwrap()
        .then((result) => {
          if (result.day && result.day.c) {
            const stockPrice = result.day.c;
            setCurrentPrice(formatCurrency(stockPrice.toFixed(2)));
          } else {
            console.warn('No price data available');
            setCurrentPrice('$0.00');
          }
          setIsRotating(true);
          setTimeout(() => setIsRotating(false), 500);
        })
        .catch((error) => {
          console.error('Error refreshing stock price:', error);
        });
    } else {
      console.warn('No symbol selected for refresh');
    }
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
              <SymbolAutoSuggest onSuggestionSelected={onSymbolSelected} />
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
                readOnly
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
