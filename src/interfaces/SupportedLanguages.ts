import type { Resource } from 'i18next';

import type { LanguageSettings } from './LanguageSettings';
import type { Locale } from './Locale';

interface DEFAULT_NAMESPACE_CONFIG {
  common: Resource;
  translation: Resource;
}
export interface i18nextConfig<T = DEFAULT_NAMESPACE_CONFIG> {
  namespaces: T;
}

export type SupportedLanguages = {
  [K in Locale]: {
    settings: LanguageSettings;
    i18n: i18nextConfig;
  };
};
