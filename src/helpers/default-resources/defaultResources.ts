import type { Resource } from 'i18next';

import type { Locale, SupportedLanguages } from '@interfaces';
import * as supportedLanguages from '@locales';

import { availableLocales } from '../available-locales';

const defaultResources = (languges: SupportedLanguages = supportedLanguages) =>
  availableLocales.reduce(
    (acc, current) => {
      const { i18n } = languges[current];

      acc[current] = { ...i18n.namespaces };

      return acc;
    },
    {} as Record<Locale, Resource>,
  );

export default defaultResources;
