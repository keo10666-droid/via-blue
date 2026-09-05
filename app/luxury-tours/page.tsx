"use client";

import Image from "next/image";
import Link from "next/link";

const luxuryTours = [
  {
    slug: "luxor",
    name: "Luxor Private Tour",
    description:
      "Discover the ancient temples, monuments and history of Luxor on a premium private experience.",
    price: 150,
    duration: "Full Day",
    image: "/luxury-tours/luxor-private-hero.webp",
    rating: 4.9,
    reviews: 128,
  },
  {
    slug: "cairo",
    name: "Cairo Private Tour",
    description:
      "Explore the Pyramids, Sphinx and the highlights of Cairo with a completely private experience.",
    price: 180,
    duration: "Full Day",
    image: "/luxury-tours/cairo-private-hero.webp",
    rating: 4.9,
    reviews: 156,
  },
  {
    slug: "alexandria",
    name: "Alexandria Private Tour",
    description:
      "Discover the historic city of Alexandria on a premium private experience, exploring its iconic landmarks, Mediterranean atmosphere and fascinating history.",
    price: 120,
    duration: "Full Day",
    image: "/luxury-tours/alexandria-over-day-hero.webp",
    rating: 4.9,
    reviews: 0,
  },
  {
    slug: "aswan",
    name: "Aswan Private Tour",
    description:
      "Discover the beauty and history of Aswan with a premium private tour from Hurghada.",
    price: 250,
    duration: "Full Day",
    image: "/luxury-tours/aswan-private-hero.webp",
    rating: 4.9,
    reviews: 63,
  },
  {
    slug: "speed-boat",
    name: "Private Speed Boat",
    description:
      "Enjoy an exclusive private speed boat experience across the beautiful Red Sea.",
    price: 200,
    duration: "Half Day",
    image: "/luxury-tours/private-speed-boat-hero.webp",
    rating: 5.0,
    reviews: 94,
  },
  {
    slug: "quad-safari",
    name: "Private Quad Safari",
    description:
      "Experience the Egyptian desert with a premium private quad safari adventure.",
    price: 120,
    duration: "Half Day",
    image: "/luxury-tours/private-quad-safari-hero.webp",
    rating: 4.8,
    reviews: 87,
  },
  {
    slug: "buggy-safari",
    name: "Private Buggy Safari",
    description:
      "Enjoy an exciting private buggy adventure through the Egyptian desert.",
    price: 160,
    duration: "Half Day",
    image: "/luxury-tours/private-buggy-safari-hero.webp",
    rating: 4.9,
    reviews: 76,
  },
  {
    slug: "private-boat",
    name: "Private Boat",
    description:
      "Enjoy an exclusive private boat experience on the Red Sea with complete privacy, comfort and flexibility.",
    price: 180,
    duration: "Half Day",
    image: "/luxury-tours/private-boat-hero.webp",
    rating: 4.9,
    reviews: 82,
  },
];

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.92 1.06-6.2L3 9.53l6.22-.9L12 3Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.5-3 2.3-4.5 5.5-4.5S14 16 14.5 19" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17 14.7c2.3.4 3.5 1.8 4 4.3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M12 3 20 6v5c0 5-3.3 8.2-8 10-4.7-1.8-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.3 2.3 4.7-4.7" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="m3 7 4.5 4L12 4l4.5 7L21 7l-2 12H5L3 7Z" />
      <path d="M5 16h14" />
    </svg>
  );
}

export default function LuxuryToursPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-blue-950 px-6 py-20 text-white md:px-8 md:py-28">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />

        <div className="absolute -bottom-48 -right-32 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-orange-400" />

              <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400">
                Private Collection
              </p>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              Luxury Experiences
              <span className="block text-orange-400">
                Designed Around You
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
              Discover Egypt through a collection of exclusive private
              experiences, premium transportation and complete flexibility —
              created for guests who expect more.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold backdrop-blur-sm">
                <span className="text-orange-400">
                  <CrownIcon />
                </span>
                Private Experiences
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold backdrop-blur-sm">
                <span className="text-orange-400">
                  <ShieldIcon />
                </span>
                Premium Service
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold backdrop-blur-sm">
                <span className="text-orange-400">
                  <UsersIcon />
                </span>
                Fully Private
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 pb-4 pt-16 md:px-8 md:pt-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              The Private Collection
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-blue-950 md:text-4xl">
              Experiences Worth Travelling For
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 md:text-base">
              From ancient wonders to private Red Sea adventures, every
              experience is designed around privacy, comfort and personal
              attention.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm md:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Collection
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-950">
              {luxuryTours.length}
              <span className="ml-1 text-sm font-medium text-gray-400">
                exclusive experiences
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* TOURS */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <div className="grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
          {luxuryTours.map((tour) => (
            <article
              key={tour.slug}
              className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-gray-200/80 bg-white shadow-sm transition duration-500 hover:-translate-y-1.5 hover:border-gray-300 hover:shadow-2xl"
            >
              {/* IMAGE */}
              <Link
                href={`/luxury-tours/${tour.slug}`}
                className="block"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/75 via-transparent to-transparent opacity-90" />

                  {/* BADGE */}
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-blue-950/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-lg backdrop-blur-md">
                    <span className="text-orange-400">
                      <CrownIcon />
                    </span>
                    Private Collection
                  </div>

                  {/* DURATION */}
                  <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/90 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-blue-950 shadow-lg backdrop-blur-md">
                    {tour.duration}
                  </div>

                  {/* IMAGE BOTTOM */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">
                        Exclusive Experience
                      </p>

                      <p className="mt-1 text-lg font-bold text-white">
                        {tour.name}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-blue-950 shadow-lg transition duration-300 group-hover:bg-orange-500 group-hover:text-white">
                      <ArrowRightIcon />
                    </div>
                  </div>
                </div>
              </Link>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-6">
                {/* RATING */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-orange-400">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>

                  <span className="text-sm font-bold text-blue-950">
                    {tour.rating}
                  </span>

                  <span className="text-xs text-gray-400">
                    ({tour.reviews})
                  </span>
                </div>

                <Link href={`/luxury-tours/${tour.slug}`}>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-blue-950 transition duration-300 group-hover:text-orange-500">
                    {tour.name}
                  </h3>
                </Link>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {tour.description}
                </p>

                {/* FEATURES */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                    <span className="text-blue-900">
                      <UsersIcon />
                    </span>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                        Guests
                      </p>

                      <p className="text-xs font-bold text-blue-950">
                        From 2 Guests
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                    <span className="text-orange-500">
                      <ShieldIcon />
                    </span>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                        Service
                      </p>

                      <p className="text-xs font-bold text-blue-950">
                        Fully Private
                      </p>
                    </div>
                  </div>
                </div>

                {/* PRICE */}
                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between border-t border-gray-100 pt-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                        Starting From
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Private experience
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-3xl font-bold tracking-tight text-orange-500">
                        €{tour.price}
                      </span>

                      <span className="ml-1 text-[10px] font-medium text-gray-400">
                        / experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="grid grid-cols-2 gap-3 px-6 pb-6">
                <Link
                  href={`/luxury-tours/${tour.slug}`}
                  className="rounded-xl border border-blue-950 py-3.5 text-center text-sm font-bold text-blue-950 transition duration-300 hover:bg-blue-950 hover:text-white"
                >
                  Explore
                </Link>

                <Link
                  href={`/luxury-tours/${tour.slug}/book`}
                  className="rounded-xl bg-orange-500 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
                >
                  Reserve Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PREMIUM MESSAGE */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8 md:pb-24">
        <div className="relative overflow-hidden rounded-[30px] bg-blue-950 px-6 py-12 text-center text-white shadow-xl md:px-12 md:py-16">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-700/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400">
              <CrownIcon />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
              Made For Exceptional Journeys
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Your Time in Egypt Deserves
              <span className="block text-orange-400">
                Something Extraordinary
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100 md:text-base">
              Prefer complete flexibility or have a special request? Our
              private experiences can be tailored around your schedule and
              preferences.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/luxury-tours/luxor"
                className="rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Explore Private Experiences
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-blue-950"
              >
                Request a Tailored Experience
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}