// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userSymbol: '',
    stockPrice: null,
  },
  reducers: {
    setUserSymbol(state, action) {
      state.userSymbol = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle async actions here if needed
  },
});

export const { setUserSymbol } = userSlice.actions; // Export actions
export default userSlice.reducer;
