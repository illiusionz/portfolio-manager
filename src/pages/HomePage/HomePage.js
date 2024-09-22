import React, { useEffect, Suspense, lazy, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSymbolAndFetchData } from '../../features/user/userThunks'; // Unified thunk to handle symbol changes and fetching data
import { fetchStocks } from '../../features/stocks/stockThunks'; // Fetch stock prices
import { selectStockError } from '../../features/stocks/stockSelectors'; // Stock selectors
import { selectNewsError } from '../../features/news/newsSelectors'; // News selectors
import TradingViewWidget from '../../components/TradingViewWidget'; // Remove lazy loading temporarily

// Lazy loading components
const CompoundInterestCalculator = lazy(() =>
  import(
    '../../components/CompoundInterestCalculator/CompoundInterestCalculator'
  )
);
const PercentageDifferenceCalculator = lazy(() =>
  import(
    '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator'
  )
);

const NewsFeed = lazy(() => import('../../components/NewsFeed/NewsFeed'));
const OptionPremiumCalculator = lazy(() =>
  import('../../components/OptionPremiumCalculator/OptionPremiumCalculator')
);
const StockWatchlist = lazy(() =>
  import('../../components/StockWatchlist/StockWatchlist')
);
const DollarCostAveragingCalculator = lazy(() =>
  import(
    '../../components/DollarCostAveragingCalculator/DollarCostAveragingCalculator'
  )
);
const TopMovers = lazy(() => import('../../components/TopMovers/TopMovers'));
const DividendInfo = lazy(() =>
  import('../../components/DividendInfo/DividendInfo')
);
const MuiCalendar = lazy(() => import('../../components/Calendar/MuiCalendar'));
const Calculator = lazy(() => import('../../components/Calculator/Calculator'));
const PortfolioValueCard = lazy(() =>
  import('../../components/PortfolioValueCard/PortfolioValueCard')
);

const HomePage = () => {
  const symbol = useSelector((state) => state.user.symbol); // Using symbol from Redux
  const newsError = useSelector(selectNewsError); // Use news error selector
  const stockError = useSelector(selectStockError); // Use stock error selector
  const dispatch = useDispatch();

  const totalValue = 123456.78; // Example total portfolio value

  const [showWidget, setShowWidget] = useState(false);
  const [isSymbolValid, setIsSymbolValid] = useState(false);

  useEffect(() => {
    dispatch(fetchStocks()); // Fetch stock data on page load
  }, [dispatch]);

  useEffect(() => {
    if (symbol) {
      console.log('Dispatching setSymbolAndFetchData for symbol:', symbol);
      dispatch(setSymbolAndFetchData(symbol)); // No need for a delay if Redux ensures readiness
      setIsSymbolValid(true);
    } else {
      setIsSymbolValid(false);
    }
  }, [dispatch, symbol]);

  useEffect(() => {
    if (isSymbolValid) {
      setShowWidget(true);
    } else {
      setShowWidget(false);
    }
  }, [isSymbolValid]);

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
                <TradingViewWidget symbol={symbol} />
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
            <TopMovers />
          </div>
          <div className='col-md-3'>
            <DollarCostAveragingCalculator />
            <StockWatchlist />
            <MuiCalendar />
          </div>
          <div className='col-md-3'>
            <OptionPremiumCalculator />
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
