// src/components/Portfolio.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio } from '../features/portfolio/portfolioSlice';

const Portfolio = ({ userId }) => {
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio.portfolio);
  const status = useSelector((state) => state.portfolio.status);
  const error = useSelector((state) => state.portfolio.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPortfolio(userId));
    }
  }, [status, dispatch, userId]);

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
    <div>
      <h2>Portfolio</h2>
      <ul>
        {portfolio.stocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.symbol}: {stock.shares} shares @ ${stock.buyPrice} (Current:
            ${stock.currentPrice})
          </li>
        ))}
      </ul>
      <p>Total Value: ${portfolio.totalValue}</p>
    </div>
  );
};

export default Portfolio;
