import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { MapPinIcon, NavigationIcon } from "@/components/Icons";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { LOCATION, SITE, isConfigured } from "@/data/site";
import {
  buildDirectionsUrl,
  buildMapsUrl,
  getNearbyLandmarks,
  hasMap,
} from "@/lib/maps";

export function LocationSection() {
  const mapAvailable = hasMap();
  const mapsUrl = buildMapsUrl();
  const directionsUrl = buildDirectionsUrl();
  const landmarks = getNearbyLandmarks();

  const address =
    isConfigured(LOCATION.address) && LOCATION.address.length > 0
      ? LOCATION.address
      : isConfigured(SITE.address)
        ? SITE.address
        : null;

  // Full-width map when there are no landmark chips to show beside it, and a
  // two-column layout when there are — matches how tour sites present a map
  // with a sidebar of practical distances.
  const hasSidebar = landmarks.length > 0 && mapAvailable;

  return (
    <section id="location" className="scroll-mt-24 bg-mist/60 py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Find Us"
            title="Find Your Way to Pahadi Rover"
            subtitle={
              mapAvailable
                ? "Tap the map to open it in Google Maps — from there you can get directions, share the pin or switch to satellite view."
                : "Nestled in the hills of Himachal Pradesh. A map and directions will appear here once the property address is confirmed."
            }
          />
        </Reveal>

        <div
          className={
            hasSidebar
              ? "mt-10 grid gap-8 lg:grid-cols-3 lg:gap-10"
              : "mt-10"
          }
        >
          <Reveal className={hasSidebar ? "lg:col-span-2" : ""}>
            {mapAvailable ? (
              <MapEmbed />
            ) : (
              <MapPlaceholder />
            )}
          </Reveal>

          <Reveal
            delay={100}
            className={hasSidebar ? "lg:col-span-1" : "mt-8"}
          >
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-3xl border border-line bg-snow p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pahadi text-snow">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-text">Pahadi Rover</p>
                    {address ? (
                      <p className="mt-1 text-sm text-muted">{address}</p>
                    ) : (
                      <p className="mt-1 text-sm text-muted">
                        Address details will be shared here soon.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {landmarks.length > 0 ? (
                <div className="rounded-3xl border border-line bg-snow p-6">
                  <h3 className="font-display text-lg font-semibold text-text">
                    Getting here
                  </h3>
                  <dl className="mt-4 space-y-3">
                    {landmarks.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0"
                      >
                        <dt className="text-sm text-muted">{item.name}</dt>
                        <dd className="text-sm font-medium text-text">
                          {item.distance}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}

              {mapsUrl || directionsUrl ? (
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  {directionsUrl ? (
                    <Button
                      href={directionsUrl}
                      external
                      variant="primary"
                      className="w-full"
                    >
                      <NavigationIcon className="h-4 w-4" />
                      Get Directions
                    </Button>
                  ) : null}
                  {mapsUrl ? (
                    <Button
                      href={mapsUrl}
                      external
                      variant="outline"
                      className="w-full"
                    >
                      Open in Google Maps
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// Shown until the owner adds coordinates or a place query to `LOCATION`.
function MapPlaceholder() {
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
      <div className="relative flex aspect-[4/3] flex-col items-center justify-center p-8 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-pahadi text-snow shadow-lg">
          <MapPinIcon className="h-8 w-8" />
        </span>
        <p className="mt-5 font-display text-xl font-semibold text-text">
          Somewhere in the hills of Himachal
        </p>
        <p className="mt-2 max-w-xs text-sm text-muted">
          {LOCATION.mapHint}
        </p>
      </div>
    </div>
  );
}