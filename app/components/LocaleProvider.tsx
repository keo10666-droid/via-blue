"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type SiteLocale = "en" | "de" | "fr" | "ro" | "ru";
type LocaleContextValue = { locale: SiteLocale; setLocale: (locale: SiteLocale) => void };
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ initialLocale, children }: { initialLocale: SiteLocale; children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SiteLocale>(initialLocale);
  const value = useMemo(() => ({
    locale,
    setLocale(next: SiteLocale) {
      setLocaleState(next);
      try { window.localStorage.setItem("via-blue-language", next); } catch {}
      window.dispatchEvent(new CustomEvent("via-blue-language-change", { detail: next }));
    },
  }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useSiteLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useSiteLocale must be used inside LocaleProvider");
  return value;
}
