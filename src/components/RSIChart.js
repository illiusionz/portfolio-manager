// src/components/RSIChart.js
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import useSyncCharts from '../hooks/useSyncCharts';

const RSIChart = ({ stockData, chartInstances }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    if (!stockData || stockData.length === 0) {
      console.error('No stock data available');
      return;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 200,
      layout: {
        backgroundColor: '#1c1c1c',
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: {
          color: '#2c2c2c',
        },
        horzLines: {
          color: '#2c2c2c',
        },
      },
      rightPriceScale: {
        borderColor: '#555ffd',
      },
      timeScale: {
        borderColor: '#555ffd',
      },
    });

    chartRef.current = chart;
    chartInstances.current.push(chart);

    const rsiSeries = chart.addLineSeries({
      color: '#f68484',
      lineWidth: 1,
      priceLineVisible: false,
    });

    const rsiData = stockData.map((data, index) => ({
      time: data.t / 1000,
      value: Math.sin(index / 10) * 10 + 50,
    }));

    rsiSeries.setData(rsiData);

    const resizeObserver = new ResizeObserver((entries) => {
      if (
        entries.length === 0 ||
        entries[0].target !== chartContainerRef.current
      ) {
        return;
      }
      const newWidth = entries[0].contentRect.width;
      chart.resize(newWidth, 200);
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      const index = chartInstances.current.indexOf(chart);
      if (index > -1) {
        chartInstances.current.splice(index, 1);
      }
    };
  }, [stockData]);

  useSyncCharts(chartInstances.current);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: 'relative', width: '100%' }}
    />
  );
};

export default RSIChart;
