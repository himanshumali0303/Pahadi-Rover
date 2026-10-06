"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDownIcon, CloseIcon } from "@/components/Icons";
import type { GalleryImage } from "@/data/gallery";

const SWIPE_THRESHOLD = 50;

export function GalleryLightbox({
  images,
  index,
  onClose,
  onSelect,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onSelect: (index: number) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const image = images[index];

  const goPrev = useCallback(() => {
    onSelect((index - 1 + images.length) % images.length);
  }, [index, images.length, onSelect]);

  const goNext = useCallback(() => {
    onSelect((index + 1) % images.length);
  }, [index, images.length, onSelect]);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => restoreFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${images.length}: ${image.title}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="text-sm font-medium tabular-nums text-snow/80">
          {index + 1} / {images.length}
        </p>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-snow transition-colors hover:bg-snow/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snow"
        >
          <CloseIcon />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStartX.current;
          const end = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (start === null || end === undefined) return;
          const delta = end - start;
          if (Math.abs(delta) < SWIPE_THRESHOLD) return;
          if (delta > 0) goPrev();
          else goNext();
        }}
      >
        <div className="relative h-full w-full max-w-5xl">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-1 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-snow/10 text-snow transition-colors hover:bg-snow/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snow sm:left-2"
        >
          <ChevronDownIcon className="h-6 w-6 rotate-90" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-1 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-snow/10 text-snow transition-colors hover:bg-snow/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snow sm:right-2"
        >
          <ChevronDownIcon className="h-6 w-6 -rotate-90" />
        </button>
      </div>

      <div className="px-4 pb-6 text-center sm:px-6">
        <p className="font-display text-lg font-semibold text-snow sm:text-xl">
          {image.title}
        </p>
        <p className="mt-1 text-sm text-snow/70">{image.category}</p>
      </div>
    </div>
  );
}