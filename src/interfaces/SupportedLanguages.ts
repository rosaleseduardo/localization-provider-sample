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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface i18nextConfig<T extends Record<string, any> = BASE_NAMESPACE_STRUCTURE> {
  namespaces: T;
}

/**
 * This approach allows defining additional properties per language while maintaining a default configuration.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SupportedLanguages<T extends Record<string, any> = DEFAULT_SUPPORTED_LANGUAGES_CONFIG> = {
  [K in Locale]: T;
};
