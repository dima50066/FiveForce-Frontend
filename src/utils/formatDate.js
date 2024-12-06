export const toUnixTimestamp = date => {
  if (!date) {
    throw new Error('Date is required but was not provided');
  }

  if (typeof date === 'number') {
    return date;
  }

  const timestamp = Date.parse(date);
  if (isNaN(timestamp)) {
    throw new Error(`Invalid date format: ${date}`);
  }

  return timestamp;
};
