export const galleryCategories = ["Café", "Rooms", "Views", "Property"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryImage = {
  src: string;
  title: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
};

// Every photo below is a real shot from the property, served from /public.
// All source images are 3:2 (4608×3072).

const PHOTO_W = 1200;
const PHOTO_H = 800;

function photo(
  src: string,
  title: string,
  category: GalleryCategory,
): GalleryImage {
  return {
    src,
    title,
    alt: title,
    category,
    width: PHOTO_W,
    height: PHOTO_H,
  };
}

// --- Café ---
// cafe-01..03 are the owner's chosen opening shots (cafe1, cafe2, cafe3, in
// that order); the rest follow in filename order.
const CAFE_TITLES: string[] = [
  "The café at Pahadi Rover",
  "Inside the café",
  "Seating by the window",
  "A corner of the café",
  "Coffee, freshly made",
  "Morning at the counter",
  "Chai and a warm mug",
  "Light across the tables",
  "Somewhere to sit a while",
  "The counter in the afternoon",
  "A quiet corner",
  "Coffee with a view",
  "Ready to order",
  "The café in detail",
  "Evening in the café",
  "A last cup of the day",
  "Pahadi Rover café",
];

// --- Rooms ---
const ROOM_1_TITLES: string[] = [
  "Room 1, main view",
  "Room 1, seating area",
  "Room 1, bed and linens",
  "Room 1, looking out",
  "Room 1, in the morning light",
  "Room 1, the far corner",
  "Room 1, evening",
];

const ROOM_2_TITLES: string[] = [
  "Room 2, main view",
  "Room 2, bed and linens",
  "Room 2, by the window",
  "Room 2, seating area",
  "Room 2, storage and details",
  "Room 2, morning light",
  "Room 2, from the doorway",
  "Room 2, the far corner",
  "Room 2, looking out",
  "Room 2, evening",
];

// --- Views ---
const VIEW_TITLES: string[] = [
  "The view from the property",
  "Hills beyond the valley",
  "Morning over the mountains",
  "A clear afternoon",
  "Evening light on the ridges",
];

// --- Property ---
// Note: index 3 is DSC06800.JPG, the only JPEG in the source folder.
const PROPERTY_TITLES: string[] = [
  "The property",
  "Arriving at Pahadi Rover",
  "Outside the main building",
  "Around the property",
  "The grounds",
  "Pahadi Rover, in full",
];

/**
 * Order matters: café leads with the owner's chosen opening shots, then the
 * rooms, then the views and the property. The gallery page renders this order,
 * and the category filters slice into it.
 */
export const galleryImages: GalleryImage[] = [
  ...CAFE_TITLES.map((title, i) =>
    photo(`/cafe/cafe-${String(i + 1).padStart(2, "0")}.jpg`, title, "Café"),
  ),
  ...ROOM_1_TITLES.map((title, i) =>
    photo(
      `/rooms/room-1/room-1-${String(i + 1).padStart(2, "0")}.jpg`,
      title,
      "Rooms",
    ),
  ),
  ...ROOM_2_TITLES.map((title, i) =>
    photo(
      `/rooms/room-2/room-2-${String(i + 1).padStart(2, "0")}.jpg`,
      title,
      "Rooms",
    ),
  ),
  ...VIEW_TITLES.map((title, i) =>
    photo(`/views/view-${String(i + 1).padStart(2, "0")}.jpg`, title, "Views"),
  ),
  ...PROPERTY_TITLES.map((title, i) =>
    photo(
      `/property/property-${String(i + 1).padStart(2, "0")}.jpg`,
      title,
      "Property",
    ),
  ),
];

// The banner is the wide strip at the top of the gallery, kept separate from
// the lightbox set.
export const MOUNTAIN_BANNER = {
  src: "/views/mountain-banner.jpg",
  alt: "Panoramic mountain view across the valley",
  width: 540,
  height: 360,
};

export function galleryByCategory(
  category: GalleryCategory | "All",
): GalleryImage[] {
  if (category === "All") return galleryImages;
  return galleryImages.filter((image) => image.category === category);
}
