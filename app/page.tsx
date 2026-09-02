import Image from "next/image";
import Link from "next/link";

import { tourList } from "@/data/tours";
import { supabase } from "@/lib/supabase";

function StarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.32l-5.8 3.05 1.11-6.47-4.7-4.58 6.49-.94L12 2.5z" />
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

function ShieldIcon({ className = "h-6 w-6" }: { className?: string }) {
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
        d="M12 3l7 3v5c0 4.5-3 7.8-7 10-4-2.2-7-5.5-7-10V6l7-3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4"
      />
    </svg>
  );
}

function CompassIcon({ className = "h-6 w-6" }: { className?: string }) {
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
        d="M15.5 8.5l-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2z"
      />
    </svg>
  );
}

function HeadphonesIcon({ className = "h-6 w-6" }: { className?: string }) {
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
        d="M4 14v-2a8 8 0 0116 0v2"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 14a2 2 0 012-2h1v6H6a2 2 0 01-2-2v-2zM20 14a2 2 0 00-2-2h-1v6h1a2 2 0 002-2v-2z"
      />
    </svg>
  );
}

function BoatIcon({ className = "h-6 w-6" }: { className?: string }) {
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

export default async function Home() {
  /* =========================================================
     REVIEWS
  ========================================================= */

  const { data: reviews } = await supabase
    .from("reviews")
    .select(
      "id, tour_slug, tour_name, guest_name, rating, comment"
    )
    .eq("is_visible", true)
    .order("id", { ascending: false })
    .limit(6);

  /* =========================================================
     TOUR REVIEWS / LIVE RATINGS
  ========================================================= */

  const { data: tourReviews } = await supabase
    .from("reviews")
    .select("tour_slug, rating")
    .eq("is_visible", true);

  const tourStats: Record<
    string,
    {
      rating: number;
      reviews: number;
    }
  > = {};

  tourReviews?.forEach((review) => {
    if (!tourStats[review.tour_slug]) {
      tourStats[review.tour_slug] = {
        rating: 0,
        reviews: 0,
      };
    }

    tourStats[review.tour_slug].rating += Number(review.rating);
    tourStats[review.tour_slug].reviews += 1;
  });

  Object.keys(tourStats).forEach((slug) => {
    const stats = tourStats[slug];

    stats.rating = Number(
      (stats.rating / stats.reviews).toFixed(1)
    );
  });

  /* =========================================================
     FEATURED TOURS
  ========================================================= */

  const featuredTours = [
    tourList.find((tour) => tour.slug === "speed-boat"),
    tourList.find((tour) => tour.slug === "mahmya-island"),
  ].filter((tour) => tour !== undefined);

  return (
    <main id="top" className="min-h-screen bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[720px] overflow-hidden">

        <Image
          src="/images/via-blue-hero.webp"
          alt="Red Sea experience in Hurghada, Egypt"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Main cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/65 to-blue-950/10" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />

        {/* Subtle center glow */}
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-28">

          <div className="max-w-4xl text-white">

            {/* Eyebrow */}

            <div className="mb-7 flex items-center gap-3">

              <span className="h-px w-12 bg-orange-400" />

              <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400 sm:text-sm">
                Discover Hurghada
              </p>

            </div>

            {/* Heading */}

            <h1 className="text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">

              Your Holiday.

              <span className="block text-orange-400">
                Your Adventure.
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl">
              Discover the Red Sea with unforgettable boat trips,
              island escapes, desert adventures and reliable private
              transfers — all from Hurghada.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/tours"
                className="group flex items-center justify-center gap-3 rounded-xl bg-orange-500 px-8 py-4 text-center font-bold text-white shadow-xl shadow-orange-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Explore Our Tours

                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/transfers"
                className="flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-4 text-center font-bold text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-blue-950"
              >
                Book a Private Transfer
              </Link>

            </div>

            {/* Trust points */}

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/85">

              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-orange-400" />
                Local Experts
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-orange-400" />
                Easy Booking
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-orange-400" />
                Reliable Service
              </div>

            </div>

          </div>

        </div>

        {/* Hero bottom location */}

        <div className="absolute bottom-0 left-0 right-0 z-10">

          <div className="mx-auto max-w-7xl px-6 pb-7">

            <div className="flex items-center gap-3 text-sm font-medium text-white/75">

              <span className="h-2 w-2 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50" />

              Hurghada · Red Sea · Egypt

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TRUST BAR
      ===================================================== */}

      <section className="relative z-20 -mt-1 bg-blue-950 text-white">

        <div className="mx-auto grid max-w-7xl divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

          <div className="flex items-center gap-4 px-2 py-7 sm:px-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-orange-400">
              <CompassIcon />
            </div>

            <div>
              <p className="font-bold">
                Local Knowledge
              </p>

              <p className="mt-1 text-sm text-blue-200">
                Experiences built around Hurghada
              </p>
            </div>

          </div>


          <div className="flex items-center gap-4 px-2 py-7 sm:px-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-orange-400">
              <ShieldIcon />
            </div>

            <div>
              <p className="font-bold">
                Reliable Service
              </p>

              <p className="mt-1 text-sm text-blue-200">
                Clear booking & dependable support
              </p>
            </div>

          </div>


          <div className="flex items-center gap-4 px-2 py-7 sm:px-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-orange-400">
              <HeadphonesIcon />
            </div>

            <div>
              <p className="font-bold">
                Guest Support
              </p>

              <p className="mt-1 text-sm text-blue-200">
                We're here when you need us
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY VIA BLUE
      ===================================================== */}

      <section className="px-6 py-24 md:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-10 bg-orange-500" />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Why Via Blue
              </p>

              <span className="h-px w-10 bg-orange-500" />

            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
              More Than Just a Tour
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Your holiday should be easy, exciting and stress-free.
              That's exactly what we aim to deliver from the moment
              you contact us.
            </p>

          </div>


          <div className="mt-16 grid gap-6 md:grid-cols-3">

            {/* Feature 1 */}

            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-950 group-hover:text-white">
                <BoatIcon />
              </div>

              <h3 className="mt-7 text-xl font-bold text-blue-950">
                Carefully Selected Experiences
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                From beautiful islands and snorkeling spots to
                desert adventures, discover experiences worth
                remembering.
              </p>

            </div>


            {/* Feature 2 */}

            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                <CompassIcon />
              </div>

              <h3 className="mt-7 text-xl font-bold text-blue-950">
                Local Expertise
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                We know Hurghada and the Red Sea. Our local knowledge
                helps us create smoother and more enjoyable experiences.
              </p>

            </div>


            {/* Feature 3 */}

            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition group-hover:bg-green-600 group-hover:text-white">
                <ShieldIcon />
              </div>

              <h3 className="mt-7 text-xl font-bold text-blue-950">
                Simple & Reliable
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Clear information, straightforward booking and
                dependable communication before and during your trip.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          POPULAR EXPERIENCES
      ===================================================== */}

      <section className="bg-slate-50 px-6 py-24 md:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                  Explore
                </p>

              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
                Popular Experiences
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
                Start with some of our most exciting experiences
                in Hurghada and the Red Sea.
              </p>

            </div>

            <Link
              href="/tours"
              className="group flex items-center gap-2 font-bold text-blue-950 transition hover:text-orange-500"
            >
              View All Tours

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>


          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {featuredTours.map((tour) => {

              const stats = tourStats[tour.slug];

              const rating = stats
                ? stats.rating
                : tour.rating;

              const reviewCount = stats
                ? stats.reviews
                : tour.reviews;

              return (

                <article
                  key={tour.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >

                  <Link
                    href={`/tours/${tour.slug}`}
                    className="flex flex-1 flex-col"
                  >

                    {/* Image */}

                    <div className="relative h-64 overflow-hidden">

                      <Image
                        src={tour.image}
                        alt={tour.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent" />

                      {/* Badge */}

                      <div className="absolute left-5 top-5 rounded-full bg-orange-500 px-3.5 py-2 text-xs font-bold text-white shadow-lg">
                        {tour.badge}
                      </div>

                      {/* Price */}

                      <div className="absolute bottom-5 right-5 rounded-2xl border border-white/20 bg-blue-950/80 px-4 py-2.5 text-white backdrop-blur-md">

                        <span className="text-[10px] uppercase tracking-wider text-blue-200">
                          From
                        </span>

                        <div className="font-bold">
                          €{tour.price}
                          <span className="ml-1 text-xs font-normal text-blue-200">
                            / person
                          </span>
                        </div>

                      </div>

                    </div>


                    {/* Content */}

                    <div className="flex flex-1 flex-col p-6">

                      <div className="flex items-start justify-between gap-4">

                        <h3 className="text-xl font-bold leading-7 text-blue-950 transition group-hover:text-orange-500">
                          {tour.name}
                        </h3>

                      </div>


                      {/* Rating */}

                      <div className="mt-3 flex items-center gap-2">

                        <div className="flex items-center gap-0.5">

                          {Array.from({ length: 5 }).map((_, index) => (

                            <StarIcon
                              key={index}
                              className={`h-4 w-4 ${
                                index < Math.round(rating)
                                  ? "text-yellow-400"
                                  : "text-gray-200"
                              }`}
                            />

                          ))}

                        </div>

                        <span className="font-bold text-gray-900">
                          {rating}
                        </span>

                        <span className="text-xs text-gray-500">
                          ({reviewCount}{" "}
                          {reviewCount === 1 ? "review" : "reviews"})
                        </span>

                      </div>


                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-600">
                        {tour.description}
                      </p>


                      <div className="mt-auto flex items-center justify-between pt-7">

                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                          {tour.type}
                        </span>

                        <span className="flex items-center gap-1 text-sm font-bold text-blue-950 transition group-hover:text-orange-500">
                          Explore
                          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>

                      </div>

                    </div>

                  </Link>


                  {/* Buttons */}

                  <div className="grid grid-cols-2 gap-3 px-6 pb-6">

                    <Link
                      href={`/tours/${tour.slug}`}
                      className="rounded-xl border-2 border-blue-950 py-3 text-center text-sm font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
                    >
                      View Tour
                    </Link>

                    {tour.available ? (
                      <Link
                        href={`/tours/${tour.slug}/book`}
                        className="rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-orange-600"
                      >
                        Book Now
                      </Link>
                    ) : (
                      <div className="rounded-xl bg-gray-100 py-3 text-center text-sm font-bold text-gray-400">
                        Coming Soon
                      </div>
                    )}

                  </div>

                </article>

              );
            })}


            {/* =================================================
                TRANSFERS CARD
            ================================================= */}

            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">

              <Link
                href="/transfers"
                className="flex flex-1 flex-col"
              >

                <div className="relative h-64 overflow-hidden">

                  <Image
                    src="/transfers/transfers-hero.webp"
                    alt="Private airport transfers in Hurghada"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/75 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-orange-500 px-3.5 py-2 text-xs font-bold text-white shadow-lg">
                    PRIVATE TRANSFER
                  </div>

                  <div className="absolute bottom-5 right-5 rounded-2xl border border-white/20 bg-blue-950/80 px-4 py-2.5 text-white backdrop-blur-md">

                    <span className="text-[10px] uppercase tracking-wider text-blue-200">
                      Service
                    </span>

                    <div className="font-bold">
                      Private & Comfortable
                    </div>

                  </div>

                </div>


                <div className="flex flex-1 flex-col p-6">

                  <h3 className="text-xl font-bold text-blue-950 transition group-hover:text-orange-500">
                    Airport & Hotel Transfers
                  </h3>

                  <div className="mt-3 flex items-center gap-2">

                    <div className="flex items-center gap-0.5">

                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon
                          key={index}
                          className="h-4 w-4 text-yellow-400"
                        />
                      ))}

                    </div>

                    <span className="font-bold text-gray-900">
                      4.9
                    </span>

                    <span className="text-xs text-gray-500">
                      Trusted service
                    </span>

                  </div>

                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    Travel comfortably between Hurghada Airport,
                    hotels and surrounding destinations with a
                    reliable private transfer.
                  </p>


                  <div className="mt-auto pt-7">

                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800">
                      <ShieldIcon className="h-4 w-4" />
                      Comfortable & Reliable
                    </span>

                  </div>

                </div>

              </Link>


              <div className="grid grid-cols-2 gap-3 px-6 pb-6">

                <Link
                  href="/transfers"
                  className="rounded-xl border-2 border-blue-950 py-3 text-center text-sm font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
                >
                  View Transfers
                </Link>

                <Link
                  href="/transfers"
                  className="rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-orange-600"
                >
                  Book Now
                </Link>

              </div>

            </article>

          </div>


          {/* Browse all */}

          <div className="mt-12 text-center">

            <Link
              href="/tours"
              className="group inline-flex items-center gap-3 rounded-xl border-2 border-blue-950 px-7 py-3.5 font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
            >
              Discover All Experiences

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE BANNER
      ===================================================== */}

      <section className="relative overflow-hidden bg-blue-950 px-6 py-24 text-white md:py-28">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-700/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">

          <div>

            <div className="flex items-center gap-3">

              <span className="h-px w-10 bg-orange-400" />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                The Red Sea Is Waiting
              </p>

            </div>

            <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Swim.
              <span className="text-orange-400"> Explore.</span>
              <br />
              Make Memories.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              From crystal-clear waters and beautiful islands to
              unforgettable desert landscapes, Hurghada has an
              experience waiting for you.
            </p>

            <Link
              href="/tours"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-orange-500 px-7 py-4 font-bold text-white shadow-lg transition hover:bg-orange-600"
            >
              Find Your Experience

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>


          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">

              <p className="text-4xl font-bold text-orange-400">
                50+
              </p>

              <p className="mt-2 text-sm font-medium text-blue-100">
                Experiences
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">

              <p className="text-4xl font-bold text-orange-400">
                5★
              </p>

              <p className="mt-2 text-sm font-medium text-blue-100">
                Guest Experience
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">

              <p className="text-4xl font-bold text-orange-400">
                24/7
              </p>

              <p className="mt-2 text-sm font-medium text-blue-100">
                Guest Support
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">

              <p className="text-4xl font-bold text-orange-400">
                100%
              </p>

              <p className="mt-2 text-sm font-medium text-blue-100">
                Holiday Focus
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GUEST REVIEWS
      ===================================================== */}

      {reviews && reviews.length > 0 && (

        <section className="px-6 py-24 md:py-32">

          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-3xl text-center">

              <div className="flex items-center justify-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                  Real Guest Experiences
                </p>

                <span className="h-px w-10 bg-orange-500" />

              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
                What Our Guests Say
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                Nothing says more about an experience than the people
                who have already enjoyed it.
              </p>

            </div>


            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {reviews.map((review) => (

                <article
                  key={review.id}
                  className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <h3 className="font-bold text-blue-950">
                        {review.guest_name}
                      </h3>

                      <p className="mt-1 text-xs font-semibold text-gray-500">
                        {review.tour_name}
                      </p>

                    </div>

                    <div className="flex items-center gap-0.5">

                      {Array.from({ length: 5 }).map((_, index) => (

                        <StarIcon
                          key={index}
                          className={`h-4 w-4 ${
                            index < Number(review.rating)
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />

                      ))}

                    </div>

                  </div>


                  <div className="mt-6 flex-1">

                    <p className="text-[34px] leading-none text-orange-400">
                      “
                    </p>

                    <p className="mt-1 leading-7 text-gray-600">
                      {review.comment}
                    </p>

                  </div>


                  <Link
                    href={`/tours/${review.tour_slug}`}
                    className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-950 transition group-hover:text-orange-500"
                  >
                    View Experience

                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                </article>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-50 px-6 py-24 md:py-32">

        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="flex items-center justify-center gap-3">

            <span className="h-px w-10 bg-orange-500" />

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              Your Hurghada Adventure Starts Here
            </p>

            <span className="h-px w-10 bg-orange-500" />

          </div>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-blue-950 sm:text-5xl md:text-6xl">

            Don't Just Visit Hurghada.

            <span className="block text-orange-500">
              Experience It.
            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Choose your next adventure, book with confidence and
            get ready for an unforgettable Red Sea experience.
          </p>


          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="#top"
              className="group flex items-center justify-center gap-3 rounded-xl bg-orange-500 px-8 py-4 font-bold text-white shadow-lg transition hover:bg-orange-600"
            >
              Explore Tours

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/transfers"
              className="flex items-center justify-center rounded-xl border-2 border-blue-950 px-8 py-4 font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
            >
              View Transfers
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}