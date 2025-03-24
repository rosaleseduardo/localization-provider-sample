import { useState } from 'react';

import type { Locale, SessionStorageInput, SessionStorageOutput } from '@interfaces';

/**
 * Custom hook for managing state in session storage.
 *
 * @param key - The key to use for storing the value in session storage.
 * @param defaultValue - The default value to use if no value is found in
 * session storage.
 *
 * @returns A tuple containing:
 * - The stored value (of any type).
 * - A function to update the stored value.
 *
 * @remarks
 * This hook synchronizes state with session storage, allowing state persistence
 * across page reloads. If the value corresponding to the given key is not found
 * in session storage, it initializes the state with the provided
 * `defaultValue`.
 *
 * @example
 * ```ts
 * const [value, setValue] = useSessionStorage('myKey', 'defaultValue');
 * ```
 *
 * In this example, `value` will initially be `'defaultValue'` unless `'myKey'`
 * is already present in session storage.
 */
const useSessionStorage = ({ key, defaultValue }: SessionStorageInput): SessionStorageOutput => {
  const [storedValue, setStoredValue] = useState<Locale>(() => {
    try {
      const value = sessionStorage.getItem(key);

      if (value !== null) return JSON.parse(value);

      sessionStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (error) {
      console.log(`Error - SessionStorage: ${error}`);
      return defaultValue;
    }
  });

  const setValue = (newValue: Locale): void => {
    try {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log(`Error - SessionStorage: ${error}`);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
