// Central, owner-editable business configuration.
//
// Replace the `[PLACEHOLDER]` values below with the real details whenever
// they are available. Values that still contain square brackets are treated
// as "not configured yet" by the site and related links/buttons are hidden
// automatically, so you never ship broken links.

const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const SITE = {
  name: "Pahadi Rover",
  tagline: "Café • Stay • Mountains",
  description:
    "Pahadi Rover is a cozy mountain café and stay offering comfortable rooms, good food and a peaceful Himalayan experience.",

  // [SITE URL] – the live website domain, e.g. "https://pahadirover.com".
  // Prefer setting NEXT_PUBLIC_SITE_URL as an environment variable instead.
  url: envUrl || "[SITE URL]",

  // DEMO CONTACT DETAILS — the values below are fictional and only exist so the
  // site renders its phone, email and address blocks. Replace every one of them
  // with the real details before the site goes live.
  email: "hello@pahadirover.example",
  phone: "+91 98765 43210",

  address: "Demo Property, Mountain Road, Kasauli, Himachal Pradesh 173204",

  instagramUrl: "https://instagram.com/[INSTAGRAM HANDLE]",
  facebookUrl: "https://facebook.com/[FACEBOOK PAGE]",
} as const;

// Location configuration — this drives the live map.
//
// ┌──────────────────────────────────────────────────────────────┐
// │  >>> SWAP IN YOUR REAL PIN — 2 minutes, no API key needed <<< │
// │                                                              │
// │  1. Google Maps kholo → apna property dhundho               │
// │  2. Us jagah RIGHT-CLICK karo                               │
// │  3. Copy hua pehla number = latitude, doosra = longitude   │
// │  4. Neeche `latitude` / `longitude` me paste kar do          │
// │                                                              │
// │  Abhi jo values hain wo KASAULI TOWN CENTRE ke hain —       │
// │  default bas isliye daale hain taaki map chalu dikhe.        │
// │  Jab tak aap apna exact pin nahi daalte, pin town par        │
// │  lagega, property par nahi.                                  │
// └──────────────────────────────────────────────────────────────┘
//
// `zoom` ko badal sakte ho: 14 = poora area dikhe, 16 = gali-level zoom.
// `nearbyLandmarks` map ke neeche "Getting here" list banata hai.
export const LOCATION = {
  address: "Demo Property, Mountain Road, Kasauli, Himachal Pradesh 173204",

  // Exact pin drop — REPLACE THESE TWO with your own coordinates.
  latitude: "30.8999", // Kasauli, Solan, HP (town centre — tighten to your pin)
  longitude: "76.9620", // Kasauli, Solan, HP (town centre — tighten to your pin)

  // 1 = world, 15 = street level. 14–16 suits a single hill property.
  zoom: 15,

  // Optional — only if you have a maps.app.goo.gl share link. Takes priority
  // over the coordinates above.
  googleMapsUrl: "", // e.g. "https://maps.app.goo.gl/xxxx"

  // Optional — a pre-built directions link. Usually you don't need this; the
  // "Get Directions" button is generated from the coordinates above.
  mapsDirectionsUrl: "",

  // Text-search fallback. Only used if BOTH coordinates are blank, so you
  // don't normally need to touch this.
  placeQuery: "", // e.g. "Pahadi Rover, Kasauli"

  mapHint:
    "A map with the exact location will appear here once the property address is available.",

  // "Getting here" list under the map. Replace each bracketed distance with the
  // real number once you've checked it from the property.
  nearbyLandmarks: [
    { name: "Kasauli town centre", distance: "On your doorstep" },
    { name: "Nearest bus stand", distance: "[CONFIRM DISTANCE]" },
    { name: "Nearest railway station", distance: "[CONFIRM DISTANCE]" },
    { name: "Nearest airport", distance: "[CONFIRM DISTANCE]" },
    { name: "Parking on property", distance: "Available" },
  ],
} as const;

// A value counts as "configured" once it no longer looks like a placeholder.
export function isConfigured(value: string): boolean {
  return Boolean(value) && !value.includes("[");
}

export function isValidUrl(value: string): boolean {
  if (!isConfigured(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function getSiteUrl(): string | null {
  return isValidUrl(SITE.url) ? SITE.url : null;
}




