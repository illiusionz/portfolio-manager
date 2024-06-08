import React from 'react';
import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import TradingViewWidget from '../../components/TradingViewWidget';
import NewsFeed from '../../components/NewsFeed/NewsFeed';
import OptionPremiumCalculator from '../../components/OptionPremiumCalculator/OptionPremiumCalculator';

import './HomePage.css';

function HomePage({ stockData, error, symbol }) {
  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        {error && <div className='alert alert-danger'>{error}</div>}
        <div className='stock-data'>
          {/*  <TradingViewWidget symbol={symbol} /> */}
        </div>
      </div>

      <div className='row my-3'>
        <div className='col-md-6'>
          <CompoundInterestCalculator />
        </div>
        <div className='col-md-6'>
          <PercentageDifferenceCalculator />
        </div>
        <div className='col-md-4'>
          <OptionPremiumCalculator />
        </div>
      </div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <h3>Related News</h3>
          <NewsFeed symbol={symbol} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
