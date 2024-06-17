// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    symbol: '',
    stockPrice: null,
  },
  reducers: {
    setUserSymbol(state, action) {
      state.symbol = action.payload;
    },
    setStockPrice(state, action) {
      state.stockPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle async actions here if needed
  },
});

export const { setUserSymbol, setStockPrice } = userSlice.actions; // Export actions
export default userSlice.reducer;
