export const formatNumberWithCommas = (number) => {
  if (number === null || number === undefined) return '';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCurrency = (number) => {
  if (number === null || number === undefined || isNaN(number)) return '';
  return `$${parseFloat(
    number.toString().replace(/[^0-9.]/g, '')
  ).toLocaleString()}`;
};

export const parseCurrency = (currency) => {
  if (currency === null || currency === undefined) return 0;
  return parseFloat(currency.replace(/[^0-9.-]+/g, ''));
};
