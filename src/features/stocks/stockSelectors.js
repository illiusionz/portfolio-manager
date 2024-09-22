// src/features/stocks/stockSelectors.js
import { createSelector } from '@reduxjs/toolkit';

// Selector to get detailed stock information
export const selectStockDetails = (state, symbol) =>
  state.stocks.stockDetails[symbol] || {};

// Selector to get the full response data of a specific stock ticker
//export const selectStockTickerData = (state, ticker) => state.stocks.stockTickerData[ticker] || {};

// Selector to get stock snapshot data for a given ticker
export const selectStockSnapshot = (state, ticker) =>
  state.stocks.stockTickerData[ticker];

// Selector to get stock price
export const selectStockPrice = createSelector(
  [selectStockSnapshot],
  (stockSnapshot) => stockSnapshot?.prevDay?.c ?? 0
);

// Selector to get the 'prevDay' closing price ('c') for a given symbol
export const selectPrevDayClosingPrice = createSelector(
  [selectStockSnapshot],
  (stockData) => stockData?.prevDay?.c ?? null
);

// Selector to get a specific field of a stock's data
export const selectStockField = createSelector(
  [selectStockSnapshot, (_, field) => field],
  (stockData, field) => (stockData ? stockData[field] : null)
);

// Selector to get any error in the stocks slice
export const selectStockError = (state) => state.stocks.error;
