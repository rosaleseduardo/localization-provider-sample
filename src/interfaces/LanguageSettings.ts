import type { HourFormat } from './HourFormat';
import type { Locale } from './Locale';

export type Currencies = 'USD' | 'EUR' | 'COP';

export type Directions = 'ltr' | 'rtl';

export interface LanguageSettings {
  name: string;
  locale: Locale;
  currency: Currencies;
  textDirection: Directions;
  formats: {
    dateTime: string;
    date: { short: string; long: string };
    // Defines how a full time string is displayed (e.g., "HH:mm:ss" or "h:mm A").
    time: string;
    // Defines whether the time format uses 12-hour or 24-hour notation.
    hour: HourFormat;
  };
}
