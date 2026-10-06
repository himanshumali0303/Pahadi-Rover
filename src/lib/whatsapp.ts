// Central WhatsApp configuration.
// Replace the placeholder with the owner's WhatsApp number (with country code),
// e.g. "919876543210". Everything on the site books through this number.
export const WHATSAPP_NUMBER = "919876543210"; // DEMO — replace before launch

// True once the owner replaces the placeholder. Until then the site hides the
// floating WhatsApp button, WhatsApp links and direct-chat CTAs instead of
// opening an empty wa.me URL.
export const hasWhatsApp: boolean = !WHATSAPP_NUMBER.includes("[") &&
  WHATSAPP_NUMBER.replace(/\D/g, "").length > 0;

export function buildWhatsAppUrl(message: string): string {
  const number = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export type RoomEnquiry = {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
  message: string;
};

export function buildRoomEnquiryMessage(input: RoomEnquiry): string {
  const lines = [
    "Hello Pahadi Rover, I would like to enquire about a stay.",
    "",
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Check-in: ${input.checkIn || "Not specified"}`,
    `Check-out: ${input.checkOut || "Not specified"}`,
    `Guests: ${input.guests || "Not specified"}`,
    `Room Type: ${input.roomType || "Not specified"}`,
    input.message ? `Message: ${input.message}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

export function roomEnquiryMessage(roomName: string): string {
  return `Hello Pahadi Rover, I would like to enquire about the "${roomName}". Could you share availability and details?`;
}

export function buildRoomEnquiry(): string {
  return "Hello Pahadi Rover, I would like to enquire about a stay. Could you share availability and pricing?";
}

export function generalEnquiryMessage(): string {
  return "Hello Pahadi Rover, I would like to make an enquiry.";
}