import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockPrice } from '../features/stocks/stockThunks';

const useFetchStockPrice = (symbol) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(null);
  const stockPrice = useSelector((state) => state.stocks.price);

  useEffect(() => {
    if (symbol) {
      dispatch(fetchStockPrice(symbol));
    }
  }, [symbol, dispatch]);

  useEffect(() => {
    if (stockPrice) {
      setPrice(stockPrice);
    }
  }, [stockPrice]);

  return price;
};

export default useFetchStockPrice;
