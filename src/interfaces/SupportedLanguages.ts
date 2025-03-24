import type { Resource } from 'i18next';

import type { LanguageSettings } from './LanguageSettings';
import type { Locale } from './Locale';

export interface i18nextConfig {
  namespaces: {
    translation: Resource;
  };
}

export type SupportedLanguages = {
  [K in Locale]: {
    settings: LanguageSettings;
    i18n: i18nextConfig;
  };
};
