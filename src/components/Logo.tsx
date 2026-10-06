import Image from "next/image";
import Link from "next/link";

/**
 * `onDark` means "rendered on a Deep Black surface" (navbar, footer), which
 * dims the tagline. The wordmark stays Snow White on dark and Dark Text on
 * light so it always clears contrast.
 */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  const sub = onDark ? "text-ink-inverse/60" : "text-muted";
  const name = onDark ? "text-ink-inverse" : "text-text";

  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe"
      aria-label="Pahadi Rover – Home"
    >
      <Image
        src="/brand/logo.png"
        alt=""
        width={40}
        height={40}
        priority
        sizes="40px"
        className="h-10 w-10 shrink-0 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold tracking-tight ${name}`}>
          Pahadi Rover
        </span>
        <span
          className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] ${sub}`}
        >
          Café &amp; Stay
        </span>
      </span>
    </Link>
  );
}
