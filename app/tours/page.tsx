"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  tours,
  tourCategories,
  tourCategoryMap,
} from "@/data/tours";

/* =========================================================
   ICONS
========================================================= */

function StarIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function WavesIcon({ className = "h-5 w-5" }: { className?: string }) {
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
        d="M3 9c2.2 0 2.2-2 4.5-2S9.8 9 12 9s2.2-2 4.5-2S18.8 9 21 9"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 14c2.2 0 2.2-2 4.5-2s2.3 2 4.5 2 2.2-2 4.5-2 2.3 2 4.5 2"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 19c2.2 0 2.2-2 4.5-2s2.3 2 4.5 2 2.2-2 4.5-2 2.3 2 4.5 2"
      />
    </svg>
  );
}

function FishIcon({ className = "h-5 w-5" }: { className?: string }) {
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
        d="M4 12s3-5 9-5c3 0 5 2 7 5-2 3-4 5-7 5-6 0-9-5-9-5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12l-3-3v6l3-3z"
      />
      <circle
        cx="15.5"
        cy="10"
        r="0.8"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function DolphinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 15c3-1 4-3 4-6 2 2 4 2 6 1-1 3-3 5-6 6"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 10c1-3 3-4 5-3-1 1-1 2-1 3 2 0 3 1 4 2-3 2-6 2-8-2z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16c2 2 5 3 8 2"
      />
    </svg>
  );
}

function DesertIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="17" cy="7" r="3" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 19c3-4 6-5 9-3 2 1.3 4 1.2 6-.2 1.2-.8 2.2-.8 3 0"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16c1-2 2-4 4-5"
      />
    </svg>
  );
}

function LandmarkIcon({ className = "h-5 w-5" }: { className?: string }) {
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
        d="M3 10h18L12 4 3 10z"
      />
      <path
        strokeLinecap="round"
        d="M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"
      />
    </svg>
  );
}

function FamilyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 20v-1a6 6 0 0112 0v1"
      />
      <circle cx="17" cy="9" r="2.2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 14a4.5 4.5 0 016 4v2"
      />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function MapPinIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function SparklesIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14z"
      />
    </svg>
  );
}


/* =========================================================
   TOUR ICON
========================================================= */

function TourTypeIcon({
  tour,
  className = "h-5 w-5",
}: {
  tour: {
    name: string;
    type: string;
    slug: string;
  };
  className?: string;
}) {
  const text =
    `${tour.name} ${tour.type} ${tour.slug}`.toLowerCase();

  if (
    text.includes("safari") ||
    text.includes("desert") ||
    text.includes("quad") ||
    text.includes("bedouin") ||
    text.includes("buggy") ||
    text.includes("jeep")
  ) {
    return <DesertIcon className={className} />;
  }

  if (
    text.includes("dolphin") ||
    text.includes("dolphinarium")
  ) {
    return <DolphinIcon className={className} />;
  }

  if (
    text.includes("diving") ||
    text.includes("snorkel") ||
    text.includes("reef") ||
    text.includes("diver")
  ) {
    return <FishIcon className={className} />;
  }

  if (
    text.includes("island") ||
    text.includes("mahmya") ||
    text.includes("paradise") ||
    text.includes("orange bay") ||
    text.includes("hula")
  ) {
    return <IslandIcon className={className} />;
  }

  if (
    text.includes("boat") ||
    text.includes("cruise") ||
    text.includes("yacht") ||
    text.includes("sailing")
  ) {
    return <BoatIcon className={className} />;
  }

  if (
    text.includes("water") ||
    text.includes("parasailing") ||
    text.includes("banana") ||
    text.includes("sofa") ||
    text.includes("aqua") ||
    text.includes("sea")
  ) {
    return <WavesIcon className={className} />;
  }

  if (
    text.includes("cairo") ||
    text.includes("luxor") ||
    text.includes("museum") ||
    text.includes("egypt") ||
    text.includes("pyramid") ||
    text.includes("temple")
  ) {
    return <LandmarkIcon className={className} />;
  }

  if (
    text.includes("family") ||
    text.includes("aquarium") ||
    text.includes("kids") ||
    text.includes("children")
  ) {
    return <FamilyIcon className={className} />;
  }

  return <BoatIcon className={className} />;
}


/* =========================================================
   PAGE
========================================================= */

export default function ToursPage() {
  const categoryKeys = Object.keys(tourCategories) as Array<
    keyof typeof tourCategories
  >;

  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category");

  const validUrlCategory =
    urlCategory &&
    categoryKeys.includes(
      urlCategory as keyof typeof tourCategories
    )
      ? (urlCategory as keyof typeof tourCategories)
      : null;

  const [activeCategory, setActiveCategory] =
    useState<keyof typeof tourCategories>(
      validUrlCategory ?? "islands-boat-trips"
    );

  /* =========================================================
     SYNC CATEGORY WITH URL
  ========================================================= */

  useEffect(() => {
    const category = searchParams.get("category");

    if (
      category &&
      categoryKeys.includes(
        category as keyof typeof tourCategories
      )
    ) {
      setActiveCategory(
        category as keyof typeof tourCategories
      );
    } else {
      setActiveCategory("islands-boat-trips");
    }
  }, [searchParams]);


  /* =========================================================
     SCROLL TOP
  ========================================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);


  /* =========================================================
     CATEGORY CHANGE
  ========================================================= */

  const handleCategoryChange = (
    category: keyof typeof tourCategories
  ) => {
    setActiveCategory(category);

    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("category", category);

    window.history.pushState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================================================
     FILTER TOURS
  ========================================================= */

  const categoryTours = useMemo(() => {
    return Object.values(tours).filter(
      (tour) =>
        tourCategoryMap[
          tour.slug as keyof typeof tourCategoryMap
        ] === activeCategory
    );
  }, [activeCategory]);


  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-blue-950 px-6 py-14 text-white md:py-20">

        {/* Decorative background */}

        <div className="absolute -left-40 -top-40 h-[320px] w-[320px] rounded-full bg-blue-700/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 h-[380px] w-[380px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">

          <div className="mb-4 flex items-center justify-center gap-2.5">

            <span className="h-px w-8 bg-orange-400" />

            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-400 sm:text-xs">
              Via Blue Experiences
            </p>

            <span className="h-px w-8 bg-orange-400" />

          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Discover Hurghada.
            <span className="block text-orange-400">
              Experience the Red Sea.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-blue-100 sm:text-base md:text-lg">
            Explore hand-picked boat trips, island escapes,
            snorkeling adventures, water activities, desert
            experiences and unforgettable Egypt excursions.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <SparklesIcon className="h-3.5 w-3.5 text-orange-400" />
              Carefully Selected Experiences
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <StarIcon className="h-3.5 w-3.5 text-orange-400" />
              Great Guest Experiences
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CATEGORY NAVIGATION
      ===================================================== */}

      <section className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/95 px-3 py-2.5 shadow-sm backdrop-blur-xl">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-wrap items-center justify-center gap-1.5">

            {categoryKeys.map((category) => {

              const isActive =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(category)
                  }
                  className={`group flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "border-blue-950 bg-blue-950 text-white shadow-md shadow-blue-950/20"
                      : "border-gray-200 bg-white text-blue-950 hover:border-blue-200 hover:bg-blue-50"
                  }`}
                >

                  <TourTypeIcon
                    tour={{
                      name: tourCategories[category],
                      type: tourCategories[category],
                      slug: category,
                    }}
                    className={`h-3.5 w-3.5 ${
                      isActive
                        ? "text-orange-400"
                        : "text-blue-700"
                    }`}
                  />

                  {tourCategories[category]}

                </button>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          TOURS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-6 md:py-20">

        {/* CATEGORY HEADER */}

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <span className="h-px w-10 bg-orange-500" />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Explore Category
              </p>

            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
              {tourCategories[activeCategory]}
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Find the perfect experience for your Hurghada
              holiday and make your time in the Red Sea unforgettable.
            </p>

          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-blue-100 bg-white px-5 py-3 shadow-sm">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
              <BoatIcon className="h-4 w-4" />
            </div>

            <div>

              <p className="text-xs font-medium text-gray-400">
                Available
              </p>

              <p className="text-sm font-bold text-blue-950">
                {categoryTours.length}{" "}
                {categoryTours.length === 1
                  ? "Experience"
                  : "Experiences"}
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            TOURS GRID
        ===================================================== */}

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {categoryTours.map((tour, index) => (

            <article
              key={tour.slug}
              className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <Link
                href={`/tours/${tour.slug}?fromCategory=${activeCategory}`}
                className="block"
              >

                <div className="relative h-64 overflow-hidden sm:h-72">

                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Dark cinematic overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-black/10 to-transparent" />

                  {/* Top shine */}

                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent" />


                  {/* Badge */}

                  <div className="absolute left-5 top-5">

                    <span className="inline-flex rounded-full bg-orange-500 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg shadow-orange-950/20">
                      {tour.badge}
                    </span>

                  </div>


                  {/* Rating */}

                  {tour.rating > 0 && (

                    <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-lg backdrop-blur-md">

                      <StarIcon className="h-3.5 w-3.5 text-orange-500" />

                      {tour.rating}

                    </div>

                  )}


                  {/* Bottom information */}

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">

                    <div className="flex min-w-0 items-center gap-3 text-white">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-md">

                        <TourTypeIcon
                          tour={tour}
                          className="h-5 w-5"
                        />

                      </div>

                      <span className="truncate text-xs font-bold uppercase tracking-[0.12em] text-white/90">
                        {tour.type}
                      </span>

                    </div>

                    <div className="shrink-0 rounded-xl border border-white/20 bg-blue-950/75 px-3 py-2 text-white backdrop-blur-md">

                      <p className="text-[9px] font-semibold uppercase tracking-wider text-blue-200">
                        From
                      </p>

                      <p className="text-base font-bold">
                        {tour.price > 0
                          ? `€${tour.price}`
                          : "On Request"}
                      </p>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="flex flex-1 flex-col p-6">

                  <h3 className="line-clamp-2 min-h-[56px] text-xl font-bold leading-7 text-blue-950 transition-colors duration-300 group-hover:text-orange-500">
                    {tour.name}
                  </h3>


                  {/* Rating */}

                  <div className="mt-3 flex items-center gap-2">

                    {tour.rating > 0 ? (

                      <>
                        <div className="flex items-center gap-1">

                          <StarIcon className="h-4 w-4 text-orange-500" />

                          <span className="text-sm font-bold text-gray-900">
                            {tour.rating}
                          </span>

                        </div>

                        <span className="text-xs text-gray-300">
                          •
                        </span>

                        <span className="text-sm text-gray-500">
                          {tour.reviews}{" "}
                          {tour.reviews === 1
                            ? "review"
                            : "reviews"}
                        </span>
                      </>

                    ) : (

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        New Experience
                      </span>

                    )}

                  </div>


                  {/* Description */}

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-600">
                    {tour.description}
                  </p>


                  {/* Details */}

                  <div className="mt-6 grid grid-cols-2 gap-2">

                    <div className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">

                        <ClockIcon className="h-4 w-4" />

                      </div>

                      <div className="min-w-0">

                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          Duration
                        </p>

                        <p className="truncate text-xs font-bold text-gray-700">
                          {tour.duration}
                        </p>

                      </div>

                    </div>


                    <div className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">

                        <MapPinIcon className="h-4 w-4" />

                      </div>

                      <div className="min-w-0">

                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          Destination
                        </p>

                        <p className="truncate text-xs font-bold text-gray-700">
                          {tour.destination}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* Price */}

                  <div className="mt-6 border-t border-gray-100 pt-5">

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <p className="text-xs font-medium text-gray-400">
                          Starting from
                        </p>

                        <div className="mt-0.5 flex items-baseline gap-1">

                          <span className="text-2xl font-extrabold text-orange-500">
                            {tour.price > 0
                              ? `€${tour.price}`
                              : "On Request"}
                          </span>

                          {tour.price > 0 && (

                            <span className="text-xs text-gray-400">
                              / person
                            </span>

                          )}

                        </div>

                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-950 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg">

                        <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

                      </div>

                    </div>

                  </div>

                </div>

              </Link>


              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="grid grid-cols-2 gap-3 px-6 pb-6">

                <Link
                  href={`/tours/${tour.slug}?fromCategory=${activeCategory}`}
                  className="rounded-xl border-2 border-blue-950 px-3 py-3 text-center text-sm font-bold text-blue-950 transition-all duration-300 hover:bg-blue-950 hover:text-white"
                >
                  View Tour
                </Link>

                {tour.available ? (

                  <Link
                    href={`/tours/${tour.slug}/book?fromCategory=${activeCategory}`}
                    className="rounded-xl bg-orange-500 px-3 py-3 text-center text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:shadow-lg"
                  >
                    Book Now
                  </Link>

                ) : (

                  <div className="rounded-xl bg-gray-100 px-3 py-3 text-center text-sm font-bold text-gray-400">
                    Coming Soon
                  </div>

                )}

              </div>

            </article>

          ))}

        </div>


        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {categoryTours.length === 0 && (

          <div className="rounded-[28px] border border-gray-100 bg-white px-6 py-24 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-900">

              <BoatIcon className="h-8 w-8" />

            </div>

            <h3 className="mt-7 text-2xl font-bold text-blue-950">
              No experiences available
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
              New experiences are being added soon.
              Explore another category to discover more of Hurghada.
            </p>

          </div>

        )}


        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <div className="mt-16 overflow-hidden rounded-[32px] bg-blue-950 px-7 py-10 text-white shadow-xl md:px-12 md:py-12">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div className="max-w-2xl">

              <div className="flex items-center gap-3">

                <span className="h-px w-8 bg-orange-400" />

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                  Can't Decide?
                </p>

              </div>

              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                Find the perfect experience for your holiday.
              </h3>

              <p className="mt-3 text-sm leading-7 text-blue-200 sm:text-base">
                Browse all our experiences and choose what fits
                your time, budget and holiday plans.
              </p>

            </div>

            <Link
              href="/tours"
              className="group flex shrink-0 items-center justify-center gap-3 rounded-xl bg-orange-500 px-7 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-xl"
            >
              Explore All Tours

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}