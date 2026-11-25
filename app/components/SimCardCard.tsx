"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrency } from "@/app/components/CurrencyProvider";
import HomeText from "@/app/components/HomeText";
import { useSiteLocale } from "@/app/components/LocaleProvider";

export default function SimCardCard() {
  const { currency } = useCurrency();
  const { locale } = useSiteLocale();
  const localizedHref = (path: string) => locale === "en" ? path : `/${locale}${path === "/" ? "" : path}`;
  const [startingPrice, setStartingPrice] = useState(10);
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : "£";

  useEffect(() => {
    fetch("/api/sim-card-settings", { cache: "no-store" }).then((response) => response.json()).then((result) => {
      if (result.success && result.settings?.packages) {
        const prices = result.settings.packages.filter((item: { active: boolean; prices: Record<string, number> }) => item.active).map((item: { prices: Record<string, number> }) => Number(item.prices[currency])).filter((price: number) => Number.isFinite(price));
        if (prices.length) setStartingPrice(Math.min(...prices));
      }
    }).catch(() => {});
  }, [currency]);

  return (
    <section className="bg-[#f7f7f5] px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <Link href={localizedHref("/sim-card")} className="group relative isolate block min-h-[300px] overflow-hidden rounded-[28px] bg-[#03112a] shadow-[0_24px_70px_rgba(3,17,42,0.18)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_85px_rgba(3,17,42,0.25)] sm:min-h-[360px]">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_22%,rgba(34,211,238,0.24),transparent_34%),radial-gradient(ellipse_at_14%_88%,rgba(14,165,233,0.2),transparent_42%)]" />
          <div aria-hidden="true" className="absolute right-[-4rem] top-[-5rem] -z-10 h-72 w-72 rounded-full border border-white/10 sm:right-[-2rem] sm:top-[-7rem] sm:h-[26rem] sm:w-[26rem]" />
          <div aria-hidden="true" className="absolute right-8 top-10 -z-10 h-28 w-28 rounded-full border border-cyan-200/10 sm:right-20 sm:top-16 sm:h-44 sm:w-44" />
          <div className="relative flex min-h-[300px] flex-col justify-between p-7 text-white sm:min-h-[360px] sm:p-11">
            <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[9px] font-extrabold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md"><HomeText en="EGYPT SIM CARD" de="SIM-KARTE FÜR ÄGYPTEN" ru="SIM-КАРТА ДЛЯ ЕГИПТА" /></span></div>
            <div className="max-w-xl">
              <p className="text-[2.8rem] font-black leading-[0.95] tracking-[-0.055em] text-white drop-shadow-lg sm:text-6xl md:text-7xl"><HomeText en="Stay Connected" de="Immer verbunden" ru="Оставайтесь на связи" /></p>
              <p className="mt-3 text-sm font-medium text-blue-50/90 sm:text-base"><HomeText en="Your Egypt SIM Card" de="Ihre SIM-Karte für Ägypten" ru="Ваша SIM-карта для Египта" /></p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#03112a] shadow-xl transition group-hover:bg-white group-hover:text-[#03112a]"><HomeText en="Explore SIM Card" de="SIM-Karte entdecken" ru="Подробнее о SIM-карте" /> <span aria-hidden="true" className="inline-block text-orange-600">→</span></span>
                <span className="text-sm font-semibold text-white/90"><HomeText en="From" de="Ab" ru="От" /> <strong className="text-xl font-black text-orange-300">{symbol}{startingPrice}</strong></span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
