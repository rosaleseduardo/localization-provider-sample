import type { Resource } from 'i18next';

export interface LocalizationProviderProps {
  children: React.ReactElement;
  resources?: Resource;
}
