import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SITE, LOCATION, isConfigured } from "@/data/site";
import { buildWhatsAppUrl, generalEnquiryMessage, hasWhatsApp } from "@/lib/whatsapp";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/Icons";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Café", href: "/cafe" },
  { label: "Menu", href: "/cafe/menu" },
  { label: "Rooms", href: "/rooms" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const showPhone = isConfigured(SITE.phone);
  const showEmail = isConfigured(SITE.email);
  const showAddress =
    isConfigured(LOCATION.address) || isConfigured(SITE.address);
  const address = isConfigured(LOCATION.address) ? LOCATION.address : SITE.address;
  const showSocial =
    isConfigured(SITE.instagramUrl) || isConfigured(SITE.facebookUrl);

  // Deep Black surface, so secondary text uses Snow White at reduced opacity
  // rather than Muted Text, which is tuned for light backgrounds.
  const linkClass =
    "text-sm text-ink-inverse/75 transition-colors hover:text-ink-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe";
  const headingClass =
    "text-xs font-bold uppercase tracking-[0.2em] text-ink-inverse/50";
  const iconClass = "mt-0.5 h-4 w-4 shrink-0 text-ink-inverse/45";

  return (
    <footer className="bg-ink text-ink-inverse">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-inverse/70">
              A mountain café and stay for travellers looking to slow down,
              breathe deeper and enjoy the hills.
            </p>
          </div>

          <nav aria-label="Footer quick links">
            <p className={headingClass}>Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={headingClass}>Contact</p>
            {showPhone || showEmail || showAddress ? (
              <ul className="mt-4 space-y-3 text-sm text-ink-inverse/75">
                {showPhone ? (
                  <li className="flex items-start gap-3">
                    <PhoneIcon className={iconClass} />
                    <a
                      href={`tel:${SITE.phone.replace(/[^0-9+]/g, "")}`}
                      className="transition-colors hover:text-ink-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe"
                    >
                      {SITE.phone}
                    </a>
                  </li>
                ) : null}
                {hasWhatsApp ? (
                  <li className="flex items-start gap-3">
                    <WhatsAppIcon className={iconClass} />
                    <a
                      href={buildWhatsAppUrl(generalEnquiryMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-ink-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe"
                    >
                      {SITE.phone} (WhatsApp)
                    </a>
                  </li>
                ) : null}
                {showEmail ? (
                  <li className="flex items-start gap-3">
                    <MailIcon className={iconClass} />
                    <a
                      href={`mailto:${SITE.email}`}
                      className="transition-colors hover:text-ink-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe"
                    >
                      {SITE.email}
                    </a>
                  </li>
                ) : null}
                {showAddress ? (
                  <li className="flex items-start gap-3">
                    <MapPinIcon className={iconClass} />
                    <span>{address}</span>
                  </li>
                ) : null}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-ink-inverse/70">
                Contact details will be shared here once confirmed.
              </p>
            )}
          </div>

          <div>
            <p className={headingClass}>Follow Us</p>
            {showSocial ? (
              <div className="mt-4 flex gap-3">
                {isConfigured(SITE.instagramUrl) ? (
                  <a
                    href={SITE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pahadi Rover on Instagram"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-inverse/20 text-ink-inverse/80 transition-colors hover:border-cafe hover:text-cafe focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe"
                  >
                    <InstagramIcon />
                  </a>
                ) : null}
                {isConfigured(SITE.facebookUrl) ? (
                  <a
                    href={SITE.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pahadi Rover on Facebook"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-inverse/20 text-ink-inverse/80 transition-colors hover:border-cafe hover:text-cafe focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe"
                  >
                    <FacebookIcon />
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="mt-4 text-sm text-ink-inverse/70">
                Our social pages are on their way.
              </p>
            )}
            {hasWhatsApp ? (
              <p className="mt-5 text-xs text-ink-inverse/50">
                Reach out on WhatsApp for bookings and enquiries.
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-12 border-t border-ink-inverse/10 pt-6 text-center text-xs text-ink-inverse/50">
          © {new Date().getFullYear()} Pahadi Rover. Made with love in the
          hills.
        </div>
      </div>
    </footer>
  );
}