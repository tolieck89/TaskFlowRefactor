import dayjs from 'dayjs';

export function sanitizeUser(user) {
  const cleaned = { ...user };

  // Перебираємо всі ключі
  for (const key in cleaned) {
    const value = cleaned[key];

    // Якщо це dayjs-об'єкт або Date — конвертуємо
    if (dayjs.isDayjs(value)) {
      cleaned[key] = value.format('YYYY-MM-DD'); // або .toISOString()
    } else if (value instanceof Date) {
      cleaned[key] = dayjs(value).format('YYYY-MM-DD');
    }
  }

  return cleaned;
}