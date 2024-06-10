import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import TradingViewWidget from '../../components/TradingViewWidget';
import NewsFeed from '../../components/NewsFeed/NewsFeed';
import OptionPremiumCalculator from '../../components/OptionPremiumCalculator/OptionPremiumCalculator';
import { fetchStocks } from '../../redux/actions/stockActions';
import { fetchNews } from '../../redux/actions/newsActions';

import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: stockData, error: stockError } = useSelector(
    (state) => state.stocks
  );
  const { symbol } = useSelector((state) => state.user);
  const { error: newsError } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchStocks());
    if (symbol) {
      dispatch(fetchNews(symbol));
    }
  }, [dispatch, symbol]);

  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        {stockError && (
          <div className='alert alert-danger'>{stockError.message}</div>
        )}
        <div className='stock-data'>
          {symbol ? (
            <TradingViewWidget symbol={symbol} />
          ) : (
            <div>Please select a stock symbol.</div>
          )}
        </div>
      </div>

      <div className='row my-2'>
        <div className='col-md-6'>
          <CompoundInterestCalculator />
        </div>
        <div className='col-md-6'>
          <PercentageDifferenceCalculator />
        </div>
        <div className='col-md-3'>
          <OptionPremiumCalculator />
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
    </div>
  );
};

export default HomePage;
