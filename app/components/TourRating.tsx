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

  return (
    <div className="mt-2 inline-flex items-center gap-2 text-sm" aria-label={`${summary.average.toFixed(1)} out of 5 stars from ${summary.count} reviews`}>
      <span className="tracking-wide text-amber-400" aria-hidden="true">{"★".repeat(Math.round(summary.average))}{"☆".repeat(5 - Math.round(summary.average))}</span>
      <span className="font-extrabold text-blue-950">{summary.average.toFixed(1)}</span>
      <span className="text-xs font-medium text-slate-500">({summary.count} {summary.count === 1 ? "review" : "reviews"})</span>
    </div>
  );
}
