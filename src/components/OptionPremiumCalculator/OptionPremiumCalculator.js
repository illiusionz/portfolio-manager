import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatNumberWithCommas } from '../../utils/format';
import './OptionPremiumCalculator.css';

const OptionPremiumCalculator = () => {
  const [stockStrikePrice, setStockStrikePrice] = useState('');
  const [numberOfContracts, setNumberOfContracts] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [amountOfWeeks, setAmountOfWeeks] = useState('');
  const [totalPremium, setTotalPremium] = useState(null);
  const [percentageReturn, setPercentageReturn] = useState(null);
  const [totalCapital, setTotalCapital] = useState(null);

  const stockPrice = useSelector((state) => state.user.stockPrice);
  const stockName = useSelector((state) => state.user.symbol);

  const calculatePremium = () => {
    const strikePrice = parseFloat(stockStrikePrice.replace(/,/g, ''));
    const contracts = parseInt(numberOfContracts.replace(/,/g, ''), 10);
    const premium = parseFloat(premiumAmount.replace(/,/g, ''));
    const weeks = parseInt(amountOfWeeks.replace(/,/g, ''), 10);

    const totalCollected = premium * contracts * 100 * weeks;
    const capitalRequired = strikePrice * contracts * 100;
    const returnPercentage = (totalCollected / capitalRequired) * 100;

    setTotalPremium(totalCollected);
    setPercentageReturn(returnPercentage);
    setTotalCapital(capitalRequired);
  };

  useEffect(() => {
    // Log current stock price and name for debugging
    console.log('Current stock price:', stockPrice);
    console.log('Stock name:', stockName);

    if (stockPrice) {
      setStockStrikePrice(Math.round(stockPrice).toString());
    }
  }, [stockPrice, stockName]);

  return (
    <div className='option-premium-calculator'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title mb-0'>Option Premium Calculator</h5>
        </div>
        <div className='card-body'>
          <div className='form-group'>
            <label className='form-label' htmlFor='stockName'>
              Stock Name:
            </label>
            <input
              type='text'
              id='stockName'
              className='form-control'
              value={stockName}
              readOnly
            />
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='stockStrikePrice'>
              Stock Strike Price:
            </label>
            <input
              type='number'
              id='stockStrikePrice'
              className='form-control'
              value={stockStrikePrice}
              onChange={(e) => setStockStrikePrice(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='numberOfContracts'>
              Number of Contracts:
            </label>
            <input
              type='text'
              id='numberOfContracts'
              className='form-control'
              value={formatNumberWithCommas(numberOfContracts)}
              onChange={(e) =>
                setNumberOfContracts(e.target.value.replace(/,/g, ''))
              }
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
              value={formatNumberWithCommas(premiumAmount)}
              onChange={(e) =>
                setPremiumAmount(e.target.value.replace(/,/g, ''))
              }
            />
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='amountOfWeeks'>
              Amount of Weeks:
            </label>
            <input
              type='text'
              id='amountOfWeeks'
              className='form-control'
              value={formatNumberWithCommas(amountOfWeeks)}
              onChange={(e) =>
                setAmountOfWeeks(e.target.value.replace(/,/g, ''))
              }
            />
          </div>
          <button className='btn btn-primary' onClick={calculatePremium}>
            Calculate
          </button>
          {totalPremium !== null && (
            <div>
              <h5>
                Total Premium Collected: $
                {formatNumberWithCommas(totalPremium.toFixed(2))}
              </h5>
              <h5>
                Total Capital Used: $
                {formatNumberWithCommas(totalCapital.toFixed(2))}
              </h5>
              <h5>
                Average Return:{' '}
                {formatNumberWithCommas(percentageReturn.toFixed(2))}%
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionPremiumCalculator;
