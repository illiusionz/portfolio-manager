// src/components/Chart/Chart.js
import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import './Chart.css';

const Chart = ({ data = [], isDarkMode }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    if (!data.length) {
      console.log('No data to display');
      return;
    }

    console.log('Chart data:', data); // Add this line to check data

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
        textColor: isDarkMode ? '#FFFFFF' : '#000000',
      },
      grid: {
        vertLines: { color: isDarkMode ? '#444444' : '#E0E0E0' },
        horzLines: { color: isDarkMode ? '#444444' : '#E0E0E0' },
      },
      crosshair: { mode: CrosshairMode.Normal },
      priceScale: { borderColor: isDarkMode ? '#444444' : '#E0E0E0' },
      timeScale: { borderColor: isDarkMode ? '#444444' : '#E0E0E0' },
    });

    const candlestickSeries = chart.addCandlestickSeries();
    const rsiSeries = chart.addLineSeries({
      color: 'rgb(255, 0, 0)',
      lineWidth: 2,
    });

    const macdSeries = chart.addHistogramSeries({
      color: 'rgb(0, 255, 0)',
      lineWidth: 2,
    });

    const formattedData = data.map((item) => ({
      time: item.time / 1000, // Assuming `time` is in milliseconds
      open: item.value, // Adjust this if needed, for example item.open
      high: item.value, // Adjust this if needed, for example item.high
      low: item.value, // Adjust this if needed, for example item.low
      close: item.value, // Adjust this if needed, for example item.close
    }));

    const rsiData = calculateRSI(data);
    const macdData = calculateMACD(data);

    candlestickSeries.setData(formattedData);
    rsiSeries.setData(rsiData);
    macdSeries.setData(macdData);

    chartRef.current = chart;

    return () => chart.remove();
  }, [data, isDarkMode]);

  const calculateRSI = (data, period = 14) => {
    let gains = 0;
    let losses = 0;
    const rsiData = [];

    for (let i = 1; i < data.length; i++) {
      const change = data[i].value - data[i - 1].value;
      if (change > 0) gains += change;
      else losses -= change;

      if (i >= period) {
        const avgGain = gains / period;
        const avgLoss = losses / period;
        const rs = avgGain / avgLoss;
        const rsi = 100 - 100 / (1 + rs);
        rsiData.push({ time: data[i].time / 1000, value: rsi });

        const firstChange = data[i - period + 1].value - data[i - period].value;
        if (firstChange > 0) gains -= firstChange;
        else losses += firstChange;
      }
    }
    return rsiData;
  };

  const calculateMACD = (
    data,
    fastPeriod = 12,
    slowPeriod = 26,
    signalPeriod = 9
  ) => {
    const fastEma = calculateEMA(data, fastPeriod);
    const slowEma = calculateEMA(data, slowPeriod);
    const macdLine = fastEma.map((value, index) => ({
      time: data[index].time / 1000,
      value: value - slowEma[index],
    }));

    const signalLine = calculateEMA(macdLine, signalPeriod);
    const histogram = macdLine.map((value, index) => ({
      time: value.time,
      value: value.value - signalLine[index].value,
    }));

    return histogram;
  };

  const calculateEMA = (data, period) => {
    const multiplier = 2 / (period + 1);
    const emaArray = [];
    let ema =
      data.slice(0, period).reduce((sum, item) => sum + item.value, 0) / period;
    emaArray.push(ema);

    for (let i = period; i < data.length; i++) {
      ema = (data[i].value - ema) * multiplier + ema;
      emaArray.push(ema);
    }
    return emaArray;
  };

  return <div ref={chartContainerRef} className='chart-container' />;
};

export default Chart;
