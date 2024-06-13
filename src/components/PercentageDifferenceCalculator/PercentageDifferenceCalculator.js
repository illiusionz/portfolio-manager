import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './PercentageDifferenceCalculator.css';

const PercentageDifferenceCalculator = () => {
  const [targetPrice, setTargetPrice] = useState('');
  const [percentageChange, setPercentageChange] = useState(null);

  const stockPrice = useSelector((state) => state.user.stockPrice);
  const stockName = useSelector((state) => state.user.symbol);

  const calculatePercentageChange = (e) => {
    e.preventDefault();
    if (!stockPrice || !targetPrice) {
      setPercentageChange(null);
      return;
    }
    const change = ((targetPrice - stockPrice) / stockPrice) * 100;
    setPercentageChange(change.toFixed(2));
  };

  const resetFields = () => {
    setTargetPrice('');
    setPercentageChange(null);
  };

  useEffect(() => {
    console.log('Current stock price:', stockPrice);
    console.log('Stock name:', stockName);
  }, [stockPrice, stockName]);

  return (
    <div className='percentage-difference-calculator'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title mb-0'>Stock Price % Change</h5>
        </div>
        <div className='card-body'>
          <form className='form-inline' onSubmit={calculatePercentageChange}>
            <div className='form-group mx-2'>
              <label className='form-label' htmlFor='stockName'>
                Stock Name:
              </label>
              <input
                type='text'
                id='stockName'
                className='form-control mx-2'
                value={stockName}
                readOnly
              />
            </div>
            <div className='form-group mx-2'>
              <label className='form-label' htmlFor='currentPrice'>
                Current Price:
              </label>
              <input
                type='number'
                id='currentPrice'
                className='form-control mx-2'
                value={stockPrice || ''}
                readOnly
              />
            </div>
            <div className='form-group mx-2'>
              <label className='form-label' htmlFor='targetPrice'>
                Target Price:
              </label>
              <input
                type='number'
                id='targetPrice'
                className='form-control mx-2'
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
              />
            </div>
            <div className='form-group button-group'>
              <button type='submit' className='btn btn-primary mx-2'>
                Calculate
              </button>
              <button
                type='button'
                className='btn btn-danger mx-2'
                onClick={resetFields}>
                Reset
              </button>
            </div>
          </form>
          {percentageChange !== null && (
            <div className='result mt-3'>
              <h5>
                <strong>Percent Change:</strong> {percentageChange}%
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PercentageDifferenceCalculator;
