"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Review = {
  id: string;
  guest_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

type ReviewsListProps = {
  tourSlug: string;
};

export default function ReviewsList({
  tourSlug,
}: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        setReviews([]);
      } else {
        setReviews(data || []);
      }

      setLoading(false);
    }

    loadReviews();
  }, [tourSlug]);

  // Automatic slider
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
      <div className="mt-12 rounded-3xl bg-slate-50 p-8">
        <p className="font-semibold text-gray-500">
          Loading reviews...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      {/* HEADER */}
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
          Guest Reviews
        </p>

        <h2 className="mt-2 text-3xl font-bold text-blue-900">
          What Our Guests Say
        </h2>
      </div>

      {/* EMPTY STATE */}
      {reviews.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 p-8 text-center">
          <p className="font-semibold text-gray-500">
            No reviews yet. Be the first to review this tour!
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* REVIEW CARD */}
          <div className="overflow-hidden rounded-2xl">
            <div className="rounded-2xl border border-gray-100 bg-white px-16 py-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold text-blue-900">
                    {reviews[currentIndex].guest_name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {new Date(
                      reviews[currentIndex].created_at
                    ).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <div className="text-lg">
                  {"★".repeat(reviews[currentIndex].rating)}

                  <span className="text-gray-300">
                    {"★".repeat(
                      5 - reviews[currentIndex].rating
                    )}
                  </span>
                </div>
              </div>

              <p className="mt-4 leading-7 text-gray-600">
                {reviews[currentIndex].comment}
              </p>
            </div>
          </div>

          {/* ARROWS */}
          {reviews.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous review"
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl font-bold text-blue-900 shadow-lg transition hover:bg-blue-900 hover:text-white"
              >
                ←
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next review"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl font-bold text-blue-900 shadow-lg transition hover:bg-blue-900 hover:text-white"
              >
                →
              </button>
            </>
          )}

          {/* DOTS */}
          {reviews.length > 1 && (
            <div className="mt-5 flex justify-center gap-2">
              {reviews.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to review ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-7 bg-orange-500"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
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