import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import type { ComponentType } from "react";
import { redirect } from "next/navigation";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarCheck,
  CarFront,
  ExternalLink,
  Globe2,
  MessageSquareText,
  Settings2,
  ShieldCheck,
  Ship,
  Sparkles,
} from "lucide-react";

import { logoutAdmin } from "@/app/admin/login/actions";
import { tours } from "@/data/tours";
import { transfers } from "@/data/transfers";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;

  if (!password || cookieValue !== hashSecret(password)) {
    redirect("/admin/login");
  }
}

function MetricCard({
  label,
  value,
  note,
  icon: Icon,
  tone = "blue",
}: {
  label: string;
  value: string | number;
  note: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  tone?: "blue" | "orange" | "green" | "purple";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-emerald-50 text-emerald-700",
    purple: "bg-violet-50 text-violet-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">{value}</p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones[tone]}`}>
          <Icon size={21} />
        </span>
      </div>
      <p className="mt-4 text-xs font-medium leading-5 text-slate-500">{note}</p>
    </div>
  );
}

const modules = [
  {
    title: "Booking requests",
    description: "Review customer requests, contact details and trip information.",
    href: "/admin/bookings",
    icon: CalendarCheck,
    tag: "Available now",
    available: true,
    iconClass: "bg-orange-50 text-orange-600",
  },
  {
    title: "Tours & experiences",
    description: "Manage tour descriptions, prices, availability and gallery images.",
    href: "",
    icon: Ship,
    tag: "Next module",
    available: false,
    iconClass: "bg-blue-50 text-blue-700",
  },
  {
    title: "Transfers & vehicles",
    description: "Edit routes, vehicle types, passenger capacity and prices.",
    href: "",
    icon: CarFront,
    tag: "Next module",
    available: false,
    iconClass: "bg-violet-50 text-violet-700",
  },
  {
    title: "Reviews",
    description: "Review customer feedback and manage which reviews are visible.",
    href: "/admin/reviews",
    icon: MessageSquareText,
    tag: "Available now",
    available: true,
    iconClass: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Website content",
    description: "Update homepage text, contact details, FAQs and important sections.",
    href: "",
    icon: Globe2,
    tag: "Next module",
    available: false,
    iconClass: "bg-sky-50 text-sky-700",
  },
  {
    title: "Site settings",
    description: "SEO, language content and other website-wide settings.",
    href: "",
    icon: Settings2,
    tag: "Next module",
    available: false,
    iconClass: "bg-slate-100 text-slate-700",
  },
];

export default async function AdminDashboardPage() {
  await requireAdmin();

  const supabase = createSupabaseAdminClient();
  let totalBookings: number | null = null;
  let newBookings: number | null = null;
  let confirmedBookings: number | null = null;
  let totalReviews: number | null = null;

  if (supabase) {
    const [all, received, confirmed, reviews] = await Promise.all([
      supabase.from("booking_requests").select("id", { count: "exact", head: true }),
      supabase.from("booking_requests").select("id", { count: "exact", head: true }).eq("status", "received"),
      supabase.from("booking_requests").select("id", { count: "exact", head: true }).eq("status", "confirmed"),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
    ]);

    totalBookings = all.error ? null : all.count ?? 0;
    newBookings = received.error ? null : received.count ?? 0;
    confirmedBookings = confirmed.error ? null : confirmed.count ?? 0;
    totalReviews = reviews.error ? null : reviews.count ?? 0;
  }

  const tourCount = Object.keys(tours).length;
  const transferCount = Object.keys(transfers).length;

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-[260px] shrink-0 flex-col border-r border-slate-200 bg-white p-5 lg:flex">
          <a href="/admin" className="flex items-center gap-3 px-2 py-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-950 text-sm font-black tracking-wide text-white">VB</span>
            <span>
              <span className="block text-base font-extrabold tracking-tight text-blue-950">Via Blue</span>
              <span className="mt-0.5 block text-[11px] font-semibold text-slate-400">Management dashboard</span>
            </span>
          </a>

          <div className="mt-9">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Workspace</p>
            <a href="/admin" className="mt-3 flex items-center gap-3 rounded-2xl bg-blue-50 px-3 py-3 text-sm font-bold text-blue-950">
              <Activity size={18} /> Overview
            </a>
            <a href="/admin/bookings" className="mt-1 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-950">
              <CalendarCheck size={18} /> Booking requests
            </a>
          </div>

          <div className="mt-8">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Manage website</p>
            <div className="mt-3 space-y-1">
              {modules.slice(1).map((module) => module.available ? (
                <a key={module.title} href={module.href} className="mt-1 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-950">
                  <module.icon size={18} /> <span className="flex-1">{module.title}</span>
                </a>
              ) : (
                <div key={module.title} title="This editing section is planned for the next build phase" className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-400">
                  <module.icon size={18} /> <span className="flex-1">{module.title}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <ShieldCheck size={16} className="text-emerald-600" /> Private admin area
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">Only signed-in administrators can access this workspace.</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-7 lg:px-10">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-xs font-black text-white lg:hidden">VB</span>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Via Blue / Admin</p>
                  <h1 className="mt-0.5 text-lg font-extrabold tracking-tight text-blue-950 sm:text-xl">Overview</h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a href="https://viabluetours.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 sm:px-4 sm:text-sm">
                  <ExternalLink size={15} /> <span className="hidden sm:inline">View website</span>
                </a>
                <form action={logoutAdmin}>
                  <button type="submit" className="rounded-xl bg-blue-950 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-blue-900 sm:px-4 sm:text-sm">Log out</button>
                </form>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-8 px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
            <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-950 via-blue-900 to-[#123d70] p-6 text-white shadow-xl shadow-blue-950/10 sm:p-8 lg:p-10">
              <div className="absolute -right-16 -top-28 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl" />
              <div className="absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-blue-100">
                    <Sparkles size={14} className="text-orange-300" /> Your business at a glance
                  </div>
                  <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome to your workspace</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">A simple place to monitor requests and, step by step, manage your Via Blue website without editing code.</p>
                </div>
                <a href="/admin/bookings" className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-400 md:self-auto">
                  Open bookings <ArrowRight size={17} />
                </a>
              </div>
            </section>

            <section>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-950">Business overview</h2>
                  <p className="mt-1 text-sm text-slate-500">Live counts from your current catalog and booking database.</p>
                </div>
                {!supabase && <p className="text-xs font-semibold text-orange-600">Database admin connection is not configured.</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                <MetricCard label="Booking requests" value={totalBookings ?? "—"} note="All requests received through the website" icon={CalendarCheck} tone="orange" />
                <MetricCard label="Awaiting review" value={newBookings ?? "—"} note="Requests that still need your attention" icon={Activity} tone="blue" />
                <MetricCard label="Confirmed bookings" value={confirmedBookings ?? "—"} note="Requests marked as confirmed" icon={ArrowUpRight} tone="green" />
                <MetricCard label="Published tour catalog" value={tourCount} note={`Tours currently stored in the website code · ${transferCount} transfer routes`} icon={Ship} tone="purple" />
              </div>
              {totalReviews !== null && (
                <p className="mt-3 text-xs text-slate-500">Customer reviews in the database: <strong className="text-slate-700">{totalReviews}</strong></p>
              )}
            </section>

            <section>
              <div className="mb-4">
                <h2 className="text-lg font-extrabold text-slate-950">Management tools</h2>
                <p className="mt-1 text-sm text-slate-500">Your main controls, grouped by task.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {modules.map((module) => (
                  <article key={module.title} className={`rounded-3xl border bg-white p-5 shadow-sm shadow-slate-200/30 transition ${module.available ? "border-slate-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md" : "border-dashed border-slate-200"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${module.iconClass}`}><module.icon size={21} /></span>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${module.available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{module.tag}</span>
                    </div>
                    <h3 className="mt-5 text-base font-extrabold text-slate-950">{module.title}</h3>
                    <p className="mt-2 min-h-10 text-sm leading-6 text-slate-500">{module.description}</p>
                    {module.available ? (
                      <a href={module.href} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-800 hover:text-orange-600">Open section <ArrowRight size={16} /></a>
                    ) : (
                      <p className="mt-5 text-xs font-semibold text-slate-400">Being prepared for the next build phase</p>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><BookOpen size={19} /></span>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Built to be easy to use</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">The booking inbox is already connected. The next step is moving tour prices and website content into editable, secure settings so changes here appear on the public site.</p>
                </div>
              </div>
              <a href="/admin/bookings" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-800 hover:text-orange-600">Manage requests <ArrowDownRight size={16} /></a>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
