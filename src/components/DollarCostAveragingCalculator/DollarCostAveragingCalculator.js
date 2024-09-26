import React, { useState, useEffect } from 'react';
import './DollarCostAveragingCalculator.scss';
import {
  formatNumberWithCommas,
  formatCurrency,
  parseCurrency,
} from '../../utils/format';

const DollarCostAveragingCalculator = () => {
  const [investments, setInvestments] = useState([
    { shares: '100', avgBuy: '', totalCost: '' },
    { shares: '', avgBuy: '', totalCost: '' }, // Second row shown by default
  ]);
  const [result, setResult] = useState({
    shares: 0,
    avgBuy: '0.00',
    totalCost: '0',
  });

  const handleInputChange = (index, field, value) => {
    const newInvestments = investments.slice();
    if (field === 'avgBuy' || field === 'shares') {
      value = value.replace(/[^0-9.]/g, ''); // Ensure only numbers and decimals
    }

    newInvestments[index][field] = value;

    if (field === 'shares' || field === 'avgBuy') {
      const shares = parseFloat(newInvestments[index].shares || 0);
      const avgBuy = parseFloat(newInvestments[index].avgBuy || 0);
      newInvestments[index].totalCost = shares * avgBuy || '';
    }

    setInvestments(newInvestments);
    calculateResult(newInvestments);
  };

  const handleAddRow = () => {
    setInvestments([...investments, { shares: '', avgBuy: '', totalCost: '' }]);
  };

  const handleClearRow = () => {
    if (investments.length > 1) {
      const newInvestments = investments.slice(0, -1);
      setInvestments(newInvestments);
      calculateResult(newInvestments);
    }
  };

  const handleReset = () => {
    const resetInvestments = [
      { shares: '', avgBuy: '', totalCost: '' },
      { shares: '', avgBuy: '', totalCost: '' }, // Resetting to show two rows by default
    ];
    setInvestments(resetInvestments);
    setResult({ shares: 0, avgBuy: '0.00', totalCost: 0 });
  };

  const calculateResult = (currentInvestments) => {
    const totalShares = currentInvestments.reduce(
      (acc, inv) => acc + parseFloat(inv.shares || 0),
      0
    );
    const totalCost = currentInvestments.reduce(
      (acc, inv) => acc + parseFloat(inv.totalCost || 0),
      0
    );
    const avgBuy = totalShares ? (totalCost / totalShares).toFixed(2) : '0.00';

    const calculationResult = {
      shares: totalShares,
      avgBuy: formatCurrency(avgBuy),
      totalCost: formatCurrency(totalCost),
    };

    setResult(calculationResult);
  };

  useEffect(() => {
    calculateResult(investments);
  }, []);

  return (
    <div className='dca-calculator card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Dollar Cost Average</h5>
      </div>
      <div className='card-body'>
        {investments.map((investment, index) => (
          <div key={index} className='investment-row mb-3'>
            <h6>
              <strong>Investment {index + 1}</strong>
            </h6>
            <div className='form-row mb-2'>
              <div className='col'>
                <label className='form-label'>Shares</label>
                <input
                  type='text'
                  className='form-control'
                  id='shares'
                  value={investment.shares}
                  onChange={(e) =>
                    handleInputChange(index, 'shares', e.target.value)
                  }
                  placeholder='0.00'
                />
              </div>
              <div className='col'>
                <label className='form-label'>Avg Buy</label>
                <input
                  type='text'
                  className='form-control'
                  id='avgBuy'
                  value={
                    investment.avgBuy ? formatCurrency(investment.avgBuy) : ''
                  }
                  placeholder='$0.00'
                  onChange={(e) =>
                    handleInputChange(index, 'avgBuy', e.target.value)
                  }
                />
              </div>
              <div className='col'>
                <label className='form-label'>Total Cost</label>
                <input
                  type='text'
                  className='form-control'
                  id='totalCost'
                  value={
                    investment.totalCost
                      ? formatCurrency(investment.totalCost)
                      : ''
                  }
                  placeholder='$0.00'
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
        <div className='button-group d-flex justify-content-between mb-3'>
          <button
            className='btn btn-success flex-fill mx-1'
            onClick={handleAddRow}>
            Add
          </button>
          <button
            className='btn btn-warning flex-fill mx-1'
            onClick={handleClearRow}>
            Clear
          </button>
          <button
            className='btn btn-danger flex-fill mx-1'
            onClick={handleReset}>
            Reset
          </button>
        </div>
        {result && (
          <div className='result'>
            <div className='form-row'>
              <div className='col'>
                <h6>
                  <b>Shares:</b> {formatNumberWithCommas(result.shares)}
                </h6>
              </div>
              <div className='col'>
                <h6>
                  <b>Avg Buy:</b> {result.avgBuy}
                </h6>
              </div>
              <div className='col'>
                <h6>
                  <b>Total Cost:</b> {result.totalCost}
                </h6>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DollarCostAveragingCalculator;
