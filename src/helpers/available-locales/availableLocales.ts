import type { Locale } from '@interfaces';
import * as supportedLocales from '@locales';

const availableLocales = Object.keys(supportedLocales) as Locale[];

export default availableLocales;
