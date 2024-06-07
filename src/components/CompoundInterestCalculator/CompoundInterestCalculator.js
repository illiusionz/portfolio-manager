import React, { useState } from 'react';

function CompoundInterestCalculator() {
  const [initialCapital, setInitialCapital] = useState(200000);
  const [weeklyRate, setWeeklyRate] = useState(3);
  const [results, setResults] = useState([]);

  const calculateProfits = () => {
    let capital = parseFloat(initialCapital);
    const rate = parseFloat(weeklyRate) / 100;
    const weeks = 52;
    const newResults = [];

    for (let week = 1; week <= weeks; week++) {
      const profit = capital * rate;
      capital += profit;
      newResults.push({
        week,
        profit: profit.toFixed(2),
        capital: capital.toFixed(2),
      });
    }

    setResults(newResults);
  };

  return (
    <div>
      <div className='input-group mb-3'>
        <label htmlFor='initialCapital' className='input-group-text'>
          Initial Capital:
        </label>
        <input
          type='number'
          className='form-control'
          id='initialCapital'
          value={initialCapital}
          onChange={(e) => setInitialCapital(e.target.value)}
        />
        <label htmlFor='weeklyRate' className='input-group-text'>
          Weekly Rate (%):
        </label>
        <input
          type='number'
          className='form-control'
          id='weeklyRate'
          value={weeklyRate}
          onChange={(e) => setWeeklyRate(e.target.value)}
        />
        <button className='btn btn-primary' onClick={calculateProfits}>
          Calculate
        </button>
      </div>
      <table
        className='table table-bordered table-striped table-hover'
        style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <thead className='thead-light'>
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
              <td>{result.profit}</td>
              <td>{result.capital}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompoundInterestCalculator;
