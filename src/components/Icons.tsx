import type { ComponentType } from "react";
import {
  ArrowRight as ArrowRightGlyph,
  BedDouble as BedDoubleGlyph,
  CalendarDays as CalendarDaysGlyph,
  Check as CheckGlyph,
  ChevronDown as ChevronDownGlyph,
  Clock as ClockGlyph,
  Coffee as CoffeeGlyph,
  Compass as CompassGlyph,
  ConciergeBell as ConciergeBellGlyph,
  Heart as HeartGlyph,
  Leaf as LeafGlyph,
  Mail as MailGlyph,
  MapPin as MapPinGlyph,
  Menu as MenuGlyph,
  Mountain as MountainGlyph,
  Navigation as NavigationGlyph,
  PawPrint as PawPrintGlyph,
  Phone as PhoneGlyph,
  Quote as QuoteGlyph,
  SquareParking as SquareParkingGlyph,
  Star as StarGlyph,
  Users as UsersGlyph,
  UtensilsCrossed as UtensilsCrossedGlyph,
  Wifi as WifiGlyph,
  X as CloseGlyph,
  type LucideIcon,
} from "lucide-react";

/**
 * Single icon system for the app.
 *
 * Everything non-brand is Lucide, so weights and corner radii match across the
 * navbar, sections and new category cards. Only genuine brand glyphs (WhatsApp,
 * Instagram, Facebook) stay hand-drawn below — Lucide does not ship brand marks.
 *
 * The `*Icon` export names are kept as the app's stable vocabulary, so call
 * sites read the same as before this was consolidated onto one library.
 */
export type IconProps = {
  className?: string;
};

type BuiltIcon = ComponentType<IconProps>;

/** Wraps a Lucide glyph, keeping the default size each call site relied on. */
function lucideIcon(
  Glyph: LucideIcon,
  { size, strokeWidth }: { size: string; strokeWidth: number },
): BuiltIcon {
  function Icon({ className = size }: IconProps) {
    return (
      <Glyph
        className={className}
        strokeWidth={strokeWidth}
        aria-hidden="true"
      />
    );
  }
  return Icon;
}

// Softer stroke on the larger decorative glyphs, matching the original set.
const feature = { size: "h-6 w-6", strokeWidth: 1.6 } as const;
const inline = { size: "h-5 w-5", strokeWidth: 1.6 } as const;
const ui = { size: "h-5 w-5", strokeWidth: 1.8 } as const;

export const MapPinIcon = lucideIcon(MapPinGlyph, ui);
export const PhoneIcon = lucideIcon(PhoneGlyph, ui);
export const MailIcon = lucideIcon(MailGlyph, ui);
export const CoffeeIcon = lucideIcon(CoffeeGlyph, feature);
export const BedIcon = lucideIcon(BedDoubleGlyph, feature);
export const UtensilsCrossedIcon = lucideIcon(UtensilsCrossedGlyph, feature);
export const ConciergeBellIcon = lucideIcon(ConciergeBellGlyph, feature);
export const MountainIcon = lucideIcon(MountainGlyph, feature);
export const UsersIcon = lucideIcon(UsersGlyph, feature);
export const CompassIcon = lucideIcon(CompassGlyph, feature);
export const HeartIcon = lucideIcon(HeartGlyph, feature);
export const LeafIcon = lucideIcon(LeafGlyph, feature);
export const WifiIcon = lucideIcon(WifiGlyph, inline);
export const CalendarIcon = lucideIcon(CalendarDaysGlyph, inline);
export const ClockIcon = lucideIcon(ClockGlyph, inline);
export const ParkingIcon = lucideIcon(SquareParkingGlyph, inline);
export const PawIcon = lucideIcon(PawPrintGlyph, inline);
export const CheckIcon = lucideIcon(CheckGlyph, { size: "h-5 w-5", strokeWidth: 2 });
export const NavigationIcon = lucideIcon(NavigationGlyph, ui);
export const ArrowRightIcon = lucideIcon(ArrowRightGlyph, {
  size: "h-4 w-4",
  strokeWidth: 2,
});
export const ChevronDownIcon = lucideIcon(ChevronDownGlyph, {
  size: "h-5 w-5",
  strokeWidth: 2,
});
export const MenuIcon = lucideIcon(MenuGlyph, { size: "h-6 w-6", strokeWidth: 2 });
export const CloseIcon = lucideIcon(CloseGlyph, { size: "h-6 w-6", strokeWidth: 2 });
export const QuoteIcon = lucideIcon(QuoteGlyph, inline);

/** `filled` swaps the outline star for a solid one in testimonials. */
export function StarIcon({
  className = "h-5 w-5",
  filled = false,
}: IconProps & { filled?: boolean }) {
  return (
    <StarGlyph
      className={className}
      strokeWidth={1.6}
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    />
  );
}

/* --- Brand glyphs: hand-drawn, since Lucide ships no brand marks. --- */

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.42 9.42 0 0 1-1.45-5.04c0-5.2 4.24-9.45 9.46-9.45a9.4 9.4 0 0 1 9.45 9.45c0 5.22-4.24 9.46-9.49 9.46Zm8.36-17.82A11.36 11.36 0 0 0 12.04.62C5.5.62.17 5.95.16 12.5c0 2.1.55 4.14 1.59 5.95L.1 23.9l5.6-1.47a11.9 11.9 0 0 0 6.32 1.8c6.55 0 11.88-5.33 11.89-11.88a11.8 11.8 0 0 0-3.51-8.39Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
