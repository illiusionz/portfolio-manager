import { createAsyncThunk } from '@reduxjs/toolkit';
import { debounce } from 'lodash';

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

export const fetchWatchlistData = createAsyncThunk(
  'watchlist/fetchWatchlistData',
  debounce(async (symbols, { rejectWithValue }) => {
    try {
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
    } catch (error) {
      return rejectWithValue('Error fetching watchlist data');
    }
  }, 300) // Debounce the API requests to avoid excessive calls
);
