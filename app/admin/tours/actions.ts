"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { tours } from "@/data/tours";

async function uploadGalleryFiles(
  supabase: NonNullable<ReturnType<typeof createSupabaseAdminClient>>,
  slug: string,
  formData: FormData,
) {
  const files = formData.getAll("gallery_uploads").filter((entry): entry is File => typeof File !== "undefined" && entry instanceof File && entry.size > 0);
  if (files.length === 0) return [];
  if (files.length > 10 || files.some((file) => !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type) || file.size > 8 * 1024 * 1024)) redirect("/admin/tours?error=content");

  const bucket = "tour-images";
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  if (bucketsError) redirect("/admin/tours?error=upload");
  if (!buckets?.some((item) => item.name === bucket)) {
    const { error } = await supabase.storage.createBucket(bucket, { public: true, fileSizeLimit: 8 * 1024 * 1024, allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"] });
    if (error) {
      console.error("Tour image bucket setup failed:", error.message);
      redirect("/admin/tours?error=upload");
    }
  }

  const urls: string[] = [];
  for (const [index, file] of files.entries()) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const objectPath = `${slug}/${Date.now()}-${index}-${safeName}`;
    const { error } = await supabase.storage.from(bucket).upload(objectPath, file, { contentType: file.type, upsert: false });
    if (error) {
      console.error("Tour image upload failed:", error.message);
      redirect("/admin/tours?error=upload");
    }
    urls.push(supabase.storage.from(bucket).getPublicUrl(objectPath).data.publicUrl);
  }
  return urls;
}

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export async function updateTourPricing(formData: FormData) {
  await requireAdmin();

  const slug = String(formData.get("slug") || "");
  const tour = tours[slug as keyof typeof tours];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) redirect("/admin/tours?error=invalid");

  const parsePrice = (key: string) => {
    const raw = String(formData.get(key) ?? "");
    const value = Number(raw);
    return raw.trim() !== "" && Number.isFinite(value) && value >= 0 && value <= 100000
      ? value
      : null;
  };

  const price = parsePrice("price");
  const childPrice = parsePrice("child_price");
  const infantPrice = parsePrice("infant_price");
  if (price === null || childPrice === null || infantPrice === null) {
    redirect("/admin/tours?error=invalid");
  }

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  if (!name || name.length > 120 || !description || description.length > 1500 || !image || image.length > 500 || !(image.startsWith("/") || /^https:\/\//i.test(image))) {
    redirect("/admin/tours?error=content");
  }

  const available = String(formData.get("available")) === "true";
  const galleryRaw = String(formData.get("gallery_images") ?? "").trim();
  const galleryImages = galleryRaw ? [...new Set(galleryRaw.split(/\r?\n/).map((item) => item.trim()).filter(Boolean))] : [];
  if (galleryImages.length > 20 || galleryImages.some((item) => item.length > 500 || !(item.startsWith("/") || /^https:\/\//i.test(item)))) redirect("/admin/tours?error=content");
  const readMatrixPrice = (key: string) => parsePrice(key);
  let pricingOptions: Record<string, unknown> | null = null;
  if (tour?.vehicleOptions) {
    const readVehicle = (vehicle: "bus" | "van") => ({
      name: vehicle === "bus" ? "Bus" : "Van",
      adultPrice: readMatrixPrice(`pricing_vehicle_${vehicle}_adult`),
      childPrice: readMatrixPrice(`pricing_vehicle_${vehicle}_child`),
      infantPrice: readMatrixPrice(`pricing_vehicle_${vehicle}_infant`),
    });
    const bus = readVehicle("bus");
    const van = readVehicle("van");
    if ([bus.adultPrice, bus.childPrice, bus.infantPrice, van.adultPrice, van.childPrice, van.infantPrice].some((value) => value === null)) redirect("/admin/tours?error=invalid");
    pricingOptions = { vehicleOptions: { bus, van } };
  } else if (tour?.cairoOptions) {
    const readCairoOption = (museum: "oldMuseum" | "newMuseum", vehicle: "bus" | "van") => ({
      adultPrice: readMatrixPrice(`pricing_cairo_${museum}_${vehicle}_adult`),
      childPrice: readMatrixPrice(`pricing_cairo_${museum}_${vehicle}_child`),
      infantPrice: readMatrixPrice(`pricing_cairo_${museum}_${vehicle}_infant`),
    });
    const oldMuseum = { name: "Old Museum", bus: readCairoOption("oldMuseum", "bus"), van: readCairoOption("oldMuseum", "van") };
    const newMuseum = { name: "New Museum", bus: readCairoOption("newMuseum", "bus"), van: readCairoOption("newMuseum", "van") };
    const values = [oldMuseum.bus, oldMuseum.van, newMuseum.bus, newMuseum.van].flatMap((option) => [option.adultPrice, option.childPrice, option.infantPrice]);
    if (values.some((value) => value === null)) redirect("/admin/tours?error=invalid");
    pricingOptions = { cairoOptions: { oldMuseum, newMuseum } };
  }
  const matrixDefault = (pricingOptions?.vehicleOptions as { bus: { adultPrice: number; childPrice: number; infantPrice: number } } | undefined)?.bus
    ?? (pricingOptions?.cairoOptions as { oldMuseum: { bus: { adultPrice: number; childPrice: number; infantPrice: number } } } | undefined)?.oldMuseum.bus;
  const effectivePrice = matrixDefault?.adultPrice ?? price;
  const effectiveChildPrice = matrixDefault?.childPrice ?? childPrice;
  const effectiveInfantPrice = matrixDefault?.infantPrice ?? infantPrice;
  const supabase = createSupabaseAdminClient();
  if (!supabase) redirect("/admin/tours?error=connection");

  const { data: existingRow } = await supabase.from("tour_catalog_overrides").select("category,pricing_options,image").eq("slug", slug).maybeSingle();
  let savedCategory: string | undefined;
  if (!tour) {
    if (!existingRow?.category) redirect("/admin/tours?error=invalid");
    savedCategory = existingRow.category;
  }
  const uploadedImages = await uploadGalleryFiles(supabase, slug, formData);
  galleryImages.push(...uploadedImages);
  if (galleryImages.length > 20) redirect("/admin/tours?error=content");
  const existingOptions = (existingRow?.pricing_options ?? {}) as Record<string, unknown>;
  const nextPricingOptions = { ...existingOptions, ...(pricingOptions ?? {}), gallery: galleryImages };

  const { error } = await supabase.from("tour_catalog_overrides").upsert({
    slug,
    ...(savedCategory ? { category: savedCategory } : {}),
    name,
    description,
    image,
    price: effectivePrice,
    child_price: effectiveChildPrice,
    infant_price: effectiveInfantPrice,
    pricing_options: nextPricingOptions,
    available,
    updated_at: new Date().toISOString(),
  }, { onConflict: "slug" });

  if (error) {
    console.error("Tour pricing update failed:", error.message);
    redirect("/admin/tours?error=save");
  }

  // Permanently remove deleted gallery uploads from Supabase Storage, but only
  // when the same image is no longer used as the cover or in the saved gallery.
  const oldGallery = Array.isArray(existingRow?.pricing_options?.gallery)
    ? existingRow.pricing_options.gallery.filter((item: unknown): item is string => typeof item === "string")
    : [];
  const retainedImages = new Set([image, ...galleryImages]);
  const storagePathsToDelete = [...new Set(oldGallery
    .filter((src) => !retainedImages.has(src))
    .map((src) => {
      const marker = "/storage/v1/object/public/tour-images/";
      const markerIndex = src.indexOf(marker);
      if (markerIndex < 0) return null;
      try {
        const objectPath = decodeURIComponent(src.slice(markerIndex + marker.length).split("?")[0]);
        return objectPath && !objectPath.split("/").includes("..") ? objectPath : null;
      } catch {
        return null;
      }
    })
    .filter((path): path is string => Boolean(path)))];
  if (storagePathsToDelete.length) {
    const { error: deleteError } = await supabase.storage.from("tour-images").remove(storagePathsToDelete);
    if (deleteError) console.error("Removed gallery entries but could not delete stored image files:", deleteError.message);
  }

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  revalidatePath(`/tours/${slug}`);
  revalidatePath(`/tours/${slug}/book`);
  redirect("/admin/tours?saved=1");
}


export async function createCustomTour(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const category = String(formData.get("category") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const parsePrice = (key: string) => {
    const raw = String(formData.get(key) ?? "");
    const value = Number(raw);
    return raw.trim() !== "" && Number.isFinite(value) && value >= 0 && value <= 100000 ? value : null;
  };
  const price = parsePrice("price");
  const childPrice = parsePrice("child_price");
  const infantPrice = parsePrice("infant_price");
  const validCategories = ["islands-boat-trips", "snorkeling-diving", "sea-water-activities", "dolphin-experiences", "desert-adventures", "egypt-tours-excursions", "family-attractions"];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !name || name.length > 120 || !description || description.length > 1500 || !image || image.length > 500 || !(image.startsWith("/") || /^https:\/\//i.test(image)) || !validCategories.includes(category) || price === null || childPrice === null || infantPrice === null) {
    redirect("/admin/tours?error=content");
  }
  if (Object.prototype.hasOwnProperty.call(tours, slug)) redirect("/admin/tours?error=duplicate");

  const supabase = createSupabaseAdminClient();
  if (!supabase) redirect("/admin/tours?error=connection");
  const uploadedImages = await uploadGalleryFiles(supabase, slug, formData);
  const { error } = await supabase.from("tour_catalog_overrides").insert({
    slug, category, name, description, image, price, child_price: childPrice, infant_price: infantPrice, available: true, pricing_options: { gallery: [image, ...uploadedImages] }, updated_at: new Date().toISOString(),
  });
  if (error) {
    console.error("Custom tour creation failed:", error.message);
    redirect("/admin/tours?error=save");
  }
  revalidatePath("/admin/tours");
  revalidatePath("/api/tour-catalog");
  revalidatePath("/tours");
  revalidatePath(`/tours/${slug}`);
  redirect("/admin/tours?saved=1");
}
