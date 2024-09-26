import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio } from '../../features/portfolio/portfolioSlice';
import { fetchStockDetails } from '../../features/stocks/stockThunks';
import { selectTheme } from '../../features/theme/themeSelectors';

const Portfolio = ({ userId }) => {
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio.portfolio);
  const status = useSelector((state) => state.portfolio.status);
  const error = useSelector((state) => state.portfolio.error);
  const theme = useSelector(selectTheme);

  // New selector for fetching stock details
  const stockDetails = useSelector((state) => state.stocks.stockDetails);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPortfolio(userId));
    }
  }, [status, dispatch, userId]);

  // Fetch stock details when portfolio is available
  useEffect(() => {
    if (portfolio?.stocks) {
      portfolio.stocks.forEach((stock) => {
        dispatch(fetchStockDetails(stock.symbol));
      });
    }
  }, [dispatch, portfolio]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!portfolio || !portfolio.stocks) {
    return <div>No portfolio data available</div>;
  }

  return (
    <div className='container mt-4'>
      <table
        className={`table table-striped table-hover ${
          theme === 'theme-dark' ? 'table-dark' : ''
        }`}>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Holding</th>
            <th scope='col'>Shares</th>
            <th scope='col'>Cost per share</th>
            <th scope='col'>Cost basis</th>
            <th scope='col'>Current value</th>
            <th scope='col'>Dividends</th>
            <th scope='col'>Dividend yield</th>
            <th scope='col'>Total profit</th>
            <th scope='col'>Daily</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.stocks.map((stock, index) => {
            const details = stockDetails[stock.symbol]; // Access the details from state
            return (
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.shares}</td>
                <td>${stock.buyPrice}</td>
                <td>${(stock.shares * stock.buyPrice).toFixed(2)}</td>
                <td>${(stock.shares * stock.currentPrice).toFixed(2)}</td>
                <td>$0.00</td>
                <td>0%</td>
                <td
                  className={
                    stock.currentPrice > stock.buyPrice
                      ? 'text-success'
                      : 'text-danger'
                  }>
                  $
                  {(
                    stock.shares *
                    (stock.currentPrice - stock.buyPrice)
                  ).toFixed(2)}
                </td>
                <td
                  className={
                    stock.currentPrice > stock.buyPrice
                      ? 'text-success'
                      : 'text-danger'
                  }>
                  ${(stock.currentPrice - stock.buyPrice).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className='mt-4 fw-bold'>Total Value: ${portfolio.totalValue}</p>
    </div>
  );
};

export default Portfolio;
