// src/components/CombinedChart.js
import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { calculateRSI } from '../utils/calculateRSI';
import { calculateMACD } from '../utils/calculateMACD';

const CombinedChart = ({ stockData, showRSI, showMACD, rsiSettings }) => {
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

    if (showRSI) {
      const rsiData = calculateRSI(
        stockData,
        rsiSettings.period,
        rsiSettings.source
      );
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

      rsiSeries.setData(rsiData);
    }

    if (showMACD) {
      const macdData = calculateMACD(stockData);
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

      macdSeries.setData(macdData);
    }

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
      syncTimeScale(
        chart,
        [rsiChartRef.current, macdChartRef.current].filter(Boolean)
      ),
      syncTimeScale(
        rsiChartRef.current,
        [chart, macdChartRef.current].filter(Boolean)
      ),
      syncTimeScale(
        macdChartRef.current,
        [chart, rsiChartRef.current].filter(Boolean)
      ),
    ];

    return () => {
      unsubscribers.forEach((unsub) => unsub());
      chart.remove();
      rsiChartRef.current?.remove();
      macdChartRef.current?.remove();
    };
  }, [stockData, showRSI, showMACD, rsiSettings]);

  return (
    <div>
      <div
        ref={chartContainerRef}
        style={{ position: 'relative', width: '100%' }}
      />
      {showRSI && (
        <div
          ref={rsiContainerRef}
          style={{ position: 'relative', width: '100%' }}
        />
      )}
      {showMACD && (
        <div
          ref={macdContainerRef}
          style={{ position: 'relative', width: '100%' }}
        />
      )}
    </div>
  );
};

export default CombinedChart;
