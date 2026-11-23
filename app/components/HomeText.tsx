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
  const { locale: language } = useSiteLocale();
  const translated = (value: string, translate: (source: string) => string) => {
    const exact = translate(value);
    if (exact !== value) return exact;
    return translate(value.endsWith(".") ? value : `${value}.`);
  };

  return <span className={className}>{language === "de" ? (de ?? translated(en, germanHomeText)) : language === "fr" ? (fr ?? translated(en, frenchHomeText)) : language === "ro" ? (ro ?? translated(en, romanianHomeText)) : language === "ru" ? (ru ?? translated(en, russianHomeText)) : en}</span>;
}
