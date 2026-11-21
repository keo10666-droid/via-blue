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

  return <span className={className}>{language === "de" ? (de ?? germanHomeText(en)) : language === "fr" ? (fr ?? frenchHomeText(en)) : language === "ro" ? (ro ?? romanianHomeText(en)) : language === "ru" ? (ru ?? russianHomeText(en)) : en}</span>;
}
