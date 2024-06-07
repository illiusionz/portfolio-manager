// src/components/HomePage.js
import React from 'react';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import PercentageDifferenceCalculator from './PercentageDifferenceCalculator';

function HomePage() {
  return (
    <div className='container-fluid'>
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
                Stock Price % Change Calculator
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
