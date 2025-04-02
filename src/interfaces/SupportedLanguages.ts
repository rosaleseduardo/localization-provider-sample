import type { Resource } from 'i18next';

import type { LanguageSettings } from './LanguageSettings';
import type { Locale } from './Locale';

/**
 * This approach allows defining additional properties per language while maintaining a default structure.
 */
export interface i18nextConfig {
  namespaces: {
    common?: Resource;
    translation?: Resource;
    [key: string]: Resource | undefined;
  };
}

/**
 * This approach allows defining additional properties per language while maintaining a default configuration.
 */
export type SupportedLanguages = {
  [K in Locale]: {
    settings?: LanguageSettings;
    i18n: i18nextConfig;
  };
};
