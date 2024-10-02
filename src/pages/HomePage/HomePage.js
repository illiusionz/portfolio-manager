import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectStockError } from '../../features/stocks/stockSelectors';
import { selectUserSymbol } from '../../features/user/userSelectors';
import { selectNewsError } from '../../features/news/newsSelectors';
import TradingViewWidget from '../../components/TradingViewWidget';

import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import NewsFeed from '../../components/NewsFeed/NewsFeed';
import OptionPremiumCalculator from '../../components/OptionPremiumCalculator/OptionPremiumCalculator';
import StockWatchlist from '../../components/StockWatchlist/StockWatchlist';
import DollarCostAveragingCalculator from '../../components/DollarCostAveragingCalculator/DollarCostAveragingCalculator';
import TopMovers from '../../components/TopMovers/TopMovers';
import DividendInfo from '../../components/DividendInfo/DividendInfo';
import MuiCalendar from '../../components/Calendar/MuiCalendar';
import Calculator from '../../components/Calculator/Calculator';
import PortfolioValueCard from '../../components/PortfolioValueCard/PortfolioValueCard';
import EarningsCalendar from '../../components/EarningsCalendar/EarningsCalendar';
import Dashboard from '../Dashboard/Dashboard';

const HomePage = () => {
  const userSymbol = useSelector(selectUserSymbol);
  const newsError = useSelector(selectNewsError);
  const stockError = useSelector(selectStockError);
  const totalValue = 123456.78; // Example total portfolio value

  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        {stockError && (
          <div className='alert alert-danger'>{stockError.message}</div>
        )}
        <div className='stock-data' style={{ height: '600px' }}>
          <Suspense fallback={<div>Loading...</div>}>
            {userSymbol ? (
              <TradingViewWidget symbol={userSymbol} />
            ) : (
              <div>Please select a stock symbol to view data.</div>
            )}
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className='row my-2 align-items-start'>
          <div className='col-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3 mb-3 align-self-stretch'>
            <PortfolioValueCard totalValue={totalValue} />
            <MuiCalendar />
            <TopMovers />
          </div>
          <div className='col-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3 mb-3 align-self-stretch'>
            <DollarCostAveragingCalculator />
            <StockWatchlist />
            {/*<EarningsCalendar />*/}
          </div>
          <div className='col-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3 mb-3 align-self-stretch'>
            <OptionPremiumCalculator />
            <CompoundInterestCalculator />
          </div>
          <div className='col-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3 mb-3 align-self-stretch'>
            <PercentageDifferenceCalculator />
            <Calculator />
          </div>
        </div>

        <div className='row my-3'>
          <div className='col-12 col-lg-12 mb-3'>
            <DividendInfo />
          </div>
          <div className='col-12 col-lg-6 mb-3'></div>
        </div>

        <div className='row my-3'>
          <div className='col-12'>
            {newsError && (
              <div className='alert alert-danger'>{newsError.message}</div>
            )}
            <NewsFeed />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;
