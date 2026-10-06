import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { hasWhatsApp, buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { StayPlanner } from "@/components/StayPlanner";

export function BookingCTA() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/views/view-05.jpg"
        alt="Evening light on the ridges from Pahadi Rover"
        fill
        sizes="100vw"
        className="object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-ink/75"
        aria-hidden="true"
      />
      <Container className="relative z-10 py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-tight text-snow sm:text-5xl lg:mx-0">
              Your Mountain Escape Starts Here.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-snow/85 sm:text-lg lg:mx-0">
              Planning a weekend in the hills? Pick your dates and we&apos;ll
              check availability for you.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
              <Button href="/contact" size="lg" variant="light" className="w-full sm:w-auto">
                Send a Full Enquiry
              </Button>
              {hasWhatsApp ? (
                <Button
                  href={buildWhatsAppUrl(generalEnquiryMessage())}
                  external
                  size="lg"
                  variant="outline"
                  className="w-full border-snow/40 text-snow hover:border-snow hover:bg-snow/10 sm:w-auto"
                >
                  Chat on WhatsApp
                </Button>
              ) : null}
            </div>
          </div>

          <StayPlanner />
        </div>
      </Container>
    </section>
  );
}