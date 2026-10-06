import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { LocationSection } from "@/components/LocationSection";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { SITE, isConfigured } from "@/data/site";
import { hasWhatsApp, buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Bookings",
  description:
    "Enquire about a stay at Pahadi Rover. Send a room enquiry or reach out on WhatsApp, phone or email.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const showPhone = isConfigured(SITE.phone);
  const showEmail = isConfigured(SITE.email);
  const showAddress = isConfigured(SITE.address);
  const hasSidebar = showPhone || hasWhatsApp || showEmail || showAddress;

  return (
    <>
      <PageHero
        eyebrow="Contact & Bookings"
        title="Plan your stay with us"
        subtitle="Send an enquiry and we'll get back to you â€” or reach us directly on WhatsApp for anything at all."
        image="/property/property-05.jpg"
        imageAlt="A cozy window seat looking out at snowy weather"
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <Reveal className={hasSidebar ? "lg:col-span-3" : "lg:col-span-5"}>
            <ContactForm />
          </Reveal>

          {hasSidebar ? (
          <Reveal delay={100} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
                <div className="rounded-3xl border border-line bg-snow p-6 sm:p-7">
                  <h2 className="font-display text-xl font-semibold text-text">
                    Get in Touch
                  </h2>
                  <ul className="mt-5 space-y-4 text-sm">
                    {showPhone ? (
                      <li className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pahadi text-snow">
                          <PhoneIcon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-text">Phone</p>
                          <a
                            href={`tel:${SITE.phone.replace(/[^0-9+]/g, "")}`}
                            className="mt-0.5 block text-muted transition-colors hover:text-pahadi"
                          >
                            {SITE.phone}
                          </a>
                        </div>
                      </li>
                    ) : null}
                    {hasWhatsApp ? (
                      <li className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pahadi text-snow">
                          <WhatsAppIcon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-text">WhatsApp</p>
                          <a
                            href={buildWhatsAppUrl(generalEnquiryMessage())}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-0.5 block text-muted transition-colors hover:text-pahadi"
                          >
                            {SITE.phone}
                          </a>
                        </div>
                      </li>
                    ) : null}
                    {showEmail ? (
                      <li className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pahadi text-snow">
                          <MailIcon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-text">Email</p>
                          <a
                            href={`mailto:${SITE.email}`}
                            className="mt-0.5 block text-muted transition-colors hover:text-pahadi"
                          >
                            {SITE.email}
                          </a>
                        </div>
                      </li>
                    ) : null}
                    {showAddress ? (
                      <li className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pahadi text-snow">
                          <MapPinIcon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-text">Address</p>
                          <p className="mt-0.5 block text-muted">{SITE.address}</p>
                        </div>
                      </li>
                    ) : null}
                  </ul>
                </div>

              {hasWhatsApp ? (
                <div className="rounded-3xl bg-pahadi p-6 text-snow sm:p-7">
                  <h2 className="font-display text-xl font-semibold">
                    The easiest way to book
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-snow/80">
                    Send us a message on WhatsApp and we&apos;ll confirm availability,
                    share room details and help you plan your stay.
                  </p>
                  <a
                    href={buildWhatsAppUrl(generalEnquiryMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-snow px-5 py-2.5 text-sm font-semibold text-pahadi transition-colors hover:bg-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snow"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Message on WhatsApp
                  </a>
                </div>
              ) : null}
            </div>
          </Reveal>
          ) : null}
        </Container>
      </section>

      <LocationSection />
    </>
  );
}