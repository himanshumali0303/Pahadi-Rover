import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { ArrowRightIcon, CoffeeIcon } from "@/components/Icons";

const CAFE_ITEMS = [
  "Coffee",
  "Tea & chai",
  "Snacks",
  "Meals",
  "Local-inspired food",
  "Relaxed seating",
];

export function CafeSection() {
  return (
    <section className="bg-mist/60 py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
            The CafÃ©
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Good Coffee. Good Food. Mountain Views.
          </h2>
          <p className="mt-5 leading-relaxed text-muted sm:text-lg">
            Our cafÃ© is the heart of Pahadi Rover â€” a warm, relaxed space to
            sip slow coffee, snack on simple food and let the mountain views do
            the talking.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {CAFE_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-full border border-line bg-snow px-4 py-2.5 text-sm font-medium text-text"
              >
                <CoffeeIcon className="h-4 w-4 shrink-0 text-cafe" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/cafe">
              Explore CafÃ©
              <ArrowRightIcon />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/cafe/cafe-03.jpg"
                alt="Seating by the window at the cafÃ©"
                width={480}
                height={600}
                sizes="(min-width: 1024px) 360px, 50vw"
                className="aspect-[3/4] h-full w-full object-cover"
              />
            </div>
            <div className="mt-8 space-y-4">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/cafe/cafe-06.jpg"
                  alt="Morning at the cafÃ© counter"
                  width={480}
                  height={360}
                  sizes="(min-width: 1024px) 320px, 50vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/cafe/cafe-08.jpg"
                  alt="Light across the cafÃ© tables"
                  width={480}
                  height={360}
                  sizes="(min-width: 1024px) 320px, 50vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}