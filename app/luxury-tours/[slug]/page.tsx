import Image from "next/image";
import Link from "next/link";

const luxuryTours = {
  luxor: {
    name: "Luxor Private Tour",
    description:
      "Discover the ancient temples, monuments and history of Luxor on a premium private experience.",
    price: 150,
    duration: "Full Day",
    hero: "/luxury-tours/luxor-private-hero.webp",
    gallery: [
      "/luxury-tours/luxor-private-1.webp",
      "/luxury-tours/luxor-private-2.webp",
      "/luxury-tours/luxor-private-3.webp",
      "/luxury-tours/luxor-private-4.webp",
      "/luxury-tours/luxor-private-5.webp",
    ],
    highlights: [
      "Private transportation",
      "Private experience",
      "Professional guide",
      "Hotel pickup & drop-off",
      "Flexible itinerary",
    ],
  },

  cairo: {
    name: "Cairo Private Tour",
    description:
      "Explore the Pyramids, Sphinx and the highlights of Cairo with a completely private experience.",
    price: 180,
    duration: "Full Day",
    hero: "/luxury-tours/cairo-private-hero.webp",
    gallery: [
      "/luxury-tours/cairo-private-1.webp",
      "/luxury-tours/cairo-private-2.webp",
      "/luxury-tours/cairo-private-3.webp",
      "/luxury-tours/cairo-private-4.webp",
      "/luxury-tours/cairo-private-5.webp",
    ],
    highlights: [
      "Private transportation",
      "Private experience",
      "Professional guide",
      "Hotel pickup & drop-off",
      "Flexible itinerary",
    ],
  },

  aswan: {
    name: "Aswan Private Tour",
    description:
      "Discover the beauty and history of Aswan with a premium private tour from Hurghada.",
    price: 250,
    duration: "Full Day",
    hero: "/luxury-tours/aswan-private-hero.webp",
    gallery: [
      "/luxury-tours/aswan-private-1.webp",
      "/luxury-tours/aswan-private-2.webp",
      "/luxury-tours/aswan-private-3.webp",
      "/luxury-tours/aswan-private-4.webp",
      "/luxury-tours/aswan-private-5.webp",
    ],
    highlights: [
      "Private transportation",
      "Private experience",
      "Professional guide",
      "Hotel pickup & drop-off",
      "Flexible itinerary",
    ],
  },

  "quad-safari": {
    name: "Private Quad Safari",
    description:
      "Experience the Egyptian desert with a premium private quad safari adventure.",
    price: 120,
    duration: "Half Day",
    hero: "/luxury-tours/private-quad-safari-hero.webp",
    gallery: [
      "/luxury-tours/private-quad-safari-1.webp",
      "/luxury-tours/private-quad-safari-2.webp",
      "/luxury-tours/private-quad-safari-3.webp",
      "/luxury-tours/private-quad-safari-4.webp",
      "/luxury-tours/private-quad-safari-5.webp",
    ],
    highlights: [
      "Private quad experience",
      "Desert adventure",
      "Professional guide",
      "Hotel pickup & drop-off",
      "Private experience",
    ],
  },

  "buggy-safari": {
    name: "Private Buggy Safari",
    description:
      "Enjoy an exciting private buggy adventure through the Egyptian desert.",
    price: 160,
    duration: "Half Day",
    hero: "/luxury-tours/private-buggy-safari-hero.webp",
    gallery: [
      "/luxury-tours/private-buggy-safari-1.webp",
      "/luxury-tours/private-buggy-safari-2.webp",
      "/luxury-tours/private-buggy-safari-3.webp",
      "/luxury-tours/private-buggy-safari-4.webp",
      "/luxury-tours/private-buggy-safari-5.webp",
    ],
    highlights: [
      "Private buggy experience",
      "Desert adventure",
      "Professional guide",
      "Hotel pickup & drop-off",
      "Premium experience",
    ],
  },

  "speed-boat": {
    name: "Private Speed Boat",
    description:
      "Enjoy an exclusive private speed boat experience across the beautiful Red Sea.",
    price: 200,
    duration: "Half Day",
    hero: "/luxury-tours/private-speed-boat-hero.webp",
    gallery: [
      "/luxury-tours/private-speed-boat-1.webp",
      "/luxury-tours/private-speed-boat-2.webp",
      "/luxury-tours/private-speed-boat-3.webp",
      "/luxury-tours/private-speed-boat-4.webp",
      "/luxury-tours/private-speed-boat-5.webp",
    ],
    highlights: [
      "Private speed boat",
      "Professional crew",
      "Hotel pickup & drop-off",
      "Exclusive experience",
      "Flexible timing",
    ],
  },

  "private-boat": {
    name: "Private Boat",
    description:
      "Enjoy an exclusive private boat experience on the Red Sea with complete privacy, comfort and flexibility.",
    price: 180,
    duration: "Half Day",
    hero: "/luxury-tours/private-boat-hero.webp",
    gallery: [
      "/luxury-tours/private-boat-1.webp",
      "/luxury-tours/private-boat-2.webp",
      "/luxury-tours/private-boat-3.webp",
      "/luxury-tours/private-boat-4.webp",
      "/luxury-tours/private-boat-5.webp",
    ],
    highlights: [
      "Private boat",
      "Professional crew",
      "Hotel pickup & drop-off",
      "Exclusive private experience",
      "Flexible timing",
    ],
  },
};

type LuxuryTourSlug = keyof typeof luxuryTours;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LuxuryTourPage({ params }: PageProps) {
  const { slug } = await params;

  const tour = luxuryTours[slug as LuxuryTourSlug];

  if (!tour) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900">
            Tour Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            Sorry, this luxury tour is not available.
          </p>

          <Link
            href="/luxury-tours"
            className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
          >
            Back to Luxury Tours
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Image */}
      <section className="relative h-[420px] overflow-hidden md:h-[550px]">
        <Image
          src={tour.hero}
          alt={tour.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">
          <div className="max-w-4xl">
            <p className="font-bold uppercase tracking-[0.3em] text-orange-400">
              Exclusive Experience
            </p>

            <h1 className="mt-4 text-4xl font-bold md:text-6xl">
              {tour.name}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-100">
              {tour.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white p-6 shadow-md md:p-8">
              <h2 className="text-3xl font-bold text-blue-900">
                {tour.name}
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Enjoy a premium private experience designed for guests who
                want more comfort, privacy and flexibility during their trip.
                Your experience can be tailored to your preferences while
                enjoying professional service from start to finish.
              </p>

              {/* Gallery */}
              <h3 className="mt-10 text-2xl font-bold text-blue-900">
                Experience Gallery
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
                {tour.gallery.map((image, index) => (
                  <div
                    key={image}
                    className={`relative overflow-hidden rounded-2xl ${
                      index === 0 ? "col-span-2 h-64 md:col-span-2" : "h-48"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${tour.name} - Gallery ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* What's Included */}
              <h3 className="mt-10 text-2xl font-bold text-blue-900">
                What's Included
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-slate-50 p-4 font-semibold text-gray-700"
                  >
                    ✅ {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-28 rounded-3xl bg-white p-7 shadow-md">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Starting From
              </p>

              <p className="mt-2 text-4xl font-bold text-orange-500">
                €{tour.price}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Private experience
              </p>

              <div className="my-6 h-px bg-gray-200" />

              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm font-bold text-gray-500">
                  Duration
                </p>

                <p className="mt-1 font-bold text-blue-900">
                  {tour.duration}
                </p>
              </div>

              <div className="mt-3 rounded-xl bg-orange-50 p-4">
                <p className="text-sm font-bold text-gray-500">
                  Tour Type
                </p>

                <p className="mt-1 font-bold text-orange-600">
                  Private Luxury
                </p>
              </div>

              <div className="mt-3 rounded-xl bg-green-50 p-4">
                <p className="text-sm font-bold text-gray-500">
                  Guests
                </p>

                <p className="mt-1 font-bold text-green-700">
                  Minimum 2 Guests
                </p>
              </div>

              <Link
                href={`/luxury-tours/${slug}/book`}
                className="mt-6 block w-full rounded-xl bg-orange-500 py-4 text-center font-bold text-white transition hover:bg-orange-600"
              >
                Book Now
              </Link>

              <Link
                href="/luxury-tours"
                className="mt-3 block w-full rounded-xl border-2 border-blue-900 py-3 text-center font-bold text-blue-900 transition hover:bg-blue-900 hover:text-white"
              >
                Back to Luxury Tours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}