export default number => number.toLocaleString(undefined, { maximumFractionDigits: 2 }).replace(',', ' ');
