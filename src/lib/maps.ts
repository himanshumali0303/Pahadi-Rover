import { LOCATION, isConfigured } from "@/data/site";

// Google Maps keyless embed endpoints. These work without an API key, which is
// why the map needs no extra setup — but they are not covered by Google's
// SLA. If you hit rate limits or need guaranteed uptime, switch to the official
// Maps Embed API and an iframe src of the form:
//   https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=LAT,LNG&zoom=15

export type MapTarget = {
  /** "lat,lng" — the most precise form, what the pin actually sits on. */
  coordinates: string | null;
  /** Free-text search, used when no coordinates are available. */
  query: string | null;
};

function isNumberLike(value: string): boolean {
  return /^-?\d{1,3}(\.\d+)?$/.test(value.trim());
}

export function getMapTarget(): MapTarget | null {
  const lat = LOCATION.latitude;
  const lng = LOCATION.longitude;

  if (isConfigured(lat) && isConfigured(lng) && isNumberLike(lat) && isNumberLike(lng)) {
    return { coordinates: `${Number(lat)},${Number(lng)}`, query: null };
  }

  if (isConfigured(LOCATION.placeQuery)) {
    return { coordinates: null, query: LOCATION.placeQuery };
  }

  return null;
}

export function hasMap(): boolean {
  return getMapTarget() !== null;
}

function zoom(): number {
  const raw = Number(LOCATION.zoom);
  return Number.isFinite(raw) && raw >= 1 && raw <= 21 ? raw : 14;
}

/**
 * Read-only iframe map with the pin already dropped. No API key, no billing.
 * `q` accepts either `lat,lng` or a text search.
 */
export function buildEmbedUrl(): string | null {
  const target = getMapTarget();
  if (!target) return null;

  const q = target.coordinates ?? target.query!;
  const params = new URLSearchParams({
    q,
    z: String(zoom()),
    hl: "en",
    output: "embed",
  });

  return `https://maps.google.com/maps?${params.toString()}`;
}

/** Opens the full interactive Google Maps experience (pin, directions, street view). */
export function buildMapsUrl(): string | null {
  if (isConfigured(LOCATION.googleMapsUrl)) return LOCATION.googleMapsUrl;

  const target = getMapTarget();
  if (!target) return null;

  const query = target.coordinates ?? encodeURIComponent(target.query!);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/** Turn-by-turn directions from the guest's current position to the property. */
export function buildDirectionsUrl(): string | null {
  if (isConfigured(LOCATION.mapsDirectionsUrl)) return LOCATION.mapsDirectionsUrl;

  const target = getMapTarget();
  if (!target) return null;

  const destination = target.coordinates ?? target.query!;
  const params = new URLSearchParams({
    api: "1",
    destination,
    travelmode: "driving",
  });

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function getNearbyLandmarks(): Array<{ name: string; distance: string }> {
  return LOCATION.nearbyLandmarks.filter((item) => isConfigured(item.distance));
}