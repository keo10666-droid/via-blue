"use client";

import { useState } from "react";
import { useCurrency } from "@/app/components/CurrencyProvider";

const networks = [
  {
    id: "orange",
    name: "Orange",
    logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Orange_logo.svg",
    logoClass: "h-9 w-9 rounded-lg",
    popular: true,
  },
  {
    id: "vodafone",
    name: "Vodafone",
    logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Vodafone_icon.svg",
    logoClass: "h-9 w-9 object-contain",
    popular: false,
  },
  {
    id: "etisalat",
    name: "Etisalat",
    logo: "https://www.eand.com.eg/StaticFiles/portal2/etisalat/images/logo/etisalat_logo.svg",
    logoClass: "h-9 w-14 object-contain",
    popular: false,
  },
  {
    id: "we",
    name: "WE",
    logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/We_logo.svg",
    logoClass: "h-9 w-9 object-contain",
    popular: false,
  },
] as const;

export default function SimCardSection() {
  const { currency } = useCurrency();
  const [network, setNetwork] = useState<(typeof networks)[number]["id"]>("orange");
  const [delivery, setDelivery] = useState<"airport" | "hotel">("airport");
  const [showForm, setShowForm] = useState(false);
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : "£";
  const total = 10 + (delivery === "hotel" ? 5 : 0);

  return (
    <section id="sim-card" className="relative overflow-hidden bg-[#f7f7f5] px-5 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-100/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-orange-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-orange-600">Stay connected in Egypt</span>
            <span className="h-px w-9 bg-orange-500" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#03112a] sm:text-5xl">Your Egypt SIM Card</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">Get online, stay in touch and enjoy your holiday without roaming worries</p>
        </div>

        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_28px_80px_rgba(3,17,42,0.12)] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative flex min-h-[310px] flex-col justify-between overflow-hidden bg-[#03112a] p-7 text-white sm:p-9">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-orange-300/30 bg-orange-400/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-orange-200">Made for your holiday</span>
              <div className="mt-10 flex h-36 w-56 rotate-[-5deg] flex-col justify-between rounded-2xl border border-white/20 bg-gradient-to-br from-white/20 via-white/10 to-white/5 p-5 shadow-2xl backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold tracking-[0.22em] text-white/75">VIA BLUE</span>
                  <span className="rounded-md border border-white/30 px-2 py-1 text-[9px] font-bold">EGYPT</span>
                </div>
                <div>
                  <p className="text-4xl font-black tracking-tight">25<span className="ml-1 text-lg font-bold text-orange-300">GB</span></p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/65">Data + Calls</p>
                </div>
              </div>
            </div>
            <div className="relative mt-9 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-blue-100/70">One simple holiday package</p>
                <p className="mt-1 text-2xl font-extrabold">25 GB + Calls</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100/60">From</p>
                <p className="text-3xl font-black text-orange-300">{symbol}10</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-9">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-orange-600">Choose your network</p>
                <h3 className="mt-1 text-xl font-extrabold text-[#03112a]">Select your SIM provider</h3>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-900">4 networks</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {networks.map((item) => {
                const selected = network === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setNetwork(item.id)}
                    aria-pressed={selected}
                    className={`relative flex min-h-[105px] flex-col items-center justify-center gap-2 rounded-2xl border-2 px-3 py-3 transition-all ${selected ? "border-orange-500 bg-orange-50 shadow-[0_8px_22px_rgba(249,115,22,0.12)]" : "border-slate-100 bg-white hover:border-slate-300"}`}
                  >
                    {item.popular && <span className="absolute -top-2.5 rounded-full bg-orange-500 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-wider text-white shadow">Best seller</span>}
                    <img src={item.logo} alt={item.name + " logo"} className={item.logoClass} />
                    <span className={`text-xs font-extrabold ${selected ? "text-[#03112a]" : "text-slate-600"}`}>{item.name}</span>
                    {selected && <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-orange-600">Choose delivery</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setDelivery("airport")} className={`rounded-xl border p-3 text-left transition ${delivery === "airport" ? "border-orange-500 bg-orange-50" : "border-slate-200 bg-white"}`}>
                  <span className="block text-xs font-extrabold text-[#03112a]">Airport pickup</span>
                  <span className="mt-1 block text-[11px] font-semibold text-emerald-600">Free</span>
                </button>
                <button type="button" onClick={() => setDelivery("hotel")} className={`rounded-xl border p-3 text-left transition ${delivery === "hotel" ? "border-orange-500 bg-orange-50" : "border-slate-200 bg-white"}`}>
                  <span className="block text-xs font-extrabold text-[#03112a]">Hotel delivery</span>
                  <span className="mt-1 block text-[11px] font-semibold text-slate-500">+ {symbol}5</span>
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#03112a] px-4 py-3.5 text-white">
              <div>
                <p className="text-[10px] font-semibold text-blue-100/65">Total price</p>
                <p className="mt-0.5 text-[10px] text-blue-100/65">{network.charAt(0).toUpperCase() + network.slice(1)} · {delivery === "airport" ? "Airport pickup" : "Hotel delivery"}</p>
              </div>
              <p className="text-2xl font-black text-orange-300">{symbol}{total}</p>
            </div>

            <button type="button" onClick={() => setShowForm((value) => !value)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:from-orange-400 hover:to-amber-400">
              {showForm ? "Hide order details" : "Continue to order"}
              <span aria-hidden="true">→</span>
            </button>

            {showForm && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 text-sm font-extrabold text-[#03112a]">Your details</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required placeholder="Full name" className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none focus:border-orange-400" />
                  <input required type="tel" placeholder="WhatsApp number" className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none focus:border-orange-400" />
                  <input required type="date" aria-label="Arrival date" className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none focus:border-orange-400" />
                  <input required placeholder="Hotel name" className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none focus:border-orange-400" />
                  <input placeholder="Room number (if available)" className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none focus:border-orange-400 sm:col-span-2" />
                </div>
                <p className="mt-3 text-[11px] leading-5 text-slate-500">Selected network: <strong>{network}</strong>. Delivery: <strong>{delivery === "airport" ? "Airport pickup" : "Hotel delivery"}</strong>. Order submission will be connected after confirming where you want to receive orders.</p>
              </div>
            )}
          </div>
        </div>
        <p className="mt-4 text-center text-[10px] text-slate-500">Network availability and package activation are subject to confirmation</p>
      </div>
    </section>
  );
}
