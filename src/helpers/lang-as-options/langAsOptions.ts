import type { LangOptions } from '@interfaces';
import * as supportedLanguages from '@locales';

import { availableLocales } from '../available-locales';

const langAsOptions = availableLocales.reduce((acc, current) => {
  const { name: label } = supportedLanguages[current].settings;

  acc.push({ label, value: current });

  return acc;
}, [] as LangOptions[]);

export default langAsOptions;
