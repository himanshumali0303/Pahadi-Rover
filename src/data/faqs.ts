export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type FaqGroup = {
  id: string;
  title: string;
  faqs: Faq[];
};

// Sample questions used to preview the layout. Replace them with the owner's
// real answers — especially anything about pricing, check-in times, policies
// and accessibility, which guests rely on before they travel.
export const faqGroups: FaqGroup[] = [
  {
    id: "booking",
    title: "Booking & Rooms",
    faqs: [
      {
        id: "how-to-book",
        question: "How do I book a room?",
        answer:
          "Send us your travel dates, the number of guests and the room you prefer through the enquiry form or on WhatsApp. We reply with availability and pricing, and your stay is confirmed once you accept.",
      },
      {
        id: "confirmation",
        question: "Is my booking confirmed straight away?",
        answer:
          "Enquiries are requests, not confirmed bookings. A stay is confirmed only after the owner replies with availability and you accept it in writing on WhatsApp.",
      },
      {
        id: "group-booking",
        question: "Can you host families and groups?",
        answer:
          "Yes. The family / group stay suits larger parties, and the café is on the property so meals and coffee never mean a long drive. Tell us your group size when you enquire.",
      },
    ],
  },
  {
    id: "cafe",
    title: "Café & Food",
    faqs: [
      {
        id: "dietary",
        question: "Do you have vegetarian or vegan options?",
        answer:
          "Most of our menu is vegetarian-friendly, and we mark vegan items on the menu. For anything specific, or for allergies, mention it in your enquiry and we will guide you.",
      },
      {
        id: "outside-food",
        question: "Can we bring our own food?",
        answer:
          "Please reach out to us before you arrive and we will confirm. Orders in the café are prepared fresh, so outside food cannot always be served in the dining area.",
      },
      {
        id: "special-diet",
        question: "Do you serve local Himachali dishes?",
        answer:
          "Yes — our local-inspired section includes dishes like Siddu and Babru, alongside simple everyday meals. What we cook each day also depends on what is fresh and available locally.",
      },
    ],
  },
  {
    id: "stay",
    title: "Your Stay",
    faqs: [
      {
        id: "wifi",
        question: "Is there Wi-Fi and mobile network?",
        answer:
          "Wi-Fi is available on the property. Mobile coverage can be patchy, as is common in the hills — we recommend downloading what you need before you arrive.",
      },
      {
        id: "parking",
        question: "Is parking available?",
        answer:
          "Parking is on the property. If you are arriving with more than one vehicle, or a larger vehicle, let us know in advance so we can plan for it.",
      },
      {
        id: "getting-there",
        question: "How do we reach you?",
        answer:
          "Send us your arrival time and we will share the exact location and the easiest route to the property. Directions and the map are added to the site once the final address is confirmed.",
      },
      {
        id: "accessibility",
        question: "Is the property accessible for guests with limited mobility?",
        answer:
          "Please tell us about any mobility needs when you enquire so we can be honest about what suits you and what does not, before you make travel plans.",
      },
    ],
  },
];