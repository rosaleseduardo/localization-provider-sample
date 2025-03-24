import type { Resource } from 'i18next';

import type { Locale } from '@interfaces';

import * as supportedLanguages from '../../locales';
import { availableLocales } from '../available-locales';

const namespaceResources = availableLocales.reduce(
  (acc, current) => {
    const { i18n } = supportedLanguages[current];

    acc[current] = { ...i18n.namespaces };

    return acc;
  },
  {} as Record<Locale, Resource>,
);

export default namespaceResources;
