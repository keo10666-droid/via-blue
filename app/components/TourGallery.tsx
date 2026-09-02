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

      <div className="mt-12">

        <h2 className="mb-6 text-3xl font-bold text-blue-900">
          Gallery
        </h2>

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
              className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${
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
                className="object-cover transition duration-500 group-hover:scale-105"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Hover Overlay */}

              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />

              {/* Zoom Icon */}

              <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-2 text-sm text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">

          {/* Close */}

          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
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
              className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20 md:left-8"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          {/* Fullscreen Image */}

          <div className="relative h-[80vh] w-full max-w-6xl">
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
              className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20 md:right-8"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          {/* Counter */}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-5 py-2 font-bold text-white backdrop-blur">
            {currentIndex + 1} / {galleryImages.length}
          </div>

        </div>
      )}
    </>
  );
}