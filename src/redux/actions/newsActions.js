// src/redux/actions/newsActions.js
const API_KEY = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';

export const fetchNewsRequest = () => ({ type: 'FETCH_NEWS_REQUEST' });

export const fetchNewsSuccess = (articles) => ({
  type: 'FETCH_NEWS_SUCCESS',
  payload: articles,
});

export const fetchNewsFailure = (error) => ({
  type: 'FETCH_NEWS_FAILURE',
  payload: error,
});

export const fetchNews = () => {
  return (dispatch) => {
    dispatch(fetchNewsRequest());
    const url = `https://api.polygon.io/v2/reference/news?limit=10&apiKey=${API_KEY}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.results)) {
          dispatch(fetchNewsSuccess(data.results));
        } else {
          dispatch(fetchNewsSuccess([]));
        }
      })
      .catch((error) => dispatch(fetchNewsFailure(error)));
  };
};
