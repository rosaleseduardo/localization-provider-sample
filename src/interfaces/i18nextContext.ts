import type { DateTime } from 'luxon';
import type { useTranslation } from 'react-i18next';

import type { HourFormat } from './HourFormat';
import type { LanguageSettings } from './LanguageSettings';
import type { Locale } from './Locale';

export interface Timezone {
  zoneName: string;
  isDST: boolean;
  hourFormat: HourFormat;
}

export interface LangOptions {
  label: string;
  value: Locale;
}

export interface DateTimeFormattingOptions {
  date: string;
  format: string;
  timeZone: string;
  longFormat: boolean;
}

export interface DateRangeConfig {
  startDate: string;
  endDate: string;
  timeZone: string;
}

export interface i18nextContext {
  setCurrentLanguage: (locale: Locale) => void;
  langIsSelected: (props: LanguageSettings) => boolean;
  currentLangSettings: LanguageSettings;
  defaultLangCount: number;
  helpers: {
    langAsOptions: LangOptions[];
    getTimeZoneInfo: (date?: DateTime) => Timezone;
  };
  hooks: {
    useLocalizedInfo: () => {
      getDate: (dateOption?: 'Yesterday' | 'Tomorrow', timeZone?: string) => string;
      displayDate: (props?: Partial<DateTimeFormattingOptions>) => string;
      displayTime: (props?: Partial<DateTimeFormattingOptions>) => string;
    };
    useTranslation: typeof useTranslation;
  };
  utils: {
    formatDate: (date: string, format: string) => string;
    isValidRange: (props?: Partial<DateRangeConfig>) => boolean;
    formatPhoneNumber: (phoneNumber: string, locale: Locale) => string;
  };
}
