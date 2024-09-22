// src/utils/stockUtils.js
export const getStockPrice = (stockSnapshot) => {
  return stockSnapshot?.prevDay?.c ?? 0;
};

//Example usage in components
//import { getStockPrice } from '../../utils/stockUtils';
// Inside your component
//const price = getStockPrice(stockSnapshot);
