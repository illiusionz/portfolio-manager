// src/components/LightweightChart.js
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

function LightweightChart({ data, isDarkMode }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: isDarkMode ? '#131722' : '#FFFFFF',
        textColor: isDarkMode ? '#D9D9D9' : '#000',
      },
      grid: {
        vertLines: {
          color: isDarkMode ? '#2B2B43' : '#E3E3E3',
        },
        horzLines: {
          color: isDarkMode ? '#2B2B43' : '#E3E3E3',
        },
      },
    });

    const lineSeries = chart.addLineSeries();
    lineSeries.setData(data);

    return () => chart.remove();
  }, [data, isDarkMode]);

  return (
    <div ref={chartContainerRef} style={{ height: '100%', width: '100%' }} />
  );
}

export default LightweightChart;
