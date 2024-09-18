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
    <div className='container mt-4'>
      <h2 className='mb-4'>Stock Portfolio</h2>
      <table className='table table-striped table-hover'>
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
          {portfolio.stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.symbol}</td>
              <td>{stock.shares}</td>
              <td>${stock.buyPrice}</td>
              <td>${(stock.shares * stock.buyPrice).toFixed(2)}</td>
              <td>${(stock.shares * stock.currentPrice).toFixed(2)}</td>
              <td>$0.00</td> {/* Assuming dividends are not available */}
              <td>0%</td> {/* Assuming dividend yield is not available */}
              <td
                className={
                  stock.currentPrice > stock.buyPrice
                    ? 'text-success'
                    : 'text-danger'
                }>
                $
                {(stock.shares * (stock.currentPrice - stock.buyPrice)).toFixed(
                  2
                )}
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
          ))}
        </tbody>
      </table>
      <p className='mt-4 fw-bold'>Total Value: ${portfolio.totalValue}</p>
    </div>
  );
};

export default Portfolio;
