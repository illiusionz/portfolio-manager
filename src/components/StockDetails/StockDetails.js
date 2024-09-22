import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStockDetails } from '../../features/stocks/stockThunks';
import { selectStockDetails } from '../../features/stocks/stockSelectors';
import './StockDetails.scss';
import { formatCurrency } from '../../utils/format';

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

  if (loading) return <div className='stock-details'>Loading...</div>;
  if (error)
    return <div className='stock-details'>Error fetching stock details</div>;
  if (!stockDetails)
    return <div className='stock-details'>No stock details available</div>;

  const {
    name,
    description,
    branding: { icon_url, logo_url } = {},
    market_cap,
    phone_number,
    total_employees,
    locale,
    primary_exchange,
    ticker,
    sic_description,
    address1,
    city,
    postal_code,
    state,
  } = stockDetails;

  return (
    <div className='stock-details-card'>
      <div className='stock-header'>
        <img
          src={`https://assets.parqet.com/logos/symbol/${symbol}`}
          alt={`${name} logo`}
          className='stock-logo'
        />
        <h2>{name}</h2>
      </div>
      <div className='stock-body'>
        <div className='stock-info'>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Market Cap:</strong> {formatCurrency(market_cap)}
          </p>
          <p>
            <strong>Phone:</strong> {phone_number}
          </p>
          <p>
            <strong>Employees:</strong> {total_employees}
          </p>
          <p>
            <strong>Locale:</strong> {locale}
          </p>
          <p>
            <strong>Primary Exchange:</strong> {primary_exchange}
          </p>
          <p>
            <strong>Ticker:</strong> {ticker}
          </p>
          <p>
            <strong>SIC Description:</strong> {sic_description}
          </p>
        </div>
        <div className='stock-address'>
          <h4>Address</h4>
          <p>{address1}</p>
          <p>
            {city}, {state} {postal_code}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
