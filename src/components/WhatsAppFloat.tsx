import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl(generalEnquiryMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pahadi Rover on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-pahadi text-snow shadow-lg transition-colors duration-200 hover:bg-pahadi-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}