"use client";

import { useState } from "react";

type Package = { id: string; name: string; dataGb: number; description: string; prices: { EUR: number; USD: number; GBP: number }; active: boolean };
type Network = { id: string; name: string; logo: string; active: boolean; popular: boolean };
type Settings = { packages: Package[]; deliveryPrices: { EUR: number; USD: number; GBP: number }; networks: Network[] };

export default function SimCardSettingsEditor({ initialSettings }: { initialSettings: Settings }) {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const updatePackage = (index: number, patch: Partial<Package>) => setSettings((s) => ({ ...s, packages: s.packages.map((p, i) => i === index ? { ...p, ...patch } : p) }));
  const updateNetwork = (index: number, patch: Partial<Network>) => setSettings((s) => ({ ...s, networks: s.networks.map((n, i) => i === index ? { ...n, ...patch } : n) }));
  const updatePrice = (index: number, currency: "EUR" | "USD" | "GBP", value: number) => setSettings((s) => ({ ...s, packages: s.packages.map((p, i) => i === index ? { ...p, prices: { ...p.prices, [currency]: value } } : p) }));
  const updateDelivery = (currency: "EUR" | "USD" | "GBP", value: number) => setSettings((s) => ({ ...s, deliveryPrices: { ...s.deliveryPrices, [currency]: value } }));

  async function save() {
    setSaving(true); setMessage("");
    try {
      const response = await fetch("/api/sim-card-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ settings }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Save failed");
      setMessage("Settings saved successfully. The SIM page now uses your updated settings.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save settings.");
    } finally { setSaving(false); }
  }

  return <div className="space-y-6">
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-extrabold text-blue-950">Packages & prices</h2><p className="mt-1 text-sm text-slate-500">Add packages, edit data allowances and set each currency price.</p></div><button type="button" onClick={() => setSettings((s) => ({ ...s, packages: [...s.packages, { id: "package-" + Date.now(), name: "New package", dataGb: 10, description: "", prices: { EUR: 10, USD: 10, GBP: 10 }, active: true }] }))} className="rounded-xl bg-blue-950 px-4 py-2.5 text-sm font-bold text-white">+ Add package</button></div>
      <div className="mt-5 space-y-4">
        {settings.packages.map((p, i) => <div key={p.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3"><span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">Package {i + 1}</span><div className="flex items-center gap-3"><label className="flex items-center gap-2 text-xs font-bold text-slate-600"><input type="checkbox" checked={p.active} onChange={(e) => updatePackage(i, { active: e.target.checked })}/> Active</label><button type="button" onClick={() => setSettings((s) => ({ ...s, packages: s.packages.filter((_, j) => j !== i) }))} disabled={settings.packages.length === 1} className="text-xs font-bold text-red-600 disabled:opacity-30">Remove</button></div></div>
          <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs font-bold text-slate-600">Package name<input value={p.name} onChange={(e) => updatePackage(i, { name: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"/></label><label className="text-xs font-bold text-slate-600">Data (GB)<input type="number" min="1" value={p.dataGb} onChange={(e) => updatePackage(i, { dataGb: Number(e.target.value) })} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"/></label><label className="text-xs font-bold text-slate-600 sm:col-span-2">Description<input value={p.description} onChange={(e) => updatePackage(i, { description: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"/></label></div>
          <div className="mt-3 grid grid-cols-3 gap-3">{(["EUR","USD","GBP"] as const).map((c) => <label key={c} className="text-xs font-bold text-slate-600">{c} price<input type="number" min="0" step="0.01" value={p.prices[c]} onChange={(e) => updatePrice(i,c,Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"/></label>)}</div>
        </div>)}
      </div>
      <div className="mt-5 border-t border-slate-100 pt-5"><h3 className="text-sm font-extrabold text-blue-950">Hotel delivery fee</h3><p className="mt-1 text-xs text-slate-500">Airport pickup remains free.</p><div className="mt-3 grid grid-cols-3 gap-3">{(["EUR","USD","GBP"] as const).map((c) => <label key={c} className="text-xs font-bold text-slate-600">{c} fee<input type="number" min="0" step="0.01" value={settings.deliveryPrices[c]} onChange={(e) => updateDelivery(c,Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"/></label>)}</div></div>
    </section>
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-extrabold text-blue-950">Mobile networks</h2><p className="mt-1 text-sm text-slate-500">Manage providers, their official logo URLs and visibility.</p></div><button type="button" onClick={() => setSettings((s) => ({ ...s, networks: [...s.networks, { id: "network-" + Date.now(), name: "New provider", logo: "", active: true, popular: false }] }))} className="rounded-xl bg-blue-950 px-4 py-2.5 text-sm font-bold text-white">+ Add network</button></div>
      <div className="mt-5 space-y-3">{settings.networks.map((n,i) => <div key={n.id} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1fr_1.5fr_auto] sm:items-end"><label className="text-xs font-bold text-slate-600">Provider name<input value={n.name} onChange={(e) => updateNetwork(i,{name:e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"/></label><label className="text-xs font-bold text-slate-600">Official logo URL (HTTPS)<input value={n.logo} onChange={(e) => updateNetwork(i,{logo:e.target.value})} placeholder="https://..." className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"/></label><div className="flex items-center gap-3"><label className="flex items-center gap-1.5 text-xs font-bold text-slate-600"><input type="checkbox" checked={n.active} onChange={(e) => updateNetwork(i,{active:e.target.checked})}/> Active</label><label className="flex items-center gap-1.5 text-xs font-bold text-slate-600"><input type="checkbox" checked={n.popular} onChange={(e) => updateNetwork(i,{popular:e.target.checked})}/> Bestseller</label><button type="button" onClick={() => setSettings((s) => ({ ...s, networks: s.networks.filter((_,j) => j !== i) }))} disabled={settings.networks.length === 1} className="text-xs font-bold text-red-600 disabled:opacity-30">×</button></div></div>)}</div>
    </section>
    <div className="sticky bottom-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur"><p aria-live="polite" className="text-sm font-semibold text-slate-600">{message || "Changes are not live until you save."}</p><button type="button" disabled={saving} onClick={save} className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-extrabold text-white hover:bg-orange-600 disabled:opacity-60">{saving ? "Saving…" : "Save SIM settings"}</button></div>
  </div>;
}
