import React, { useEffect, Suspense, lazy, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStocks } from '../../features/stocks/stockThunks'; // Updated path
import { fetchNews } from '../../features/news/newsThunks'; // Updated path

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
const TradingViewWidget = lazy(() =>
  import('../../components/TradingViewWidget')
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
const TrendingToolbar = lazy(() =>
  import('../../components/TrendingToolbar/TrendingToolbar')
);
const DividendInfo = lazy(() =>
  import('../../components/DividendInfo/DividendInfo')
);
const MuiCalendar = lazy(() => import('../../components/Calendar/MuiCalendar'));
const Calculator = lazy(() => import('../../components/Calculator/Calculator'));
const PortfolioValueCard = lazy(() =>
  import('../../components/PortfolioValueCard/PortfolioValueCard')
);

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: stockData, error: stockError } = useSelector(
    (state) => state.stocks
  );
  const { symbol } = useSelector((state) => state.user);
  const { error: newsError } = useSelector((state) => state.news);

  const totalValue = 123456.78;
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    dispatch(fetchStocks());
    if (symbol) {
      dispatch(fetchNews(symbol));
    }
  }, [dispatch, symbol]);

  useEffect(() => {
    if (!symbol) return;

    const timer = setTimeout(() => {
      setShowWidget(true);
      console.log('Symbol and theme set, showing widget:', symbol);
    }, 100);

    return () => clearTimeout(timer);
  }, [symbol]);

  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        {stockError && (
          <div className='alert alert-danger'>{stockError.message}</div>
        )}
        <div className='stock-data'>
          {symbol ? (
            <Suspense fallback={<div>Loading...</div>}>
              {showWidget ? (
                <TradingViewWidget symbol={symbol} />
              ) : (
                <div>Loading...</div>
              )}
            </Suspense>
          ) : (
            <div>Please select a stock symbol.</div>
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
            <h3>Related News</h3>
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
