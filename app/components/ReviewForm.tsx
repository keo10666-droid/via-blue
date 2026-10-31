"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomeText from "@/app/components/HomeText";

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
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isGerman, setIsGerman] = useState(false);

  useEffect(() => {
    const syncLanguage = () => setIsGerman(window.localStorage.getItem("via-blue-language") === "de");
    syncLanguage();
    window.addEventListener("via-blue-language-change", syncLanguage);
    return () => window.removeEventListener("via-blue-language-change", syncLanguage);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !comment.trim()) {
      setMessage("REVIEW_REQUIRED");
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
          comment: comment.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setName("");
      setComment("");
      setMessage("REVIEW_SUBMITTED");

      router.refresh();
    } catch (error) {
      setMessage("REVIEW_ERROR");
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
              <HomeText en="Share Your Experience" de="Teile deine Erfahrung" />
            </p>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-blue-950 md:text-4xl">
            <HomeText en="Leave a Review" de="Bewertung schreiben" />
          </h2>

          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            <HomeText en={`Tell other guests about your experience with ${tourName}`} de={`Teile deine Erfahrung mit ${tourName} mit anderen Gästen`} />
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="review-name"
              className="mb-2 block text-sm font-extrabold text-blue-950"
            >
              <HomeText en="Your Name" de="Dein Name" />
            </label>

            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={isGerman ? "Gib deinen Namen ein" : "Enter your name"}
              maxLength={80}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-slate-900 shadow-sm outline-none transition duration-300 placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          {/* Comment */}
          <div>
            <label
              htmlFor="review-comment"
              className="mb-2 block text-sm font-extrabold text-blue-950"
            >
              <HomeText en="Your Review" de="Deine Rezension" />
            </label>

            <textarea
              id="review-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder={isGerman ? "Beschreibe deine Erfahrung..." : "Describe your experience..."}
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
              {loading ? <HomeText en="Publishing..." de="Wird veröffentlicht..." /> : <HomeText en="Submit Review" de="Bewertung absenden" />}
            </span>
          </button>

          {/* Message */}
          {message && (
            <div
              className={`rounded-2xl border px-4 py-3 font-semibold ${
                message === "REVIEW_SUBMITTED"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {message === "REVIEW_SUBMITTED" ? (
                <HomeText en="Thank you! Your review has been submitted and is awaiting moderation" de="Vielen Dank! Deine Bewertung wurde übermittelt und wartet auf Freigabe" />
              ) : message === "REVIEW_REQUIRED" ? (
                <HomeText en="Please enter your name and review" de="Bitte gib deinen Namen und deine Bewertung ein" />
              ) : (
                <HomeText en="Something went wrong. Please try again." de="Es ist ein Fehler aufgetreten. Bitte versuche es erneut." />
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}