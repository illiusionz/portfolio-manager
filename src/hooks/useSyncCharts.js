// src/hooks/useSyncCharts.js
import { useEffect } from 'react';

const useSyncCharts = (charts) => {
  useEffect(() => {
    if (charts.length === 0) return;

    const syncTimeScale = (source) => {
      const updateHandler = (logicalRange) => {
        charts.forEach((chart) => {
          if (chart !== source) {
            chart.timeScale().setVisibleLogicalRange(logicalRange);
          }
        });
      };

      source.timeScale().subscribeVisibleLogicalRangeChange(updateHandler);

      return () => {
        source.timeScale().unsubscribeVisibleLogicalRangeChange(updateHandler);
      };
    };

    const unsubscribes = charts.map(syncTimeScale);

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [charts]);
};

export default useSyncCharts;
