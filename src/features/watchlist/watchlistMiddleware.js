// watchlistMiddleware.js
import {
  addToWatchlist,
  removeFromWatchlist,
  setWatchlistSymbols,
} from './watchlistSlice';
import { fetchWatchlistData } from './watchlistThunks';

const watchlistMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // Proceed with the action
    const result = next(action);

    // Log action for debugging
    console.log('Middleware Action:', action);

    // If the action is related to watchlist changes, fetch the new data
    if (
      action.type === addToWatchlist.type ||
      action.type === removeFromWatchlist.type ||
      action.type === setWatchlistSymbols.type
    ) {
      const { watchlist } = getState();
      const symbols = watchlist.symbols;

      // Debug: Check current watchlist symbols
      console.log('Current Watchlist Symbols:', symbols);

      if (symbols.length > 0) {
        console.log('Fetching watchlist data for symbols:', symbols);
        dispatch(fetchWatchlistData(symbols)); // Fetch updated watchlist data
      }
    }

    return result;
  };

export default watchlistMiddleware;
