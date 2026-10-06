import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { SITE, getSiteUrl } from "@/data/site";
import { hasWhatsApp } from "@/lib/whatsapp";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Site URL is only set once the owner configures the domain. Until then,
// relative canonical URLs are emitted and no placeholder origin is used.
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Pahadi Rover | CafÃ© & Stay in the Mountains",
    template: "%s | Pahadi Rover",
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: "Pahadi Rover | CafÃ© & Stay in the Mountains",
    description: SITE.description,
    ...(siteUrl ? { url: siteUrl } : {}),
    images: [
      {
        url: "/views/view-01.jpg",
        width: 1200,
        height: 800,
        alt: "The mountain view from Pahadi Rover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pahadi Rover | CafÃ© & Stay in the Mountains",
    description: SITE.description,
    images: ["/views/view-01.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#111827",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-pahadi focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-snow"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        {hasWhatsApp ? <WhatsAppFloat /> : null}
      </body>
    </html>
  );
}