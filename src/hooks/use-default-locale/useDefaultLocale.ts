import { DEFAULT_LOCALE } from '@constants';
import type { Locale } from '@interfaces';

const useDefaultLocale = () => {
  const locale: Locale = (navigator.language.replace('-', '_') as Locale) ?? DEFAULT_LOCALE;

  return locale;
};

export default useDefaultLocale;
