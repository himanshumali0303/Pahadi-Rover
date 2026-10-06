// Low-friction stay enquiry logic shared by the quick planner and the full
// contact form. The planner needs almost no input to be useful, so only
// check-in is required — everything else is filled in as "Not specified".

export type StayQuery = {
  checkIn: string; // yyyy-mm-dd
  checkOut: string; // yyyy-mm-dd
  guests: string; // 1-20, or "More"
  roomType: string; // room name, or "Not sure yet"
};

export type StayFieldErrors = Partial<
  Record<"checkIn" | "checkOut" | "guests", string>
>;

export const MAX_GUESTS = 20;

export function isNotInPast(value: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(value + "T00:00:00") >= today;
}

export function validateStayQuery(query: StayQuery): StayFieldErrors {
  const errors: StayFieldErrors = {};

  if (!query.checkIn) {
    errors.checkIn = "Please choose a check-in date.";
  } else if (!isNotInPast(query.checkIn)) {
    errors.checkIn = "Check-in can't be in the past.";
  }

  if (query.checkOut) {
    if (!isNotInPast(query.checkOut)) {
      errors.checkOut = "Check-out can't be in the past.";
    } else if (query.checkIn && query.checkOut < query.checkIn) {
      errors.checkOut = "Check-out must be on or after check-in.";
    }
  }

  if (query.guests && query.guests !== "More") {
    const count = Number(query.guests);
    if (!Number.isInteger(count) || count < 1 || count > MAX_GUESTS) {
      errors.guests = `Please choose between 1 and ${MAX_GUESTS} guests.`;
    }
  }

  return errors;
}

// Whole days between two yyyy-mm-dd strings, or null when the range is
// unusable (missing or reversed dates).
export function countNights(checkIn: string, checkOut: string): number | null {
  if (!checkIn || !checkOut || checkOut < checkIn) return null;
  const start = new Date(checkIn + "T00:00:00");
  const end = new Date(checkOut + "T00:00:00");
  const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  return nights > 0 ? nights : null;
}

// "2026-10-12" -> "12 Oct 2026", so the WhatsApp message reads naturally.
export function formatDate(value: string): string {
  if (!value) return "";
  const parsed = new Date(value + "T00:00:00");
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function orNotSpecified(value: string): string {
  return value || "Not specified";
}

export function buildStayMessage(query: StayQuery): string {
  const nights = countNights(query.checkIn, query.checkOut);
  const lines = [
    "Hello Pahadi Rover, I'd like to check availability for a stay.",
    "",
    `Check-in: ${orNotSpecified(formatDate(query.checkIn))}`,
    `Check-out: ${orNotSpecified(formatDate(query.checkOut))}`,
    nights ? `Nights: ${nights}` : "",
    `Guests: ${orNotSpecified(query.guests)}`,
    `Room type: ${orNotSpecified(query.roomType)}`,
  ];
  return lines.filter(Boolean).join("\n");
}