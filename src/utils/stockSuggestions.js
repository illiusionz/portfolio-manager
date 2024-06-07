// src/utils/stockSuggestions.js

const stockSuggestions = (value) => {
  // Here, we will filter the list of stock symbols based on the input value.
  // You might want to replace this with a more comprehensive list or an API call.
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
  ];

  return value
    ? stocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(value.toLowerCase()) ||
          stock.name.toLowerCase().includes(value.toLowerCase())
      )
    : [];
};

export default stockSuggestions;
