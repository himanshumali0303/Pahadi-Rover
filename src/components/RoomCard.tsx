"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Button } from "@/components/Button";
import { getRoomGallery, getRoomPrimaryImage } from "@/data/rooms";
import type { Room } from "@/data/rooms";

/**
 * Room card with a real thumbnail and a per-room gallery. "View room images"
 * opens a lightbox containing only that room's own photos, starting at the
 * photo the visitor actually clicked.
 */
export function RoomCard({ room }: { room: Room }) {
  const [startIndex, setStartIndex] = useState<number | null>(null);

  const primaryImage = getRoomPrimaryImage(room);
  const gallery = getRoomGallery(room);

  // The lightbox reuses the shared gallery component, so it needs the
  // GalleryImage shape; a room's photos all belong to one category.
  const lightboxImages = gallery.map((image) => ({
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

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-snow shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={() => primaryImage && openAt(primaryImage.src)}
        disabled={gallery.length === 0}
        aria-label={
          gallery.length > 0
            ? `View ${gallery.length} photos of ${room.name}`
            : room.name
        }
        className="relative overflow-hidden disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe"
      >
        {primaryImage ? (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            width={640}
            height={480}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 100vw"
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent"
          aria-hidden="true"
        />
        {gallery.length > 0 ? (
          <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-semibold text-snow backdrop-blur-sm">
            {gallery.length} photos
          </span>
        ) : null}
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-text">{room.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {room.shortDescription}
        </p>

        {gallery.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {gallery.slice(0, 5).map((image) => (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => openAt(image.src)}
                  aria-label={`View photo of ${room.name}`}
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
            {gallery.length > 5 ? (
              <li className="flex h-16 w-20 items-center justify-center rounded-lg border border-line text-xs font-semibold text-muted">
                +{gallery.length - 5}
              </li>
            ) : null}
          </ul>
        ) : null}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={() => setStartIndex(0)}
            variant="primary"
            size="sm"
            className="w-full sm:w-auto"
          >
            View Room Images
          </Button>
          <Button
            href={`/rooms#${room.id}`}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
          >
            View Details
          </Button>
        </div>
      </div>

      {startIndex !== null && lightboxImages.length > 0 ? (
        <GalleryLightbox
          images={lightboxImages}
          index={startIndex}
          onClose={() => setStartIndex(null)}
          onSelect={setStartIndex}
        />
      ) : null}
    </article>
  );
}
