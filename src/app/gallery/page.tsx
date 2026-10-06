import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GallerySection } from "@/components/GallerySection";
import { BookingCTA } from "@/components/BookingCTA";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of the cafÃ©, rooms, views and property at Pahadi Rover in the hills of Himachal Pradesh.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
<PageHero
        eyebrow="Gallery"
        title="Moments at Pahadi Rover"
        subtitle="The cafÃ©, the rooms and the views â€” a first look at what's waiting in the hills."
        image="/views/view-02.jpg"
        imageAlt="Hills beyond the valley"
      />
      <GallerySection />
      <BookingCTA />
    </>
  );
}