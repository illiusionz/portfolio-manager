import React, { useState } from 'react';
import './DollarCostAveragingCalculator.css';

const DollarCostAveragingCalculator = () => {
  const [investments, setInvestments] = useState([
    { shares: '', avgBuy: '', totalCost: '' },
  ]);
  const [result, setResult] = useState(null);

  const handleInputChange = (index, field, value) => {
    const newInvestments = investments.slice();
    newInvestments[index][field] = value;

    if (field === 'shares' || field === 'avgBuy') {
      const shares = parseFloat(newInvestments[index].shares || 0);
      const avgBuy = parseFloat(newInvestments[index].avgBuy || 0);
      newInvestments[index].totalCost = shares * avgBuy || '';
    }

    setInvestments(newInvestments);
  };

  const handleAddRow = () => {
    setInvestments([...investments, { shares: '', avgBuy: '', totalCost: '' }]);
  };

  const handleClearRow = () => {
    if (investments.length > 1) {
      setInvestments(investments.slice(0, -1));
    }
  };

  const handleReset = () => {
    setInvestments([{ shares: '', avgBuy: '', totalCost: '' }]);
    setResult(null);
  };

  const handleCalculate = () => {
    const totalShares = investments.reduce(
      (acc, inv) => acc + parseFloat(inv.shares || 0),
      0
    );
    const totalCost = investments.reduce(
      (acc, inv) => acc + parseFloat(inv.totalCost || 0),
      0
    );
    const avgBuy = totalCost / totalShares;

    const calculationResult = {
      shares: totalShares,
      avgBuy: avgBuy.toFixed(2),
      totalCost,
    };

    setResult(calculationResult);
  };

  return (
    <div className='dca-calculator card'>
      <div class='card-header'>
        <h5 className='card-title mb-0'>Dollar Cost Averaging Calculator</h5>
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
                  type='number'
                  className='form-control'
                  value={investment.shares}
                  onChange={(e) =>
                    handleInputChange(index, 'shares', e.target.value)
                  }
                />
              </div>
              <div className='col'>
                <label className='form-label'>Avg Buy</label>
                <input
                  type='number'
                  className='form-control'
                  value={investment.avgBuy}
                  onChange={(e) =>
                    handleInputChange(index, 'avgBuy', e.target.value)
                  }
                />
              </div>
              <div className='col'>
                <label className='form-label'>Total Cost</label>
                <input
                  type='number'
                  className='form-control'
                  value={investment.totalCost}
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
        <div className='button-group mb-3'>
          <button className='btn btn-primary me-2' onClick={handleAddRow}>
            Add
          </button>
          <button className='btn btn-warning me-2' onClick={handleClearRow}>
            Clear
          </button>
          <button className='btn btn-danger' onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className='mb-3'>
          <button className='btn btn-success w-100' onClick={handleCalculate}>
            Calculate
          </button>
        </div>
        {result && (
          <div class='result'>
            <h6>
              <strong>Result</strong>
            </h6>
            <div className='form-row'>
              <div className='col'>
                <label className='form-label'>Shares</label>
                <input
                  type='number'
                  className='form-control'
                  value={result.shares}
                  readOnly
                />
              </div>
              <div className='col'>
                <label className='form-label'>Avg Buy</label>
                <input
                  type='number'
                  className='form-control'
                  value={result.avgBuy}
                  readOnly
                />
              </div>
              <div className='col'>
                <label className='form-label'>Total Cost</label>
                <input
                  type='number'
                  className='form-control'
                  value={result.totalCost}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DollarCostAveragingCalculator;
