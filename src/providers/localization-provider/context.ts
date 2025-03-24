import { createContext, useContext } from 'react';

import type { i18nextContext } from '@interfaces';

export const LocalizationProviderContext = createContext<i18nextContext>({} as never);

export const useLocalizationContext = () => useContext(LocalizationProviderContext);
