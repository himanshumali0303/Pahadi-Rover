export const menuTags = [
  "veg",
  "vegan",
  "seasonal",
  "signature",
  "spicy",
] as const;

export type MenuTag = (typeof menuTags)[number];

export type MenuItem = {
  name: string;
  description?: string;
  // Sample price for layout preview only, e.g. "₹220". Remove the value or
  // leave it empty to show "Ask" instead of an invented rate.
  price?: string;
  tags?: MenuTag[];
};

export type MenuCategory = {
  id: string; // anchor id used by the on-page category links
  name: string;
  blurb?: string;
  items: MenuItem[];
};

// Replace this file with the owner's real menu when it is confirmed. The item
// names, descriptions and prices below are samples used to preview the layout —
// they are not the actual café menu and must not be published as-is.
export const menuCategories: MenuCategory[] = [
  {
    id: "coffee",
    name: "Coffee",
    blurb: "Slow brewed and unhurried, the way coffee in the mountains should be.",
    items: [
      {
        name: "Espresso",
        description: "A short, strong shot to start the day.",
        price: "₹150",
        tags: ["vegan"],
      },
      {
        name: "Cappuccino",
        description: "Double shot under a thick layer of steamed milk foam.",
        price: "₹220",
        tags: ["veg"],
      },
      {
        name: "Cold Brew",
        description: "Steeped overnight for a smoother, less bitter cup.",
        price: "₹260",
        tags: ["vegan", "signature"],
      },
      {
        name: "Filter / Pour Over",
        description: "Single-origin beans, brewed the slow way.",
      },
      {
        name: "Hot Chocolate",
        description: "Dark chocolate and steamed milk, mountain evenings included.",
        price: "₹240",
        tags: ["veg"],
      },
    ],
  },
  {
    id: "tea-and-chai",
    name: "Tea & Chai",
    blurb: "Warm cups for foggy mornings and cold afternoons.",
    items: [
      {
        name: "Masala Chai",
        description: "Our own blend, boiled the traditional way.",
        price: "₹120",
        tags: ["veg", "signature"],
      },
      {
        name: "Green Tea",
        description: "Light and clean, best with the mountain view.",
        price: "₹120",
        tags: ["vegan"],
      },
      {
        name: "Black Tea",
        description: "Strong Assam or Nilgiri, with or without milk.",
        price: "₹100",
        tags: ["vegan"],
      },
      {
        name: "Herbal / Tisane",
        description: "Ginger, tulsi and lemon grass infusions.",
        tags: ["vegan", "seasonal"],
      },
    ],
  },
  {
    id: "snacks",
    name: "Snacks & Bakery",
    blurb: "Light bites to enjoy while you watch the hills roll by.",
    items: [
      {
        name: "Butter Croissant",
        description: "Baked fresh each morning.",
        price: "₹180",
        tags: ["veg"],
      },
      {
        name: "Veg Puff",
        description: "Spiced potato and peas, straight from the oven.",
        price: "₹150",
        tags: ["veg"],
      },
      {
        name: "Scones with Jam & Cream",
        description: "Served warm with seasonal fruit.",
        price: "₹200",
        tags: ["veg"],
      },
      {
        name: "Homemade Cookies",
        description: "Ask for today's flavour.",
        tags: ["veg"],
      },
      {
        name: "Peanut Chikki",
        description: "A classic hill-country sweet.",
        price: "₹120",
        tags: ["vegan", "seasonal"],
      },
    ],
  },
  {
    id: "meals",
    name: "Meals",
    blurb: "Simple, filling plates made with local and seasonal ingredients.",
    items: [
      {
        name: "Pahadi Thukpa",
        description: "A warm bowl of noodles, vegetables and our mountain broth.",
        price: "₹320",
        tags: ["veg"],
      },
      {
        name: "Grilled Sandwich",
        description: "Farm cheese and garden vegetables on toasted bread.",
        price: "₹280",
        tags: ["veg"],
      },
      {
        name: "Dal & Rice",
        description: "Lentils, rice and a seasonal side. Comfort food, done simply.",
        price: "₹260",
        tags: ["vegan"],
      },
      {
        name: "Pasta of the Day",
        description: "Changes with the market. Ask what's cooking today.",
        tags: ["veg", "seasonal"],
      },
    ],
  },
  {
    id: "local-inspired",
    name: "Local-inspired Food",
    blurb: "Flavours from the region, prepared with a homely touch.",
    items: [
      {
        name: "Siddu",
        description: "Steamed wheat dumplings, served with ghee or dal.",
        price: "₹300",
        tags: ["veg", "signature"],
      },
      {
        name: "Kangni / Hmad",
        description: "Traditional cold porridge from the hills, topped with ghee.",
        price: "₹180",
        tags: ["veg", "seasonal"],
      },
      {
        name: "Babru",
        description: "Stuffed Himachali snack with a spicy chutney.",
        price: "₹220",
        tags: ["veg", "spicy"],
      },
      {
        name: "Seasonal Local Thali",
        description: "Whatever the surrounding farms gave us that morning.",
        tags: ["vegan", "seasonal"],
      },
    ],
  },
];

export function hasPrice(item: MenuItem): boolean {
  return Boolean(item.price && !item.price.includes("["));
}

export function menuTagLabels(): Record<MenuTag, string> {
  return {
    veg: "Veg",
    vegan: "Vegan",
    seasonal: "Seasonal",
    signature: "Signature",
    spicy: "Spicy",
  };
}