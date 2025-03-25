import type { Locale } from '@interfaces';
/**
 * Formats a phone number based on locale, adding country codes and parentheses where appropriate.
 *
 * @param phoneNumber - The raw phone number.
 * @param locale - The locale (e.g., "es_CO", "en_US", "fr_FR").
 */
const formatPhoneNumber = (phoneNumber: string, locale: Locale = 'en_US'): string => {
  let formattedNumber = '';

  switch (locale) {
    case 'en_US': // USA format: +1 (XXX) XXX-XXXX
      formattedNumber = `+1 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
      break;
    case 'es_CO': // Colombia format: +57 XXX XXX XXXX
      formattedNumber = `+57 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
      break;
    case 'fr_FR': // France format: +33 X XX XX XX XX
      formattedNumber =
        `+33 ${phoneNumber.slice(1, 2)} ${phoneNumber.slice(2, 4)} ${phoneNumber.slice(4, 6)}` +
        ` ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8)}`;
      break;
    default: // Default: International Format +CountryCode XXXXXXXX
      formattedNumber = `+${phoneNumber}`;
      break;
  }

  return formattedNumber;
};

export default formatPhoneNumber;
