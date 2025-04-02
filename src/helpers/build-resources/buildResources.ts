import type { ResourceLanguage } from 'i18next';

import type { Locale, SupportedLanguages } from '@interfaces';
import * as supportedLanguages from '@locales';

import { availableLocales } from '../available-locales';

const buildResources = (languages: SupportedLanguages = supportedLanguages) =>
  availableLocales.reduce(
    (acc, current) => {
      const { i18n } = languages[current];

      acc[current] = { ...i18n!.namespaces };

      return acc;
    },
    {} as Record<Locale, ResourceLanguage>,
  );

export default buildResources;
