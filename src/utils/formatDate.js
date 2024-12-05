// utils/formatDate.js
export const toUnixTimestamp = date => {
  if (!date) {
    throw new Error('Date is required but was not provided');
  }

  // Перевіряємо, чи це вже Unix timestamp
  if (typeof date === 'number') {
    return date; // Повертаємо без змін
  }

  const timestamp = Date.parse(date); // Конвертація ISO-строки
  if (isNaN(timestamp)) {
    throw new Error(`Invalid date format: ${date}`);
  }

  return timestamp;
};
