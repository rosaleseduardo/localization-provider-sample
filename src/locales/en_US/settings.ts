import type { LanguageSettings } from '@interfaces';

const settings: LanguageSettings = {
  name: 'English (United States)',
  locale: 'en_US',
  currency: 'USD',
  textDirection: 'ltr',
  formats: {
    dateTime: 'MM/DD/YYYY hh:mm a',
    date: { short: 'MM/dd/yyyy', long: 'MMMM dd, yyyy' },
    time: 'hh:mm a',
    hour: '12-hour',
  },
};

export default settings;
