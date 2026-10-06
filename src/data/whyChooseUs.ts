import type { ComponentType } from "react";
import {
  BedIcon,
  CoffeeIcon,
  ConciergeBellIcon,
  ParkingIcon,
  UtensilsCrossedIcon,
  WifiIcon,
} from "@/components/Icons";

type IconComponent = ComponentType<{ className?: string }>;

export type Facility = {
  id: string;
  icon: IconComponent;
  title: string;
};

// The six facilities a guest looks for before booking, in the order they
// usually ask about them. Each is a single line of text on purpose — the
// badge does the recognising, the title does the naming, and the card stays
// short enough that the three-column grid lines up.
export const facilities: Facility[] = [
  {
    id: "best-rooms",
    icon: BedIcon,
    title: "Best Rooms",
  },
  {
    id: "free-wifi",
    icon: WifiIcon,
    title: "Free Wi-Fi",
  },
  {
    id: "parking",
    icon: ParkingIcon,
    title: "Parking",
  },
  {
    id: "breakfast",
    icon: UtensilsCrossedIcon,
    title: "Breakfast",
  },
  {
    id: "room-service",
    icon: ConciergeBellIcon,
    title: "Room Service",
  },
  {
    id: "cafe-area",
    icon: CoffeeIcon,
    title: "Café Area",
  },
];
