// src/features/user/userSelectors.js
import { createSelector } from 'reselect';

export const selectUserState = (state) => state.user;

export const selectUserSymbol = createSelector(
  (state) => state.user,
  (user) => user.userSymbol
);

export const selectUserHoverSymbol = createSelector(
  (state) => state.user,
  (user) => user.userHoverSymbol
);

export const selectUserStockPrice = createSelector(
  (state) => state.user,
  (user) => user.userStockPrice
);
