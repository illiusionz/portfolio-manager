// src/features/stocks/stockSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchStockPrice } from './stockThunks';

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    data: null, // Stock price data
    error: null, // Error state
  },
  reducers: {
    setStockPrice(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockPrice.fulfilled, (state, action) => {
        state.data = action.payload?.ticker.prevDay.o; // Stock opening price
        state.error = null;
      })
      .addCase(fetchStockPrice.rejected, (state, action) => {
        state.data = null;
        state.error = action.payload || 'Failed to fetch stock data.';
      });
  },
});

export const { setStockPrice } = stockSlice.actions;
export default stockSlice.reducer;
