import './PercentageDifferenceCalculator.scss';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency, parseCurrency } from '../../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { fetchStockSnapshot } from '../../features/stocks/stockThunks';
import { selectStockPrice } from '../../features/stocks/stockSelectors';
import { selectUserSymbol } from '../../features/user/userSelectors';
import { setUserSymbol } from '../../features/user/userSlice';
import SymbolAutoSuggest from '../shared/SymbolAutoSuggest';

const PercentageDifferenceCalculator = () => {
  const dispatch = useDispatch();

  // State selectors
  const userSymbol = useSelector(selectUserSymbol);
  const stockPrice = useSelector((state) =>
    selectStockPrice(state, userSymbol)
  );

  // Local state management
  const [targetPrice, setTargetPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [percentageChange, setPercentageChange] = useState('0.00');
  const [isRotating, setIsRotating] = useState(false);

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
          <h5 className='card-title'>Stock Price % Change</h5>
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
                Stock Symbol:
              </label>
              <SymbolAutoSuggest onSuggestionSelected={onSymbolSelected} />
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='currentPrice'>
                Current Stock Price:
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
                Target Stock Price:
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

            <div className='button-group d-flex'>
              <button
                type='button'
                className='btn btn-danger btn-stretch ml-2'
                onClick={resetFields}>
                Reset
              </button>
              <button type='button' className='btn btn-primary btn-stretch'>
                Calculate
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
