// src/features/watchlist/watchlistSelectors.js
import { createSelector } from 'reselect';

// Base selector to get the entire watchlist state
export const selectWatchlistState = (state) => state.watchlist;

// Select symbols from the watchlist state
export const selectWatchlistSymbols = createSelector(
  [selectWatchlistState],
  (watchlist) => watchlist.symbols
);

// Select detailed data for all symbols in the watchlist
export const selectWatchlistData = createSelector(
  [selectWatchlistState],
  (watchlist) => watchlist.data
);

// Combine user info and watchlist data for user-specific watchlist
export const selectUserWatchlistWithDetails = createSelector(
  (state) => state.user,
  selectWatchlistData,
  (user, watchlistData) => ({
    userId: user.id,
    watchlist: user.userWatchlist.map((symbol) => ({
      symbol,
      data: watchlistData[symbol] || {},
    })),
  })
);

// Select loading state for watchlist
export const selectWatchlistLoading = createSelector(
  [selectWatchlistState],
  (watchlist) => watchlist.loading
);

// Select any errors related to watchlist fetching
export const selectWatchlistError = createSelector(
  [selectWatchlistState],
  (watchlist) => watchlist.error
);
