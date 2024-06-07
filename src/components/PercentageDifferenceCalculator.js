// src/components/PercentageDifferenceCalculator.js
import React, { useState } from 'react';

function PercentageDifferenceCalculator() {
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [percentageDifference, setPercentageDifference] = useState(null);

  const calculatePercentageDifference = () => {
    const diff = Math.abs(price1 - price2);
    const average = (parseFloat(price1) + parseFloat(price2)) / 2;
    const percentageDiff = (diff / average) * 100;
    setPercentageDifference(percentageDiff.toFixed(2));
  };

  return (
    <div>
      <div className='input-group mb-3'>
        <label htmlFor='price1' className='input-group-text'>
          Current Price:{' '}
        </label>
        <input
          type='number'
          className='form-control'
          id='price1'
          value={price1}
          onChange={(e) => setPrice1(e.target.value)}
        />
        <label htmlFor='price2' className='input-group-text'>
          Target Price:{' '}
        </label>
        <input
          type='number'
          className='form-control'
          id='price2'
          value={price2}
          onChange={(e) => setPrice2(e.target.value)}
        />
        <button
          className='btn btn-primary'
          onClick={calculatePercentageDifference}>
          Calculate
        </button>
      </div>
      {percentageDifference !== null && (
        <div>
          <h2>Percentage Change: {percentageDifference}%</h2>
        </div>
      )}
    </div>
  );
}

export default PercentageDifferenceCalculator;
