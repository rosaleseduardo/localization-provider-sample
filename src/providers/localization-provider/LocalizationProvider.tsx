import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import { getTimeZoneInfo, langAsOptions, namespaceResources } from '@helpers';
import { useDefaultLocale, useLocalizedInfo, useSessionStorage } from '@hooks';
import type { LanguageSettings, Locale, LocalizationProviderProps, SupportedLanguages } from '@interfaces';
import * as supportedLocales from '@locales';
import * as utils from '@utils';

import { LocalizationProviderContext } from './context';

const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const defaultLocale = useDefaultLocale();
  const [storedValue, setValue] = useSessionStorage({
    key: 'i18nLocale',
    defaultValue: defaultLocale,
  });
  const supportedLanguages: SupportedLanguages = supportedLocales;
  const currentLangSettings: LanguageSettings = supportedLanguages[storedValue].settings;
  const locales = Object.keys(supportedLanguages) as Locale[];
  const defaultLangCount = locales.length;

  i18next.use(initReactI18next).init({
    lng: storedValue,
    resources: namespaceResources,
    /**
     * By default, i18next escapes these dynamic values to prevent XSS
     * (Cross-Site Scripting) attacks. This means special characters like \<,
     * \>, & will be converted to their HTML-safe equivalents (e.g., &lt;, &
     * gt;, etc.).
     *
     * Setting escapeValue: false disables this escaping behavior. In other
     * words, it allows dynamic values to be inserted without escaping HTML
     * characters. This might be useful if you want to allow HTML or other
     * content to be safely inserted into your translation string.
     *
     * Reference: https://www.i18next.com/translation-function/
     * interpolation#unescape
     */
    interpolation: { escapeValue: false },
    /**
     * Resource: https://www.i18next.com/principles/fallback
     */
    fallbackLng: defaultLocale,
  });

  const setCurrentLanguage = (locale: Locale): void => {
    i18next.changeLanguage(locale);
    setValue(locale);
  };

  const langIsSelected = ({ locale }: LanguageSettings): boolean => locale === storedValue;

  return (
    <LocalizationProviderContext.Provider
      value={{
        setCurrentLanguage,
        langIsSelected,
        currentLangSettings,
        defaultLangCount,
        helpers: {
          langAsOptions,
          getTimeZoneInfo,
        },
        hooks: {
          useLocalizedInfo,
          useTranslation,
        },
        utils,
      }}
    >
      {children}
    </LocalizationProviderContext.Provider>
  );
};

export default LocalizationProvider;
