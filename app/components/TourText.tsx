"use client";

import { useEffect, useState } from "react";
import { germanTourCopy, germanTourValue } from "@/lib/germanTourCopy";

export default function TourText({ slug, value, field = "value", className }: { slug: string; value: string; field?: "name" | "description" | "value"; className?: string }) {
  const [isGerman, setIsGerman] = useState(false);
  useEffect(() => {
    const sync = () => {
      try { setIsGerman(window.localStorage.getItem("via-blue-language") === "de"); } catch { setIsGerman(false); }
    };
    sync();
    const handle = (event: Event) => {
      const next = (event as CustomEvent<"en" | "de">).detail;
      if (next === "en" || next === "de") setIsGerman(next === "de");
    };
    window.addEventListener("via-blue-language-change", handle);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("via-blue-language-change", handle); window.removeEventListener("storage", sync); };
  }, []);
  if (!isGerman) return <span className={className}>{value}</span>;
  const translated = field === "name" || field === "description" ? germanTourCopy(slug, field, value) : germanTourValue(value);
  return <span className={className}>{translated}</span>;
}
