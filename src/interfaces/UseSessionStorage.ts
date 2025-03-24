import type { Locale } from './Locale';

export interface SessionStorageInput {
  key: string;
  defaultValue: Locale;
}

export type SessionStorageOutput = [Locale, (newValue: Locale) => void];
