import { createAction } from '@reduxjs/toolkit';

export const SET_USER_SYMBOL = 'SET_USER_SYMBOL';
export const SET_STOCK_PRICE = 'SET_STOCK_PRICE';

export const setUserSymbol = createAction(SET_USER_SYMBOL);
export const setStockPrice = createAction(SET_STOCK_PRICE);
