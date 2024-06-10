// src/redux/actions/userActions.js

export const SET_USER_SYMBOL = 'SET_USER_SYMBOL';
export const SET_STOCK_PRICE = 'SET_STOCK_PRICE';

export const setUserSymbol = (symbol) => ({
  type: SET_USER_SYMBOL,
  payload: symbol,
});

export const setStockPrice = (price) => ({
  type: SET_STOCK_PRICE,
  payload: price,
});
