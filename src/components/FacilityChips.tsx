import type { ComponentType } from "react";
import {
  BedIcon,
  CoffeeIcon,
  LeafIcon,
  MountainIcon,
  UsersIcon,
  WifiIcon,
} from "@/components/Icons";

type IconComponent = ComponentType<{ className?: string }>;

// Matched by lowercase substring so "Free Wi-Fi" and "Wi-Fi" both resolve.
// Anything unmatched falls back to the plain text pill, so a new facility never
// breaks rendering.
const FACILITY_ICONS: Array<[string, IconComponent]> = [
  ["wi-fi", WifiIcon],
  ["wifi", WifiIcon],
  ["bed", BedIcon],
  ["double", BedIcon],
  ["twin", BedIcon],
  ["family", UsersIcon],
  ["group", UsersIcon],
  ["spacious", UsersIcon],
  ["view", MountainIcon],
  ["mountain", MountainIcon],
  ["café", CoffeeIcon],
  ["cafe", CoffeeIcon],
  ["food", CoffeeIcon],
  ["garden", LeafIcon],
];

function iconForFacility(facility: string): IconComponent | null {
  const normalized = facility.toLowerCase();
  for (const [keyword, icon] of FACILITY_ICONS) {
    if (normalized.includes(keyword)) return icon;
  }
  return null;
}

export function FacilityChips({ facilities }: { facilities: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {facilities.map((facility) => {
        const Icon = iconForFacility(facility);
        return (
          <li
            key={facility}
            className="inline-flex items-center gap-1.5 rounded-full bg-pahadi/5 px-3 py-1 text-xs font-medium text-pahadi"
          >
            {Icon ? <Icon className="h-3.5 w-3.5 shrink-0" /> : null}
            {facility}
          </li>
        );
      })}
    </ul>
  );
}