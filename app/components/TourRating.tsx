"use client";

import { useEffect, useState } from "react";

type RatingSummary = { average: number; count: number };
type SummaryResponse = { summaries?: Record<string, RatingSummary> };

let summariesRequest: Promise<Record<string, RatingSummary>> | null = null;

function loadSummaries() {
  if (!summariesRequest) {
    summariesRequest = fetch("/api/reviews/summary", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load review summaries");
        const payload = (await response.json()) as SummaryResponse;
        return payload.summaries ?? {};
      })
      .catch((error) => {
        summariesRequest = null;
        throw error;
      });
  }
  return summariesRequest;
}

export default function TourRating({ tourSlug }: { tourSlug: string }) {
  const [summary, setSummary] = useState<RatingSummary | null>(null);
  const [language, setLanguage] = useState<"en" | "de" | "fr">("en");

  useEffect(() => {
    const syncLanguage = (event?: Event) => {
      const requested = (event as CustomEvent<"en" | "de" | "fr"> | undefined)?.detail;
      if (requested === "en" || requested === "de" || requested === "fr") {
        setLanguage(requested);
        return;
      }
      try {
        const saved = window.localStorage.getItem("via-blue-language");
        setLanguage(saved === "de" || saved === "fr" ? saved : "en");
      } catch {
        setLanguage("en");
      }
    };
    syncLanguage();
    window.addEventListener("via-blue-language-change", syncLanguage);
    window.addEventListener("storage", syncLanguage);
    return () => {
      window.removeEventListener("via-blue-language-change", syncLanguage);
      window.removeEventListener("storage", syncLanguage);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadSummaries()
      .then((all) => {
        if (!cancelled) setSummary(all[tourSlug] ?? null);
      })
      .catch(() => {
        if (!cancelled) setSummary(null);
      });
    return () => { cancelled = true; };
  }, [tourSlug]);

  if (!summary || summary.count === 0) return null;

  const ariaLabel = language === "fr"
    ? `${summary.average.toFixed(1)} sur 5 étoiles parmi ${summary.count} avis`
    : language === "de"
      ? `${summary.average.toFixed(1)} von 5 Sternen aus ${summary.count} Bewertungen`
      : `${summary.average.toFixed(1)} out of 5 stars from ${summary.count} reviews`;
  const reviewLabel = language === "fr"
    ? "avis"
    : language === "de"
      ? "Bewertungen"
      : summary.count === 1 ? "review" : "reviews";

  return (
    <div className="mt-2 inline-flex items-center gap-2 text-sm" aria-label={ariaLabel}>
      <span className="tracking-wide text-amber-400" aria-hidden="true">{"★".repeat(Math.round(summary.average))}{"☆".repeat(5 - Math.round(summary.average))}</span>
      <span className="font-extrabold text-blue-950">{summary.average.toFixed(1)}</span>
      <span className="text-xs font-medium text-slate-500">({summary.count} {reviewLabel})</span>
    </div>
  );
}
