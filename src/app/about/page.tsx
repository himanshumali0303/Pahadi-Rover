import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhyStaySection } from "@/components/WhyStaySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { BookingCTA } from "@/components/BookingCTA";
import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/Icons";
import {
  atAGlance,
  closingParagraph,
  story,
  values,
} from "@/data/about";
import { galleryImages } from "@/data/gallery";
import { isConfigured } from "@/data/site";

const ABOUT_DESCRIPTION =
  "The story behind Pahadi Rover â€” a small mountain cafÃ© and stay in Himachal Pradesh, and the things we care about running it.";

export const metadata: Metadata = {
  title: "About Us",
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  // Set per page so the share card matches the page, instead of inheriting the
  // homepage title and photo from the root layout.
  openGraph: {
    title: "About Pahadi Rover | CafÃ© & Stay in Himachal Pradesh",
    description: ABOUT_DESCRIPTION,
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pahadi Rover | CafÃ© & Stay in Himachal Pradesh",
    description: ABOUT_DESCRIPTION,
  },
};

// A handful of images to give the page some texture without duplicating the
// full gallery.
const HIGHLIGHTS = galleryImages.slice(0, 3);

export default function AboutPage() {
  const glance = atAGlance.filter((item) => isConfigured(item.value));

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A small café and stay in the hills"
        subtitle="Built around one idea — the best days in the mountains shouldn't be spent driving between places."
        image="/public/cafe/cafe-01.jpg"
        imageAlt="The property at Pahadi Rover"
      />

      {/* Our story */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/public/cafe/cafe-01.jpg"
                alt="Outside the main building"
                width={640}
                height={800}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
              Our Story
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              Built to solve the in-between
            </h2>
            {story.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-5 leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* At a glance */}
      {glance.length > 0 ? (
        <section className="pb-16 sm:pb-20">
          <Container>
            <Reveal>
              <dl className="grid gap-4 rounded-3xl border border-line bg-mist/60 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
                {glance.map((item) => (
                  <div key={item.label} className="text-center sm:text-left">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl font-semibold text-text">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* Values */}
      <section className="bg-mist/60 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What Matters To Us"
              title="The things we won't compromise on"
              subtitle="A short list, because a long one wouldn't be true."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.id} delay={index * 70}>
                <div className="flex h-full gap-4 rounded-3xl border border-line bg-snow p-6">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pahadi text-snow">
                    <value.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-text">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {value.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why choose us */}
      <WhyStaySection />

      {/* Closing note */}
      {/* <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-snow p-8 text-center sm:p-12">
              <p className="font-display text-xl leading-relaxed text-text sm:text-2xl">
                {closingParagraph}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <Button href="/rooms" size="lg">
                  See the Rooms
                  <ArrowRightIcon />
                </Button>
                <Button href="/cafe/menu" size="lg" variant="outline">
                  Browse the Menu
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section> */}

      {/* Photo strip */}
      <section className="pb-16 sm:pb-24">
        <Container>
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {HIGHLIGHTS.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 640px) 380px, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <p className="mt-6 text-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-semibold text-pahadi underline-offset-4 transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pahadi"
              >
                See the full gallery
                <ArrowRightIcon />
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>

      <TestimonialsSection />
      <FaqSection />
      <BookingCTA />
    </>
  );
}