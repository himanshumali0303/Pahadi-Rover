import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Variants follow the brand button system:
 *   primary    — Deep Black (#111827) on Snow White text
 *   secondary  — Forest Green (#2F6B4F) on Snow White text
 *   travel     — Mountain Blue (#2563EB) on white text
 *   cafe       — Himalayan Yellow (#F4B942) on Deep Black text
 *   outline    — transparent with a brand border
 *   light      — for use on dark surfaces
 * No gradients anywhere; hover is a flat colour shift.
 */
type Variant = "primary" | "secondary" | "travel" | "cafe" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-snow hover:bg-ink-soft focus-visible:outline-ink shadow-sm",
  secondary:
    "bg-pahadi text-snow hover:bg-pahadi-deep focus-visible:outline-pahadi shadow-sm",
  travel:
    "bg-travel text-white hover:bg-travel-deep focus-visible:outline-travel shadow-sm",
  cafe:
    "bg-cafe text-ink hover:bg-cafe-deep focus-visible:outline-cafe shadow-sm",
  outline:
    "border border-current/30 bg-transparent text-current hover:bg-current/5 focus-visible:outline-current",
  ghost:
    "bg-transparent text-text hover:bg-ink/5 focus-visible:outline-ink",
  light:
    "bg-snow text-ink hover:bg-mist focus-visible:outline-snow shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type ButtonProps = {
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & (
  | { href?: string; onClick?: never }
  | { href?: never; onClick?: () => void }
);

export function Button({
  href,
  external = false,
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
