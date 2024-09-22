// src/features/stocks/stockSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStockSnapshot,
  fetchStockDetails,
  fetchStocks,
  fetchDividends,
} from './stockThunks';

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    stockSnapshot: null,
    stockDetails: null,
    stockData: [],
    dividends: [],
    error: null,
    status: 'idle', // Add a status field to manage loading state
  },
  reducers: {
    setStockTickerData(state, action) {
      state.stockSnapshot = action.payload;
    },
    setStockDetails(state, action) {
      state.stockDetails = action.payload;
    },
    clearStockError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockSnapshot.fulfilled, (state, action) => {
        state.stockSnapshot = action.payload;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchStockSnapshot.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch stock snapshot.';
      })
      .addCase(fetchStockDetails.fulfilled, (state, action) => {
        state.stockDetails = action.payload;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchStockDetails.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch stock details.';
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.stockData = action.payload;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch stocks.';
      })
      .addCase(fetchDividends.fulfilled, (state, action) => {
        state.dividends = action.payload;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchDividends.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch dividends.';
      });
  },
});

export const { setStockTickerData, setStockDetails } = stockSlice.actions;

export default stockSlice.reducer;
