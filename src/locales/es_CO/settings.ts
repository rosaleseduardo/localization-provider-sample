import type { LanguageSettings } from '@interfaces';

const settings: LanguageSettings = {
  name: 'Español (Colombia)',
  locale: 'es_CO',
  currency: 'COP',
  textDirection: 'ltr',
  formats: {
    dateTime: 'DD/MM/YYYY hh:mm a',
    date: { short: 'dd/MM/yyyy', long: "d 'de' MMMM 'de' yyyy" },
    time: 'hh:mm a',
    hour: '12-hour',
  },
};

export default settings;
