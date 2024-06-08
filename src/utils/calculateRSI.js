// utils/calculateRSI.js
export const calculateRSI = (data, period = 14, source = 'close') => {
  const rsiData = [];
  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const difference = data[i][source] - data[i - 1][source];
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }

  gains /= period;
  losses /= period;

  for (let i = period; i < data.length; i++) {
    const difference = data[i][source] - data[i - 1][source];
    if (difference >= 0) {
      gains = (gains * (period - 1) + difference) / period;
      losses = (losses * (period - 1)) / period;
    } else {
      gains = (gains * (period - 1)) / period;
      losses = (losses * (period - 1) - difference) / period;
    }
    const rs = gains / losses;
    const rsi = 100 - 100 / (1 + rs);
    rsiData.push({
      time: data[i].t / 1000,
      value: rsi,
    });
  }

  return rsiData;
};
