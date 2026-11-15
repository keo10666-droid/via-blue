"use client";

import { useEffect, useState } from "react";
import { germanTourCopy, germanTourValue } from "@/lib/germanTourCopy";
import { frenchTourCopy, frenchTourValue } from "@/lib/frenchTourCopy";

export default function TourText({ slug, value, field = "value", className }: { slug: string; value: string; field?: "name" | "description" | "value"; className?: string }) {
  const [language, setLanguage] = useState<"en" | "de" | "fr">("en");
  useEffect(() => {
    const sync = () => {
      try {
        const saved = window.localStorage.getItem("via-blue-language");
        setLanguage(saved === "de" || saved === "fr" ? saved : "en");
      } catch { setLanguage("en"); }
    };
    sync();
    const handle = (event: Event) => {
      const next = (event as CustomEvent<"en" | "de" | "fr">).detail;
      if (next === "en" || next === "de" || next === "fr") setLanguage(next);
    };
    window.addEventListener("via-blue-language-change", handle);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("via-blue-language-change", handle); window.removeEventListener("storage", sync); };
  }, []);
  if (language === "en") return <span className={className}>{value}</span>;
  const translated = language === "de"
    ? (field === "name" || field === "description" ? germanTourCopy(slug, field, value) : germanTourValue(value))
    : (field === "name" || field === "description" ? frenchTourCopy(slug, field, value) : frenchTourValue(value));
  return <span className={className}>{translated}</span>;
}
