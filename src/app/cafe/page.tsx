import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { BookingCTA } from "@/components/BookingCTA";
import { ArrowRightIcon, CoffeeIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "CafÃ©",
  description:
    "Good coffee, tea, snacks, meals and local-inspired food at the Pahadi Rover cafÃ© in the hills of Himachal Pradesh.",
  alternates: {
    canonical: "/cafe",
  },
};

const MENU = [
  {
    title: "Coffee",
    text: "Slow brewed, unhurried â€” the way coffee in the mountains should be.",
  },
  {
    title: "Tea & Chai",
    text: "Warm cups of chai and mountain teas for foggy mornings.",
  },
  {
    title: "Snacks",
    text: "Light bites to enjoy while you watch the hills roll by.",
  },
  {
    title: "Meals",
    text: "Simple, filling meals made with local and seasonal ingredients.",
  },
  {
    title: "Local-inspired food",
    text: "Flavours from the region, prepared with a homely touch.",
  },
];

export default function CafePage() {
  return (
    <>
      <PageHero
        eyebrow="The CafÃ©"
        title="Good Coffee. Good Food. Mountain Views."
        subtitle="The heart of Pahadi Rover â€” a warm space to sit back, sip something good and watch the mountains."
        image="/cafe/cafe-02.jpg"
        imageAlt="Inside the cafÃ© at Pahadi Rover"
      />

      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
              Our CafÃ©
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              A space for slow mornings
            </h2>
            <p className="mt-5 leading-relaxed text-muted sm:text-lg">
              Some stops are made for rushing. Pahadi Rover isn&apos;t one of them.
              Sit by the window, order coffee or chai, and let the conversation
              and the views do their thing.
            </p>
            <p className="mt-4 leading-relaxed text-muted sm:text-lg">
              Our menu stays simple and seasonal. Have a look at what we are
              serving before you arrive.
            </p>
            <ul className="mt-8 space-y-4">
              {MENU.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-mist/60 p-4"
                >
                  <CoffeeIcon className="mt-0.5 h-5 w-5 shrink-0 text-cafe" />
                  <div>
                    <h3 className="font-semibold text-text">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/cafe/menu">
                See the Menu
                <ArrowRightIcon />
              </Button>
              <Button href="/contact" variant="outline">
                Book a Stay
              </Button>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/cafe/cafe-01.jpg"
                  alt="The cafÃ© at Pahadi Rover"
                  width={720}
                  height={480}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src="/cafe/cafe-10.jpg"
                    alt="Coffee, freshly made"
                    width={360}
                    height={360}
                    sizes="(min-width: 1024px) 270px, 50vw"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src="/cafe/cafe-07.jpg"
                    alt="Chai and a warm mug"
                    width={360}
                    height={360}
                    sizes="(min-width: 1024px) 270px, 50vw"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <BookingCTA />
    </>
  );
}