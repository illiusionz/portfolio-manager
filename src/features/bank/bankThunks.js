// Inside bankThunks.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactions } from '../../../backend/services/plaid/plaidClient'; // Adjust path accordingly

export const fetchTransactions = createAsyncThunk(
  'bank/fetchTransactions',
  async ({ accessToken, startDate, endDate }, thunkAPI) => {
    try {
      const transactions = await getTransactions(
        accessToken,
        startDate,
        endDate
      );
      return transactions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
