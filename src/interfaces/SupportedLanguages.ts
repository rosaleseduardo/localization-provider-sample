import type { Resource } from 'i18next';

import type { LanguageSettings } from './LanguageSettings';
import type { Locale } from './Locale';

interface BASE_NAMESPACE_STRUCTURE {
  common: Resource;
  translation: Resource;
}

interface DEFAULT_SUPPORTED_LANGUAGES_CONFIG {
  settings: LanguageSettings;
  i18n: i18nextConfig;
}

/**
 * This approach allows defining additional properties per language while maintaining a default structure.
 */
export interface i18nextConfig<T = BASE_NAMESPACE_STRUCTURE> {
  namespaces: Partial<T>;
}

/**
 * This approach allows defining additional properties per language while maintaining a default configuration.
 */
export type SupportedLanguages<T = DEFAULT_SUPPORTED_LANGUAGES_CONFIG> = {
  [K in Locale]: Partial<T>;
};
