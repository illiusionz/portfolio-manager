// src/features/watchlist/watchlistThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

export const fetchWatchlistData = createAsyncThunk(
  'watchlist/fetchWatchlistData',
  async (symbols) => {
    const promises = symbols.map((symbol) =>
      fetch(
        `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.ticker) {
            return data.ticker;
          } else {
            throw new Error(`Data for ${symbol} is not available`);
          }
        })
    );

    const data = await Promise.all(promises);
    return data;
  }
);
