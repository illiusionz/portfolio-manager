// src/features/stocks/stockSelectors.js
import { createSelector } from 'reselect';

// Base selector to get the entire stocks state
export const selectStockState = (state) => state.stocks;

// Memoized selector to get all stocks data as a dictionary with tickers as keys
export const selectAllStockSnapshots = createSelector(
  [selectStockState],
  (stocks) => stocks.stockTickerData || {}
);

// Select symbols for the Trending Toolbar
export const selectTrendingToolbarSymbols = createSelector(
  [selectStockState],
  (stocks) => stocks.trendingToolbarSymbols || []
);

// Select symbols for the Index Toolbar
export const selectIndexToolbarSymbols = createSelector(
  [selectStockState],
  (stocks) => stocks.indexToolbarSymbols || []
);

// Selector to get detailed stock information
export const selectStockDetails = createSelector(
  [selectStockState, (_, symbol) => symbol],
  (stocks, symbol) => stocks.stockDetails[symbol] || {}
);

// Memoized selector to get the full response data of a specific stock ticker
export const selectStockSnapshot = createSelector(
  [selectStockState, (_, ticker) => ticker],
  (stocks, ticker) => stocks.stockTickerData[ticker] || {}
);

// Memoized selector to get the stock price using the stock snapshot selector
export const selectStockPrice = createSelector(
  [selectStockSnapshot],
  (stockSnapshot) => stockSnapshot?.prevDay?.c ?? 0
);

// Memoized selector to get the 'prevDay' closing price ('c') for a given symbol
export const selectPrevDayClosingPrice = createSelector(
  [selectStockSnapshot],
  (stockSnapshot) => stockSnapshot?.prevDay?.c ?? null
);

// Memoized selector to get a specific field of a stock's data
export const selectStockField = createSelector(
  [selectStockSnapshot, (_, field) => field],
  (stockSnapshot, field) => (stockSnapshot ? stockSnapshot[field] : null)
);

// Selector to get any error in the stocks slice
export const selectStockError = createSelector(
  [selectStockState],
  (stocks) => stocks.error
);
