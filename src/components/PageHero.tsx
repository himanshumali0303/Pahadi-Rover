import Image from "next/image";
import { Container } from "@/components/Container";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image: string;
  imageAlt: string;
};

export function PageHero({
  title,
  subtitle,
  eyebrow,
  image,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[52svh] items-end overflow-hidden bg-ink sm:min-h-[58svh]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/40"
        aria-hidden="true"
      />
      <Container className="relative z-10 pt-32 pb-12 sm:pb-16">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-snow/80 sm:text-sm">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-tight text-snow sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-snow/85 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}