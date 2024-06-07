import React from 'react';
import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import LightweightChart from '../../components/LightweightChart';
import ButtonBar from '../../components/ButtonBar';
import './HomePage.css';

function HomePage({
  stockData,
  error,
  onRangeChange,
  currentRange,
  toggleDarkMode,
  isDarkMode,
}) {
  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        {error && <div className='alert alert-danger'>{error}</div>}
        {stockData.length > 0 ? (
          <div className='stock-chart'>
            <LightweightChart
              data={stockData.map(({ date, close }) => ({
                time: new Date(date).getTime() / 1000,
                value: close,
              }))}
            />
          </div>
        ) : (
          <p>Search for a stock symbol to see the price data.</p>
        )}
      </div>
      <ButtonBar
        onRangeChange={onRangeChange}
        currentRange={currentRange}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className='row'>
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
}

export default HomePage;
