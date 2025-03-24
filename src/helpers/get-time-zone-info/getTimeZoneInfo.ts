import { DateTime } from 'luxon';

import type { HourFormat, Timezone } from '@interfaces';

const getTimeZoneInfo = (date?: DateTime): Timezone => {
  const now = date ?? DateTime.now();

  return {
    zoneName: now.zoneName!,
    isDST: now.isInDST,
    hourFormat: now.toFormat('ZZZZ') as HourFormat,
  };
};

export default getTimeZoneInfo;
