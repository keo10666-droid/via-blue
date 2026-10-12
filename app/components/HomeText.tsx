"use client";

import { useEffect, useState } from "react";

type HomeTextProps = {
  en: string;
  de: string;
  className?: string;
};

export default function HomeText({ en, de, className }: HomeTextProps) {
  const [language, setLanguage] = useState<"en" | "de">("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("via-blue-language");
      if (saved === "en" || saved === "de") setLanguage(saved);
    } catch {
      // Keep English as the safe fallback.
    }

    const handleLanguageChange = (event: Event) => {
      const next = (event as CustomEvent<"en" | "de">).detail;
      if (next === "en" || next === "de") setLanguage(next);
    };

    window.addEventListener("via-blue-language-change", handleLanguageChange);
    return () => window.removeEventListener("via-blue-language-change", handleLanguageChange);
  }, []);

  return <span className={className}>{language === "de" ? de : en}</span>;
}
