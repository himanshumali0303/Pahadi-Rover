"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { getRoomGallery, getRoomPrimaryImage } from "@/data/rooms";
import type { Room } from "@/data/rooms";

/**
 * The room's own photos, opened as a gallery. Split out of the rooms page so
 * that page stays a Server Component and can keep exporting `metadata`.
 */
export function RoomGallery({ room }: { room: Room }) {
  const [startIndex, setStartIndex] = useState<number | null>(null);

  const gallery = getRoomGallery(room);
  const primaryImage = getRoomPrimaryImage(room);

  // The shared lightbox takes GalleryImage entries; a room's photos all sit in
  // one category, so the mapping is mechanical.
  const images = gallery.map((image) => ({
    src: image.src,
    title: image.alt,
    alt: image.alt,
    category: "Rooms" as const,
    width: 1200,
    height: 800,
  }));

  function openAt(src: string) {
    const index = gallery.findIndex((image) => image.src === src);
    setStartIndex(index === -1 ? 0 : index);
  }

  if (images.length === 0) {
    return primaryImage ? (
      <Image
        src={primaryImage.src}
        alt={primaryImage.alt}
        width={720}
        height={540}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto"
      />
    ) : null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => primaryImage && openAt(primaryImage.src)}
        aria-label={`View all ${images.length} photos of ${room.name}`}
        className="group relative overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe"
      >
        {primaryImage ? (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            width={720}
            height={540}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto"
          />
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20"
          aria-hidden="true"
        />
        <span className="absolute right-4 bottom-4 inline-flex items-center rounded-full bg-ink/75 px-3.5 py-1.5 text-xs font-semibold text-snow backdrop-blur-sm">
          View {images.length} photos
        </span>
      </button>

      <ul className="mt-6 flex flex-wrap gap-2">
        {images.slice(0, 6).map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setStartIndex(i)}
              aria-label={`View photo ${i + 1} of ${room.name}`}
              className="relative h-16 w-20 overflow-hidden rounded-lg border border-line transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe"
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
        {images.length > 6 ? (
          <li className="flex h-16 w-20 items-center justify-center rounded-lg border border-line text-xs font-semibold text-muted">
            +{images.length - 6}
          </li>
        ) : null}
      </ul>

      {startIndex !== null ? (
        <GalleryLightbox
          images={images}
          index={startIndex}
          onClose={() => setStartIndex(null)}
          onSelect={setStartIndex}
        />
      ) : null}
    </>
  );
}
