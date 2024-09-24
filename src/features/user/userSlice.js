// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userSymbol: '', // The currently selected stock symbol for the user
    userHoverSymbol: '', // The stock symbol that the user is currently hovering over
    userStockPrice: null, // The last fetched stock price for the selected symbol
    userTheme: null, // The user's selected theme
  },
  reducers: {
    setUserSymbol(state, action) {
      state.userSymbol = action.payload;
    },
    setUserHoverSymbol(state, action) {
      state.userHoverSymbol = action.payload;
    },
    setUserStockPrice(state, action) {
      state.userStockPrice = action.payload;
    },
    setUserTheme(state, action) {
      state.userTheme = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle async actions if needed
  },
});

export const {
  setUserSymbol,
  setUserHoverSymbol,
  setUserStockPrice,
  setUserTheme,
} = userSlice.actions;
export default userSlice.reducer;
