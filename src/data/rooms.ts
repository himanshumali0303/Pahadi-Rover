export type RoomImage = {
  src: string;
  alt: string;
};

export type Room = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  facilities: string[];
  images: RoomImage[];
  capacity?: string; // e.g. "Sleeps 2" – omit until the owner confirms
  price?: string; // e.g. "₹2,500 / night" – omit to show "Enquire for pricing"
  availabilityText?: string; // e.g. "Some dates available" – optional
  // Structured capacity details, used to render the "Sleeps 2 · 1 Bedroom ·
  // 1 Bath" meta line. Omit any of these until the owner confirms them.
  maxGuests?: number;
  bedrooms?: number;
  bathrooms?: number;
  bedType?: string; // e.g. "King bed"
};

/** Builds an alt list for a room's own photo folder. */
function roomImages(prefix: "room-1" | "room-2", count: number, label: string) {
  return Array.from({ length: count }, (_, i) => ({
    src: `/rooms/${prefix}/${prefix}-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `${label} — photo ${i + 1}`,
  }));
}

// Two rooms, matching the two real rooms on site. `images[0]` is the card
// thumbnail; the rest open in the gallery lightbox.
const ROOM_1_COUNT = 7;
const ROOM_2_COUNT = 10;

export const rooms: Room[] = [
  {
    id: "room-1",
    name: "Room 1",
    shortDescription:
      "A comfortable private room where you can wake up to open mountain views.",
    longDescription:
      "A comfortable, private room designed for slow mornings. Open the curtains to rolling hills and fresh mountain air, then head down to the café for your first cup of the day.",
    facilities: ["Comfortable stay", "Mountain views", "Private room", "Wi-Fi"],
    images: [
      {
        src: "/rooms/room-1-thumb.jpg",
        alt: "Room 1 — main view",
      },
      ...roomImages("room-1", ROOM_1_COUNT, "Room 1"),
    ],
  },
  {
    id: "room-2",
    name: "Room 2",
    shortDescription:
      "A warm, relaxing room with a comfortable double bed — perfect for couples.",
    longDescription:
      "A calm and restful space with a comfortable double bed and a relaxed interior. Ideal for couples looking to unwind after a day of exploring the hills.",
    facilities: [
      "Comfortable double bed",
      "Relaxing interior",
      "Private room",
      "Wi-Fi",
    ],
    images: [
      {
        src: "/rooms/room-2-thumb.jpg",
        alt: "Room 2 — main view",
      },
      ...roomImages("room-2", ROOM_2_COUNT, "Room 2"),
    ],
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}

/** The card/hero thumbnail — the first entry in `images`. */
export function getRoomPrimaryImage(room: Room): RoomImage | null {
  return room.images[0] ?? null;
}

/**
 * The gallery set for a room. The thumbnail is included so the lightbox can
 * open on it too; the thumbnail strip and the "View N photos" label are built
 * from this same list.
 */
export function getRoomGallery(room: Room): RoomImage[] {
  return room.images;
}

// "Sleeps 2 · King bed · 1 Bedroom · 1 Bath" — built from whichever structured
// fields the owner has confirmed. Falls back to the free-text `capacity`
// string when no structured fields are set, so existing data still shows.
// Returns "" when nothing is set yet.
export function getRoomMeta(room: Room): string {
  const parts: string[] = [];

  if (room.maxGuests) {
    parts.push(`Sleeps ${room.maxGuests}`);
  } else if (room.capacity) {
    parts.push(room.capacity);
  }
  if (room.bedType) parts.push(room.bedType);
  if (room.bedrooms) {
    parts.push(`${room.bedrooms} Bedroom${room.bedrooms === 1 ? "" : "s"}`);
  }
  if (room.bathrooms) {
    parts.push(`${room.bathrooms} Bath${room.bathrooms === 1 ? "" : "s"}`);
  }

  return parts.join(" · ");
}

export function roomNameForSelect(): { id: string; name: string }[] {
  return rooms.map((room) => ({ id: room.id, name: room.name }));
}
