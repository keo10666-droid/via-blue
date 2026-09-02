import Image from "next/image";
import Link from "next/link";
import {
  CarFront,
  Ship,
  Mountain,
  Sparkles,
  Handshake,
  BadgeCheck,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[620px] overflow-hidden">

        <Image
          src="/images/about-hero.webp"
          alt="Beautiful Red Sea coastline in Hurghada, Egypt"
          fill
          priority
          className="object-cover"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/55 to-blue-950/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-24">

          <div className="max-w-3xl text-white">

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-orange-400" />

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">
                About Via Blue
              </p>
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              More Than A Trip.
              <span className="block text-orange-400">
                It&apos;s The Experience.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl">
              Discover Hurghada through carefully selected experiences,
              reliable transportation and local expertise — all designed
              to make your time in the Red Sea effortless and unforgettable.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/tours"
                className="rounded-xl bg-orange-500 px-7 py-4 text-center font-bold text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-600"
              >
                Explore Our Tours
              </Link>

              <Link
                href="/transfers"
                className="rounded-xl border border-white/70 bg-white/10 px-7 py-4 text-center font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-blue-950"
              >
                Private Transfers
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom location label */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-7xl px-6 pb-7">
            <div className="flex items-center gap-3 text-sm font-medium text-white/80">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              Hurghada · Red Sea · Egypt
            </div>
          </div>
        </div>

      </section>


      {/* =========================================================
          INTRO / WHO WE ARE
      ========================================================= */}
      <section className="px-6 py-24 md:py-28">

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          {/* Image */}
          <div className="relative">

            <div className="relative h-[460px] overflow-hidden rounded-[2rem] shadow-2xl md:h-[560px]">

              <Image
                src="/images/about-story.webp"
                alt="Guests enjoying a Red Sea experience with Via Blue"
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-transparent" />

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-white/90 p-5 shadow-xl backdrop-blur-md">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  The Via Blue Experience
                </p>

                <p className="mt-2 text-xl font-bold text-blue-950">
                  Local knowledge. Personal service.
                </p>

              </div>

            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-5 -right-5 -z-10 h-28 w-28 rounded-3xl bg-orange-100" />

          </div>


          {/* Content */}
          <div>

            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                Who We Are
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-blue-950 md:text-5xl">
              Your Time in Hurghada
              <span className="block text-blue-700">
                Deserves More.
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-base leading-8 text-gray-600 md:text-lg">

              <p>
                Via Blue is a local tourism and transportation company
                based in Hurghada, Egypt. We help travelers discover the
                Red Sea through experiences chosen with care and delivered
                with reliable local service.
              </p>

              <p>
                From airport transfers and private transportation to
                island trips, snorkeling, boat adventures and desert
                experiences, we make it easier to enjoy everything
                Hurghada has to offer.
              </p>

              <p>
                Because we believe a great holiday is not simply about
                the destination. It is about feeling comfortable,
                knowing what to expect and enjoying every moment along
                the way.
              </p>

            </div>

            <div className="mt-9 flex flex-wrap gap-3">

              <div className="rounded-full border border-blue-100 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-900">
                Local Expertise
              </div>

              <div className="rounded-full border border-orange-100 bg-orange-50 px-5 py-2.5 text-sm font-semibold text-orange-700">
                Personal Service
              </div>

              <div className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-semibold text-gray-700">
                Reliable Experiences
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          EXPERIENCE STATEMENT
      ========================================================= */}
      <section className="relative overflow-hidden bg-blue-950 px-6 py-24 text-white">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-800/30 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">

          <p className="font-bold uppercase tracking-[0.3em] text-orange-400">
            Our Philosophy
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            Travel should feel
            <span className="block text-orange-400">
              effortless.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-blue-100 md:text-xl">
            We take care of the details so you can focus on what really
            matters — discovering new places, enjoying the sea and creating
            memories worth taking home.
          </p>

        </div>

      </section>


      {/* =========================================================
          WHAT WE OFFER
      ========================================================= */}
      <section className="bg-slate-50 px-6 py-24 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                What We Offer
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-blue-950 md:text-5xl">
              Everything You Need
              <span className="block text-blue-700">
                For Your Red Sea Escape.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              From the moment you arrive in Hurghada to your next
              unforgettable adventure, Via Blue is here to make your
              journey easier.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {/* Private Transfers */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <CarFront
                  className="h-7 w-7 text-blue-700"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-blue-950">
                Private Transfers
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Comfortable airport and hotel transfers with dependable
                service across Hurghada and the Red Sea.
              </p>

              <Link
                href="/transfers"
                className="mt-6 inline-block text-sm font-bold text-orange-500 transition group-hover:text-orange-600"
              >
                Explore Transfers →
              </Link>

            </div>


            {/* Sea Adventures */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                <Ship
                  className="h-7 w-7 text-orange-600"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-blue-950">
                Sea Adventures
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Island trips, snorkeling, boat excursions and unforgettable
                moments across the Red Sea.
              </p>

              <Link
                href="/tours"
                className="mt-6 inline-block text-sm font-bold text-orange-500 transition group-hover:text-orange-600"
              >
                Explore Tours →
              </Link>

            </div>


            {/* Desert Adventures */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
                <Mountain
                  className="h-7 w-7 text-amber-600"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-blue-950">
                Desert Adventures
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Discover the Egyptian desert through safari trips,
                quad biking and authentic local experiences.
              </p>

              <Link
                href="/tours"
                className="mt-6 inline-block text-sm font-bold text-orange-500 transition group-hover:text-orange-600"
              >
                Discover More →
              </Link>

            </div>


            {/* Premium Experiences */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <Sparkles
                  className="h-7 w-7 text-blue-700"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-blue-950">
                Premium Experiences
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Carefully selected experiences for travelers who value
                comfort, quality and a more personal journey.
              </p>

            </div>


            {/* Local Support */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                <Handshake
                  className="h-7 w-7 text-orange-600"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-blue-950">
                Local Support
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Direct communication and friendly local assistance before,
                during and after your experience.
              </p>

            </div>


            {/* Easy Booking */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                <BadgeCheck
                  className="h-7 w-7 text-green-600"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-blue-950">
                Easy Booking
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Simple booking, clear pricing and fast confirmation through
                direct communication with our team.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          WHY VIA BLUE
      ========================================================= */}
      <section className="px-6 py-24 md:py-28">

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">

          <div>

            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                Why Via Blue
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-blue-950 md:text-5xl">
              A better way to
              <span className="block text-blue-700">
                experience Hurghada.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              We combine local knowledge with a modern, straightforward
              approach to tourism. No unnecessary complications — just
              well-organized experiences and people who care about your trip.
            </p>

            <div className="mt-9 space-y-5">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                  01
                </div>

                <div>
                  <h3 className="font-bold text-blue-950">
                    Clear & Simple
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Straightforward information and easy communication from
                    the beginning.
                  </p>
                </div>

              </div>


              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                  02
                </div>

                <div>
                  <h3 className="font-bold text-blue-950">
                    Local Expertise
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    We know Hurghada, the Red Sea and the experiences that
                    make a holiday special.
                  </p>
                </div>

              </div>


              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                  03
                </div>

                <div>
                  <h3 className="font-bold text-blue-950">
                    Personal Service
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Direct support from a local team that is here to help
                    when you need it.
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Experience image */}
          <div className="relative">

            <div className="relative h-[520px] overflow-hidden rounded-[2rem] shadow-2xl">

              <Image
                src="/images/about-experience.webp"
                alt="Red Sea island and snorkeling experience in Hurghada"
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 right-7">

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
                  Explore The Red Sea
                </p>

                <p className="mt-2 text-2xl font-bold text-white md:text-3xl">
                  Your next unforgettable experience is waiting.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          TRUST / VALUES
      ========================================================= */}
      <section className="border-y border-gray-100 bg-white px-6 py-16">

        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">

          <div className="text-center lg:text-left">
            <p className="text-4xl font-bold text-orange-500">
              24/7
            </p>

            <p className="mt-2 font-bold text-blue-950">
              Local Support
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Assistance when you need it.
            </p>
          </div>


          <div className="text-center lg:text-left">
            <p className="text-4xl font-bold text-orange-500">
              100%
            </p>

            <p className="mt-2 font-bold text-blue-950">
              Local Knowledge
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Experience rooted in Hurghada.
            </p>
          </div>


          <div className="text-center lg:text-left">
            <p className="text-4xl font-bold text-orange-500">
              Easy
            </p>

            <p className="mt-2 font-bold text-blue-950">
              Booking
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Simple and straightforward.
            </p>
          </div>


          <div className="text-center lg:text-left">
            <p className="text-4xl font-bold text-orange-500">
              Fair
            </p>

            <p className="mt-2 font-bold text-blue-950">
              Pricing
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Clear prices without unnecessary complications.
            </p>
          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-blue-950 px-6 py-24 text-white">

        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-700 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-500 blur-3xl opacity-20" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">

          <p className="font-bold uppercase tracking-[0.3em] text-orange-400">
            Start Your Journey
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Hurghada Is Waiting.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Explore the Red Sea, discover unforgettable experiences and
            travel with a team that knows Hurghada.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/tours"
              className="rounded-xl bg-orange-500 px-8 py-4 text-center font-bold text-white shadow-lg transition hover:bg-orange-600"
            >
              Explore Tours
            </Link>

            <Link
              href="/transfers"
              className="rounded-xl border border-white/70 bg-white/5 px-8 py-4 text-center font-bold text-white transition hover:bg-white hover:text-blue-950"
            >
              View Transfers
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}