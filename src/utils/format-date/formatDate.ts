import { DateTime } from 'luxon';

const formatDate = (date: string, format: string, timeZone?: string) => {
  const dateTime = DateTime.fromISO(date).setZone(timeZone ?? 'local');

  return dateTime.toFormat(format);
};

export default formatDate;
