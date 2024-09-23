// src/components/StockWatchlist/StockWatchlist.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromWatchlist,
  addToWatchlist,
} from '../../features/watchlist/watchlistSlice';
import {
  selectWatchlistSymbols,
  selectWatchlistData,
  selectWatchlistLoading,
  selectWatchlistError,
} from '../../features/watchlist/watchlistSelectors';
import { fetchWatchlistData } from '../../features/watchlist/watchlistThunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './StockWatchlist.scss';

const StockWatchlist = () => {
  const dispatch = useDispatch();
  const watchlistSymbols = useSelector(selectWatchlistSymbols);
  const watchlistData = useSelector(selectWatchlistData);
  const loading = useSelector(selectWatchlistLoading);
  const error = useSelector(selectWatchlistError);
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    if (watchlistSymbols.length > 0) {
      dispatch(fetchWatchlistData(watchlistSymbols));
    }
  }, [dispatch, watchlistSymbols]);

  const handleRemove = (symbol) => {
    dispatch(removeFromWatchlist(symbol));
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Stock Watchlist</h5>
      </div>
      <div className='card-body'>
        {error && <div className='error'>{error}</div>}
        {loading ? (
          <p>Loading data...</p>
        ) : watchlistSymbols.length === 0 ? (
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {watchlistSymbols.map((symbol) => {
                const data = watchlistData[symbol] || {};
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
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleRemove(symbol)}
                      />
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
