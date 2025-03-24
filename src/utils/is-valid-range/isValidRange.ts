import { DateTime } from 'luxon';

import { getTimeZoneInfo } from '@helpers';
import type { DateRangeConfig } from '@interfaces';

/**
 * Checks if the current date falls within the specified date range.
 *
 * @param props - An optional object containing the start date, end date, and time zone.
 *   - `startDate`: The start date in ISO format (YYYY-MM-DD).
 *   - `endDate`: The end date in ISO format (YYYY-MM-DD).
 *   - `timeZone`: The time zone identifier (e.g., "America/New_York"). Defaults to `timeZoneInfo.zoneName`.
 * @returns `true` if today is within the valid date range, otherwise `false`.
 */
const isValidRange = (props?: Partial<DateRangeConfig>): boolean => {
  const timeZoneInfo = getTimeZoneInfo();

  const today = DateTime.now().startOf('day');

  const start = props?.startDate
    ? DateTime.fromISO(props.startDate)
        .setZone(props?.timeZone ?? timeZoneInfo.zoneName)
        .startOf('day')
    : null;
  const end = props?.endDate
    ? DateTime.fromISO(props.endDate)
        .setZone(props?.timeZone ?? timeZoneInfo.zoneName)
        .endOf('day')
    : null;

  if (start && end) return today >= start && today <= end;
  if (start) return today >= start;
  if (end) return today <= end;

  return false;
};

export default isValidRange;
