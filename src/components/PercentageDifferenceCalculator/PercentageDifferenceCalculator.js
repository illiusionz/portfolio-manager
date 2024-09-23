// src/components/PercentageDifferenceCalculator.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PercentageDifferenceCalculator.scss';
import { fetchStockSnapshot } from '../../features/stocks/stockThunks';
import { selectStockPrice } from '../../features/stocks/stockSelectors'; // Updated selector
import { setUserSymbol } from '../../features/user/userSlice';
import { formatCurrency, parseCurrency } from '../../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import SymbolAutoSuggest from '../shared/SymbolAutoSuggest';

const PercentageDifferenceCalculator = () => {
  const dispatch = useDispatch();

  // State selectors
  const userSymbol = useSelector((state) => state.user.userSymbol); // User selected symbol
  const stockPrice = useSelector((state) =>
    selectStockPrice(state, userSymbol)
  );

  // Local state management
  const [targetPrice, setTargetPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [percentageChange, setPercentageChange] = useState('0.00');
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (userSymbol) {
      dispatch(fetchStockSnapshot(userSymbol));
    }
  }, [userSymbol, dispatch]);

  useEffect(() => {
    if (stockPrice) {
      const formattedPrice = formatCurrency(stockPrice.toFixed(2));
      setCurrentPrice(formattedPrice);
    }
  }, [stockPrice]);

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
    if (stockPrice) {
      setCurrentPrice(formatCurrency(stockPrice.toFixed(2)));
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
    if (!userSymbol) {
      console.warn('No symbol selected for refresh');
      return;
    }

    dispatch(fetchStockSnapshot(userSymbol))
      .unwrap()
      .then((result) => {
        if (result?.prevDay?.c) {
          const price = result.prevDay.c;
          setCurrentPrice(formatCurrency(price.toFixed(2))); // Correctly set the price
        } else {
          console.warn('Stock snapshot did not contain expected data.', result);
          setCurrentPrice(
            stockPrice ? formatCurrency(stockPrice.toFixed(2)) : '$0.00'
          );
        }
      })
      .catch((error) => {
        console.error('Error refreshing stock price:', error);
        setCurrentPrice(
          stockPrice ? formatCurrency(stockPrice.toFixed(2)) : '$0.00'
        );
      })
      .finally(() => {
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 500);
      });
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
