// src/features/stocks/stockThunks.js
import { debounce } from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
