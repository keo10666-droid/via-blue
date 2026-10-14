import Link from "next/link";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { tours, tourCategories } from "@/data/tours";
import { createCustomTour, updateTourPricing } from "./actions";

type SearchParams = Promise<{ saved?: string; error?: string; q?: string }>;

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export default async function AdminToursPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const searchQuery = (params.q ?? "").trim().toLowerCase();
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return <main className="min-h-screen bg-slate-50 p-6 text-slate-900"><div className="mx-auto max-w-4xl rounded-2xl bg-white p-8"><h1 className="text-2xl font-bold">Tours & Experiences</h1><p className="mt-3 text-red-600">Database connection is not configured. Check the server-side Supabase admin key in Vercel.</p><Link className="mt-5 inline-block text-blue-700 underline" href="/admin">Back to dashboard</Link></div></main>;
  }

  const { data, error } = await supabase.from("tour_catalog_overrides").select("slug,category,name,description,image,price,child_price,infant_price,available,pricing_options");
  const overrides = new Map((data ?? []).map((item) => [item.slug, item]));
  const categoryOrder = Object.keys(tourCategories);
  const tourList = Object.values(tours)
    .filter((tour) => {
      const saved = overrides.get(tour.slug);
      const haystack = [tour.name, saved?.name, tour.slug, tourCategories[tour.category]].filter(Boolean).join(" ").toLowerCase();
      return !searchQuery || haystack.includes(searchQuery);
    })
    .sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
  const customTourList = (data ?? []).filter((item) => {
    if (Object.prototype.hasOwnProperty.call(tours, item.slug) || !item.category) return false;
    const haystack = [item.name, item.slug, tourCategories[item.category as keyof typeof tourCategories] ?? item.category].filter(Boolean).join(" ").toLowerCase();
    return !searchQuery || haystack.includes(searchQuery);
  });

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-slate-900 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Via Blue · Management</p><p className="mt-1 text-sm font-semibold text-slate-700">Choose a tour, make your changes, then save once</p></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">Simple editing mode</span></div></div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div><Link href="/admin" className="text-sm font-semibold text-blue-700 hover:underline">← Dashboard</Link><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950">Tours & Experiences</h1><p className="mt-2 text-sm text-slate-500">Edit tour names, descriptions, images, prices in euros, and booking availability.</p></div>
          <a href="/tours" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold">View tour catalog ↗</a>
        </div>

        {params.saved && <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">Tour changes saved. The updated content, prices, and availability are stored in the database.</div>}
        {params.error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{params.error === "connection" ? "Supabase admin connection is unavailable." : params.error === "upload" ? "Could not upload images. Check Supabase Storage settings and try again." : params.error === "duplicate" ? "That URL slug is already in use. Choose a different slug." : params.error === "invalid" ? "Please enter a valid slug and prices (0 or more)." : params.error === "content" ? "Please enter a name, description, category, valid slug, and image path or HTTPS image URL. Check the maximum lengths." : "Could not save changes. Check the database table and server logs."}</div>}
        {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Could not load saved tour prices. Showing the default catalog values. {error.message}</div>}

        <form method="get" className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
          <label htmlFor="tour-search" className="sr-only">Search tours</label>
          <input id="tour-search" name="q" type="search" defaultValue={params.q ?? ""} placeholder="Search by tour name, category, or slug…" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          <button type="submit" className="rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800">Search tours</button>
          {params.q && <Link href="/admin/tours" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-slate-600 hover:bg-slate-50">Clear</Link>}
        </form>
        {searchQuery && <p className="mb-4 text-sm text-slate-500">Showing matching tours for <strong className="text-slate-800">{params.q}</strong>.</p>}

        <section className="mb-7 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-extrabold text-blue-950">Add a new tour</h2>
          <p className="mt-1 text-sm text-slate-500">Create a new experience with its category, image, description, and prices.</p>
          <form action={createCustomTour} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-xs font-bold text-slate-500">Tour name<input name="name" required maxLength={120} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" placeholder="e.g. Sunset Boat Trip" /></label>
            <label className="text-xs font-bold text-slate-500">URL slug<input name="slug" required maxLength={120} pattern="[a-z0-9]+(-[a-z0-9]+)*" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" placeholder="sunset-boat-trip" /></label>
            <label className="text-xs font-bold text-slate-500">Category<select name="category" required defaultValue="islands-boat-trips" className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900">{Object.entries(tourCategories).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label className="text-xs font-bold text-slate-500">Cover image path or HTTPS URL<input name="image" required maxLength={500} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" placeholder="/tours/my-tour.webp" /></label><label className="text-xs font-bold text-slate-500">Upload gallery photos<input name="gallery_uploads" type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-bold file:text-blue-900" /><span className="mt-1 block font-normal text-slate-400">Up to 10 images, 8 MB each.</span></label>
            <label className="text-xs font-bold text-slate-500">Adult (€)<input name="price" type="number" min="0" max="100000" step="0.01" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /></label>
            <label className="text-xs font-bold text-slate-500">Child (€)<input name="child_price" type="number" min="0" max="100000" step="0.01" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /></label>
            <label className="text-xs font-bold text-slate-500">Infant (€)<input name="infant_price" type="number" min="0" max="100000" step="0.01" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /></label>
            <label className="col-span-full text-xs font-bold text-slate-500">Short description<textarea name="description" required maxLength={1500} rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /></label>
            <div className="col-span-full"><button type="submit" className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-white hover:bg-orange-600">Create tour</button></div>
          </form>
        </section>

        <div className="space-y-4">
          {tourList.map((tour) => {
            const saved = overrides.get(tour.slug);
            const adult = saved?.price ?? tour.price;
            const child = saved?.child_price ?? tour.childPrice;
            const infant = saved?.infant_price ?? tour.infantPrice;
            const available = saved?.available ?? tour.available;
            const name = tour.name;
            const description = saved?.description ?? tour.description;
            const image = saved?.image ?? tour.image;
            const savedPricingOptions = saved?.pricing_options ?? {};
            const galleryImages = Array.isArray(savedPricingOptions.gallery) ? savedPricingOptions.gallery : tour.gallery;
            const vehicleOptions = savedPricingOptions.vehicleOptions ?? tour.vehicleOptions;
            const cairoOptions = savedPricingOptions.cairoOptions ?? tour.cairoOptions;
            return (
              <form key={tour.slug} action={updateTourPricing} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <input type="hidden" name="slug" value={tour.slug} />
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 lg:max-w-[280px]"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{tourCategories[tour.category]}</p><h2 className="mt-1 text-lg font-extrabold text-blue-950">{name}</h2><p className="mt-1 text-xs text-slate-400">/{tour.slug}</p></div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:min-w-[610px]">
                    <label className="text-xs font-bold text-slate-500">Tour name<input name="name" type="text" maxLength={120} required defaultValue={tour.name} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400" /></label>
                    <label className="text-xs font-bold text-slate-500">Image path or URL<input name="image" type="text" maxLength={500} required defaultValue={image} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400" /></label>
                    <label className="col-span-full text-xs font-bold text-slate-500">Short description<textarea name="description" maxLength={1500} required defaultValue={description} rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-orange-400" /></label>
                    <div className="col-span-full flex flex-wrap gap-3">{galleryImages.slice(0, 8).map((src: string, index: number) => <div key={`${src}-${index}`} className="h-20 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-50"><img src={src} alt={`Gallery image ${index + 1}`} className="h-full w-full object-cover" /></div>)}</div><label className="col-span-full text-xs font-bold text-slate-500">Upload gallery photos<input name="gallery_uploads" type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-bold file:text-blue-900" /><span className="mt-1 block font-normal text-slate-400">Choose up to 10 images (8 MB each); they are added when you save.</span></label><label className="col-span-full text-xs font-bold text-slate-500">Gallery images — one image path or HTTPS URL per line<textarea name="gallery_images" maxLength={10000} defaultValue={galleryImages.join("\n")} rows={Math.min(6, Math.max(3, galleryImages.length))} placeholder="/images/tour-photo.webp" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-orange-400" /><span className="mt-1 block font-normal text-slate-400">Keep the images you want to use. Delete a line to remove an image, or add a new URL on a new line. The cover image is controlled by the Image field above.</span></label>
                    <label className="text-xs font-bold text-slate-500">Adult (€)<input name="price" type="number" min="0" max="100000" step="0.01" required defaultValue={adult} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></label>
                    <label className="text-xs font-bold text-slate-500">Child (€)<input name="child_price" type="number" min="0" max="100000" step="0.01" required defaultValue={child} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></label>
                    <label className="text-xs font-bold text-slate-500">Infant (€)<input name="infant_price" type="number" min="0" max="100000" step="0.01" required defaultValue={infant} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></label>
                    <label className="text-xs font-bold text-slate-500">Availability<select name="available" defaultValue={String(available)} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400"><option value="true">Available</option><option value="false">Unavailable</option></select></label>
                    {vehicleOptions && <fieldset className="col-span-full rounded-xl border border-blue-100 bg-blue-50/50 p-4"><legend className="px-2 text-sm font-extrabold text-blue-950">Luxor booking prices (€)</legend><p className="mb-3 text-xs text-slate-500">These prices control the Bus/Van choices on the booking page.</p><div className="grid gap-4 sm:grid-cols-2">{(["bus", "van"] as const).map((vehicle) => <div key={vehicle} className="rounded-lg border border-slate-200 bg-white p-3"><h3 className="mb-2 font-bold capitalize text-blue-950">{vehicle}</h3><div className="grid grid-cols-3 gap-2">{(["adult", "child", "infant"] as const).map((kind) => <label key={kind} className="text-[11px] font-semibold text-slate-500">{kind}<input name={`pricing_vehicle_${vehicle}_${kind}`} type="number" min="0" max="100000" step="0.01" required defaultValue={vehicleOptions[vehicle][kind === "adult" ? "adultPrice" : kind === "child" ? "childPrice" : "infantPrice"]} className="mt-1 w-full rounded-md border border-slate-200 px-2 py-2 text-sm text-slate-900" /></label>)}</div></div>)}</div></fieldset>}
                    {cairoOptions && <fieldset className="col-span-full rounded-xl border border-blue-100 bg-blue-50/50 p-4"><legend className="px-2 text-sm font-extrabold text-blue-950">Cairo booking prices (€)</legend><p className="mb-3 text-xs text-slate-500">Set prices for each museum and transport option. These control the booking total.</p><div className="grid gap-4 sm:grid-cols-2">{(["oldMuseum", "newMuseum"] as const).map((museum) => <div key={museum} className="rounded-lg border border-slate-200 bg-white p-3"><h3 className="mb-2 font-bold text-blue-950">{museum === "oldMuseum" ? "Old Museum" : "New Museum"}</h3><div className="grid gap-3">{(["bus", "van"] as const).map((vehicle) => <div key={vehicle}><p className="mb-1 text-xs font-bold capitalize text-slate-600">{vehicle}</p><div className="grid grid-cols-3 gap-2">{(["adult", "child", "infant"] as const).map((kind) => <label key={kind} className="text-[11px] font-semibold text-slate-500">{kind}<input name={`pricing_cairo_${museum}_${vehicle}_${kind}`} type="number" min="0" max="100000" step="0.01" required defaultValue={cairoOptions[museum][vehicle][kind === "adult" ? "adultPrice" : kind === "child" ? "childPrice" : "infantPrice"]} className="mt-1 w-full rounded-md border border-slate-200 px-2 py-2 text-sm text-slate-900" /></label>)}</div></div>)}</div></div>)}</div></fieldset>}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4"><span className={`text-xs font-semibold ${saved ? "text-emerald-700" : "text-slate-400"}`}>{saved ? "Custom pricing saved" : "Using current website price"}</span><button type="submit" className="rounded-xl bg-blue-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800">Save changes</button></div>
              </form>
            );
          })}
          {customTourList.map((tour) => (
            <form key={tour.slug} action={updateTourPricing} className="rounded-2xl border border-orange-200 bg-white p-5 shadow-sm sm:p-6">
              <input type="hidden" name="slug" value={tour.slug} />
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-orange-600">Custom tour · {tourCategories[tour.category as keyof typeof tourCategories] ?? tour.category} · /{tour.slug}</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <label className="text-xs font-bold text-slate-500">Tour name<input name="name" required maxLength={120} defaultValue={tour.name ?? ""} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /></label>
                <label className="text-xs font-bold text-slate-500">Image path or HTTPS URL<input name="image" required maxLength={500} defaultValue={tour.image ?? ""} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /></label>
                <label className="text-xs font-bold text-slate-500">Adult (€)<input name="price" type="number" min="0" max="100000" step="0.01" required defaultValue={tour.price} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /></label>
                <label className="text-xs font-bold text-slate-500">Child (€)<input name="child_price" type="number" min="0" max="100000" step="0.01" required defaultValue={tour.child_price} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /></label>
                <label className="text-xs font-bold text-slate-500">Infant (€)<input name="infant_price" type="number" min="0" max="100000" step="0.01" required defaultValue={tour.infant_price} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /></label>
                <label className="text-xs font-bold text-slate-500">Availability<select name="available" defaultValue={String(tour.available)} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900"><option value="true">Available</option><option value="false">Unavailable</option></select></label>
                <label className="col-span-full text-xs font-bold text-slate-500">Short description<textarea name="description" required maxLength={1500} rows={3} defaultValue={tour.description ?? ""} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /></label><div className="col-span-full flex flex-wrap gap-3">{(Array.isArray(tour.pricing_options?.gallery) ? tour.pricing_options.gallery : [tour.image]).slice(0, 8).map((src: string, index: number) => <div key={`${src}-${index}`} className="h-20 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-50"><img src={src} alt={`Gallery image ${index + 1}`} className="h-full w-full object-cover" /></div>)}</div><label className="col-span-full text-xs font-bold text-slate-500">Upload gallery photos<input name="gallery_uploads" type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-bold file:text-blue-900" /><span className="mt-1 block font-normal text-slate-400">Choose up to 10 images (8 MB each); they are added when you save.</span></label><label className="col-span-full text-xs font-bold text-slate-500">Gallery images — one image path or HTTPS URL per line<textarea name="gallery_images" maxLength={10000} rows={3} defaultValue={Array.isArray(tour.pricing_options?.gallery) ? tour.pricing_options.gallery.join("\n") : tour.image ?? ""} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900" /><span className="mt-1 block font-normal text-slate-400">Delete a line to remove an image or add another URL on a new line.</span></label>
              </div>
              <div className="mt-4 flex justify-end"><button type="submit" className="rounded-xl bg-blue-950 px-5 py-2.5 text-sm font-bold text-white">Save custom tour</button></div>
            </form>
          ))}
        </div>
        <p className="mt-6 text-xs leading-5 text-slate-400">Tour name, description, image path/URL and prices are saved in the database and update the live catalog without a redeployment.</p>
      </div>
    </main>
  );
}
