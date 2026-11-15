"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useCurrency } from "@/app/components/CurrencyProvider";
import HomeText from "@/app/components/HomeText";
import { frenchHomeText } from "@/lib/frenchHomeCopy";

type Currency = "EUR" | "USD" | "GBP";
type PackageOption = { id: string; name: string; dataGb: number; description: string; prices: Record<Currency, number>; active: boolean };
type NetworkOption = { id: string; name: string; logo: string; active: boolean; popular: boolean };
type SimSettings = { packages: PackageOption[]; deliveryPrices: Record<Currency, number>; networks: NetworkOption[] };

const defaults: SimSettings = {
  packages: [{ id: "standard", name: "25 GB + Calls", dataGb: 25, description: "25 GB mobile data with local calls", prices: { EUR: 10, USD: 10, GBP: 10 }, active: true }],
  deliveryPrices: { EUR: 5, USD: 5, GBP: 5 },
  networks: [
    { id: "Orange", name: "Orange", logo: "https://cdn.simpleicons.org/orange/FF7900", active: true, popular: true },
    { id: "Vodafone", name: "Vodafone", logo: "https://cdn.simpleicons.org/vodafone/E60000", active: true, popular: false },
    { id: "Etisalat", name: "e&", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Eand_Logo_EN.svg", active: true, popular: false },
    { id: "WE", name: "WE", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/We_logo.svg", active: true, popular: false },
  ],
};

export default function SimCardSection() {
  const { currency } = useCurrency();
  const [isGerman, setIsGerman] = useState(false);
  const [isFrench, setIsFrench] = useState(false);
  useEffect(() => {
    const sync = () => { try { const language = window.localStorage.getItem("via-blue-language"); setIsGerman(language === "de"); setIsFrench(language === "fr"); } catch { setIsGerman(false); setIsFrench(false); } };
    sync();
    const handle = (event: Event) => { const next = (event as CustomEvent<"en" | "de" | "fr">).detail; if (next === "en" || next === "de" || next === "fr") { setIsGerman(next === "de"); setIsFrench(next === "fr"); } };
    window.addEventListener("via-blue-language-change", handle);
    return () => window.removeEventListener("via-blue-language-change", handle);
  }, []);
  const currentCurrency = currency as Currency;
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : "£";
  const [settings, setSettings] = useState<SimSettings>(defaults);
  const [packageId, setPackageId] = useState("standard");
  const [network, setNetwork] = useState("Orange");
  const [delivery, setDelivery] = useState<"airport" | "hotel">("airport");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const [form, setForm] = useState({ fullName: "", whatsapp: "", arrivalDate: "", hotel: "", roomNumber: "" });
  const [whatsappCountryCode, setWhatsappCountryCode] = useState("+20");
  const countryCodes = [
    { name: "Egypt", code: "+20", flag: "🇪🇬" }, { name: "United Kingdom", code: "+44", flag: "🇬🇧" }, { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "Russia", code: "+7", flag: "🇷🇺" }, { name: "Poland", code: "+48", flag: "🇵🇱" }, { name: "Romania", code: "+40", flag: "🇷🇴" },
    { name: "Czechia", code: "+420", flag: "🇨🇿" }, { name: "Hungary", code: "+36", flag: "🇭🇺" }, { name: "Lithuania", code: "+370", flag: "🇱🇹" },
    { name: "Latvia", code: "+371", flag: "🇱🇻" }, { name: "Estonia", code: "+372", flag: "🇪🇪" }, { name: "Belarus", code: "+375", flag: "🇧🇾" },
    { name: "Ukraine", code: "+380", flag: "🇺🇦" }, { name: "Netherlands", code: "+31", flag: "🇳🇱" }, { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Italy", code: "+39", flag: "🇮🇹" }, { name: "Spain", code: "+34", flag: "🇪🇸" }, { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "Ireland", code: "+353", flag: "🇮🇪" }, { name: "Austria", code: "+43", flag: "🇦🇹" }, { name: "Switzerland", code: "+41", flag: "🇨🇭" },
    { name: "Belgium", code: "+32", flag: "🇧🇪" }, { name: "Denmark", code: "+45", flag: "🇩🇰" }, { name: "Sweden", code: "+46", flag: "🇸🇪" },
    { name: "Norway", code: "+47", flag: "🇳🇴" }, { name: "Finland", code: "+358", flag: "🇫🇮" }, { name: "Turkey", code: "+90", flag: "🇹🇷" },
    { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" }, { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  ];
  const germanCountryNames: Record<string, string> = { Egypt: "Ägypten", "United Kingdom": "Vereinigtes Königreich", Germany: "Deutschland", Russia: "Russland", Poland: "Polen", Romania: "Rumänien", Czechia: "Tschechien", Hungary: "Ungarn", Lithuania: "Litauen", Latvia: "Lettland", Estonia: "Estland", Belarus: "Belarus", Ukraine: "Ukraine", Netherlands: "Niederlande", France: "Frankreich", Italy: "Italien", Spain: "Spanien", "United States": "USA", Ireland: "Irland", Austria: "Österreich", Switzerland: "Schweiz", Belgium: "Belgien", Denmark: "Dänemark", Sweden: "Schweden", Norway: "Norwegen", Finland: "Finnland", Turkey: "Türkei", "Saudi Arabia": "Saudi-Arabien", "United Arab Emirates": "Vereinigte Arabische Emirate" };

  useEffect(() => {
    fetch("/api/sim-card-settings", { cache: "no-store" }).then((response) => response.json()).then((result) => {
      if (result.success && result.settings) {
        const next = result.settings as SimSettings;
        setSettings(next);
        const firstPackage = next.packages.find((item) => item.active);
        const firstNetwork = next.networks.find((item) => item.active);
        if (firstPackage) setPackageId(firstPackage.id);
        if (firstNetwork) setNetwork(firstNetwork.id);
      }
    }).catch(() => {});
  }, []);

  const activePackages = settings.packages.filter((item) => item.active);
  const activeNetworks = settings.networks.filter((item) => item.active);
  const selectedPackage = activePackages.find((item) => item.id === packageId) || activePackages[0] || defaults.packages[0];
  const selectedNetwork = activeNetworks.find((item) => item.id === network) || activeNetworks[0] || defaults.networks[0];
  const basePrice = Number(selectedPackage.prices[currentCurrency] ?? selectedPackage.prices.EUR ?? 10);
  const deliveryFee = Number(settings.deliveryPrices[currentCurrency] ?? settings.deliveryPrices.EUR ?? 5);
  const total = basePrice + (delivery === "hotel" ? deliveryFee : 0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true); setOrderError(""); setOrderReference("");
    try {
      const response = await fetch("/api/sim-card-order", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, whatsapp: whatsappCountryCode + form.whatsapp.replace(/^0+/, "").replace(/[\s()-]/g, ""), network: selectedNetwork.id, packageId: selectedPackage.id, delivery, currency }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) { setOrderError(result.error || (isGerman ? "Ihre Bestellung konnte nicht gesendet werden. Bitte versuchen Sie es erneut." : isFrench ? "Impossible d’envoyer votre commande. Veuillez réessayer." : "We couldn't submit your order. Please try again.")); return; }
      setOrderReference(result.referenceCode || (isGerman ? "Ihre Bestellung ist eingegangen" : isFrench ? "Votre commande a bien été reçue" : "Your order has been received"));
      setForm({ fullName: "", whatsapp: "", arrivalDate: "", hotel: "", roomNumber: "" });
    } catch { setOrderError(isGerman ? "Verbindungsproblem. Bitte versuchen Sie es erneut." : isFrench ? "Problème de connexion. Veuillez réessayer." : "Connection problem. Please try again."); }
    finally { setSubmitting(false); }
  }

  return (
    <section id="sim-card" className="relative overflow-hidden bg-[#f7f7f5] px-5 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-100/80 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3"><span className="h-px w-9 bg-orange-500" /><span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-orange-600"><HomeText en="Stay connected in Egypt" de="Bleiben Sie in Ägypten verbunden" /></span><span className="h-px w-9 bg-orange-500" /></div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#03112a] sm:text-5xl"><HomeText en="Your Egypt SIM Card" de="Ihre SIM-Karte für Ägypten" /></h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base"><HomeText en="Get online, stay in touch and enjoy your holiday without roaming worries" de="Bleiben Sie online und in Kontakt – ganz ohne Roaming-Sorgen im Urlaub" /></p>
        </div>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_28px_80px_rgba(3,17,42,0.12)] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative flex min-h-[310px] flex-col justify-between overflow-hidden bg-[#03112a] p-7 text-white sm:p-9">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" /><div className="absolute -right-4 -top-4 h-40 w-40 rounded-full border border-white/10" /><div className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />
            <div className="relative mt-2 overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1100&q=85" alt={isGerman ? "Smartphone für Ihre Ägyptenreise" : isFrench ? "Smartphone prêt pour votre voyage en Égypte" : "Smartphone ready for your Egypt trip"} className="h-48 w-full rounded-2xl object-cover sm:h-56" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#03112a]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4"><p className="text-lg font-extrabold text-white drop-shadow"><HomeText en="Your trip. Your connection." de="Ihre Reise. Ihre Verbindung." /></p><p className="mt-1 text-xs font-medium text-white/85"><HomeText en="Reliable mobile connection while exploring Egypt" de="Zuverlässige mobile Verbindung während Ihrer Ägyptenreise" /></p></div>
            </div>
            <div className="relative mt-5 flex items-end justify-between gap-4"><div><p className="text-xs text-blue-100/70"><HomeText en="Your selected package" de="Ihr ausgewähltes Paket" /></p><p className="mt-1 text-2xl font-extrabold">{isGerman && selectedPackage.name === "25 GB + Calls" ? "25 GB + Telefonie" : isFrench && selectedPackage.name === "25 GB + Calls" ? "25 Go + appels" : selectedPackage.name}</p></div><div className="text-right"><p className="text-[10px] font-bold uppercase tracking-widest text-blue-100/60"><HomeText en="From" de="Ab" /></p><p className="text-3xl font-black text-orange-300">{symbol}{basePrice}</p></div></div>
          </div>
          <div className="p-6 sm:p-9">
            <div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-orange-600"><HomeText en="Choose your network" de="Wählen Sie Ihr Mobilfunknetz" /></p><h3 className="mt-1 text-xl font-extrabold text-[#03112a]"><HomeText en="Select your SIM provider" de="Wählen Sie Ihren SIM-Anbieter" /></h3></div><span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-900">{activeNetworks.length} <HomeText en="networks" de="Netze" /></span></div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {activeNetworks.map((item) => {
                const selected = selectedNetwork.id === item.id;
                return <button key={item.id} type="button" onClick={() => setNetwork(item.id)} aria-pressed={selected} className={`relative flex min-h-[105px] flex-col items-center justify-center gap-2 rounded-2xl border-2 px-3 py-3 transition-all ${selected ? "border-orange-500 bg-orange-50 shadow-[0_8px_22px_rgba(249,115,22,0.12)]" : "border-slate-100 bg-white hover:border-slate-300"}`}>
                  {item.popular && <span className="absolute -top-2.5 rounded-full bg-orange-500 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-wider text-white shadow"><HomeText en="Best seller" de="Bestseller" /></span>}
                  {item.logo ? <img src={item.logo} alt={item.name + " official logo"} className="h-9 max-w-14 object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <span className="text-lg font-black text-slate-700">{item.name}</span>}
                  <span className={`text-xs font-extrabold ${selected ? "text-[#03112a]" : "text-slate-600"}`}>{item.name}</span>
                  {selected && <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">✓</span>}
                </button>;
              })}
            </div>
            {activePackages.length > 1 && <div className="mt-5"><p className="mb-2 text-xs font-extrabold text-[#03112a]"><HomeText en="Choose your package" de="Wählen Sie Ihr Paket" /></p><div className="grid gap-2 sm:grid-cols-2">{activePackages.map((item) => <button type="button" key={item.id} onClick={() => setPackageId(item.id)} className={`rounded-xl border-2 p-3 text-left ${selectedPackage.id === item.id ? "border-orange-500 bg-orange-50" : "border-slate-200 bg-white"}`}><span className="block text-sm font-extrabold text-[#03112a]">{item.name}</span><span className="mt-1 block text-xs text-slate-500">{isGerman && item.description === "25 GB mobile data with local calls" ? "25 GB mobile Daten mit lokalen Anrufen" : isFrench && item.description === "25 GB mobile data with local calls" ? "25 Go de données mobiles avec appels locaux" : item.description}</span><span className="mt-2 block text-sm font-black text-orange-600">{symbol}{item.prices[currentCurrency]}</span></button>)}</div></div>}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#03112a] px-4 py-3.5 text-white"><div><p className="text-[10px] font-semibold text-blue-100/65"><HomeText en="Total price" de="Gesamtpreis" /></p><p className="mt-0.5 text-[10px] text-blue-100/65">{selectedNetwork.name} · {delivery === "airport" ? (isGerman ? "Abholung am Flughafen" : isFrench ? "Retrait à l’aéroport" : "Airport pickup") : (isGerman ? "Lieferung zum Hotel" : isFrench ? "Livraison à l’hôtel" : "Hotel delivery")}</p></div><p className="text-2xl font-black text-orange-300">{symbol}{total}</p></div>
            <button type="button" onClick={() => { setShowForm((value) => !value); setOrderError(""); setOrderReference(""); }} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:from-orange-400 hover:to-amber-400"><HomeText en={showForm ? "Hide order details" : "Continue to order"} de={showForm ? "Bestelldetails ausblenden" : "Weiter zur Bestellung"} /> <span aria-hidden="true">→</span></button>
            {showForm && <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              {orderReference ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center"><p className="text-sm font-extrabold text-emerald-800"><HomeText en="Your order has been received!" de="Ihre Bestellung ist eingegangen!" /></p><p className="mt-2 text-xs text-emerald-700"><HomeText en="Reference:" de="Referenz:" /> {orderReference}</p><p className="mt-2 text-xs text-emerald-700"><HomeText en="Our team will contact you on WhatsApp to confirm the details" de="Unser Team wird Sie per WhatsApp kontaktieren, um die Details zu bestätigen" /></p></div> : <form onSubmit={handleSubmit}>
                <p className="mb-3 text-sm font-extrabold text-[#03112a]"><HomeText en="Your details" de="Ihre Angaben" /></p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required maxLength={120} value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder={isGerman ? "Vollständiger Name" : isFrench ? "Nom complet" : "Full name"} autoComplete="name" className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none focus:border-orange-400" />
                  <div className="flex min-w-0 gap-2 sm:col-span-2"><select aria-label={isGerman ? "WhatsApp-Ländervorwahl" : isFrench ? "Indicatif téléphonique WhatsApp" : "WhatsApp country code"} value={whatsappCountryCode} onChange={(event) => setWhatsappCountryCode(event.target.value)} className="w-[42%] min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-3 text-xs text-slate-900 outline-none focus:border-orange-400 sm:w-[38%]">{countryCodes.map((country) => <option key={country.code + country.name} value={country.code}>{country.flag} {country.code} · {isGerman ? (germanCountryNames[country.name] || country.name) : isFrench ? frenchHomeText(country.name === "Czechia" ? "Czech Republic" : country.name) : country.name}</option>)}</select><input required type="tel" maxLength={25} value={form.whatsapp} onChange={(event) => setForm({ ...form, whatsapp: event.target.value })} placeholder={isGerman ? "WhatsApp-Nummer" : isFrench ? "Numéro WhatsApp" : "WhatsApp number"} autoComplete="tel-national" className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none focus:border-orange-400" /></div>
                  <input required type="date" value={form.arrivalDate} onChange={(event) => setForm({ ...form, arrivalDate: event.target.value })} aria-label={isGerman ? "Ankunftsdatum" : isFrench ? "Date d’arrivée" : "Arrival date"} className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none focus:border-orange-400" />
                  <input required maxLength={160} value={form.hotel} onChange={(event) => setForm({ ...form, hotel: event.target.value })} placeholder={isGerman ? "Hotelname" : isFrench ? "Nom de l’hôtel" : "Hotel name"} className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none focus:border-orange-400" />
                  <input maxLength={40} value={form.roomNumber} onChange={(event) => setForm({ ...form, roomNumber: event.target.value })} placeholder={isGerman ? "Zimmernummer (falls vorhanden)" : isFrench ? "Numéro de chambre (facultatif)" : "Room number (if available)"} className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none focus:border-orange-400 sm:col-span-2" />
                </div>
                <div className="mt-4"><p className="mb-2 text-xs font-extrabold text-[#03112a]"><HomeText en="Choose delivery option" de="Wählen Sie die Zustelloption" /></p><div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setDelivery("airport")} className={`rounded-xl border px-3 py-3 text-left transition ${delivery === "airport" ? "border-orange-400 bg-orange-50 ring-1 ring-orange-200" : "border-slate-200 bg-white hover:border-slate-300"}`}><span className="block text-xs font-extrabold text-[#03112a]"><HomeText en="Airport pickup" de="Abholung am Flughafen" /></span><span className="mt-1 block text-[11px] font-semibold text-emerald-600"><HomeText en="Free" de="Kostenlos" /></span></button>
                  <button type="button" onClick={() => setDelivery("hotel")} className={`rounded-xl border px-3 py-3 text-left transition ${delivery === "hotel" ? "border-orange-400 bg-orange-50 ring-1 ring-orange-200" : "border-slate-200 bg-white hover:border-slate-300"}`}><span className="block text-xs font-extrabold text-[#03112a]"><HomeText en="Hotel delivery" de="Lieferung zum Hotel" /></span><span className="mt-1 block text-[11px] font-semibold text-orange-600">+ {symbol}{deliveryFee}</span></button>
                </div></div>
                {orderError && <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{orderError}</p>}
                <button type="submit" disabled={submitting || !activeNetworks.length || !activePackages.length} className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#03112a] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"><><HomeText en={submitting ? "Submitting order..." : "Confirm SIM order"} de={submitting ? "Bestellung wird gesendet..." : "SIM-Bestellung bestätigen"} />{" · " + symbol + total}</></button>
                <p className="mt-3 text-center text-[10px] leading-5 text-slate-500"><HomeText en="Your order details will be sent securely to Via Blue for confirmation" de="Ihre Bestelldaten werden sicher zur Bestätigung an Via Blue gesendet" /></p>
              </form>}
            </div>}
          </div>
        </div>
        <p className="mt-4 text-center text-[10px] text-slate-500"><HomeText en="Network availability and package activation are subject to confirmation" de="Die Netzverfügbarkeit und Aktivierung des Pakets müssen noch bestätigt werden" /></p>
      </div>
    </section>
  );
}
