"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/Container";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { SectionHeading } from "@/components/SectionHeading";
import {
  galleryByCategory,
  galleryCategories,
  MOUNTAIN_BANNER,
} from "@/data/gallery";
import type { GalleryCategory } from "@/data/gallery";

type Filter = "All" | GalleryCategory;

const FILTERS: Filter[] = ["All", ...galleryCategories];

export function GallerySection({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = galleryByCategory(filter);
  const photoCount = galleryByCategory("All").length;

  return (
    <section id="gallery" className="scroll-mt-24 py-16 sm:py-24">
      {/* Mountain banner sits at the top of the gallery, full-bleed. */}
      <div className="relative isolate mb-12 overflow-hidden sm:mb-16">
        <Image
          src={MOUNTAIN_BANNER.src}
          alt={MOUNTAIN_BANNER.alt}
          width={MOUNTAIN_BANNER.width}
          height={MOUNTAIN_BANNER.height}
          priority
          sizes="100vw"
          className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[380px]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-ink/20"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0">
          <Container className="pb-6 sm:pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cafe">
              Pahadi Rover
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-snow sm:text-3xl lg:text-4xl">
              What it looks like up here
            </h2>
          </Container>
        </div>
      </div>

      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow="Gallery"
            title="Moments at Pahadi Rover"
            subtitle="A glimpse of the café, the rooms and the views that greet you here."
          />
        ) : null}

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          role="group"
          aria-label="Filter gallery by category"
        >
          {FILTERS.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pahadi ${
                filter === category
                  ? "bg-pahadi text-snow"
                  : "bg-snow text-muted hover:bg-pahadi/5 hover:text-pahadi"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {images.map((image, index) => (
            <li key={`${image.category}-${index}`}>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open photo: ${image.title}`}
                className="group relative block w-full overflow-hidden rounded-2xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pahadi"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 text-sm font-medium text-snow opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {image.title}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-center text-xs text-muted">
          {photoCount} photos from the café, rooms, views and the property. Tap
          any photo to view it full screen.
        </p>

        {lightboxIndex !== null ? (
          <GalleryLightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onSelect={setLightboxIndex}
          />
        ) : null}
      </Container>
    </section>
  );
}