// src/features/stocks/stockThunks.js
import { debounce } from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { formatDateTime } from '../../utils/format';

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

// Thunk to fetch stock snapshot data and ensure correct structure
//https://polygon.io/docs/stocks/get_v2_snapshot_locale_us_markets_stocks_tickers__stocksticker
export const fetchStockSnapshot = createAsyncThunk(
  'stocks/fetchStockSnapshot',
  async (symbol, { rejectWithValue }) => {
    if (!symbol) {
      return rejectWithValue('Symbol is required to fetch stock snapshot');
    }
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`
      );

      const { ticker } = response.data;

      // Check if 'ticker' object exists
      if (!ticker) {
        return rejectWithValue('Ticker data is missing in the response.');
      }
      // Return the 'ticker' object and the 'symbol' to the reducer
      return { ticker: symbol, data: ticker };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Error fetching stock snapshot'
      );
    }
  }
);

// Thunk to fetch detailed stock information
export const fetchStockDetails = createAsyncThunk(
  'stocks/fetchStockDetails',
  async (symbol, { rejectWithValue }) => {
    if (!symbol) {
      return rejectWithValue('Symbol is required to fetch stock details');
    }
    try {
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=${apiKey}`
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Error fetching stock details'
      );
    }
  }
);

// Thunk to fetch historical stock data
export const fetchStocks = createAsyncThunk(
  'stocks/fetchStocks',
  async (symbol, { rejectWithValue }) => {
    if (!symbol) {
      return rejectWithValue('Symbol is required to fetch stock data');
    }
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2023-01-01/2023-12-31?apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      return rejectWithValue('Failed to fetch stock data');
    }
  }
);

// Thunk to fetch dividend data
export const fetchDividends = createAsyncThunk(
  'stocks/fetchDividends',
  async (symbol, { rejectWithValue }) => {
    if (!symbol) {
      return rejectWithValue('Symbol is required to fetch dividend data');
    }

    try {
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/dividends?ticker=${symbol}&apiKey=${apiKey}`
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Error fetching dividend data'
      );
    }
  }
);

// Thunk to fetch data for multiple stocks in a single request
export const fetchBatchStockSnapshots = createAsyncThunk(
  'stocks/fetchBatchStockSnapshots',
  async (symbols, { rejectWithValue }) => {
    if (!symbols || symbols.length === 0) {
      return rejectWithValue('Symbols are required to fetch stock snapshots');
    }
    const tickers = symbols.join(',');
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickers}&apiKey=${apiKey}`
      );
      if (!response.data || !response.data.tickers) {
        return rejectWithValue('Invalid response data');
      }
      // Returns an object with all tickers' data
      return response.data.tickers.reduce((acc, ticker) => {
        acc[ticker.ticker] = ticker;
        return acc;
      }, {});
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Error fetching stock snapshots'
      );
    }
  }
);

// Define and export the thunk for fetching symbol suggestions
export const fetchSymbolSuggestions = createAsyncThunk(
  'stocks/fetchSymbolSuggestions',
  async (query, { rejectWithValue }) => {
    if (!query || query.length < 1) {
      return rejectWithValue('Query is required to fetch symbol suggestions');
    }

    try {
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/tickers?search=${query}&active=true&sort=ticker&order=asc&limit=10&apiKey=${apiKey}`
      );
      return response.data.results || [];
    } catch (error) {
      return rejectWithValue('Error fetching symbol suggestions');
    }
  }
);

// Helper function to get milliseconds timestamp from date
const getTimestamp = (date) => {
  return new Date(date).getTime();
};

// Thunk to fetch minute historical price data for the last 8-hour period
export const fetchHistoricalData = createAsyncThunk(
  'stocks/fetchHistoricalData',
  async (symbol, { rejectWithValue }) => {
    try {
      // Get the current date and time
      const currentDate = new Date();

      // Calculate the start date and time (8 hours ago)
      const startDate = new Date(currentDate.getTime() - 8 * 60 * 60 * 1000); // 8 hours ago

      // Convert startDate and currentDate to millisecond timestamps
      const startTimestamp = getTimestamp(startDate);
      const endTimestamp = getTimestamp(currentDate);

      // Fetch minute data for the last 8-hour period using millisecond timestamps
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/${startTimestamp}/${endTimestamp}?adjusted=true&sort=asc&apiKey=${apiKey}`
      );

      // Map the results array to the desired structure
      const data = response.data.results.map((entry) => ({
        volume: entry.v, // Volume
        vwap: entry.vw, // Volume-weighted average price
        open: entry.o, // Open price
        close: entry.c, // Close price
        high: entry.h, // High price
        low: entry.l, // Low price
        timestamp: new Date(entry.t).toLocaleTimeString(), // Convert timestamp to locale time string
        tradeCount: entry.n, // Number of trades
      }));

      // Ensure symbol is passed with the payload
      return {
        symbol,
        data,
      };
    } catch (error) {
      return rejectWithValue(
        'Error fetching minute historical data for the last 8-hour period'
      );
    }
  }
);
