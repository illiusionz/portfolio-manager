// src/components/StockChart.js
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const StockChart = ({ stockData }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(stockData);

    return () => chart.remove();
  }, [stockData]);

  return <div ref={chartContainerRef} />;
};

export default StockChart;
