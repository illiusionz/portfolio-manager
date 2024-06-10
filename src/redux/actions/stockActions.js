// src/redux/actions/stockActions.js
const API_KEY = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';

export const fetchStocksRequest = () => ({ type: 'FETCH_STOCKS_REQUEST' });

export const fetchStocksSuccess = (data) => ({
  type: 'FETCH_STOCKS_SUCCESS',
  payload: data,
});

export const fetchStocksFailure = (error) => ({
  type: 'FETCH_STOCKS_FAILURE',
  payload: error,
});

export const fetchStocks = () => {
  return (dispatch) => {
    dispatch(fetchStocksRequest());
    const url = `https://api.polygon.io/v2/aggs/ticker/O:TSLA230113C00015000/range/1/day/2023-01-01/2023-01-11?apiKey=${API_KEY}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => dispatch(fetchStocksSuccess(data)))
      .catch((error) => dispatch(fetchStocksFailure(error)));
  };
};
