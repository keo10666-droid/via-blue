"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ReviewFormProps = {
  tourSlug: string;
  tourName: string;
};

export default function ReviewForm({
  tourSlug,
  tourName,
}: ReviewFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !comment.trim()) {
      setMessage("Please enter your name and review");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourSlug,
          tourName,
          guestName: name.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setName("");
      setRating(5);
      setComment("");
      setMessage("Thank you! Your review has been published");

      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong, please try again"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative mt-12 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(7,26,54,0.08)] md:p-8">
      {/* Premium Background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-blue-900/10 blur-3xl" />

      <div className="relative">
        <div className="mb-7">
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
              Share Your Experience
            </p>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-blue-950 md:text-4xl">
            Leave a Review
          </h2>

          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Tell other guests about your experience with {tourName}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="review-name"
              className="mb-2 block text-sm font-extrabold text-blue-950"
            >
              Your Name
            </label>

            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              maxLength={80}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-slate-900 shadow-sm outline-none transition duration-300 placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="mb-3 block text-sm font-extrabold text-blue-950">
              Your Rating
            </label>

            <div className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 shadow-sm">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  className={`text-4xl leading-none transition duration-200 hover:scale-110 ${
                    star <= rating
                      ? "text-orange-400 drop-shadow-sm"
                      : "text-slate-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label
              htmlFor="review-comment"
              className="mb-2 block text-sm font-extrabold text-blue-950"
            >
              Your Review
            </label>

            <textarea
              id="review-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Tell us about your experience..."
              maxLength={1000}
              rows={5}
              required
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-slate-900 shadow-sm outline-none transition duration-300 placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group relative overflow-hidden rounded-2xl bg-blue-950 px-8 py-4 font-extrabold text-white shadow-[0_12px_30px_rgba(7,26,54,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-[0_16px_35px_rgba(7,26,54,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="absolute inset-y-0 right-0 w-20 translate-x-8 bg-orange-500/20 blur-2xl transition duration-500 group-hover:translate-x-0" />

            <span className="relative">
              {loading ? "Publishing..." : "Submit Review"}
            </span>
          </button>

          {/* Message */}
          {message && (
            <div
              className={`rounded-2xl border px-4 py-3 font-semibold ${
                message.includes("Thank you")
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}