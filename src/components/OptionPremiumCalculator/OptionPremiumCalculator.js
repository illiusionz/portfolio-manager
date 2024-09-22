// src/components/OptionPremiumCalculator.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './OptionPremiumCalculator.scss';
import { fetchStockSnapshot } from '../../features/stocks/stockThunks'; // Redux thunk for fetching stock data
import { selectStockPrice } from '../../features/stocks/stockSelectors'; // Selector for stock price
import { setUserSymbol } from '../../features/user/userSlice'; // Action for setting user symbol
import {
  formatNumberWithCommas,
  formatCurrency,
  parseCurrency,
} from '../../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import SymbolAutoSuggest from '../shared/SymbolAutoSuggest'; // Shared component for symbol suggestion

const OptionPremiumCalculator = () => {
  const dispatch = useDispatch();

  // State selectors
  const symbol = useSelector((state) => state.user.symbol); // Selected symbol
  const currentPrice = useSelector((state) => selectStockPrice(state, symbol)); // Fetch stock price

  // Local state management
  const [strikePrice, setStrikePrice] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [numberOfContracts, setNumberOfContracts] = useState(1);
  const [amountOfWeeks, setAmountOfWeeks] = useState(1);
  const [totalPremium, setTotalPremium] = useState(0);
  const [totalCapital, setTotalCapital] = useState(0);
  const [percentageReturn, setPercentageReturn] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // Fetch stock data when the symbol changes
  useEffect(() => {
    if (symbol) {
      dispatch(fetchStockSnapshot(symbol));
    }
  }, [symbol, dispatch]);

  // Set the initial strike price based on current stock price
  useEffect(() => {
    if (currentPrice) {
      setStrikePrice(formatCurrency(currentPrice.toFixed(2)));
    }
  }, [currentPrice]);

  // Recalculate total premium and return when input values change
  useEffect(() => {
    calculateTotalPremium();
  }, [strikePrice, premiumAmount, numberOfContracts, amountOfWeeks]);

  // Helper function to calculate the total premium and return
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

  // Handle resetting of fields
  const resetFields = () => {
    setPremiumAmount('');
    setNumberOfContracts(1);
    setAmountOfWeeks(1);
    setTotalPremium(0);
    setTotalCapital(0);
    setPercentageReturn(0);
    if (currentPrice) {
      setStrikePrice(formatCurrency(currentPrice.toFixed(2)));
    } else {
      setStrikePrice('$0.00');
    }
  };

  // Handle selection of a new symbol
  const onSymbolSelected = (selectedSymbol) => {
    dispatch(setUserSymbol(selectedSymbol));
    resetFields();
  };

  // Handle changes in strike price input
  const handleStrikePriceChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setStrikePrice(formatCurrency(value));
  };

  // Handle changes in premium amount input
  const handlePremiumAmountChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setPremiumAmount(formatCurrency(value));
  };

  // Handle changes in number of contracts input
  const handleNumberOfContractsChange = (event) => {
    setNumberOfContracts(Number(event.target.value));
  };

  // Handle changes in amount of weeks input
  const handleAmountOfWeeksChange = (event) => {
    setAmountOfWeeks(Number(event.target.value));
  };

  // Handle refreshing the current price
  const refreshCurrentPrice = () => {
    if (symbol) {
      dispatch(fetchStockSnapshot(symbol))
        .unwrap()
        .then((result) => {
          if (result?.day?.c) {
            setStrikePrice(formatCurrency(result.day.c.toFixed(2)));
          } else {
            setStrikePrice('$0.00');
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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className='form-group'>
              <label className='form-label' htmlFor='stockName'>
                Stock Name:
              </label>
              <SymbolAutoSuggest onSuggestionSelected={onSymbolSelected} />
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
            <div className='result mt-3'>
              <h6>
                <strong>Total Premium Collected:</strong> +$
                {formatNumberWithCommas(totalPremium.toFixed(2))}
              </h6>
              <h6>
                <strong>Total Capital Used:</strong> $
                {formatNumberWithCommas(totalCapital.toFixed(2))}
              </h6>
              <h6>
                <strong>Average Return:</strong> +
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
