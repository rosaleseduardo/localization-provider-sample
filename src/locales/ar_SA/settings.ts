import type { LanguageSettings } from '@interfaces';

const settings: LanguageSettings = {
  name: 'العربية (المملكة العربية السعودية)',
  locale: 'ar_SA',
  currency: {
    name: 'SAR',
    symbol: '﷼',
  },
  textDirection: 'rtl',
  formats: {
    dateTime: 'yyyy/MM/dd HH:mm',
    date: { short: 'yyyy/MM/dd', long: 'd MMMM yyyy' },
    time: 'HH:mm',
    hour: '24-hour',
  },
};

export default settings;
