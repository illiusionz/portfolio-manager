import { createSlice } from '@reduxjs/toolkit';
import { setUserSymbol, setStockPrice } from '../actions/userActions';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    symbol: '',
    stockPrice: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserSymbol, (state, action) => {
        state.symbol = action.payload;
      })
      .addCase(setStockPrice, (state, action) => {
        state.stockPrice = action.payload;
      });
  },
});

export default userSlice.reducer;
