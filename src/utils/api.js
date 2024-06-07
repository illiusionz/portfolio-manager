// src/utils/api.js

export const fetchStockSuggestions = async (query) => {
  const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq'; // Replace with your actual API key
  const url = `https://api.polygon.io/v3/reference/tickers?search=${query}&apiKey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results || [];
};
