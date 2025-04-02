import type { SupportedLanguages } from '@interfaces';
export interface LocalizationProviderProps {
  children: React.ReactElement;
  resources?: SupportedLanguages;
}
