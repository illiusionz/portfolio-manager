// src/features/stocks/stockSelectors.js
export const selectStockData = (state) => state.stocks.data;
export const selectStockError = (state) => state.stocks.error;
export const selectStockDetails = (state, symbol) =>
  state.stocks.stockDetails[symbol];
