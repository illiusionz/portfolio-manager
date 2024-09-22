// src/features/stocks/stockSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStockDetails,
  fetchStockSnapshot,
  fetchBatchStockSnapshots,
} from './stockThunks';

const initialState = {
  stockTickerData: {}, // Store full response data for each stock ticker
  stockDetails: {}, // Store detailed information for each stock
  error: null,
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setStockTickerData(state, action) {
      const { ticker, data } = action.payload;
      state.stockTickerData[ticker] = data;
    },
    setStockDetails(state, action) {
      const { symbol, details } = action.payload;
      state.stockDetails[symbol] = details;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockSnapshot.fulfilled, (state, action) => {
        const { ticker, data } = action.payload;
        if (!ticker || !data) {
          state.error = 'Invalid payload structure.';
          return;
        }
        state.stockTickerData[ticker] = data;
        state.error = null;
      })
      .addCase(fetchStockSnapshot.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchStockDetails.fulfilled, (state, action) => {
        const symbol = action.meta.arg;
        state.stockDetails[symbol] = action.payload;
        state.error = null;
      })
      .addCase(fetchStockDetails.rejected, (state, action) => {
        state.stockDetails[action.meta.arg] = null;
        state.error = action.payload;
      })
      .addCase(fetchBatchStockSnapshots.fulfilled, (state, action) => {
        const stockData = action.payload;
        state.stockTickerData = {
          ...state.stockTickerData,
          ...stockData,
        };
        state.error = null;
      })
      .addCase(fetchBatchStockSnapshots.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setStockTickerData, setStockDetails } = stockSlice.actions;
export default stockSlice.reducer;
