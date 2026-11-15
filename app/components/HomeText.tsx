"use client";

import { useEffect, useState } from "react";
import { frenchHomeText } from "@/lib/frenchHomeCopy";

type HomeTextProps = {
  en: string;
  de: string;
  fr?: string;
  className?: string;
};

export default function HomeText({ en, de, fr, className }: HomeTextProps) {
  const [language, setLanguage] = useState<"en" | "de" | "fr">("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("via-blue-language");
      if (saved === "en" || saved === "de" || saved === "fr") setLanguage(saved);
    } catch {
      // Keep English as the safe fallback.
    }

    const handleLanguageChange = (event: Event) => {
      const next = (event as CustomEvent<"en" | "de" | "fr">).detail;
      if (next === "en" || next === "de" || next === "fr") setLanguage(next);
    };

    window.addEventListener("via-blue-language-change", handleLanguageChange);
    return () => window.removeEventListener("via-blue-language-change", handleLanguageChange);
  }, []);

  return <span className={className}>{language === "de" ? de : language === "fr" ? (fr ?? frenchHomeText(en)) : en}</span>;
}
