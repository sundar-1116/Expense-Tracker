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

export const prepareExpenseBarChartData = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map((item) => ({
    name: item.category,
    value: item.amount
  }));
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