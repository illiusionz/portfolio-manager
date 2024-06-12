import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../../redux/actions/watchlistActions';
import axios from 'axios';
import './StockWatchlist.css';

const StockWatchlist = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.symbols);
  const [stockData, setStockData] = React.useState({});
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchStockData = async (symbol) => {
      try {
        const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
        const url = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`;
        const response = await axios.get(url);
        console.log('Fetched data for', symbol, response.data);
        setStockData((prevData) => ({
          ...prevData,
          [symbol]: response.data.ticker,
        }));
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    watchlist.forEach((symbol) => {
      if (!stockData[symbol]) {
        fetchStockData(symbol);
      }
    });
  }, [watchlist]);

  const handleRemove = (symbol) => {
    dispatch(removeFromWatchlist(symbol));
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Stock Watchlist</h5>
      </div>
      <div className='card-body'>
        {watchlist.length === 0 ? (
          <p>No stocks in watchlist</p>
        ) : (
          <table
            className={`table table-striped mt-3 ${
              theme === 'dark' ? 'table-dark' : ''
            }`}>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Last</th>
                <th>Chg</th>
                <th>Chg%</th>
                <th>Vol</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((symbol) => {
                const data = stockData[symbol] || {};
                const { day, prevDay } = data;

                const lastPrice = day ? day.c : '';
                const change =
                  lastPrice && prevDay
                    ? (lastPrice - prevDay.c).toFixed(2)
                    : '';
                const changePercent =
                  change && prevDay
                    ? ((change / prevDay.c) * 100).toFixed(2)
                    : '';
                const volume = day ? day.v : '';

                return (
                  <tr key={symbol}>
                    <td>{symbol}</td>
                    <td>{lastPrice}</td>
                    <td>{change}</td>
                    <td>{changePercent}%</td>
                    <td>{volume}</td>
                    <td>
                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() => handleRemove(symbol)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StockWatchlist;
