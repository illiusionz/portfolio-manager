// src/features/stocks/stockSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchStockDetails, fetchStockSnapshot } from './stockThunks';

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    data: null,
    stockDetails: {}, // Store full stock details here
    error: null,
  },
  reducers: {
    setStockPrice(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockSnapshot.fulfilled, (state, action) => {
        state.data = action.payload?.ticker.prevDay.o; // Updated to correctly set the opening price
        state.error = null;
      })
      .addCase(fetchStockSnapshot.rejected, (state, action) => {
        state.data = null;
        state.error = action.payload;
      })
      .addCase(fetchStockDetails.fulfilled, (state, action) => {
        state.stockDetails[action.meta.arg] = action.payload; // Store details for the specific stock symbol
        state.error = null;
      })
      .addCase(fetchStockDetails.rejected, (state, action) => {
        state.stockDetails[action.meta.arg] = null;
        state.error = action.payload;
      });
  },
});

export const { setStockPrice } = stockSlice.actions;
export default stockSlice.reducer;
