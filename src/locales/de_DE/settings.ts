import type { LanguageSettings } from '@interfaces';

const settings: LanguageSettings = {
  name: 'Deutsch (Deutschland)',
  locale: 'de_DE',
  currency: {
    name: 'EUR',
    symbol: '€',
  },
  textDirection: 'ltr',
  formats: {
    dateTime: 'dd.MM.yyyy HH:mm',
    date: { short: 'dd.MM.yyyy', long: 'd. MMMM yyyy' },
    time: 'HH:mm',
    hour: '24-hour',
  },
};

export default settings;
