import { DateTime } from 'luxon';

import { getTimeZoneInfo } from '@helpers';
import type { DateTimeFormattingOptions } from '@interfaces';
import { useLocalizationContext } from '@providers';

const useLocalizedInfo = () => {
  const { currentLangSettings } = useLocalizationContext();
  const timeZoneInfo = getTimeZoneInfo();

  const getDate = (dateOption?: 'Yesterday' | 'Tomorrow', timeZone?: string) => {
    const dateAdjustment = dateOption === 'Yesterday' ? -1 : dateOption === 'Tomorrow' ? 1 : 0;

    const date = DateTime.now()
      .setZone(timeZone ?? timeZoneInfo.zoneName)
      .plus({ days: dateAdjustment })
      .toUTC()
      .toISO()!;

    return date;
  };

  const displayDate = (props?: Partial<DateTimeFormattingOptions>) => {
    const dateTime = !props?.date
      ? DateTime.now()
      : DateTime.fromISO(props?.date).setZone(props?.timeZone ?? timeZoneInfo.zoneName);

    return dateTime
      .setLocale(currentLangSettings.locale.replace('_', '-'))
      .toFormat(
        (props?.format ?? !props?.longFormat)
          ? currentLangSettings.formats.date.short
          : currentLangSettings.formats.date.long,
      );
  };

  const displayTime = (props?: Partial<DateTimeFormattingOptions>) => {
    const dateTime = !props?.date
      ? DateTime.now()
      : DateTime.fromISO(props?.date).setZone(props?.timeZone ?? timeZoneInfo.zoneName);

    return dateTime.toFormat(props?.format ?? currentLangSettings.formats.time);
  };

  return { getDate, displayDate, displayTime };
};

export default useLocalizedInfo;
