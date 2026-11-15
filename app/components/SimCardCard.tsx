"use client";

import Link from "next/link";
import { useCurrency } from "@/app/components/CurrencyProvider";

export default function SimCardCard() {
  const { currency } = useCurrency();
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : "£";

  return (
    <section className="bg-[#f7f7f5] px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/sim-card"
          aria-label="Explore Egypt SIM Card - Stay Connected"
          className="group relative isolate block min-h-[300px] overflow-hidden rounded-[28px] bg-[#03112a] shadow-[0_24px_70px_rgba(3,17,42,0.18)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_85px_rgba(3,17,42,0.25)] sm:min-h-[360px]"
        >
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2000&q=85')" }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#03112a]/95 via-[#03112a]/75 to-[#03112a]/25" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#03112a]/65 via-transparent to-transparent" />

          <div className="relative flex min-h-[300px] flex-col justify-between p-7 text-white sm:min-h-[360px] sm:p-11">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[9px] font-extrabold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
                EGYPT SIM CARD
              </span>
              <span className="rounded-full bg-orange-500 px-3.5 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white shadow-lg">
                25 GB + Calls
              </span>
            </div>

            <div className="max-w-xl">
              <p className="text-[2.8rem] font-black leading-[0.95] tracking-[-0.055em] text-white drop-shadow-lg sm:text-6xl md:text-7xl">
                Stay Connected
              </p>
              <p className="mt-3 text-sm font-medium text-blue-50/90 sm:text-base">
                Your Egypt SIM Card
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#03112a] shadow-xl transition group-hover:bg-white group-hover:text-[#03112a]">
                  Explore SIM Card <span aria-hidden="true" className="inline-block text-orange-600">→</span>
                </span>
                <span className="text-sm font-semibold text-white/90">
                  From <strong className="text-xl font-black text-orange-300">{symbol}10</strong>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
