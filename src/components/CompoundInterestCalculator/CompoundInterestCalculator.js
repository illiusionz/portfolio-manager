import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatNumberWithCommas } from '../../utils/format';

const CompoundInterestCalculator = () => {
  const [initialCapital, setInitialCapital] = useState('10000');
  const [weeklyRate, setWeeklyRate] = useState('1');
  const [weeks, setWeeks] = useState('52'); // default to 52 weeks
  const [results, setResults] = useState([]);
  const theme = useSelector((state) => state.theme);

  const calculateCompoundInterest = (initial, rate, weeks) => {
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
      weeklyRate,
      parseInt(weeks)
    );
    setResults(calculatedResults);
  };

  const resetFields = () => {
    setInitialCapital('10000');
    setWeeklyRate('1');
    setWeeks('52');
    setResults([]);
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Compound Interest Calculator</h5>
      </div>
      <div className='card-body'>
        <div className='form-inline'>
          <div className='form-group mx-2'>
            <label className='form-label' htmlFor='initialCapital'>
              Initial Capital:
            </label>
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
          <div className='form-group mx-2'>
            <label className='form-label' htmlFor='weeklyRate'>
              Weekly Rate (%):
            </label>
            <input
              type='text'
              id='weeklyRate'
              className='form-control'
              value={weeklyRate}
              onChange={(e) => setWeeklyRate(e.target.value)}
            />
          </div>
          <div className='form-group mx-2'>
            <label className='form-label' htmlFor='weeks'>
              Number of Weeks:
            </label>
            <input
              type='text'
              id='weeks'
              className='form-control'
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
            />
          </div>
          <div className='form-group button-group'>
            <button className='btn btn-primary' onClick={handleCalculate}>
              Calculate
            </button>
            <button className='btn btn-danger ml-2' onClick={resetFields}>
              Reset
            </button>
          </div>
        </div>
        {results.length > 0 && (
          <div>
            <h5>Results:</h5>
            <table
              className={`table table-striped mt-3 ${
                theme === 'dark' ? 'table-dark' : ''
              }`}>
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
