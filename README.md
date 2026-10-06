# Pahadi Rover

A modern, mobile-responsive website for **Pahadi Rover** — a café and hotel/stay property in the hills of Himachal Pradesh.

Built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS v4**.

## Pages

- `/` — Home (hero, welcome, café, rooms, why stay, gallery, location, CTA)
- `/cafe` — The café
- `/cafe/menu` — Café menu (categories, items, prices)
- `/rooms` — Rooms & stay
- `/gallery` — Image gallery
- `/contact` — Contact & room enquiry (sends via WhatsApp)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Setting the site URL

The production domain should be set before you deploy, otherwise links that
depend on it are suppressed (see SEO notes below).

```bash
# recommended: environment variable
NEXT_PUBLIC_SITE_URL=https://pahadirover.com npm run build
```

## Replacing placeholders

All business details and placeholder images are centralized so the owner can swap them in one place:

| What | Where |
| --- | --- |
| WhatsApp number (booking number) | `src/lib/whatsapp.ts` → `WHATSAPP_NUMBER` |
| Phone, email, address, socials, site URL | `src/data/site.ts` → `SITE` |
| Google Maps / directions links | `src/data/site.ts` → `LOCATION.googleMapsUrl` / `LOCATION.mapsDirectionsUrl` |
| Room names, descriptions, facilities, images, price/capacity | `src/data/rooms.ts` |
| Gallery images, titles & categories | `src/data/gallery.ts` |
| Café menu categories, items, prices, tags | `src/data/menu.ts` |
| Guest reviews (name, quote, rating) | `src/data/testimonials.ts` |
| FAQ questions & answers, grouped by topic | `src/data/faqs.ts` |

### Placeholders that must be replaced

> **Demo content is currently committed** so the review and FAQ blocks render
> during development. They are fictional and must be replaced before launch:
> `src/data/menu.ts` (sample items + prices), `src/data/testimonials.ts`
> (fictional guest reviews) and `src/data/faqs.ts` (placeholder answers).
> Contact details: `src/lib/whatsapp.ts` → `WHATSAPP_NUMBER`
> (`919876543210`), `src/data/site.ts` → `SITE.email`
> (`hello@pahadirover.example`), `SITE.phone`, `SITE.address` and
> `LOCATION.address`.
> Do not add `aggregateRating` to the JSON-LD until the reviews are real —
> invented review markup breaks Google's review policy.

Still outstanding: `[SITE URL]`, `[INSTAGRAM HANDLE]`, `[FACEBOOK PAGE]`, and the
`LOCATION` Google Maps URLs. All photos are Unsplash placeholders.

### How placeholders keep the site looking professional

While a value still contains square brackets (e.g. `[PHONE NUMBER]`) it is
treated as "not configured yet", and the site automatically:

- hides the floating WhatsApp button, WhatsApp CTAs and the `wa.me/` chat links
- hides phone/email/mailto/social links instead of rendering broken ones
- hides the "Open in Google Maps" / "Get Directions" buttons while `LOCATION` URLs are empty
- omits contact details from JSON-LD structured data, `sitemap.xml` and `robots.txt`
- shows friendly "coming soon" copy in their place

### Configuring the café menu

In `src/data/menu.ts` each category supports `name`, `blurb` and `items`, and each
item supports:

- `name` + `description` *(optional)*
- `price` *(optional)* — e.g. "₹220"; omit it and the menu shows "Ask" instead of an invented rate
- `tags` *(optional)* — `veg`, `vegan`, `seasonal`, `signature`, `spicy`
- the category `id` doubles as the anchor target for the on-page category links

### Configuring a room

In `src/data/rooms.ts` each room supports:

- `images` — the first image is the primary (used on cards)
- `capacity` *(optional)* — e.g. "Sleeps 2"
- `price` *(optional)* — e.g. "₹2,500 / night"; omit to show "Contact for availability & pricing"
- `availabilityText` *(optional)* — e.g. "Some dates free this month"

## Project structure

```text
src/
  app/         pages, layout, sitemap, robots
  components/  Navbar, Hero, RoomCard, Gallery, ContactForm, sections…
  data/        site, rooms, gallery config
  lib/         whatsapp helpers
```

## Writing & code style

- Run `npm run lint` before committing.
- Avoid adding comments to code unless they explain data placeholders.
- Icons are inline SVGs (no icon library dependency). Prefer reusing
  `src/components/Icons.tsx` over adding dependencies.
- Keep business data centralized in `src/data/*` and WhatsApp logic in
  `src/lib/whatsapp.ts` — never hard-code phone/email/socials in components.

## SEO & structured data notes

- Canonical URLs are emitted per page and resolve automatically once
  `NEXT_PUBLIC_SITE_URL` is configured (they stay relative until then).
- JSON-LD (café + lodging) never contains placeholder contact fields.
- `sitemap.xml` and `robots.txt` omit the site origin while `[SITE URL]` is unconfigured.
- OG/Twitter share images currently point to an Unsplash placeholder — swap
  them for a real photo in `src/app/layout.tsx`.

## Stack notes

- Subtle scroll-reveal animations only; reduced-motion is respected.
- Remote images use `images.remotePatterns` in `next.config.ts`.
- The contact form validates input client-side (name, phone, dates, guests)
  and opens WhatsApp with a pre-filled enquiry — no backend required.