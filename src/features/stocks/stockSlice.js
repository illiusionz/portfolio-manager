// src/features/stocks/stockSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchStocks, fetchStockPrice } from './stockThunks';

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    setStockPrice(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockPrice.fulfilled, (state, action) => {
        state.data = action.payload?.ticker.prevDay.o; // Updated to correctly set the opening price
        state.error = null;
      })
      .addCase(fetchStockPrice.rejected, (state, action) => {
        state.data = null;
        state.error = action.payload;
      });
  },
});

export const { setStockPrice } = stockSlice.actions;
export default stockSlice.reducer;
