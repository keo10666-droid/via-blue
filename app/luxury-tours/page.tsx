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

export default function LuxuryToursPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-blue-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-orange-400">
            Exclusive Experiences
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-6xl">
            Luxury Tours
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Discover Egypt in complete privacy and comfort with our premium
            private tours and exclusive experiences.
          </p>
        </div>
      </section>

      {/* Tours */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 text-center">
          <p className="font-bold uppercase tracking-[0.25em] text-orange-500">
            Premium Experiences
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-900 md:text-4xl">
            Choose Your Private Experience
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Private transportation, more flexibility and a premium experience
            designed for guests who want something special.
          </p>
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          {luxuryTours.map((tour) => (
            <div
              key={tour.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <Link href={`/luxury-tours/${tour.slug}`}>
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow">
                    PRIVATE LUXURY
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold uppercase tracking-wider text-orange-500">
                    Private Luxury
                  </p>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-900">
                    {tour.duration}
                  </span>
                </div>

                <Link href={`/luxury-tours/${tour.slug}`}>
                  <h3 className="mt-3 text-2xl font-bold text-blue-900 transition hover:text-orange-500">
                    {tour.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-bold text-gray-900">
                    {tour.rating}
                  </span>

                  <span className="text-yellow-400">★★★★★</span>

                  <span className="text-sm text-gray-500">
                    ({tour.reviews} Reviews)
                  </span>
                </div>

                <p className="mt-3 leading-6 text-gray-600">
                  {tour.description}
                </p>

                {/* Guests */}
                <div className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-900">
                  <span>👥</span>
                  <span>From 2 Guests</span>
                </div>

                {/* Price */}
                <div className="mt-auto pt-5">
                  <span className="text-sm text-gray-500">From</span>

                  <span className="ml-2 text-3xl font-bold text-orange-500">
                    €{tour.price}
                  </span>

                  <span className="ml-1 text-xs text-gray-500">
                    / experience
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 px-6 pb-6">
                <Link
                  href={`/luxury-tours/${tour.slug}`}
                  className="rounded-xl border-2 border-blue-900 py-3 text-center text-sm font-bold text-blue-900 transition hover:bg-blue-900 hover:text-white"
                >
                  View Tour
                </Link>

                <Link
                  href={`/luxury-tours/${tour.slug}/book`}
                  className="rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}