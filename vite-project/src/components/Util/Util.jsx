import { DateTime } from 'luxon';

export function formatDateTime(dtValue) {
  const parsedDate = DateTime.fromISO(dtValue).setZone('Greenwich');

  const outputDate = parsedDate.toFormat('yyyy-MM-dd');
  return outputDate;
}
