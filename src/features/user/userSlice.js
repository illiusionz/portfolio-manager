// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userSymbol: '',
    stockPrice: null,
    userHoveredSymbol: null,
  },
  reducers: {
    setUserSymbol(state, action) {
      state.userSymbol = action.payload;
    },
    setUserHoveredSymbol(state, action) {
      console.log('Action Payload:', action.payload); // Check the payload
      state.userHoveredSymbol = action.payload;
      console.log('Updated State:', state.userHoveredSymbol); // Confirm the state is updated
    },
  },
  extraReducers: (builder) => {
    // Handle async actions here if needed
  },
});

export const { setUserSymbol, setUserHoveredSymbol } = userSlice.actions; // Export actions
export default userSlice.reducer;
