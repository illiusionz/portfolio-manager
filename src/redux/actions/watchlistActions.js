export const ADD_TO_WATCHLIST = 'ADD_TO_WATCHLIST';
export const REMOVE_FROM_WATCHLIST = 'REMOVE_FROM_WATCHLIST';
export const SET_WATCHLIST_DATA = 'SET_WATCHLIST_DATA';

export const addToWatchlist = (symbol) => ({
  type: ADD_TO_WATCHLIST,
  payload: symbol,
});

export const removeFromWatchlist = (symbol) => ({
  type: REMOVE_FROM_WATCHLIST,
  payload: symbol,
});

export const setWatchlistData = (data) => ({
  type: SET_WATCHLIST_DATA,
  payload: data,
});

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
