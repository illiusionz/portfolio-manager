import React, { useState } from 'react';
import './OptionPremiumCalculator.css';

const OptionPremiumCalculator = () => {
  const [stockName, setStockName] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [numContracts, setNumContracts] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [weeks, setWeeks] = useState('');
  const [totalPremium, setTotalPremium] = useState(null);
  const [totalCapital, setTotalCapital] = useState(null);
  const [returnPercentage, setReturnPercentage] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const capital = strikePrice * numContracts * 100;
    const premiumCollected = premiumAmount * numContracts * 100 * weeks;
    const returnPct = ((premiumCollected / capital) * 100).toFixed(2);

    setTotalPremium(premiumCollected);
    setTotalCapital(capital);
    setReturnPercentage(returnPct);
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Option Premium Calculator</h5>
      </div>
      <div className='card-body'>
        <form onSubmit={handleCalculate}>
          <div className='form-group'>
            <label>Stock Name:</label>
            <input
              type='text'
              className='form-control'
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Stock Strike Price:</label>
            <input
              type='number'
              className='form-control'
              value={strikePrice}
              onChange={(e) => setStrikePrice(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Number of Contracts:</label>
            <input
              type='number'
              className='form-control'
              value={numContracts}
              onChange={(e) => setNumContracts(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Premium Amount:</label>
            <input
              type='number'
              step='0.01'
              className='form-control'
              value={premiumAmount}
              onChange={(e) => setPremiumAmount(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Amount of Weeks:</label>
            <input
              type='number'
              className='form-control'
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Calculate
          </button>
        </form>
        {totalPremium !== null && (
          <div className='result mt-3'>
            <p>Total Premium Collected: ${totalPremium.toFixed(2)}</p>
            <p>Total Capital Used: ${totalCapital.toFixed(2)}</p>
            <p>% Return: {returnPercentage}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionPremiumCalculator;
