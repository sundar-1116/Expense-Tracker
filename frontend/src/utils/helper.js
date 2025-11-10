import moment from 'moment';

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if(!name) return "";

  const words  = name.split(" ");
  let initials = "";

  for(let i = 0;i < Math.min(words.length, 2); i++){
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeperator = (number) => {
  if (number === undefined || number === null) return "0";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function prepareExpenseBarChartData(transactions = []) {
  // transactions expected to be array of { date, amount, type? }
  const map = {};

  transactions.forEach(tx => {
    if (!tx) return;
    // adjust according to your transaction shape: tx.date and tx.amount
    const dateStr = moment(tx.date).format('DD MMM'); // label on x-axis
    const amount = Number(tx.amount) || 0;
    // if backend stores expenses as positive numbers but type indicates expense, include all.
    map[dateStr] = (map[dateStr] || 0) + amount;
  });

  const result = Object.keys(map).map(name => ({ name, value: map[name] }));
  // optional: sort by parsed date (last 30 days)
  result.sort((a, b) => moment(a.name, 'DD MMM').toDate() - moment(b.name, 'DD MMM').toDate());
  return result;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map( (item) => ({
  month: moment(item?.date) .format('Do MMM'),
  amount: item?.amount,
  source: item?.source,
  }));
  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map( (item) => ({
    month: moment(item?.date) .format('Do MMM'),
    amount: item?.amount,
    category: item?.category,
  }));
  return chartData;
};