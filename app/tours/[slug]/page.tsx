import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { tours } from "@/data/tours";
import { supabase } from "@/lib/supabase";

import TourGallery from "@/app/components/TourGallery";
import ReviewForm from "@/app/components/ReviewForm";
import ReviewsList from "@/app/components/ReviewsList";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    fromCategory?: string;
  }>;
};

/* =========================================================
   ICONS
========================================================= */

function StarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.8l2.84 5.75 6.35.92-4.59 4.47 1.08 6.32L12 17.27l-5.68 2.99 1.08-6.32-4.59-4.47 6.35-.92L12 2.8z" />
    </svg>
  );
}

function UsersIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
      />
      <circle cx="9.5" cy="7" r="4" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 3.2a4 4 0 010 7.6M21 21v-2a4 4 0 00-3-3.87"
      />
    </svg>
  );
}

function TagIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.59 13.41L11 3.82V3H4v7h.82l9.59 9.59a2 2 0 002.83 0l3.35-3.35a2 2 0 000-2.83z"
      />
      <circle
        cx="7.5"
        cy="7.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function MapPinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 7v5l3 2"
      />
    </svg>
  );
}

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path
        strokeLinecap="round"
        d="M7 2.5v4M17 2.5v4M3 9h18"
      />
    </svg>
  );
}

function CarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 17h14M6 17v2M18 17v2M4 14l1.5-5A2 2 0 017.43 7h9.14a2 2 0 011.93 2L20 14v3H4v-3z"
      />
      <circle cx="7.5" cy="14.5" r="1" fill="currentColor" />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" />
    </svg>
  );
}

function BoatIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 15h16l-2 4H6l-2-4zM8 15V6h7l2 9M8 10h8"
      />
      <path
        strokeLinecap="round"
        d="M3 21c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1"
      />
    </svg>
  );
}

function IslandIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 19h18M5 19c1.5-3 3.5-5 7-5s5.5 2 7 5M12 14V6"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6c2 0 3.5 1 4.5 2.5M12 9c-1.5 0-2.5.7-3.5 1.7"
      />
    </svg>
  );
}

/* =========================================================
   NEW PROFESSIONAL TOUR ICONS
========================================================= */

/* Safari / Desert */
function SafariIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19h16"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 19c1.5-3.2 3.5-5 6-5s4.5 1.8 6 5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14V5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 5c2.2 0 4 1.1 5 3"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8c-1.8 0-3.2.7-4.2 2"
      />
    </svg>
  );
}

/* Quad Bike */
function QuadBikeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="6" cy="17" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.5 17h6l2-5h-5l-2.5 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 12l-2-4h3l2 4M14 12l2-3h2"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 12h4"
      />
    </svg>
  );
}

/* Snorkeling */
function SnorkelIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10c2.5-3 6.5-3 9 0"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10c0 4 1.5 6 4 6 2.2 0 3-1.5 3-3"
      />
      <circle cx="8" cy="9" r="3" />
      <path
        strokeLinecap="round"
        d="M5.5 9H10.5"
      />
      <path
        strokeLinecap="round"
        d="M3 18c2-1 3.5-1 5.5 0s3.5 1 5.5 0 3.5-1 5.5 0"
      />
    </svg>
  );
}

/* Diving */
function DivingIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="7" r="2.2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 9l4 3 4-1"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 12l-3 4-3-1"
      />
      <path
        strokeLinecap="round"
        d="M15 16l3 2"
      />
      <path
        strokeLinecap="round"
        d="M4 19c2-1 3.5-1 5.5 0s3.5 1 5.5 0 3.5-1 5.5 0"
      />
    </svg>
  );
}

/* Dolphin */
function DolphinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 15c3-1 5-3 6-6 1 2 2.5 3 5 3 2.5 0 4.5-1.5 5-4-2 1-3.5 1-5 .5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 9c-.5-2 .5-4 2.5-5 0 2.5 1.5 4 3.5 4"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 14l-2 3M16 13l2 3"
      />
      <path
        strokeLinecap="round"
        d="M3 19c2-1 3.5-1 5.5 0s3.5 1 5.5 0 3.5-1 5.5 0"
      />
    </svg>
  );
}

/* Food */
function FoodIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3v8M4 3v5a3 3 0 006 0V3M7 11v10M16 3v18M16 3c2 1.2 3 3.5 3 6v3h-3"
      />
    </svg>
  );
}

/* Jetski / Water Activity */
function JetskiIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16h16l-3 3H7l-3-3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 16l2-7h4l3 7"
      />
      <path
        strokeLinecap="round"
        d="M12 9l-1-3h3l2 3"
      />
      <path
        strokeLinecap="round"
        d="M3 21c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"
      />
    </svg>
  );
}

function SparklesIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2L12 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 15l.6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6L19 15z"
      />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12.5l4 4L19 7"
      />
    </svg>
  );
}

function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6l12 12M18 6L6 18"
      />
    </svg>
  );
}

function ArrowLeftIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 12H5M11 6l-6 6 6 6"
      />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 6l6 6-6 6"
      />
    </svg>
  );
}


/* =========================================================
   SMART HIGHLIGHT ICON
   Icons are selected from the actual highlight text,
   not from array position.
========================================================= */

function HighlightIcon({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const value = text.toLowerCase();

  /* Safari / Desert / Quad */
  if (
    value.includes("safari") ||
    value.includes("desert") ||
    value.includes("bedouin") ||
    value.includes("quad") ||
    value.includes("buggy") ||
    value.includes("camel") ||
    value.includes("jeep") ||
    value.includes("4x4")
  ) {
    if (
      value.includes("quad") ||
      value.includes("buggy")
    ) {
      return <QuadBikeIcon className={className} />;
    }

    return <SafariIcon className={className} />;
  }

  /* Dolphin */
  if (
    value.includes("dolphin") ||
    value.includes("dolphins")
  ) {
    return <DolphinIcon className={className} />;
  }

  /* Diving */
  if (
    value.includes("diving") ||
    value.includes("scuba") ||
    value.includes("dive")
  ) {
    return <DivingIcon className={className} />;
  }

  /* Snorkeling */
  if (
    value.includes("snorkel") ||
    value.includes("snorkeling")
  ) {
    return <SnorkelIcon className={className} />;
  }

  /* Food */
  if (
    value.includes("food") ||
    value.includes("lunch") ||
    value.includes("dinner") ||
    value.includes("meal") ||
    value.includes("buffet") ||
    value.includes("restaurant") ||
    value.includes("drink") ||
    value.includes("beverage")
  ) {
    return <FoodIcon className={className} />;
  }

  /* Boat */
  if (
    value.includes("boat") ||
    value.includes("yacht") ||
    value.includes("cruise") ||
    value.includes("sailing") ||
    value.includes("marine") ||
    value.includes("sea trip")
  ) {
    return <BoatIcon className={className} />;
  }

  /* Island */
  if (
    value.includes("island") ||
    value.includes("beach") ||
    value.includes("lagoon") ||
    value.includes("paradise") ||
    value.includes("mahmya") ||
    value.includes("orange bay")
  ) {
    return <IslandIcon className={className} />;
  }

  /* Water activities */
  if (
    value.includes("jetski") ||
    value.includes("jet ski") ||
    value.includes("parasailing") ||
    value.includes("banana") ||
    value.includes("water sport") ||
    value.includes("watersport") ||
    value.includes("speedboat")
  ) {
    return <JetskiIcon className={className} />;
  }

  /* Transfer / Transport */
  if (
    value.includes("transfer") ||
    value.includes("pickup") ||
    value.includes("transport") ||
    value.includes("vehicle")
  ) {
    return <CarIcon className={className} />;
  }

  /* Generic experience */
  return <SparklesIcon className={className} />;
}


/* =========================================================
   PAGE
========================================================= */

export default async function TourDetailsPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { fromCategory } = await searchParams;

  const tour = Object.values(tours).find(
    (item) => item.slug === slug
  );

  if (!tour) {
    notFound();
  }

  const backToTours = fromCategory
    ? `/tours?category=${encodeURIComponent(fromCategory)}`
    : "/tours";

  /* =========================================================
     LIVE REVIEWS
  ========================================================= */

  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("rating")
    .eq("tour_slug", tour.slug)
    .eq("is_visible", true);

  if (reviewsError) {
    console.error("TOUR REVIEWS ERROR:", reviewsError);
  }

  const reviewCount = reviews?.length ?? 0;

  const averageRating =
    reviewCount > 0
      ? (
          reviews!.reduce(
            (total, review) => total + Number(review.rating),
            0
          ) / reviewCount
        ).toFixed(1)
      : "0.0";

  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative h-[560px] overflow-hidden">

        <Image
          src={tour.image}
          alt={tour.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/55 to-blue-950/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/75 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">

          <div className="max-w-5xl">

            <div className="mb-5 flex items-center justify-center gap-3">

              <span className="h-px w-10 bg-orange-400" />

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">
                Hurghada Excursion
              </p>

              <span className="h-px w-10 bg-orange-400" />

            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              {tour.name}
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-blue-50 md:text-xl">
              {tour.description}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">

              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md">
                <StarIcon className="h-4 w-4 text-orange-400" />

                <span className="font-bold">
                  {averageRating}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md">
                <UsersIcon className="h-4 w-4 text-white" />

                <span className="font-bold">
                  {reviewCount}{" "}
                  {reviewCount === 1 ? "Review" : "Reviews"}
                </span>
              </div>

              <div className="rounded-full bg-orange-500 px-5 py-2.5 font-bold shadow-lg">
                {tour.type}
              </div>

            </div>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">

          <div className="mx-auto max-w-7xl px-6 pb-7">

            <div className="flex items-center gap-3 text-sm font-medium text-white/80">

              <span className="h-2 w-2 rounded-full bg-orange-400" />

              Hurghada · Red Sea · Egypt

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">

        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="min-w-0">

            {/* OVERVIEW */}

            <section>

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                  About The Experience
                </p>

              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
                Tour Overview
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                {tour.overview}
              </p>

            </section>


            {/* QUICK DETAILS */}

            <section className="mt-10">

              <div className="grid gap-4 sm:grid-cols-2">

                {/* Duration */}

                <div className="group rounded-2xl border border-gray-100 bg-slate-50 p-5 transition hover:border-blue-100 hover:bg-blue-50/50">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">

                      <ClockIcon className="h-5 w-5" />

                    </div>

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Duration
                      </p>

                      <p className="mt-1 font-bold text-blue-950">
                        {tour.duration}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Pickup */}

                <div className="group rounded-2xl border border-gray-100 bg-slate-50 p-5 transition hover:border-orange-100 hover:bg-orange-50/50">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">

                      <CarIcon className="h-5 w-5" />

                    </div>

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Pickup
                      </p>

                      <p className="mt-1 font-bold text-blue-950">
                        {tour.pickup}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Schedule */}

                <div className="group rounded-2xl border border-gray-100 bg-slate-50 p-5 transition hover:border-blue-100 hover:bg-blue-50/50 sm:col-span-2">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">

                      <CalendarIcon className="h-5 w-5" />

                    </div>

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Schedule
                      </p>

                      <p className="mt-1 font-bold text-blue-950">
                        {tour.schedule}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </section>


            {/* GALLERY */}

            {"gallery" in tour &&
              Array.isArray(tour.gallery) &&
              tour.gallery.length > 0 && (
                <div className="mt-14">

                  <TourGallery
                    images={tour.gallery}
                    tourName={tour.name}
                    heroImage={tour.image}
                  />

                </div>
              )}


            {/* TOUR PROGRAM */}

            <section className="mt-16">

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                  Your Day
                </p>

              </div>

              <h2 className="mt-4 text-3xl font-bold text-blue-950 md:text-4xl">
                Tour Program
              </h2>

              <div className="mt-7 space-y-4">

                {tour.program.map((item, index) => (

                  <div
                    key={`${item}-${index}`}
                    className="group flex gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-100 hover:shadow-md"
                  >

                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-md shadow-orange-200">

                      {String(index + 1).padStart(2, "0")}

                    </div>

                    <p className="pt-1 leading-7 text-gray-700">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </section>


            {/* INCLUDED */}

            <section className="mt-16">

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                  Included
                </p>

              </div>

              <h2 className="mt-4 text-3xl font-bold text-blue-950 md:text-4xl">
                What&apos;s Included
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">

                {tour.included.map((item, index) => (

                  <div
                    key={`${item}-${index}`}
                    className="flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50/70 p-4"
                  >

                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">

                      <CheckIcon className="h-4 w-4" />

                    </div>

                    <p className="text-sm font-semibold leading-6 text-gray-700">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </section>


            {/* NOT INCLUDED */}

            <section className="mt-16">

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                  Please Note
                </p>

              </div>

              <h2 className="mt-4 text-3xl font-bold text-blue-950 md:text-4xl">
                What&apos;s Not Included
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">

                {tour.excluded.map((item, index) => (

                  <div
                    key={`${item}-${index}`}
                    className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/60 p-4"
                  >

                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">

                      <XIcon className="h-4 w-4" />

                    </div>

                    <p className="text-sm font-semibold leading-6 text-gray-700">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </section>


            {/* HIGHLIGHTS */}

            <section className="mt-16">

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                  Highlights
                </p>

              </div>

              <h2 className="mt-4 text-3xl font-bold text-blue-950 md:text-4xl">
                Tour Highlights
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">

                {tour.highlights.map((item, index) => (

                  <div
                    key={`${item}-${index}`}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-100 hover:shadow-lg"
                  >

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-orange-50 group-hover:text-orange-600">

                      <HighlightIcon
                        text={item}
                        className="h-6 w-6"
                      />

                    </div>

                    <h3 className="font-bold leading-6 text-blue-950">
                      {item}
                    </h3>

                  </div>

                ))}

              </div>

            </section>


            {/* IMPORTANT NOTES */}

            <section className="mt-16">

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                  Before You Go
                </p>

              </div>

              <h2 className="mt-4 text-3xl font-bold text-blue-950 md:text-4xl">
                Important Notes
              </h2>

              <div className="mt-7 space-y-3">

                {tour.notes.map((note, index) => (

                  <div
                    key={`${note}-${index}`}
                    className="flex gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4"
                  >

                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />

                    <p className="text-sm leading-7 text-gray-700">
                      {note}
                    </p>

                  </div>

                ))}

              </div>

            </section>


            {/* REVIEWS */}

            <div className="mt-16 border-t border-gray-100 pt-16">

              <ReviewsList tourSlug={tour.slug} />

              <div className="mt-12">

                <ReviewForm
                  tourSlug={tour.slug}
                  tourName={tour.name}
                />

              </div>

            </div>

          </div>


          {/* =================================================
              BOOKING CARD
          ================================================= */}

          <aside>

            <div className="sticky top-24 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">

              {/* Price header */}

              <div className="bg-blue-950 p-7 text-white">

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">
                  Starting From
                </p>

                <div className="mt-2 flex items-baseline gap-2">

                  <span className="text-5xl font-bold text-orange-400">
                    {tour.price > 0
                      ? `€${tour.price}`
                      : "On Request"}
                  </span>

                  {tour.price > 0 && (
                    <span className="text-sm text-blue-200">
                      / person
                    </span>
                  )}

                </div>

                <p className="mt-3 text-sm text-blue-200">
                  Secure your place and enjoy a professionally organized
                  experience in Hurghada.
                </p>

              </div>


              {/* Card content */}

              <div className="p-7">

                <div className="space-y-1">

                  {/* Rating */}

                  <div className="flex items-center justify-between border-b border-gray-100 py-4">

                    <div className="flex items-center gap-3 text-gray-600">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">

                        <StarIcon className="h-4 w-4" />

                      </div>

                      <span className="text-sm font-medium">
                        Rating
                      </span>

                    </div>

                    <span className="font-bold text-blue-950">
                      {averageRating}
                    </span>

                  </div>


                  {/* Reviews */}

                  <div className="flex items-center justify-between border-b border-gray-100 py-4">

                    <div className="flex items-center gap-3 text-gray-600">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">

                        <UsersIcon className="h-4 w-4" />

                      </div>

                      <span className="text-sm font-medium">
                        Reviews
                      </span>

                    </div>

                    <span className="font-bold text-blue-950">
                      {reviewCount}
                    </span>

                  </div>


                  {/* Type */}

                  <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-4">

                    <div className="flex items-center gap-3 text-gray-600">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">

                        <TagIcon className="h-4 w-4" />

                      </div>

                      <span className="text-sm font-medium">
                        Type
                      </span>

                    </div>

                    <span className="max-w-[170px] text-right text-sm font-bold text-blue-950">
                      {tour.type}
                    </span>

                  </div>


                  {/* Destination */}

                  <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-4">

                    <div className="flex items-center gap-3 text-gray-600">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">

                        <MapPinIcon className="h-4 w-4" />

                      </div>

                      <span className="text-sm font-medium">
                        Destination
                      </span>

                    </div>

                    <span className="text-right text-sm font-bold capitalize text-blue-950">
                      {tour.destination}
                    </span>

                  </div>


                  {/* Duration */}

                  <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-4">

                    <div className="flex items-center gap-3 text-gray-600">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">

                        <ClockIcon className="h-4 w-4" />

                      </div>

                      <span className="text-sm font-medium">
                        Duration
                      </span>

                    </div>

                    <span className="max-w-[170px] text-right text-sm font-bold text-blue-950">
                      {tour.duration}
                    </span>

                  </div>


                  {/* Pickup */}

                  <div className="flex items-center justify-between gap-4 py-4">

                    <div className="flex items-center gap-3 text-gray-600">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">

                        <CarIcon className="h-4 w-4" />

                      </div>

                      <span className="text-sm font-medium">
                        Pickup
                      </span>

                    </div>

                    <span className="max-w-[170px] text-right text-sm font-bold text-blue-950">
                      {tour.pickup}
                    </span>

                  </div>

                </div>


                {/* Book button */}

                {tour.available ? (

                  <Link
                    href={`/tours/${tour.slug}/book${
                      fromCategory
                        ? `?fromCategory=${encodeURIComponent(
                            fromCategory
                          )}`
                        : ""
                    }`}
                    className="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 py-4 text-center text-lg font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:shadow-xl"
                  >

                    Book Now

                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />

                  </Link>

                ) : (

                  <div className="mt-6 w-full rounded-xl bg-gray-100 py-4 text-center text-lg font-bold text-gray-400">
                    Coming Soon
                  </div>

                )}


                {/* Back */}

                <Link
                  href={backToTours}
                  className="group mt-5 flex items-center justify-center gap-2 text-sm font-bold text-blue-900 transition hover:text-orange-500"
                >

                  <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

                  Back to Tours

                </Link>

              </div>

            </div>

          </aside>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-blue-950 px-6 py-20 text-white md:py-24">

        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-700/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="flex items-center justify-center gap-3">

            <span className="h-px w-10 bg-orange-400" />

            <p className="font-bold uppercase tracking-[0.3em] text-orange-400">
              Ready To Explore?
            </p>

            <span className="h-px w-10 bg-orange-400" />

          </div>

          <h2 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            Ready to Book Your
            <span className="block text-orange-400">
              Adventure?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Reserve your {tour.name} experience and enjoy an unforgettable
            day in Hurghada with Via Blue.
          </p>

          {tour.available ? (

            <Link
              href={`/tours/${tour.slug}/book${
                fromCategory
                  ? `?fromCategory=${encodeURIComponent(
                      fromCategory
                    )}`
                  : ""
              }`}
              className="group mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-orange-500 px-8 py-4 font-bold text-white shadow-lg transition hover:bg-orange-600"
            >

              Book {tour.name}

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />

            </Link>

          ) : (

            <div className="mt-8 inline-block rounded-xl bg-white/10 px-8 py-4 font-bold text-gray-300">
              Coming Soon
            </div>

          )}

        </div>

      </section>

    </main>
  );
}