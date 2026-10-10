import Link from "next/link";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { homepageContentDefaults, mergeHomepageContent } from "@/lib/websiteContent";
import { updateHomepageContent } from "./actions";

type SearchParams = Promise<{ saved?: string; error?: string }>;

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

const fields: Array<{ key: keyof typeof homepageContentDefaults; label: string; help?: string; multiline?: boolean }> = [
  { key: "experience_badge", label: "Experience banner — small heading" },
  { key: "experience_title_first", label: "Experience banner — first title line" },
  { key: "experience_title_highlight", label: "Experience banner — highlighted word" },
  { key: "experience_title_last", label: "Experience banner — final title line" },
  { key: "experience_description", label: "Experience banner — description", multiline: true },
  { key: "experience_button", label: "Experience banner — button label" },
  { key: "cta_badge", label: "Final section — small heading" },
  { key: "cta_title_first", label: "Final section — main title" },
  { key: "cta_title_highlight", label: "Final section — highlighted title" },
  { key: "cta_description", label: "Final section — description", multiline: true },
  { key: "cta_primary_button", label: "Final section — primary button" },
  { key: "cta_secondary_button", label: "Final section — secondary button" },
];

export default async function AdminWebsiteContentPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return <main className="min-h-screen bg-slate-50 p-6 text-slate-900"><div className="mx-auto max-w-4xl rounded-2xl bg-white p-8"><h1 className="text-2xl font-bold">Website Content</h1><p className="mt-3 text-red-600">Supabase admin connection is not configured. Check the server-side Supabase admin key in Vercel.</p><Link className="mt-5 inline-block text-blue-700 underline" href="/admin">Back to dashboard</Link></div></main>;
  }

  const { data, error } = await supabase.from("website_content_overrides").select("content").eq("section", "homepage").maybeSingle();
  const content = mergeHomepageContent(data?.content);

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-slate-900 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/admin" className="text-sm font-semibold text-blue-700 hover:underline">← Dashboard</Link>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950">Website Content</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Edit the text in the homepage experience banner and final call-to-action section. Changes are saved in the database and do not require editing code.</p>
        </div>

        {params.saved && <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">Homepage content saved successfully.</div>}
        {params.error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{params.error === "connection" ? "Supabase admin connection is unavailable." : params.error === "invalid" ? "Every field is required and must be 500 characters or fewer." : "Could not save content. Check the database table and server logs."}</div>}
        {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Could not load saved content. Default website text is shown. {error.message}</div>}

        <form action={updateHomepageContent} className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-extrabold text-blue-950">Experience banner</h2>
            <p className="mt-1 text-sm text-slate-500">The dark banner with the Red Sea message and experience statistics.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.filter((field) => field.key.startsWith("experience_")).map((field) => (
                <label key={field.key} className={`text-xs font-bold text-slate-600 ${field.multiline ? "sm:col-span-2" : ""}`}>
                  {field.label}
                  {field.multiline ? (
                    <textarea name={field.key} required maxLength={500} rows={3} defaultValue={content[field.key]} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                  ) : (
                    <input name={field.key} required maxLength={500} defaultValue={content[field.key]} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                  )}
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-extrabold text-blue-950">Final call-to-action</h2>
            <p className="mt-1 text-sm text-slate-500">The last promotional section at the bottom of the homepage.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.filter((field) => field.key.startsWith("cta_")).map((field) => (
                <label key={field.key} className={`text-xs font-bold text-slate-600 ${field.multiline ? "sm:col-span-2" : ""}`}>
                  {field.label}
                  {field.multiline ? (
                    <textarea name={field.key} required maxLength={500} rows={3} defaultValue={content[field.key]} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                  ) : (
                    <input name={field.key} required maxLength={500} defaultValue={content[field.key]} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                  )}
                </label>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs leading-5 text-slate-400">Current default text remains on the website until you save custom content.</p>
            <button type="submit" className="rounded-xl bg-blue-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800">Save homepage content</button>
          </div>
        </form>
      </div>
    </main>
  );
}
