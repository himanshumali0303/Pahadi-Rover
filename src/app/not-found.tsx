import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center justify-center">
      <div className="px-5 py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
          Lost in the hills
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-text sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you&apos;re looking for has wandered off into the forest. Let&apos;s
          get you back to the trail.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-pahadi px-7 py-3.5 text-base font-semibold text-snow transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pahadi"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}