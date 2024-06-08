// src/components/PercentageDifferenceCalculator/PercentageDifferenceCalculator.js
import React, { useState } from 'react';
import './PercentageDifferenceCalculator.css';
import { formatNumberWithCommas } from '../../utils/format';

const PercentageDifferenceCalculator = () => {
  const [currentPrice, setCurrentPrice] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [percentageChange, setPercentageChange] = useState(null);

  const calculatePercentageChange = (e) => {
    e.preventDefault();
    if (!currentPrice || !targetPrice) {
      setPercentageChange(null);
      return;
    }
    const change = ((targetPrice - currentPrice) / currentPrice) * 100;
    setPercentageChange(change.toFixed(2));
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Stock Price % Change</h5>
      </div>
      <div className='card-body'>
        <form className='form-inline' onSubmit={calculatePercentageChange}>
          <div className='form-group mx-2'>
            <label className='form-label' htmlFor='currentPrice'>
              Current Price:
            </label>
            <input
              type='number'
              id='currentPrice'
              className='form-control mx-2'
              value={formatNumberWithCommas(currentPrice)}
              onChange={(e) => setCurrentPrice(e.target.value)}
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
              value={formatNumberWithCommas(targetPrice)}
              onChange={(e) => setTargetPrice(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary mx-2'>
            Calculate
          </button>
        </form>
        {percentageChange !== null && (
          <div className='mt-3'>
            <strong>Percentage Change: {percentageChange}%</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default PercentageDifferenceCalculator;
