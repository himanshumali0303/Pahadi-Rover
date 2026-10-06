import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CoffeeIcon, LeafIcon, MountainIcon, BedIcon } from "@/components/Icons";

const FEATURES = [
  { icon: CoffeeIcon, label: "CafÃ© on property" },
  { icon: BedIcon, label: "Comfortable stay" },
  { icon: MountainIcon, label: "Mountain atmosphere" },
  { icon: LeafIcon, label: "Local hospitality" },
];

export function IntroSection() {
  return (
    <section id="welcome" className="scroll-mt-24 py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/property/property-02.jpg"
                alt="Arriving at Pahadi Rover"
                width={640}
                height={800}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-line bg-snow px-5 py-4 shadow-lg sm:block">
              <p className="font-display text-2xl font-semibold text-pahadi">
                Pahadi
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                in the heart of Himachal
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={100}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Welcome
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Welcome to Pahadi Rover
          </h2>
          <p className="mt-5 leading-relaxed text-muted sm:text-lg">
            Whether you&apos;re stopping by for a cup of coffee or staying for a few
            nights, Pahadi Rover is a place to relax, recharge and experience
            the mountains at your own pace.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <li
                key={feature.label}
                className="flex items-center gap-3 rounded-2xl border border-line bg-mist/60 px-4 py-3 text-sm font-medium text-text"
              >
                <feature.icon className="h-5 w-5 shrink-0 text-muted" />
                {feature.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}