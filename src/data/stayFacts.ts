import type { ComponentType } from "react";
import {
  ClockIcon,
  CoffeeIcon,
  MountainIcon,
  ParkingIcon,
  PawIcon,
  UsersIcon,
  WifiIcon,
} from "@/components/Icons";
import { isConfigured } from "@/data/site";

type IconComponent = ComponentType<{ className?: string }>;

export type StayFact = {
  id: string;
  label: string;
  value: string;
  icon: IconComponent;
};

// Owner-editable "Know before you go" facts, modelled on the placeholder
// convention in `site.ts`: any `value` still containing `[` is treated as
// unconfirmed and is hidden, so you never publish a policy you haven't agreed
// to. Fill these in as you confirm them — only confirmed facts appear.
export const stayFacts: StayFact[] = [
{
    id: "check-in",
    label: "Check-in",
    value: "From 2:00 PM [CONFIRM CHECK-IN TIME]",
    icon: ClockIcon,
  },
  {
    id: "check-out",
    label: "Check-out",
    value: "By 11:00 AM [CONFIRM CHECK-OUT TIME]",
    icon: ClockIcon,
  },
  {
    id: "max-guests",
    label: "Max guests",
    value: "Up to [CONFIRM MAX GUESTS] per booking",
    icon: UsersIcon,
  },
  {
    id: "parking",
    label: "Parking",
    value: "[CONFIRM: on-site parking available / street parking nearby]",
    icon: ParkingIcon,
  },
  {
    id: "pets",
    label: "Pets",
    value: "[CONFIRM: pets welcome / pets not allowed]",
    icon: PawIcon,
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    value: "Free Wi-Fi in all rooms and the café",
    icon: WifiIcon,
  },
  {
    id: "cafe",
    label: "Café",
    value: "In-house café — no need to go elsewhere",
    icon: CoffeeIcon,
  },
  {
    id: "power",
    label: "Power",
    value: "[CONFIRM: backup power for outages]",
    icon: MountainIcon,
  },
];

export function getConfirmedStayFacts(): StayFact[] {
  return stayFacts.filter((fact) => isConfigured(fact.value));
}

export function hasConfirmedStayFacts(): boolean {
  return getConfirmedStayFacts().length > 0;
}
