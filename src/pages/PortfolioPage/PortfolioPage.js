// src/pages/PortfolioPage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio } from '../../features/portfolio/portfolioSlice';
import Portfolio from '../../components/Portfolio/PortfolioView';
import StockDetails from '../../components/StockDetails/StockDetails';

const PortfolioPage = () => {
  const dispatch = useDispatch();
  const testUserId = 'testUserId123'; // Replace with your test user ID
  const portfolio = useSelector((state) => state.portfolio.portfolio);
  const status = useSelector((state) => state.portfolio.status);
  const error = useSelector((state) => state.portfolio.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPortfolio(testUserId));
    }
  }, [status, dispatch, testUserId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Ensure portfolio is not undefined or null before rendering
  if (!portfolio || !portfolio.stocks) {
    return <div>No portfolio data available</div>;
  }

  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>Stock Portfolio</h2>
      <Portfolio portfolio={portfolio} />
      <div className='mt-4'>
        <h3>Stock Details</h3>
        <StockDetails symbol={portfolio.stocks[0].symbol} />{' '}
        {/* Example usage */}
      </div>
      <p>Built with Express.js, MongoDB, GraphQL, Apollo Server</p>
    </div>
  );
};

export default PortfolioPage;
