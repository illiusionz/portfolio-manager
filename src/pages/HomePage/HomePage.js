import React, { useEffect, Suspense, lazy, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSymbolAndFetchData } from '../../features/user/userThunks';
import { fetchStocks } from '../../features/stocks/stockThunks';
import { selectStockError } from '../../features/stocks/stockSelectors';
import { selectUserSymbol } from '../../features/user/userSelectors';
import { selectNewsError } from '../../features/news/newsSelectors';
import TradingViewWidget from '../../components/TradingViewWidget';

// Lazy loading components
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

const HomePage = () => {
  const userSymbol = useSelector(selectUserSymbol); // Using symbol from Redux
  const newsError = useSelector(selectNewsError); // Use news error selector
  const stockError = useSelector(selectStockError); // Use stock error selector
  const dispatch = useDispatch();

  const totalValue = 123456.78; // Example total portfolio value

  const [showWidget, setShowWidget] = useState(false);
  const [isSymbolValid, setIsSymbolValid] = useState(false);

  useEffect(() => {
    // Fetch initial stock data on page load
    dispatch(fetchStocks());

    // Handle symbol change and validity
    if (userSymbol) {
      console.log('Dispatching setSymbolAndFetchData for symbol:', userSymbol);
      dispatch(setSymbolAndFetchData(userSymbol));
      setShowWidget(true);
      setIsSymbolValid(true);
    } else {
      setIsSymbolValid(false);
      setShowWidget(false);
    }
  }, [userSymbol, dispatch]);

  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        {stockError && (
          <div className='alert alert-danger'>{stockError.message}</div>
        )}
        <div className='stock-data' style={{ height: '600px' }}>
          {/* Test with a defined height */}
          {isSymbolValid ? (
            <Suspense fallback={<div>Loading...</div>}>
              {showWidget ? (
                <TradingViewWidget symbol={userSymbol} />
              ) : (
                <div className='spinner-border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              )}
            </Suspense>
          ) : (
            <div>Please select a valid stock symbol.</div>
          )}
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className='row my-2'>
          <div className='col-md-3'>
            <PortfolioValueCard totalValue={totalValue} />
            <MuiCalendar />
            <TopMovers />
          </div>
          <div className='col-md-3'>
            <OptionPremiumCalculator />
          </div>
          <div className='col-md-3'>
            <StockWatchlist />

            <DollarCostAveragingCalculator />
          </div>
          <div className='col-md-3'>
            <PercentageDifferenceCalculator />
            <Calculator />
          </div>
        </div>

        <div className='row my-3'>
          <div className='col-md-9'>
            <DividendInfo />
            <CompoundInterestCalculator />
          </div>
        </div>

        <div className='row my-3'>
          <div className='col-md-12'>
            <h3 className='text-center news-headline'>Related News</h3>
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
