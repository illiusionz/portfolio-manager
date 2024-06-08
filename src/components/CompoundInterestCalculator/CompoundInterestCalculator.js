import React, { useState } from 'react';
import './CompoundInterestCalculator.css';

const CompoundInterestCalculator = () => {
  const [initialCapital, setInitialCapital] = useState(0);
  const [weeklyRate, setWeeklyRate] = useState(0);
  const [results, setResults] = useState([]);

  const calculate = () => {
    let capital = parseFloat(initialCapital);
    const rate = parseFloat(weeklyRate) / 100;
    let newResults = [];
    for (let week = 1; week <= 52; week++) {
      const profit = capital * rate;
      capital += profit;
      newResults.push({ week, profit, capital });
    }
    setResults(newResults);
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Compound Interest Calculator</h5>
      </div>
      <div className='card-body'>
        <form>
          <div className='form-group'>
            <label htmlFor='initialCapital'>Initial Capital:</label>
            <input
              type='number'
              className='form-control'
              id='initialCapital'
              value={initialCapital}
              onChange={(e) => setInitialCapital(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='weeklyRate'>Weekly Rate (%):</label>
            <input
              type='number'
              className='form-control'
              id='weeklyRate'
              value={weeklyRate}
              onChange={(e) => setWeeklyRate(e.target.value)}
            />
          </div>
          <button type='button' className='btn btn-primary' onClick={calculate}>
            Calculate
          </button>
        </form>
        <table className='table mt-3'>
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
                <td>{result.profit.toFixed(2)}</td>
                <td>{result.capital.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
