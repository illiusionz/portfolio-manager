const API_KEY = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
const BASE_URL = 'https://api.polygon.io';

export const fetchStockSuggestions = async (query) => {
  const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
  const url = `https://api.polygon.io/v3/reference/tickers?search=${query}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Error: ${response.status} ${response.statusText}. ${errorDetails.message}`
      );
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Fetch Suggestions Error:', error);
    return [];
  }
};

export const fetchStockDataForChart = async (ticker) => {
  const response = await fetch(
    `${BASE_URL}/v2/aggs/ticker/${ticker}/range/1/day/2023-01-01/2023-12-31?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data.results
    .map((item) => ({
      time: item.t ? item.t / 1000 : undefined, // Ensure the time is in seconds and not undefined
      value: item.c !== undefined ? item.c : undefined, // Ensure value is not undefined
    }))
    .filter((item) => item.time !== undefined && item.value !== undefined); // Filter out invalid items
};
