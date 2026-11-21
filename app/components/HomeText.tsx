"use client";

import { useSiteLocale } from "./LocaleProvider";
import { frenchHomeText } from "@/lib/frenchHomeCopy";
import { romanianHomeText } from "@/lib/romanianHomeCopy";
import { germanHomeText } from "@/lib/germanHomeCopy";
import { russianHomeText } from "@/lib/russianHomeCopy";

type HomeTextProps = {
  en: string;
  de?: string;
  fr?: string;
  ro?: string;
  ru?: string;
  className?: string;
};

export default function HomeText({ en, de, fr, ro, ru, className }: HomeTextProps) {
  const [language, setLanguage] = useState<"en" | "de" | "fr" | "ro" | "ru">("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("via-blue-language");
      if (saved === "en" || saved === "de" || saved === "fr" || saved === "ro" || saved === "ru") setLanguage(saved);
    } catch {
      // Keep English as the safe fallback.
    }

    const handleLanguageChange = (event: Event) => {
      const next = (event as CustomEvent<"en" | "de" | "fr" | "ro" | "ru">).detail;
      if (next === "en" || next === "de" || next === "fr" || next === "ro" || next === "ru") setLanguage(next);
    };

    window.addEventListener("via-blue-language-change", handleLanguageChange);
    return () => window.removeEventListener("via-blue-language-change", handleLanguageChange);
  }, []);

  return <span className={className}>{language === "de" ? (de ?? germanHomeText(en)) : language === "fr" ? (fr ?? frenchHomeText(en)) : language === "ro" ? (ro ?? romanianHomeText(en)) : language === "ru" ? (ru ?? russianHomeText(en)) : en}</span>;
}
