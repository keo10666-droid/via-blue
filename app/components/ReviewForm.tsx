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
      setMessage("Please enter your name and review.");
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
        throw new Error(data.error || "Something went wrong.");
      }

      setName("");
      setRating(5);
      setComment("");
      setMessage("Thank you! Your review has been published.");

      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12 rounded-3xl bg-slate-50 p-6 md:p-8">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
          Share Your Experience
        </p>

        <h2 className="mt-2 text-3xl font-bold text-blue-900">
          Leave a Review
        </h2>

        <p className="mt-2 text-gray-600">
          Tell other guests about your experience with {tourName}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}

        <div>
          <label
            htmlFor="review-name"
            className="mb-2 block font-bold text-gray-700"
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
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Rating */}

        <div>
          <label className="mb-2 block font-bold text-gray-700">
            Your Rating
          </label>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                className={`text-4xl transition ${
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                } hover:scale-110`}
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
            className="mb-2 block font-bold text-gray-700"
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
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-7 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Publishing..." : "Submit Review"}
        </button>

        {/* Message */}

        {message && (
          <p
            className={`font-semibold ${
              message.includes("Thank you")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}