// Action Types
export const ADD_TO_WATCHLIST = 'ADD_TO_WATCHLIST';
export const REMOVE_FROM_WATCHLIST = 'REMOVE_FROM_WATCHLIST';
export const SET_WATCHLIST_DATA = 'SET_WATCHLIST_DATA';

// Action Creators
// Action to add a stock symbol to the watchlist
export const addToWatchlist = (symbol) => ({
  type: ADD_TO_WATCHLIST,
  payload: symbol,
});

// Action to remove a stock symbol from the watchlist
export const removeFromWatchlist = (symbol) => ({
  type: REMOVE_FROM_WATCHLIST,
  payload: symbol,
});

// Action to set the watchlist data with stock information
export const setWatchlistData = (data) => ({
  type: SET_WATCHLIST_DATA,
  payload: data,
});

// Thunk action to fetch watchlist data from the Polygon API
export const fetchWatchlistData = (symbols) => async (dispatch) => {
  try {
    const apiKey = process.env.REACT_APP_POLYGON_API_KEY;
    const promises = symbols.map((symbol) =>
      fetch(
        `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.ticker) {
            return data.ticker;
          } else {
            throw new Error(`Data for ${symbol} is not available`);
          }
        })
    );

    const data = await Promise.all(promises);
    dispatch(setWatchlistData(data));
  } catch (error) {
    console.error('Error fetching watchlist data:', error);
  }
};
