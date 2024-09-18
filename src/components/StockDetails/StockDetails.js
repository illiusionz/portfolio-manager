import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStockDetails } from '../../features/stocks/stockThunks';
import { selectStockDetails } from '../../features/stocks/stockSelectors';
import './StockDetails.scss';

const StockDetails = ({ symbol }) => {
  const dispatch = useDispatch();
  const stockDetails = useSelector((state) =>
    selectStockDetails(state, symbol)
  );
  const loading = useSelector((state) => state.stocks.loading);
  const error = useSelector((state) => state.stocks.error);

  useEffect(() => {
    dispatch(fetchStockDetails(symbol));
  }, [dispatch, symbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching stock details</div>;
  if (!stockDetails) return <div>No stock details available</div>;

  const {
    name,
    description,
    branding: { icon_url, logo_url } = {},
    market_cap,
    phone_number,
  } = stockDetails;

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <img src={icon_url} alt={`${name} icon`} />
      <img src={logo_url} alt={`${name} logo`} />
      <p>Market Cap: ${market_cap}</p>
      <p>Phone: {phone_number}</p>
    </div>
  );
};

export default StockDetails;
