"use client";

import { useSiteLocale } from "./LocaleProvider";
import { germanTourCopy, germanTourValue } from "@/lib/germanTourCopy";
import { frenchTourCopy, frenchTourValue } from "@/lib/frenchTourCopy";
import { romanianTourCopy, romanianTourValue } from "@/lib/romanianTourCopy";
import { russianTourCopy, russianTourValue } from "@/lib/russianTourCopy";

export default function TourText({ slug, value, field = "value", className }: { slug: string; value: string; field?: "name" | "description" | "value"; className?: string }) {
  const { locale: language } = useSiteLocale();
  if (language === "en") return <span className={className}>{value}</span>;
  const translated = language === "de"
    ? (field === "name" || field === "description" ? germanTourCopy(slug, field, value) : germanTourValue(value))
    : language === "fr"
      ? (field === "name" || field === "description" ? frenchTourCopy(slug, field, value) : frenchTourValue(value))
      : language === "ro" ? (field === "name" || field === "description" ? romanianTourCopy(slug, field, value) : romanianTourValue(value)) : (field === "name" || field === "description" ? russianTourCopy(slug, field, value) : russianTourValue(value));
  return <span className={className}>{translated}</span>;
}
