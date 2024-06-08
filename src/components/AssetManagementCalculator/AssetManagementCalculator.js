// src/components/AssetManagementCalculator/AssetManagementCalculator.js
import React, { useState } from 'react';

const AssetManagementCalculator = () => {
  const [totalCapital, setTotalCapital] = useState('');
  const [sectorAllocations, setSectorAllocations] = useState({
    technology: '',
    healthcare: '',
    finance: '',
    energy: '',
    consumerGoods: '',
  });
  const [investments, setInvestments] = useState({
    technology: [],
    healthcare: [],
    finance: [],
    energy: [],
    consumerGoods: [],
  });

  const handleSectorAllocationChange = (e) => {
    const { name, value } = e.target;
    setSectorAllocations({ ...sectorAllocations, [name]: value });
  };

  const handleInvestmentChange = (sector, index, field, value) => {
    const updatedInvestments = [...investments[sector]];
    updatedInvestments[index] = {
      ...updatedInvestments[index],
      [field]: value,
    };
    setInvestments({ ...investments, [sector]: updatedInvestments });
  };

  const addInvestment = (sector) => {
    setInvestments({
      ...investments,
      [sector]: [
        ...investments[sector],
        { name: '', amount: '', returnRate: '' },
      ],
    });
  };

  const calculateResults = () => {
    // Logic for calculating sector allocation summary, investment summary, total expected return, risk assessment, and rebalancing suggestions
  };

  return (
    <div className='container mt-4'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title mb-0'>Asset Management Calculator</h5>
        </div>
        <div className='card-body'>
          <div className='form-group'>
            <label>Total Capital:</label>
            <input
              type='number'
              className='form-control'
              value={totalCapital}
              onChange={(e) => setTotalCapital(e.target.value)}
            />
          </div>

          {Object.keys(sectorAllocations).map((sector) => (
            <div key={sector} className='form-group'>
              <label>
                {sector.charAt(0).toUpperCase() + sector.slice(1)} Allocation
                (%):
              </label>
              <input
                type='number'
                className='form-control'
                name={sector}
                value={sectorAllocations[sector]}
                onChange={handleSectorAllocationChange}
              />
              <button
                className='btn btn-secondary mt-2'
                onClick={() => addInvestment(sector)}>
                Add Investment
              </button>
              {investments[sector].map((investment, index) => (
                <div key={index} className='form-group mt-2'>
                  <label>Investment Name:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={investment.name}
                    onChange={(e) =>
                      handleInvestmentChange(
                        sector,
                        index,
                        'name',
                        e.target.value
                      )
                    }
                  />
                  <label>Amount Invested:</label>
                  <input
                    type='number'
                    className='form-control'
                    value={investment.amount}
                    onChange={(e) =>
                      handleInvestmentChange(
                        sector,
                        index,
                        'amount',
                        e.target.value
                      )
                    }
                  />
                  <label>Expected Return Rate (%):</label>
                  <input
                    type='number'
                    className='form-control'
                    value={investment.returnRate}
                    onChange={(e) =>
                      handleInvestmentChange(
                        sector,
                        index,
                        'returnRate',
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}

          <button className='btn btn-primary mt-4' onClick={calculateResults}>
            Calculate
          </button>

          {/* Display the results here */}
        </div>
      </div>
    </div>
  );
};

export default AssetManagementCalculator;
