"use client";

import { useEffect, useState } from "react";
import { MapPinIcon } from "@/components/Icons";
import { buildEmbedUrl, buildMapsUrl } from "@/lib/maps";

// If Google hasn't painted the map by now, stop showing the spinner. A blocked
// iframe (adblocker, office firewall, throttled network) never fires `onLoad`,
// and without this the panel would sit on "Loading map…" forever.
const LOAD_TIMEOUT_MS = 4000;

/**
 * Live Google Maps panel with the pin already dropped on the property.
 *
 * A full-size transparent link sits over the iframe, so tapping anywhere on the
 * map opens the full Google Maps experience — from there guests can pan, get
 * turn-by-turn directions, share the pin or switch to satellite view. Keeping
 * our page out of Google's map JS is also why the iframe is only a preview.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const embedUrl = buildEmbedUrl();
  const mapsUrl = buildMapsUrl();

  useEffect(() => {
    if (loaded || timedOut) return;
    const timer = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [loaded, timedOut]);

  if (!embedUrl || !mapsUrl) return null;

  // Reachable when Google is blocked, the network is down, or the embed is
  // simply slow — never leave a guest staring at a spinner.
  if (timedOut && !loaded) {
    return <MapFallback mapsUrl={mapsUrl} />;
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-snow shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-mist sm:aspect-[16/10]">
        {!loaded ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-snow/90 px-4 py-2 text-xs font-medium text-muted shadow-sm">
              <span
                className="h-2.5 w-2.5 animate-pulse rounded-full bg-pahadi"
                aria-hidden="true"
              />
              Loading map…
            </span>
          </div>
        ) : null}

        <iframe
          src={embedUrl}
          title="Map showing the location of Pahadi Rover in Himachal Pradesh"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Captures every tap, which is what turns "click the map" into
            "open Google Maps". */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the location of Pahadi Rover in Google Maps"
          className="group absolute inset-0 z-20 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-snow"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25 group-focus-visible:bg-ink/25"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-4"
          >
            <span className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-snow px-4 py-2.5 text-sm font-semibold text-pahadi opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <MapPinIcon className="h-4 w-4" />
              Open in Google Maps
            </span>
          </span>
        </a>

        {/* Always-visible hint so the click behaviour is discoverable on touch
            devices, where there is no hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-snow/90 px-3 py-1.5 text-[11px] font-semibold text-pahadi shadow-sm"
        >
          Tap map to open
        </span>
      </div>
    </div>
  );
}

function MapFallback({ mapsUrl }: { mapsUrl: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-snow shadow-sm">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-line-strong) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div className="relative flex aspect-[4/3] flex-col items-center justify-center p-8 text-center sm:aspect-[16/10]">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-pahadi text-snow">
          <MapPinIcon className="h-7 w-7" />
        </span>
        <p className="mt-4 font-display text-lg font-semibold text-text">
          Find us on Google Maps
        </p>
        <p className="mt-2 max-w-xs text-sm text-muted">
          The embedded map couldn&apos;t load here — tap through to open it in
          Google Maps instead.
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-pahadi px-5 py-2.5 text-sm font-semibold text-snow transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe"
        >
          <MapPinIcon className="h-4 w-4" />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}