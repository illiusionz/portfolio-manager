// src/features/user/userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setUserSymbol = createAsyncThunk(
  'user/setUserSymbol',
  async (symbol) => {
    return symbol;
  }
);

export const setStockPrice = createAsyncThunk(
  'user/setStockPrice',
  async (price) => {
    return price;
  }
);
