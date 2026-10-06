export type Testimonial = {
  id: string;
  name: string;
  location?: string; // e.g. "New Delhi"
  quote: string;
  rating?: number; // 1–5, defaults to 5 when omitted
  context?: string; // e.g. "Stayed with family, June 2026"
};

// Sample reviews used to preview the layout. They are fictional — replace them
// with real guest feedback (and only then add `aggregateRating` to the JSON-LD,
// since publishing invented review markup breaks Google's review policy).
export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Ananya Sharma",
    location: "New Delhi",
    quote:
      "We came for two nights and ended up extending by one. The room was quiet, the view was unreal, and the chai downstairs is now something I think about weekly.",
    rating: 5,
    context: "Stayed with family",
  },
  {
    id: "t-2",
    name: "Rohan Mehta",
    location: "Bengaluru",
    quote:
      "Perfect stop on our drive to Manali. Clean rooms, genuinely good coffee, and they let us keep our bags while we went walking. No fuss at all.",
    rating: 5,
    context: "Stayed for a night",
  },
  {
    id: "t-3",
    name: "Priya & Amit Nair",
    location: "Chandigarh",
    quote:
      "Booked the family stay for six of us. Plenty of space, the food was fresh and simple, and the staff made the kids feel at home. We are already planning to return.",
    rating: 5,
    context: "Group of six",
  },
  {
    id: "t-4",
    name: "Karan Thakur",
    location: "Delhi",
    quote:
      "The slow pace is the whole point. No loud music, no rush — just hills, good food and a comfortable bed. Exactly what I needed after a long week.",
    rating: 4,
    context: "Stayed solo",
  },
  {
    id: "t-5",
    name: "Meera Joshi",
    location: "Pune",
    quote:
      "The Siddu was the highlight of our trip. Ask for it if you have not had it before. Staff is warm and the location is beautiful.",
    rating: 5,
    context: "Visited the café",
  },
  {
    id: "t-6",
    name: "Vikram Singh",
    location: "Chandigarh",
    quote:
      "Great for a long weekend with friends. Rooms are comfortable and honest — nothing fancy, just done well. Good Wi-Fi too, which mattered for us.",
    rating: 4,
    context: "Stayed with friends",
  },
];

export function getTestimonialRating(item: Testimonial): number {
  return item.rating ?? 5;
}