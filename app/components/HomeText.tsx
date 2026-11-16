"use client";

import { useEffect, useState } from "react";
import { frenchHomeText } from "@/lib/frenchHomeCopy";
import { romanianHomeText } from "@/lib/romanianHomeCopy";

type HomeTextProps = {
  en: string;
  de: string;
  fr?: string;
  ro?: string;
  className?: string;
};

export default function HomeText({ en, de, fr, ro, className }: HomeTextProps) {
  const [language, setLanguage] = useState<"en" | "de" | "fr" | "ro">("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("via-blue-language");
      if (saved === "en" || saved === "de" || saved === "fr" || saved === "ro") setLanguage(saved);
    } catch {
      // Keep English as the safe fallback.
    }

    const handleLanguageChange = (event: Event) => {
      const next = (event as CustomEvent<"en" | "de" | "fr" | "ro">).detail;
      if (next === "en" || next === "de" || next === "fr" || next === "ro") setLanguage(next);
    };

    window.addEventListener("via-blue-language-change", handleLanguageChange);
    return () => window.removeEventListener("via-blue-language-change", handleLanguageChange);
  }, []);

  return <span className={className}>{language === "de" ? de : language === "fr" ? (fr ?? frenchHomeText(en)) : language === "ro" ? (ro ?? romanianHomeText(en)) : en}</span>;
}
