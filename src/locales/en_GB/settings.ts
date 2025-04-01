import type { LanguageSettings } from '@interfaces';

const settings: LanguageSettings = {
  name: 'English (United Kingdom)',
  locale: 'en_GB',
  currency: {
    name: 'GBP',
    symbol: '£',
  },
  textDirection: 'ltr',
  formats: {
    dateTime: 'dd/MM/yyyy HH:mm',
    date: { short: 'dd/MM/yyyy', long: 'd MMMM yyyy' },
    time: 'HH:mm',
    hour: '24-hour',
  },
};

export default settings;
