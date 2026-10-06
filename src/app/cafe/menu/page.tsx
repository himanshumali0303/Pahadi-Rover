import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MenuList } from "@/components/MenuList";
import { BookingCTA } from "@/components/BookingCTA";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The Pahadi Rover cafÃ© menu â€” coffee, chai, bakery, snacks and local-inspired meals, cooked to order in the hills of Himachal Pradesh.",
  alternates: {
    canonical: "/cafe/menu",
  },
};

export default function CafeMenuPage() {
  return (
    <>
      <PageHero
        eyebrow="The CafÃ©"
        title="Our Menu"
        subtitle="Brewed to order, cooked fresh and kept simple â€” the way good mountain food should be."
        image="/cafe/cafe-01.jpg"
        imageAlt="A freshly brewed cup of coffee on the cafÃ© counter"
      />

      <MenuList />

      <BookingCTA />
    </>
  );
}