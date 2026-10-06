import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { CafeSection } from "@/components/CafeSection";
import { RoomsSection } from "@/components/RoomsSection";
import { WhyStaySection } from "@/components/WhyStaySection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { StayFacts } from "@/components/StayFacts";
import { LocationSection } from "@/components/LocationSection";
import { BookingCTA } from "@/components/BookingCTA";
import { JsonLd } from "@/components/JsonLd";
import { SITE, isConfigured } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: "Pahadi Rover | Café & Stay in the Mountains",
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  // Contact details and address are only included in structured data once
  // the owner replaces the placeholders, so search engines never see fake
  // contact information.
  const telephone = isConfigured(SITE.phone) ? SITE.phone : null;
  const email = isConfigured(SITE.email) ? SITE.email : null;
  const addressLd =
    isConfigured(SITE.address) && isConfigured(SITE.phone)
      ? { "@type": "PostalAddress", streetAddress: SITE.address }
      : null;

  const cafeLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "Pahadi Rover",
    description: SITE.description,
    servesCuisine: ["Coffee", "Tea", "Snacks", "Meals", "Local-inspired food"],
    hasMenu: "/cafe/menu",
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
    ...(addressLd ? { address: addressLd } : {}),
  };

  const stayLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Pahadi Rover",
    description: SITE.description,
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
    ...(addressLd ? { address: addressLd } : {}),
  };

  return (
    <>
      <JsonLd data={cafeLd} />
      <JsonLd data={stayLd} />
      <Hero />
      <IntroSection />
      <CafeSection />
      <RoomsSection />
      <WhyStaySection />
      <GallerySection />
      <TestimonialsSection />
      <FaqSection />
      <StayFacts />
      <LocationSection />
      <BookingCTA />
    </>
  );
}