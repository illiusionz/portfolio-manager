// src/components/MACDChart.js
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import useSyncScroll from '../hooks/useSyncScroll';

const MACDChart = ({ stockData, syncRefs }) => {
  const chartContainerRef = useRef();
  useSyncScroll(syncRefs);

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

    const macdSeries = chart.addHistogramSeries({
      color: '#4e5b6e',
      lineWidth: 1,
      priceLineVisible: false,
    });

    const macdData = stockData.map((data, index) => ({
      time: data.t / 1000,
      value: Math.sin(index / 10) * 10,
    }));

    macdSeries.setData(macdData);

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
    };
  }, [stockData]);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: 'relative', width: '100%', overflow: 'auto' }}
    />
  );
};

export default MACDChart;
