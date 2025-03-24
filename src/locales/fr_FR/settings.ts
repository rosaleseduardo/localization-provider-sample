import type { LanguageSettings } from '@interfaces';

const settings: LanguageSettings = {
  name: 'Français (France)',
  locale: 'fr_FR',
  currency: 'EUR',
  textDirection: 'ltr',
  formats: {
    dateTime: 'DD/MM/YYYY HH:mm',
    date: { short: 'dd/MM/yyyy', long: 'd MMMM yyyy' },
    time: 'HH:mm',
    hour: '24-hour',
  },
};

export default settings;
