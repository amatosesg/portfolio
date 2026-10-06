import es from "./es";
import en from "./en";

export const translations = {
  es,
  en,
};

export type Locale = keyof typeof translations;

export const locales = Object.keys(translations) as Locale[];

export const defaultLocale: Locale = "es";

export function isValidLocale(locale: string | undefined): locale is Locale {
  return !!locale && locales.includes(locale as Locale);
}