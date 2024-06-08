// src/components/StockChart.js
import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import useSyncScroll from '../hooks/useSyncScroll';

const StockChart = ({ stockData, syncRefs }) => {
  const chartContainerRef = useRef();
  useSyncScroll(syncRefs);

  useEffect(() => {
    if (!stockData || stockData.length === 0) {
      console.error('No stock data available');
      return;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
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
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: '#555ffd',
      },
      timeScale: {
        borderColor: '#555ffd',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const lineSeries = chart.addLineSeries({
      color: '#4e5b6e',
      lineWidth: 2,
    });

    lineSeries.setData(
      stockData.map((data) => ({
        time: data.t / 1000,
        value: data.c,
      }))
    );

    const resizeObserver = new ResizeObserver((entries) => {
      if (
        entries.length === 0 ||
        entries[0].target !== chartContainerRef.current
      ) {
        return;
      }
      const newWidth = entries[0].contentRect.width;
      chart.resize(newWidth, 300);
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

export default StockChart;
