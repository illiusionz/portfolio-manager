import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchTransactions = createAsyncThunk(
  'bank/fetchTransactions',
  async (access_token) => {
    const response = await api.post('/api/plaid/get_transactions', {
      access_token,
    });
    return response.data;
  }
);

const bankSlice = createSlice({
  name: 'bank',
  initialState: { transactions: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default bankSlice.reducer;
