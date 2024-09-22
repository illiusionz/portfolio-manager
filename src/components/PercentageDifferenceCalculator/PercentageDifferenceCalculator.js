// src/components/PercentageDifferenceCalculator.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './_percentageDifferenceCalculator.scss';
import { fetchStockSnapshot } from '../../features/stocks/stockThunks';
import { selectStockSnapshot } from '../../features/stocks/stockSelectors';
import { setUserSymbol } from '../../features/user/userSlice';
import {
  formatNumberWithCommas,
  formatCurrency,
  parseCurrency,
} from '../../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import SymbolAutoSuggest from '../shared/SymbolAutoSuggest';

const PercentageDifferenceCalculator = () => {
  const dispatch = useDispatch();

  // State selectors
  const symbol = useSelector((state) => state.user.symbol); // User selected symbol
  const stockSnapshot = useSelector((state) =>
    selectStockSnapshot(state, symbol)
  ); // Fetch stock snapshot data

  // Local state management
  const [targetPrice, setTargetPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [percentageChange, setPercentageChange] = useState('0.00');
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (symbol) {
      dispatch(fetchStockSnapshot(symbol));
    }
  }, [symbol, dispatch]);

  useEffect(() => {
    if (stockSnapshot?.prevDay?.c) {
      const formattedPrice = formatCurrency(stockSnapshot.prevDay.c.toFixed(2));
      setCurrentPrice(formattedPrice);
    }
  }, [stockSnapshot]);

  useEffect(() => {
    calculatePercentageChange();
  }, [targetPrice, currentPrice]);

  // Helper functions
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
    setPercentageChange('0.00');
    if (stockSnapshot?.prevDay?.c) {
      setCurrentPrice(formatCurrency(stockSnapshot.prevDay.c.toFixed(2)));
    } else {
      setCurrentPrice('$0.00');
    }
  };

  const onSymbolSelected = (selectedSymbol) => {
    dispatch(setUserSymbol(selectedSymbol));
    resetFields();
  };

  const handleTargetPriceChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setTargetPrice(formatCurrency(value));
  };

  const refreshCurrentPrice = () => {
    if (symbol) {
      dispatch(fetchStockSnapshot(symbol))
        .unwrap()
        .then((result) => {
          if (result?.day?.c) {
            setCurrentPrice(formatCurrency(result.day.c.toFixed(2)));
          } else {
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
