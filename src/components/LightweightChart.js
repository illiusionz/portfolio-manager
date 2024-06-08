// src/components/LightweightChart.js
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const LightweightChart = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });
    const lineSeries = chart.addLineSeries();

    lineSeries.setData(data);

    return () => chart.remove();
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export default LightweightChart;
