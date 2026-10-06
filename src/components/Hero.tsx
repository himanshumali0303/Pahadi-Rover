import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/Icons";

// Hero background video. `/public/media/mountain.mp4` is served directly by
// Next, so this component stays a server component.
//
// `preload="metadata"` keeps the browser from pulling the whole file up front.
// Combined with `poster`, the first paint shows the still while the video
// buffers in the background — important here because the source is ~68 MB.
// Replace the file with a compressed cut (see public/media/README.md) before
// launch, or this will be slow on 4G.
const HERO_VIDEO = "/media/mountain.mp4";
const HERO_POSTER = "/media/mountain-poster.jpg";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-ink">
      {/*
        Previous hero background (Unsplash placeholder) — kept for reference.
        The hero now plays the owner's mountain video instead.
      */}

      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_POSTER}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Deep Black scrim between video and copy. Kept light through the middle
          so the footage reads, darker at the top and bottom edges where the
          fixed navbar and the scroll cue sit. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/75"
        aria-hidden="true"
      />

      <Container className="relative z-10 pt-32 pb-24 text-center sm:pt-36">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-inverse/70 sm:text-sm">
          Pahadi Rover — Café &amp; Stay in the Mountains
        </p>

        <h1 className="mx-auto mt-5 max-w-4xl font-display text-5xl font-extrabold tracking-tight text-ink-inverse sm:text-6xl md:text-7xl">
          Explore. Stay. Eat. Travel.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-inverse/80 sm:text-lg">
          A Himalayan basecamp for slow mornings, mountain air and long roads —
          coffee worth waking up for, rooms worth slowing down in, and trips
          worth taking.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          {/* Primary CTA: Himalayan Yellow on Deep Black, per the button system. */}
          <Button
            href="/rooms"
            size="lg"
            variant="cafe"
            className="w-full sm:w-auto"
          >
            Book Your Stay
          </Button>
          <Button
            href="/cafe"
            size="lg"
            variant="outline"
            className="w-full border-ink-inverse/40 text-ink-inverse hover:border-ink-inverse hover:bg-ink-inverse/10 focus-visible:outline-ink-inverse sm:w-auto"
          >
            Explore Café
            <ArrowRightIcon />
          </Button>
        </div>

        </Container>

      <a
        href="#welcome"
        aria-label="Scroll to explore"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-ink-inverse/70 transition-colors hover:text-ink-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe"
      >
        <ChevronDownIcon className="h-7 w-7 animate-bounce" />
      </a>
    </section>
  );
}
