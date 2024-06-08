// utils/calculateMACD.js
export const calculateMACD = (
  data,
  shortPeriod = 12,
  longPeriod = 26,
  signalPeriod = 9
) => {
  const ema = (data, period) => {
    const k = 2 / (period + 1);
    const emaArray = [data[0].c];
    for (let i = 1; i < data.length; i++) {
      emaArray.push(data[i].c * k + emaArray[i - 1] * (1 - k));
    }
    return emaArray;
  };

  const shortEMA = ema(data, shortPeriod);
  const longEMA = ema(data, longPeriod);
  const macdLine = shortEMA.map((val, idx) => val - longEMA[idx]);
  const signalLine = ema(macdLine, signalPeriod);
  const histogram = macdLine.map((val, idx) => val - signalLine[idx]);

  return macdLine.map((val, idx) => ({
    time: data[idx].t / 1000,
    value: histogram[idx],
  }));
};
