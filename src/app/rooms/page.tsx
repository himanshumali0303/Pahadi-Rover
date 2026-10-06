import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { BookingCTA } from "@/components/BookingCTA";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { StayFacts } from "@/components/StayFacts";
import { RoomGallery } from "@/components/RoomGallery";
import { rooms, getRoomMeta } from "@/data/rooms";
import {
  hasWhatsApp,
  buildWhatsAppUrl,
  roomEnquiryMessage,
  buildRoomEnquiry,
} from "@/lib/whatsapp";
import { FacilityChips } from "@/components/FacilityChips";

export const metadata: Metadata = {
  title: "Rooms & Stay",
  description:
    "Two comfortable rooms at Pahadi Rover in the hills â€” see every photo of each room and enquire about availability.",
  alternates: {
    canonical: "/rooms",
  },
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay With Us"
        title="Two rooms, both with the hills outside"
        subtitle="No fuss, no frills â€” comfortable rooms, warm service, and every photo of each room on this page."
        image="/views/view-01.jpg"
        imageAlt="The mountain view from the property"
      />

      <section id="rooms" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <div className="space-y-10">
            {rooms.map((room, index) => {
              const meta = getRoomMeta(room);

              return (
                <Reveal key={room.id} delay={index * 60}>
                  <article
                    id={room.id}
                    className="grid scroll-mt-28 overflow-hidden rounded-3xl border border-line bg-snow shadow-sm lg:grid-cols-2"
                  >
                    <div className="p-6 sm:p-8 lg:py-0 lg:pl-0 lg:pr-8">
                      <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
                        <RoomGallery room={room} />
                      </div>
                    </div>

                    <div className="flex flex-col p-6 sm:p-8 lg:py-8 lg:pl-0 lg:pr-8">
                      <h2 className="font-display text-2xl font-bold text-text">
                        {room.name}
                      </h2>
                      <p className="mt-3 leading-relaxed text-muted">
                        {room.longDescription}
                      </p>
                      {(meta || room.availabilityText || room.price) ? (
                        <p className="mt-4 text-sm font-medium text-pahadi">
                          {[meta, room.availabilityText, room.price]
                            .filter(Boolean)
                            .join(" Â· ")}
                        </p>
                      ) : null}
                      <p className="mt-4 text-xs text-muted">
                        Contact for availability &amp; pricing.
                      </p>
                      <FacilityChips facilities={room.facilities} />

                      <div className="mt-7 flex-1" />
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                          href={
                            hasWhatsApp
                              ? buildWhatsAppUrl(roomEnquiryMessage(room.name))
                              : "/contact"
                          }
                          external={hasWhatsApp}
                          className="w-full sm:w-auto"
                        >
                          {hasWhatsApp ? "Enquire on WhatsApp" : "Book a Stay"}
                        </Button>
                        <Button
                          href="/contact"
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          Send Enquiry Form
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12">
            <div className="rounded-3xl bg-pahadi px-6 py-10 text-center sm:px-10">
              <h2 className="font-display text-2xl font-semibold text-snow sm:text-3xl">
                Not sure which room suits you?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-snow/85">
                Tell us who&apos;s travelling and we&apos;ll help you pick the right stay
                for your trip.
              </p>
              <div className="mt-6">
                <Button
                  href={hasWhatsApp ? buildWhatsAppUrl(buildRoomEnquiry()) : "/contact"}
                  external={hasWhatsApp}
                  variant="light"
                >
                  {hasWhatsApp ? "Enquire on WhatsApp" : "Book a Stay"}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <StayFacts />
      <TestimonialsSection />

      <BookingCTA />
    </>
  );
}
