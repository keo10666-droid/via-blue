"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getSampleReviews } from "@/data/sampleReviews";

type Review = {
  id: string;
  guest_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

type ReviewsListProps = {
  tourSlug: string;
  tourName?: string;
};

export default function ReviewsList({
  tourSlug,
  tourName = tourSlug,
}: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSample, setIsSample] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      const { data, error } = await supabase
        .from("reviews")
        .select(
          "id, guest_name, rating, comment, created_at"
        )
        .eq("tour_slug", tourSlug)
        .eq("is_visible", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("REVIEWS LOAD ERROR:", error);

        const sampleReviews = getSampleReviews(tourSlug, tourName);
        setReviews(sampleReviews);
        setIsSample(true);
      } else if (data && data.length > 0) {
        setReviews(data);
        setIsSample(false);
      } else {
        const sampleReviews = getSampleReviews(tourSlug, tourName);
        setReviews(sampleReviews);
        setIsSample(true);
      }

      setLoading(false);
    }

    loadReviews();
  }, [tourSlug, tourName]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [tourSlug]);

  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  function goToPrevious() {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  }

  function goToNext() {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }

  if (loading) {
    return (
      <div className="relative mt-12 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-[0_20px_60px_rgba(7,26,54,0.08)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative">
          <div className="mb-4 h-4 w-32 animate-pulse rounded-full bg-slate-200" />
          <div className="h-8 w-64 animate-pulse rounded-xl bg-slate-200" />

          <div className="mt-6 h-24 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-12">
      {/* HEADER */}
      <div className="mb-7">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
              Guest Reviews
            </p>
          </div>

          {isSample && (
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
                Sample Reviews
              </p>
            </div>
          )}
        </div>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-blue-950 md:text-4xl">
          What Our Guests Say
        </h2>

        {isSample && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Temporary sample content shown until real customer reviews are available for this tour
          </p>
        )}
      </div>

      {/* EMPTY STATE */}
      {reviews.length === 0 ? (
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-10 text-center shadow-[0_20px_60px_rgba(7,26,54,0.07)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-orange-500 shadow-sm">
              ★
            </div>

            <p className="mt-5 font-semibold text-slate-500">
              No reviews yet. Be the first to review this tour!
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* REVIEW CARD */}
          <div className="overflow-hidden rounded-[28px]">
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white px-14 py-7 shadow-[0_20px_60px_rgba(7,26,54,0.08)] sm:px-16 md:px-20 md:py-8">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-blue-900/5 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-950 text-sm font-extrabold text-white shadow-md">
                        {reviews[
                          currentIndex
                        ].guest_name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-extrabold text-blue-950">
                          {reviews[currentIndex].guest_name}
                        </h3>

                        <p className="mt-0.5 text-sm text-slate-400">
                          {new Date(
                            reviews[currentIndex].created_at
                          ).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center rounded-full border border-orange-100 bg-orange-50 px-4 py-2 shadow-sm">
                    <div className="text-lg tracking-wide">
                      <span className="text-orange-400">
                        {"★".repeat(
                          reviews[currentIndex].rating
                        )}
                      </span>

                      <span className="text-slate-300">
                        {"★".repeat(
                          5 - reviews[currentIndex].rating
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl bg-slate-50/80 p-5">
                  <p className="text-lg leading-8 text-slate-600">
                    “{reviews[currentIndex].comment}”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ARROWS */}
          {reviews.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous review"
                className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-bold text-blue-950 shadow-[0_10px_30px_rgba(7,26,54,0.12)] transition duration-300 hover:-translate-x-0.5 hover:bg-blue-950 hover:text-white hover:shadow-[0_14px_35px_rgba(7,26,54,0.2)] sm:left-2"
              >
                ←
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next review"
                className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-bold text-blue-950 shadow-[0_10px_30px_rgba(7,26,54,0.12)] transition duration-300 hover:translate-x-0.5 hover:bg-blue-950 hover:text-white hover:shadow-[0_14px_35px_rgba(7,26,54,0.2)] sm:right-2"
              >
                →
              </button>
            </>
          )}

          {/* DOTS */}
          {reviews.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {reviews.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to review ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-orange-500 shadow-sm"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
