import { storageKeys } from "../config/storage";
import { locales, defaultLocale, type Locale } from "./index";

export function getBrowserLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const baseLanguage = language.toLowerCase().split("-")[0];

    if (locales.includes(baseLanguage as Locale)) {
      return baseLanguage as Locale;
    }
  }

  return defaultLocale;
}

export function setLocale(locale: Locale): void {
    localStorage.setItem(storageKeys.locale, locale);
}