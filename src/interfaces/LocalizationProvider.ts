import type { Resource } from 'i18next';

import type { Locale } from '@interfaces';

export interface LocalizationProviderProps {
  children: React.ReactElement;
  resources?: Record<Locale, Resource>;
}
