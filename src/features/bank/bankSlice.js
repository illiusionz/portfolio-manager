import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTransactions = createAsyncThunk(
  'bank/fetchTransactions',
  async (access_token, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/plaid/get_transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token }),
      });
      const data = await response.json();
      return data.transactions;
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      return rejectWithValue('Failed to fetch transactions');
    }
  }
);

const bankSlice = createSlice({
  name: 'bank',
  initialState: {
    transactions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default bankSlice.reducer;
