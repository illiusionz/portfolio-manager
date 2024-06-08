import React from 'react';
import './HomePage.css';
import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';

const HomePage = ({
  error,
  onRangeChange,
  currentRange,
  toggleDarkMode,
  isDarkMode,
}) => {
  return (
    <div className='homepage container mt-4'>
      {error && <div className='alert alert-danger'>{error}</div>}
      <div className='controls mt-4'>
        <button
          className='btn btn-primary me-2'
          onClick={() => onRangeChange('1d')}>
          1D
        </button>
        <button
          className='btn btn-primary me-2'
          onClick={() => onRangeChange('1w')}>
          1W
        </button>
        <button
          className='btn btn-primary me-2'
          onClick={() => onRangeChange('1m')}>
          1M
        </button>
        <button
          className='btn btn-primary me-2'
          onClick={() => onRangeChange('1y')}>
          1Y
        </button>
        <button className='btn btn-secondary' onClick={() => toggleDarkMode()}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className='row mt-4'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h5 className='card-title mb-0'>Compound Interest Calculator</h5>
            </div>
            <div className='card-body'>
              <CompoundInterestCalculator />
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h5 className='card-title mb-0'>
                Percentage Difference Calculator
              </h5>
            </div>
            <div className='card-body'>
              <PercentageDifferenceCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
