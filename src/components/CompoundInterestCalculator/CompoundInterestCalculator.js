import React, { useState } from 'react';
import { formatNumberWithCommas } from '../../utils/format';

const CompoundInterestCalculator = () => {
  const [initialCapital, setInitialCapital] = useState('');
  const [weeklyRate, setWeeklyRate] = useState('');
  const [results, setResults] = useState([]);

  const calculateCompoundInterest = (initial, rate) => {
    const weeks = 52;
    let capital = parseFloat(initial);
    const weeklyRateDecimal = parseFloat(rate) / 100;
    const result = [];
    for (let i = 1; i <= weeks; i++) {
      capital += capital * weeklyRateDecimal;
      result.push({
        week: i,
        profit: capital - initial,
        capital: capital,
      });
    }
    return result;
  };

  const handleCalculate = () => {
    const calculatedResults = calculateCompoundInterest(
      initialCapital.replace(/,/g, ''),
      weeklyRate
    );
    setResults(calculatedResults);
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Compound Interest Calculator</h5>
      </div>
      <div className='card-body'>
        <div className='form-inline'>
          <div className='form-group'>
            <label htmlFor='initialCapital'>Initial Capital:</label>
            <input
              type='text'
              id='initialCapital'
              className='form-control'
              value={initialCapital}
              onChange={(e) =>
                setInitialCapital(
                  formatNumberWithCommas(e.target.value.replace(/,/g, ''))
                )
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='weeklyRate'>Weekly Rate (%):</label>
            <input
              type='text'
              id='weeklyRate'
              className='form-control'
              value={weeklyRate}
              onChange={(e) => setWeeklyRate(e.target.value)}
            />
          </div>

          <button className='btn btn-primary' onClick={handleCalculate}>
            Calculate
          </button>
        </div>
        {results.length > 0 && (
          <div>
            <h5>Results:</h5>
            <table className='table'>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Weekly Profit ($)</th>
                  <th>Capital ($)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.week}>
                    <td>{result.week}</td>
                    <td>{formatNumberWithCommas(result.profit.toFixed(2))}</td>
                    <td>{formatNumberWithCommas(result.capital.toFixed(2))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
