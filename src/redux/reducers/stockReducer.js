import { createSlice } from '@reduxjs/toolkit';
import { fetchStocks, fetchStockPrice } from '../actions/stockActions';

const initialState = {
  data: null,
  error: null,
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockPrice.fulfilled, (state, action) => {
        console.log('Stock price fetch fulfilled:', action.payload);
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchStockPrice.rejected, (state, action) => {
        console.error('Stock price fetch rejected:', action.payload);
        state.data = null;
        state.error = action.payload;
      });
  },
});

export default stockSlice.reducer;
