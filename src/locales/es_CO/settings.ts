import type { LanguageSettings } from '@interfaces';

const settingsEsCo: LanguageSettings = {
  name: 'Español (Colombia)',
  locale: 'es_CO',
  currency: {
    name: 'COP',
    symbol: '$',
  },
  textDirection: 'ltr',
  formats: {
    dateTime: 'dd/MM/yyyy HH:mm',
    date: { short: 'dd/MM/yyyy', long: 'd MMMM yyyy' },
    time: 'HH:mm',
    hour: '24-hour',
  },
};

export default settingsEsCo;
