"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { CloseIcon, MenuIcon } from "@/components/Icons";

type NavLink = {
  label: string;
  href: string;
};

// The site's navigation, unchanged from the original build. No category
// shortcuts were added here on purpose — this is the full page list.
const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Café", href: "/cafe" },
  { label: "Menu", href: "/cafe/menu" },
  { label: "Rooms", href: "/rooms" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Nested routes such as `/cafe/menu` must not light up `/cafe` as well, so
  // the most specific matching link wins.
  const activeHref = NAV_LINKS.reduce<string | null>((best, link) => {
    const matches =
      link.href === "/"
        ? pathname === "/"
        : pathname === link.href || pathname.startsWith(`${link.href}/`);
    if (!matches) return best;
    if (best === null) return link.href;
    return link.href.length > best.length ? link.href : best;
  }, null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkBase =
    "relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        // Deep Black base; lightens to a translucent ink on scroll.
        scrolled
          ? "border-ink-inverse/10 bg-ink/95 backdrop-blur-md"
          : "border-transparent bg-ink"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <Logo onDark />

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = link.href === activeHref;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`${linkBase} ${
                    active
                      ? "text-ink-inverse"
                      : "text-ink-inverse/70 hover:text-ink-inverse"
                  }`}
                >
                  {link.label}
                  {/* Himalayan Yellow marks the current page. */}
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-cafe"
                    style={{ opacity: active ? 1 : 0 }}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/contact" size="sm" variant="cafe">
            Book a Stay
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink-inverse transition-colors hover:bg-ink-inverse/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Slide-down mobile navigation over Deep Black, matching the header. */}
      <div
        id="mobile-menu"
        className="overflow-hidden border-ink-inverse/10 transition-[max-height,opacity] duration-300 ease-out lg:hidden"
        style={{
          maxHeight: open ? "560px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="bg-ink">
          <ul className="space-y-1 px-5 pt-1 pb-6">
            {NAV_LINKS.map((link) => {
              const active = link.href === activeHref;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe ${
                      active
                        ? "bg-ink-inverse/10 text-ink-inverse"
                        : "text-ink-inverse/75 hover:bg-ink-inverse/5 hover:text-ink-inverse"
                    }`}
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-cafe"
                      style={{ opacity: active ? 1 : 0.35 }}
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}

            <li className="pt-3">
              <Button
                href="/contact"
                variant="cafe"
                size="lg"
                className="w-full"
              >
                Book a Stay
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
