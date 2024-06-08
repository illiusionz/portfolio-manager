import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import './Chart.css'; // Ensure this file exists and is correctly placed

const Chart = ({ stockData }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (stockData.length === 0) return;
    console.log('Stock Data for Chart:', stockData);

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: { backgroundColor: '#000000', textColor: '#FFFFFF' },
    });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(stockData);

    return () => chart.remove();
  }, [stockData]);

  return <div id='chart' ref={chartContainerRef} className='mt-4'></div>;
};

export default Chart;
