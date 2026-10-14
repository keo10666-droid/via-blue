"use client";

import { useState } from "react";

export default function GalleryImageEditor({ images }: { images: string[] }) {
  const [value, setValue] = useState(images.join("\n"));
  const galleryImages = value.split(/\r?\n/).map((src) => src.trim()).filter(Boolean);

  function removeImage(index: number) {
    const confirmed = window.confirm("Remove this image from the tour gallery? If it is an uploaded Via Blue image and is no longer used elsewhere, its stored file will also be deleted when you save.");
    if (!confirmed) return;
    const lines = value.split(/\r?\n/);
    let seen = -1;
    const next = lines.filter((line) => {
      if (!line.trim()) return true;
      seen += 1;
      return seen !== index;
    });
    setValue(next.join("\n"));
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-extrabold text-blue-950">Tour gallery images</h3>
          <p className="mt-1 text-xs font-normal text-slate-500">Click Remove on any photo, then save the tour to apply the deletion.</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">{galleryImages.length} image{galleryImages.length === 1 ? "" : "s"}</span>
      </div>
      {galleryImages.length > 0 ? (
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((src, index) => (
            <div key={`${src}-${index}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="h-28 bg-slate-100 sm:h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Tour gallery image ${index + 1}`} className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center justify-between gap-2 p-2">
                <span className="truncate text-[11px] text-slate-500" title={src}>Image {index + 1}</span>
                <button type="button" onClick={() => removeImage(index)} className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200">Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-4 rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-slate-500">No gallery images. Upload photos above or add image URLs below.</p>
      )}
      <label className="block text-xs font-bold text-slate-600">
        Image paths or HTTPS URLs — one per line
        <textarea name="gallery_images" value={value} onChange={(event) => setValue(event.target.value)} maxLength={10000} rows={Math.min(6, Math.max(3, galleryImages.length))} placeholder="/images/tour-photo.webp" className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
      </label>
      <p className="mt-1 text-xs font-normal text-slate-400">You can still paste image URLs here. The cover image is managed separately in the Image path or URL field above.</p>
    </section>
  );
}
