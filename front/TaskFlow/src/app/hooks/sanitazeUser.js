import dayjs from 'dayjs';

export function sanitizeUser(user) {
  const cleaned = { ...user };

  for (const key in cleaned) {
    const value = cleaned[key];

    if (dayjs.isDayjs(value)) {
      cleaned[key] = value.format('YYYY-MM-DD');
    } else if (value instanceof Date) {
      cleaned[key] = dayjs(value).format('YYYY-MM-DD');
    }
  }

  return cleaned;
}
