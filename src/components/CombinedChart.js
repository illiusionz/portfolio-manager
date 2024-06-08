// src/components/CombinedChart.js
import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

const CombinedChart = ({ stockData }) => {
  const chartContainerRef = useRef();
  const rsiContainerRef = useRef();
  const macdContainerRef = useRef();

  const chartRef = useRef();
  const rsiChartRef = useRef();
  const macdChartRef = useRef();

  useEffect(() => {
    if (!stockData || stockData.length === 0) {
      console.error('No stock data available');
      return;
    }

    // Create main chart
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

    chartRef.current = chart;

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

    // Create RSI chart
    const rsiChart = createChart(rsiContainerRef.current, {
      width: rsiContainerRef.current.clientWidth,
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
        visible: false,
      },
    });

    rsiChartRef.current = rsiChart;

    const rsiSeries = rsiChart.addLineSeries({
      color: '#f68484',
      lineWidth: 1,
      priceLineVisible: false,
    });

    const rsiData = stockData.map((data, index) => ({
      time: data.t / 1000,
      value: Math.sin(index / 10) * 10 + 50,
    }));

    rsiSeries.setData(rsiData);

    // Create MACD chart
    const macdChart = createChart(macdContainerRef.current, {
      width: macdContainerRef.current.clientWidth,
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
        visible: false,
      },
    });

    macdChartRef.current = macdChart;

    const macdSeries = macdChart.addHistogramSeries({
      color: '#4e5b6e',
      lineWidth: 1,
      priceLineVisible: false,
    });

    const macdData = stockData.map((data, index) => ({
      time: data.t / 1000,
      value: Math.sin(index / 10) * 10,
    }));

    macdSeries.setData(macdData);

    // Sync time scales
    const syncTimeScale = (source, targets) => {
      const updateHandler = (logicalRange) => {
        targets.forEach((target) => {
          target.timeScale().setVisibleLogicalRange(logicalRange);
        });
      };
      source.timeScale().subscribeVisibleLogicalRangeChange(updateHandler);
      return () => {
        source.timeScale().unsubscribeVisibleLogicalRangeChange(updateHandler);
      };
    };

    const unsubscribers = [
      syncTimeScale(chart, [rsiChart, macdChart]),
      syncTimeScale(rsiChart, [chart, macdChart]),
      syncTimeScale(macdChart, [chart, rsiChart]),
    ];

    // Cleanup
    return () => {
      unsubscribers.forEach((unsub) => unsub());
      chart.remove();
      rsiChart.remove();
      macdChart.remove();
    };
  }, [stockData]);

  return (
    <div>
      <div
        ref={chartContainerRef}
        style={{ position: 'relative', width: '100%' }}
      />
      <div
        ref={rsiContainerRef}
        style={{ position: 'relative', width: '100%' }}
      />
      <div
        ref={macdContainerRef}
        style={{ position: 'relative', width: '100%' }}
      />
    </div>
  );
};

export default CombinedChart;
