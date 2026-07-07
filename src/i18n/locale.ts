import type { Locale } from "./routing";

const localeDirections: Record<Locale, "rtl" | "ltr"> = {
  he: "rtl",
  en: "ltr",
};

export function getLocaleDirection(locale: Locale): "rtl" | "ltr" {
  return localeDirections[locale];
}
