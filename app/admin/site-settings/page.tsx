import Link from "next/link";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { mergeSiteSettings } from "@/lib/siteSettings";
import { updateSiteSettings } from "./actions";

type SearchParams = Promise<{ saved?: string; error?: string }>;

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export default async function AdminSiteSettingsPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return <main className="min-h-screen bg-slate-50 p-6 text-slate-900"><div className="mx-auto max-w-3xl rounded-2xl bg-white p-8"><h1 className="text-2xl font-bold">Site Settings</h1><p className="mt-3 text-red-600">Supabase admin connection is not configured. Check the server-side Supabase admin key in Vercel.</p><Link className="mt-5 inline-block text-blue-700 underline" href="/admin">Back to dashboard</Link></div></main>;
  }

  const { data, error } = await supabase.from("website_content_overrides").select("content").eq("section", "site-settings").maybeSingle();
  const settings = mergeSiteSettings(data?.content);

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-slate-900 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin" className="text-sm font-semibold text-blue-700 hover:underline">← Dashboard</Link>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950">Site Settings</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Manage the website-wide SEO title, search description and keywords. Saved changes are used in the page metadata.</p>

        {params.saved && <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">Site settings saved successfully.</div>}
        {params.error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{params.error === "connection" ? "Supabase admin connection is unavailable." : params.error === "invalid" ? "Check that every field is filled in and within its character limit." : "Could not save settings. Check the database table and server logs."}</div>}
        {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Could not load saved settings. Default values are shown. {error.message}</div>}

        <form action={updateSiteSettings} className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <label className="block text-sm font-bold text-slate-700">SEO title <span className="font-normal text-slate-400">(max 160 characters)</span>
            <input name="seo_title" required maxLength={160} defaultValue={settings.seo_title} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-bold text-slate-700">SEO description <span className="font-normal text-slate-400">(max 320 characters)</span>
            <textarea name="seo_description" required maxLength={320} rows={4} defaultValue={settings.seo_description} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
            <span className="mt-1 block text-xs font-normal text-slate-400">A short summary that may appear below the site title in search results.</span>
          </label>
          <label className="block text-sm font-bold text-slate-700">SEO keywords <span className="font-normal text-slate-400">(comma-separated, max 1000 characters)</span>
            <textarea name="seo_keywords" required maxLength={1000} rows={3} defaultValue={settings.seo_keywords} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <p className="max-w-sm text-xs leading-5 text-slate-400">These settings change metadata, not the visible homepage headings. Search engines may take time to refresh indexed results.</p>
            <button type="submit" className="rounded-xl bg-blue-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800">Save site settings</button>
          </div>
        </form>
      </div>
    </main>
  );
}
