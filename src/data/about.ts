import type { ComponentType } from "react";
import { CoffeeIcon, HeartIcon, LeafIcon, MountainIcon } from "@/components/Icons";

type IconComponent = ComponentType<{ className?: string }>;

export type Value = {
  id: string;
  icon: IconComponent;
  title: string;
  text: string;
};

// PLACEHOLDER COPY — this is layout-ready sample text, not your real history.
// Replace every paragraph with what is actually true about your place. Keep the
// honest, low-key tone; the whole point of the About page is to sound like a
// person rather than a brochure.
export const story: string[] = [
  "Pahadi Rover started with a simple problem: the best parts of the hills are spread far apart, and getting between them means long drives with nothing to look forward to in between.",
  "So we built a place that solves the in-between. A café that is good enough to linger in, and rooms upstairs for anyone who'd rather wake up here than drive back down the hill.",
];

export const closingParagraph: string =
  "We don't try to be everything to everyone. Some guests stay one night and leave rested; others end up staying a week because there's nothing pressing them to leave. Both are fine.";

export const values: Value[] = [
  {
    id: "unhurried",
    icon: LeafIcon,
    title: "Unhurried by design",
    text: "Nothing here is on a schedule except the coffee. We would rather you stayed an extra night than rushed an evening.",
  },
  {
    id: "local",
    icon: MountainIcon,
    title: "Close to the hills",
    text: "We'd rather help you find the trail nobody else went to this week than run a package you could buy anywhere.",
  },
  {
    id: "small",
    icon: HeartIcon,
    title: "Small on purpose",
    text: "Three rooms means we know who's in them. It's the reason people come back, and the reason we stay small.",
  },
  {
    id: "food",
    icon: CoffeeIcon,
    title: "Food worth staying in for",
    text: "The café isn't an afterthought. It's the reason most people end up spending an evening here even without a room booked.",
  },
];

// Used for the quick "at a glance" strip. Anything still bracketed is hidden,
// so fill these in as you confirm them.
export const atAGlance: Array<{ label: string; value: string }> = [
  { label: "Rooms", value: "3" },
  { label: "Café", value: "On property" },
  { label: "Setting", value: "Himachal Pradesh" },
  { label: "Wi-Fi", value: "Throughout" },
];