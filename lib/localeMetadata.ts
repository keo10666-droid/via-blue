import { headers } from "next/headers";

const BASE_URL = "https://viabluetours.com";
const LOCALES = ["de", "fr", "ro", "ru"] as const;

export async function getLocalizedAlternates(pathname: string) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-via-blue-locale");
  const locale = LOCALES.includes(requestedLocale as (typeof LOCALES)[number]) ? requestedLocale as (typeof LOCALES)[number] : "en";
  const suffix = pathname === "/" ? "" : pathname;
  const canonicalPath = locale === "en" ? suffix || "/" : `/${locale}${suffix}`;
  const localizedUrl = (code: string) => code === "en" ? `${BASE_URL}${suffix}` : `${BASE_URL}/${code}${suffix}`;

  return {
    canonical: `${BASE_URL}${canonicalPath}`,
    languages: {
      en: localizedUrl("en"),
      de: localizedUrl("de"),
      fr: localizedUrl("fr"),
      ro: localizedUrl("ro"),
      ru: localizedUrl("ru"),
      "x-default": localizedUrl("en"),
    },
  };
}
