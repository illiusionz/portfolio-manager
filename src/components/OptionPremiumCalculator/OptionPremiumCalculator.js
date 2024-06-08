// src/components/OptionPremiumCalculator/OptionPremiumCalculator.js
import React, { useState } from 'react';
import './OptionPremiumCalculator.css';

const OptionPremiumCalculator = () => {
  const [stockName, setStockName] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [numContracts, setNumContracts] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [numWeeks, setNumWeeks] = useState('');
  const [totalPremium, setTotalPremium] = useState(null);
  const [percentReturn, setPercentReturn] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const capitalRequired = strikePrice * 100 * numContracts;
    const collectedPremium = premiumAmount * 100 * numContracts * numWeeks;
    const returnPercentage = (collectedPremium / capitalRequired) * 100;

    setTotalPremium(collectedPremium.toFixed(2));
    setPercentReturn(returnPercentage.toFixed(2));
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Option Premium Calculator</h5>
      </div>
      <div className='card-body'>
        <form onSubmit={handleCalculate}>
          <div className='form-group'>
            <label htmlFor='stockName'>Stock Name:</label>
            <input
              type='text'
              id='stockName'
              className='form-control'
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='strikePrice'>Contract Strike Price:</label>
            <input
              type='number'
              id='strikePrice'
              className='form-control'
              value={strikePrice}
              onChange={(e) => setStrikePrice(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='numContracts'>Number of Contracts:</label>
            <input
              type='number'
              id='numContracts'
              className='form-control'
              value={numContracts}
              onChange={(e) => setNumContracts(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='premiumAmount'>Premium Amount:</label>
            <input
              type='number'
              id='premiumAmount'
              className='form-control'
              value={premiumAmount}
              onChange={(e) => setPremiumAmount(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='numWeeks'>Amount of Weeks:</label>
            <input
              type='number'
              id='numWeeks'
              className='form-control'
              value={numWeeks}
              onChange={(e) => setNumWeeks(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Calculate
          </button>
        </form>
        {totalPremium !== null && percentReturn !== null && (
          <div className='mt-3'>
            <p>Total Premium Collected: ${totalPremium}</p>
            <p>% Return: {percentReturn}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionPremiumCalculator;
