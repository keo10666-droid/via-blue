"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type TourGalleryProps = {
  images: readonly string[];
  tourName: string;
  heroImage?: string;
};

export default function TourGallery({
  images,
  tourName,
  heroImage,
}: TourGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /*
   * Remove duplicate images.
   * Hero image stays completely separate from the gallery.
   */
  const galleryImages = useMemo(() => {
    const uniqueImages = [...new Set(images)];

    if (heroImage) {
      return uniqueImages.filter((image) => image !== heroImage);
    }

    return uniqueImages;
  }, [images, heroImage]);

  /*
   * Make sure currentIndex is always valid.
   */
  useEffect(() => {
    if (currentIndex >= galleryImages.length) {
      setCurrentIndex(0);
    }
  }, [galleryImages.length, currentIndex]);

  /*
   * No automatic slideshow.
   */
  useEffect(() => {
    return;
  }, []);

  /*
   * Keyboard controls in fullscreen.
   */
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex(
          (current) => (current + 1) % galleryImages.length
        );
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex(
          (current) =>
            (current - 1 + galleryImages.length) %
            galleryImages.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, galleryImages.length]);

  /*
   * No gallery images.
   */
  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <>
      {/* ============================= */}
      {/* Gallery */}
      {/* ============================= */}

      <div className="relative mt-12">
        <div className="mb-7">
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
              Gallery
            </p>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-blue-950 md:text-4xl">
            Explore {tourName}
          </h2>
        </div>

        {/* Gallery Grid */}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => {
                setCurrentIndex(index);
                setIsFullscreen(true);
              }}
              className={`group relative overflow-hidden rounded-[22px] bg-slate-100 shadow-[0_12px_35px_rgba(7,26,54,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(7,26,54,0.14)] ${
                index === 0
                  ? "col-span-2 row-span-2 h-[360px] md:h-[430px]"
                  : "h-[175px] md:h-[205px]"
              }`}
              aria-label={`Open ${tourName} image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${tourName} - image ${index + 1}`}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                className="object-cover transition duration-700 group-hover:scale-105"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Hover Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/35 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

              {/* Zoom Icon */}

              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-blue-950/70 text-sm text-white opacity-0 shadow-lg backdrop-blur-md transition duration-300 group-hover:opacity-100">
                🔍
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ============================= */}
      {/* Fullscreen Gallery */}
      {/* ============================= */}

      {isFullscreen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-blue-950/95 p-4 backdrop-blur-sm">
          {/* Close */}

          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-2xl text-white shadow-lg backdrop-blur-md transition duration-300 hover:bg-orange-500"
            aria-label="Close gallery"
          >
            ✕
          </button>

          {/* Previous */}

          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setCurrentIndex(
                  (current) =>
                    (current - 1 + galleryImages.length) %
                    galleryImages.length
                )
              }
              className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-3xl text-white shadow-lg backdrop-blur-md transition duration-300 hover:bg-orange-500 md:left-8"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          {/* Fullscreen Image */}

          <div className="relative h-[80vh] w-full max-w-6xl overflow-hidden rounded-2xl">
            <Image
              src={galleryImages[currentIndex]}
              alt={`${tourName} - image ${currentIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}

          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setCurrentIndex(
                  (current) =>
                    (current + 1) % galleryImages.length
                )
              }
              className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-3xl text-white shadow-lg backdrop-blur-md transition duration-300 hover:bg-orange-500 md:right-8"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          {/* Counter */}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/10 px-5 py-2 font-bold text-white shadow-lg backdrop-blur-md">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
}