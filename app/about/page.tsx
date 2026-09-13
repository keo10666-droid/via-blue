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
      <section className="relative min-h-[680px] overflow-hidden">

        <Image
          src="/images/about-hero.webp"
          alt="Beautiful Red Sea coastline in Hurghada, Egypt"
          fill
          priority
          className="object-cover transition duration-1000 hover:scale-[1.02]"
        />

        {/* Cinematic premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03112a]/95 via-[#03112a]/65 to-[#03112a]/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#03112a]/80 via-transparent to-[#03112a]/10" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(56,189,248,0.08),transparent_30%),radial-gradient(circle_at_15%_80%,rgba(249,115,22,0.08),transparent_28%)]" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-24 lg:px-8">

          <div className="max-w-3xl text-white">

            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-12 bg-orange-400" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-orange-400">
                About Via Blue
              </p>

              <span className="h-px w-6 bg-white/20" />
            </div>

            <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.035em] md:text-7xl lg:text-[5.25rem]">
              More Than A Trip
              <span className="block bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                It&apos;s The Experience
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-blue-50/90 md:text-xl">
              Discover Hurghada through carefully selected experiences,
              reliable transportation and local expertise — all designed
              to make your time in the Red Sea effortless and unforgettable
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/tours"
                className="group rounded-xl border border-orange-300/20 bg-gradient-to-r from-orange-500 to-orange-400 px-7 py-4 text-center font-bold text-white shadow-xl shadow-orange-950/30 transition-all duration-300 hover:-translate-y-1 hover:from-orange-400 hover:to-amber-400 hover:shadow-orange-500/20"
              >
                <span className="flex items-center justify-center gap-2">
                  Explore Our Tours
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>

              <Link
                href="/transfers"
                className="rounded-xl border border-white/20 bg-white/[0.08] px-7 py-4 text-center font-bold text-white shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white hover:text-blue-950"
              >
                Private Transfers
              </Link>

            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/60">
              <span>Red Sea Experiences</span>
              <span className="h-1 w-1 rounded-full bg-orange-400" />
              <span>Private Transfers</span>
              <span className="h-1 w-1 rounded-full bg-orange-400" />
              <span>Local Expertise</span>
            </div>

          </div>

        </div>

        {/* Bottom location label */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-7xl px-6 pb-7 lg:px-8">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
              <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.7)]" />
              Hurghada · Red Sea · Egypt
            </div>
          </div>
        </div>

      </section>


      {/* =========================================================
          INTRO / WHO WE ARE
      ========================================================= */}
      <section className="relative overflow-hidden px-6 py-24 md:py-28">

        <div
          className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-orange-100/50 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          {/* Image */}
          <div className="relative">

            <div className="absolute -inset-3 rounded-[2.3rem] border border-blue-100/70 bg-blue-50/40" />

            <div className="relative h-[460px] overflow-hidden rounded-[2rem] shadow-2xl shadow-blue-950/15 md:h-[560px]">

              <Image
                src="/images/about-story.webp"
                alt="Guests enjoying a Red Sea experience with Via Blue"
                fill
                className="object-cover transition duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/75 via-blue-950/5 to-transparent" />

              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                The Red Sea
              </div>

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/[0.92] p-5 shadow-2xl backdrop-blur-xl">

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                  The Via Blue Experience
                </p>

                <p className="mt-2 text-xl font-bold tracking-tight text-blue-950">
                  Local knowledge. Personal service
                </p>

                <div className="mt-3 h-px w-12 bg-orange-400" />

              </div>

            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-[2rem] bg-gradient-to-br from-orange-100 to-orange-50" />

          </div>


          {/* Content */}
          <div>

            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-orange-500" />

              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-orange-500">
                Who We Are
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-blue-950 md:text-5xl">
              Your Time in Hurghada
              <span className="block bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Deserves More
              </span>
            </h2>

            <div className="mt-8 space-y-5 text-base leading-8 text-gray-600 md:text-lg">

              <p>
                Via Blue is a local tourism and transportation company
                based in Hurghada, Egypt. We help travelers discover the
                Red Sea through experiences chosen with care and delivered
                with reliable local service
              </p>

              <p>
                From airport transfers and private transportation to
                island trips, snorkeling, boat adventures and desert
                experiences, we make it easier to enjoy everything
                Hurghada has to offer
              </p>

              <p>
                Because we believe a great holiday is not simply about
                the destination. It is about feeling comfortable,
                knowing what to expect and enjoying every moment along
                the way
              </p>

            </div>

            <div className="mt-9 flex flex-wrap gap-3">

              <div className="rounded-full border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 px-5 py-2.5 text-sm font-semibold text-blue-900 shadow-sm">
                Local Expertise
              </div>

              <div className="rounded-full border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-2.5 text-sm font-semibold text-orange-700 shadow-sm">
                Personal Service
              </div>

              <div className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm">
                Reliable Experiences
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          EXPERIENCE STATEMENT
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#03112a] px-6 py-28 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.16),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.10),transparent_30%)]" />

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-700/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">

          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-400">
            Our Philosophy
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Travel should feel
            <span className="block bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">
              effortless
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-blue-100/85 md:text-xl">
            We take care of the details so you can focus on what really
            matters — discovering new places, enjoying the sea and creating
            memories worth taking home
          </p>

          <div className="mx-auto mt-9 h-px w-20 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

        </div>

      </section>


      {/* =========================================================
          WHAT WE OFFER
      ========================================================= */}
      <section className="relative overflow-hidden bg-slate-50 px-6 py-24 md:py-28">

        <div
          className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-orange-500" />

              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-orange-500">
                What We Offer
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-blue-950 md:text-5xl">
              Everything You Need
              <span className="block bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                For Your Red Sea Escape
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              From the moment you arrive in Hurghada to your next
              unforgettable adventure, Via Blue is here to make your
              journey easier
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {/* Private Transfers */}
            <div className="group rounded-3xl border border-blue-100/70 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 transition-all duration-500 group-hover:border-blue-200 group-hover:bg-blue-700 group-hover:text-white">
                <CarFront
                  className="h-7 w-7 text-blue-700 transition-colors duration-500 group-hover:text-white"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-blue-950">
                Private Transfers
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Comfortable airport and hotel transfers with dependable
                service across Hurghada and the Red Sea
              </p>

              <Link
                href="/transfers"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-600"
              >
                Explore Transfers →
              </Link>

            </div>


            {/* Sea Adventures */}
            <div className="group rounded-3xl border border-orange-100/70 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-950/10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 transition-all duration-500 group-hover:border-orange-200 group-hover:bg-orange-500 group-hover:text-white">
                <Ship
                  className="h-7 w-7 text-orange-600 transition-colors duration-500 group-hover:text-white"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-blue-950">
                Sea Adventures
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Island trips, snorkeling, boat excursions and unforgettable
                moments across the Red Sea
              </p>

              <Link
                href="/tours"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-600"
              >
                Explore Tours →
              </Link>

            </div>


            {/* Desert Adventures */}
            <div className="group rounded-3xl border border-amber-100/70 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-950/10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 transition-all duration-500 group-hover:border-amber-200 group-hover:bg-amber-500 group-hover:text-white">
                <Mountain
                  className="h-7 w-7 text-amber-600 transition-colors duration-500 group-hover:text-white"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-blue-950">
                Desert Adventures
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Discover the Egyptian desert through safari trips,
                quad biking and authentic local experiences
              </p>

              <Link
                href="/tours"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-600"
              >
                Discover More →
              </Link>

            </div>


            {/* Premium Experiences */}
            <div className="group rounded-3xl border border-blue-100/70 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 transition-all duration-500 group-hover:border-blue-200 group-hover:bg-blue-700 group-hover:text-white">
                <Sparkles
                  className="h-7 w-7 text-blue-700 transition-colors duration-500 group-hover:text-white"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-blue-950">
                Premium Experiences
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Carefully selected experiences for travelers who value
                comfort, quality and a more personal journey
              </p>

            </div>


            {/* Local Support */}
            <div className="group rounded-3xl border border-orange-100/70 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-950/10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 transition-all duration-500 group-hover:border-orange-200 group-hover:bg-orange-500 group-hover:text-white">
                <Handshake
                  className="h-7 w-7 text-orange-600 transition-colors duration-500 group-hover:text-white"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-blue-950">
                Local Support
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Direct communication and friendly local assistance before,
                during and after your experience
              </p>

            </div>


            {/* Easy Booking */}
            <div className="group rounded-3xl border border-green-100/70 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl hover:shadow-green-950/10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 transition-all duration-500 group-hover:border-green-200 group-hover:bg-green-600 group-hover:text-white">
                <BadgeCheck
                  className="h-7 w-7 text-green-600 transition-colors duration-500 group-hover:text-white"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-blue-950">
                Easy Booking
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Simple booking, clear pricing and fast confirmation through
                direct communication with our team
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          WHY VIA BLUE
      ========================================================= */}
      <section className="relative overflow-hidden px-6 py-24 md:py-28">

        <div
          className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-orange-50 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">

          <div>

            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-orange-500" />

              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-orange-500">
                Why Via Blue
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-blue-950 md:text-5xl">
              A better way to
              <span className="block bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                experience Hurghada
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
              We combine local knowledge with a modern, straightforward
              approach to tourism. No unnecessary complications — just
              well-organized experiences and people who care about your trip
            </p>

            <div className="mt-10 space-y-6">

              <div className="group flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-100 bg-orange-50 font-bold text-orange-600 shadow-sm transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                  01
                </div>

                <div>
                  <h3 className="font-bold text-blue-950">
                    Clear & Simple
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Straightforward information and easy communication from
                    the beginning
                  </p>
                </div>

              </div>


              <div className="group flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 font-bold text-blue-700 shadow-sm transition-all duration-300 group-hover:bg-blue-700 group-hover:text-white">
                  02
                </div>

                <div>
                  <h3 className="font-bold text-blue-950">
                    Local Expertise
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    We know Hurghada, the Red Sea and the experiences that
                    make a holiday special
                  </p>
                </div>

              </div>


              <div className="group flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-100 bg-orange-50 font-bold text-orange-600 shadow-sm transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                  03
                </div>

                <div>
                  <h3 className="font-bold text-blue-950">
                    Personal Service
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Direct support from a local team that is here to help
                    when you need it
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Experience image */}
          <div className="relative">

            <div className="absolute -inset-3 rounded-[2.3rem] border border-blue-100/70 bg-blue-50/40" />

            <div className="relative h-[520px] overflow-hidden rounded-[2rem] shadow-2xl shadow-blue-950/15">

              <Image
                src="/images/about-experience.webp"
                alt="Red Sea island and snorkeling experience in Hurghada"
                fill
                className="object-cover transition duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/10 to-transparent" />

              <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                Red Sea Experience
              </div>

              <div className="absolute bottom-7 left-7 right-7">

                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-400">
                  Explore The Red Sea
                </p>

                <p className="mt-2 text-2xl font-bold leading-tight text-white md:text-3xl">
                  Your next unforgettable experience is waiting
                </p>

                <div className="mt-4 h-px w-14 bg-orange-400" />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          TRUST / VALUES
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-gray-100 bg-slate-50 px-6 py-16">

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:text-left">
            <p className="text-4xl font-bold tracking-tight text-orange-500">
              24/7
            </p>

            <p className="mt-2 font-bold text-blue-950">
              Local Support
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Assistance when you need it
            </p>
          </div>


          <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:text-left">
            <p className="text-4xl font-bold tracking-tight text-orange-500">
              100%
            </p>

            <p className="mt-2 font-bold text-blue-950">
              Local Knowledge
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Experience rooted in Hurghada
            </p>
          </div>


          <div className="rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:text-left">
            <p className="text-4xl font-bold tracking-tight text-orange-500">
              Easy
            </p>

            <p className="mt-2 font-bold text-blue-950">
              Booking
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Simple and straightforward
            </p>
          </div>


          <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:text-left">
            <p className="text-4xl font-bold tracking-tight text-orange-500">
              Fair
            </p>

            <p className="mt-2 font-bold text-blue-950">
              Pricing
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Clear prices without unnecessary complications
            </p>
          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#03112a] px-6 py-28 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(37,99,235,0.16),transparent_32%),radial-gradient(circle_at_80%_60%,rgba(249,115,22,0.10),transparent_30%)]" />

        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-700/25 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-400">
            Start Your Journey
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Hurghada Is Waiting
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-blue-100/85">
            Explore the Red Sea, discover unforgettable experiences and
            travel with a team that knows Hurghada
          </p>

          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/tours"
              className="group rounded-xl border border-orange-300/20 bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-4 text-center font-bold text-white shadow-xl shadow-orange-950/30 transition-all duration-300 hover:-translate-y-1 hover:from-orange-400 hover:to-amber-400 hover:shadow-orange-500/20"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Tours
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>

            <Link
              href="/transfers"
              className="rounded-xl border border-white/20 bg-white/[0.06] px-8 py-4 text-center font-bold text-white shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white hover:text-blue-950"
            >
              View Transfers
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}