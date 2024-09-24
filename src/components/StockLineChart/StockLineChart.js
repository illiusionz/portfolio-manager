// src/components/StockLineChart/StockLineChart.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchHistoricalData } from '../../features/stocks/stockThunks';
import './StockLineChart.scss';

const StockLineChart = ({ symbol }) => {
  const dispatch = useDispatch();

  // Select historical data from Redux state
  const historicalData = useSelector(
    (state) => state.stocks.historicalData[symbol]
  );

  useEffect(() => {
    // Fetch historical data when the component mounts
    if (symbol && !historicalData) {
      dispatch(fetchHistoricalData(symbol));
    }
  }, [dispatch, symbol, historicalData]);

  // Check if historical data is available
  if (!historicalData || historicalData.length === 0) {
    return <div>Loading chart data...</div>; // Show loading message or null
  }

  return (
    <ResponsiveContainer width='100%' height={100}>
      <LineChart data={historicalData}>
        <XAxis dataKey='timestamp' /> {/* Show time on x-axis */}
        <YAxis domain={['auto', 'auto']} /> {/* Show price on y-axis */}
        <Tooltip /> {/* Show tooltip on hover */}
        <Line type='monotone' dataKey='close' stroke='#82ca9d' dot={false} />
        {/* Add additional lines if needed */}
        {/* <Line type='monotone' dataKey='vwap' stroke='#8884d8' dot={false} /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockLineChart;
