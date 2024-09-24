// src/features/stocks/stockSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStockDetails,
  fetchStockSnapshot,
  fetchBatchStockSnapshots,
  fetchSymbolSuggestions,
  fetchHistoricalData,
} from './stockThunks';

const initialState = {
  stockTickerData: {}, // Store full response data for each stock ticker
  stockDetails: {}, // Store detailed information for each stock
  historicalData: {}, // Store historical data by ticker

  suggestions: [],
  trendingToolbarSymbols: [
    'AAPL',
    'AMZN',
    'GOOG',
    'SHOP',
    'AFRM',
    'ADBE',
    'TSLA',
    'MSFT',
    'NVDA',
    'AMD',
    'PYPL',
    'NFLX',
    'SNAP',
    'SPOT',
    'PINS',
    'TSM',
    'UBER',
    'LYFT',
    'SQ',
    'ROKU',
    'CRWD',
    'DOCU',
    'META',
    'PLTR',
    'AVGO',
    'OKTA',
    'RIVN',
    'PDD',
    'DDOG',
    'AMC',
    'BA',
    'BABA',
    'BAC',
    'C',
    'DIS',
    'F',
    'GE',
    'GME',
    'GS',
    'HD',
    'IBM',
    'INTC',
    'JNJ',
    'JPM',
    'KO',
    'MCD',
    'SMCI',
    'HOOD',
    'OXY',
    'NKE',
    'PFE',
    'PG',
    'MRVL',
    'UNH',
    'V',
    'VZ',
    'WBA',
    'ARM',
    'XOM',
  ], // Initial default trending symbols
  indexToolbarSymbols: ['SPY', 'QQQ', 'IWM', 'DIA'], // Initial default index symbols

  error: null,
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setStockTickerData(state, action) {
      const { ticker, data } = action.payload;
      state.stockTickerData[ticker] = data;
    },
    setStockDetails(state, action) {
      const { symbol, details } = action.payload;
      state.stockDetails[symbol] = details;
    },
    // Actions for trending symbols
    addTrendingSymbol(state, action) {
      if (!state.trendingToolbarSymbols.includes(action.payload)) {
        state.trendingToolbarSymbols.push(action.payload);
      }
    },
    removeTrendingSymbol(state, action) {
      state.trendingToolbarSymbols = state.trendingToolbarSymbols.filter(
        (symbol) => symbol !== action.payload
      );
    },
    setTrendingSymbols(state, action) {
      state.trendingToolbarSymbols = action.payload;
    },
    // Actions for index symbols
    addIndexSymbol(state, action) {
      if (!state.indexToolbarSymbols.includes(action.payload)) {
        state.indexToolbarSymbols.push(action.payload);
      }
    },
    removeIndexSymbol(state, action) {
      state.indexToolbarSymbols = state.indexToolbarSymbols.filter(
        (symbol) => symbol !== action.payload
      );
    },
    setIndexSymbols(state, action) {
      state.indexToolbarSymbols = action.payload;
    },
    clearSuggestions(state) {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockSnapshot.fulfilled, (state, action) => {
        const { ticker, data } = action.payload;
        if (!ticker || !data) {
          state.error = 'Invalid payload structure.';
          return;
        }
        state.stockTickerData[ticker] = data;
        state.error = null;
      })
      .addCase(fetchStockSnapshot.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchStockDetails.fulfilled, (state, action) => {
        const symbol = action.meta.arg;
        state.stockDetails[symbol] = action.payload;
        state.error = null;
      })
      .addCase(fetchStockDetails.rejected, (state, action) => {
        state.stockDetails[action.meta.arg] = null;
        state.error = action.payload;
      })
      .addCase(fetchBatchStockSnapshots.fulfilled, (state, action) => {
        const stockData = action.payload;
        state.stockTickerData = {
          ...state.stockTickerData,
          ...stockData,
        };
        state.error = null;
      })
      .addCase(fetchBatchStockSnapshots.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchSymbolSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      .addCase(fetchSymbolSuggestions.rejected, (state, action) => {
        state.suggestions = [];
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        const { symbol, data } = action.payload; // Extract symbol and data from the payload
        console.log('Symbol:', symbol, 'Data:', data); // Debug log

        state.historicalData[symbol] = data; // Use symbol as key to store data
      })
      .addCase(fetchHistoricalData.pending, (state, action) => {
        const { symbol } = action.meta.arg; // Get symbol from the thunk argument
        state.historicalData[symbol] = []; // Set default empty array
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        const { symbol } = action.meta.arg; // Get symbol from the thunk argument
        state.historicalData[symbol] = []; // Set default empty array on error
      });
  },
});

export const {
  setStockTickerData,
  setStockDetails,
  addTrendingSymbol,
  removeTrendingSymbol,
  setTrendingSymbols,
  addIndexSymbol,
  removeIndexSymbol,
  setIndexSymbols,
  clearSuggestions,
} = stockSlice.actions;
export default stockSlice.reducer;
