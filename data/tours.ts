export const tourCategories = {
  "islands-boat-trips": "Islands & Boat Trips",
  "snorkeling-diving": "Snorkeling & Diving",
  "sea-water-activities": "Sea & Water Activities",
  "dolphin-experiences": "Dolphin Experiences",
  "desert-adventures": "Desert Adventures",
  "egypt-tours-excursions": "Egypt Tours & Excursions",
  "family-attractions": "Family & Attractions",
} as const;

export type TourCategory = keyof typeof tourCategories;

export const tourCategoryMap = {
  "paradise-island": "islands-boat-trips",
  "orange-bay": "islands-boat-trips",
  "mahmya-island": "islands-boat-trips",
  "eden-island": "islands-boat-trips",
  "hula-hula": "islands-boat-trips",
  "magawish-island": "islands-boat-trips",
  "amwaj-island": "islands-boat-trips",
  "bianca-island": "islands-boat-trips",
  "utopia-island": "islands-boat-trips",
  "speed-boat": "islands-boat-trips",
  "adventure-boat": "islands-boat-trips",
  pirates: "islands-boat-trips",
  "nefertari-cruise": "islands-boat-trips",
  "elite-vip-cruise": "islands-boat-trips",
  "elgouna-plus": "islands-boat-trips",

  snorkeling: "snorkeling-diving",
  "dolphin-house": "snorkeling-diving",
  diving: "snorkeling-diving",
  "sharm-elnaqa": "snorkeling-diving",

  "sea-scope-semi-submarine": "sea-water-activities",
  "paradise-semi-submarine": "sea-water-activities",
  "panorama-semi-submarine": "sea-water-activities",
  "sindbad-submarine": "sea-water-activities",
  "fishing-trip": "sea-water-activities",
  parasailing: "sea-water-activities",
  "banana-boat": "sea-water-activities",
  "sofa-boat": "sea-water-activities",
  twister: "sea-water-activities",

  "dolphin-show": "dolphin-experiences",
  "dolphin-session": "dolphin-experiences",
  "swimming-with-dolphin": "dolphin-experiences",

  "desert-safari": "desert-adventures",
  "quad-bike": "desert-adventures",
  "super-safari": "desert-adventures",
  "horse-riding": "desert-adventures",
  stargazing: "desert-adventures",
  "photo-session-desert": "desert-adventures",

  "hurghada-city-tour": "egypt-tours-excursions",
  "cairo-over-day": "egypt-tours-excursions",
  "luxor-over-day": "egypt-tours-excursions",
  "cairo-over-night": "egypt-tours-excursions",
  "luxor-over-night": "egypt-tours-excursions",
  "hot-air-balloon": "egypt-tours-excursions",

  "aqua-park": "family-attractions",
  aquarium: "family-attractions",
  "sand-city": "family-attractions",
  "mini-egypt-park": "family-attractions",
  "hurghada-museum": "family-attractions",
  "spa-massage": "family-attractions",
} as const;

export type TourSlug = keyof typeof tourCategoryMap;

type TourSEO = {
  title: string;
  description: string;
  keywords: string[];
};

type TourData = {
  name: string;
  slug: string;
  destination: "hurghada" | "luxor" | "cairo" | "sharm-el-sheikh";
  category: TourCategory;

  image: string;
  gallery: string[];

  description: string;
  overview: string;

  duration: string;
  pickup: string;
  schedule: string;

  program: string[];
  highlights: string[];

  included: string[];
  excluded: string[];

  notes: string[];

  price: number;
  childPrice: number;
  infantPrice: number;

  rating: number;
  reviews: number;
  badge: string;
  available: boolean;
  type: string;

  seo: TourSEO;
};

const createSEO = (
  name: string,
  description: string,
  keywords: string[],
): TourSEO => ({
  title: `${name} in Hurghada, Egypt | Via Blue`,
  description,
  keywords,
});

const createGallery = (slug: string) =>
  Array.from(
    { length: 5 },
    (_, index) => `/tours/${slug}-${index + 1}.webp`,
  );

const baseTour = (
  slug: TourSlug,
  data: Omit<TourData, "slug" | "category" | "gallery" | "seo"> & {
    seo?: TourSEO;
    gallery?: string[];
  },
): TourData => ({
  ...data,
  slug,
  category: tourCategoryMap[slug],
  gallery: data.gallery ?? createGallery(slug),
  seo:
    data.seo ??
    createSEO(
      data.name,
      data.description,
      [
        `${data.name} Hurghada`,
        `${data.name} Egypt`,
        `${data.name} tour`,
        "Hurghada excursions",
        "Hurghada tours",
        "Red Sea tours",
      ],
    ),
});

/* =========================================================
   TOURS
   ========================================================= */

export const tours = {
  /* =======================================================
     ISLANDS & BOAT TRIPS
     ======================================================= */

  "paradise-island": baseTour("paradise-island", {

  name: "Paradise Island",

  destination: "hurghada",

  image: "/tours/paradise-island-hero.webp",

  description:
    "Enjoy a full-day trip to Paradise Island from Hurghada, with a snorkeling stop, 2–3 hours on the island, an open-buffet lunch and free drinks throughout the day on the boat.",

  overview:
    "Paradise Island is a full-day Red Sea boat trip from Hurghada. The experience combines a snorkeling stop with relaxing on the island for approximately 2–3 hours, followed by an open-buffet lunch. Drinks are available free of charge throughout the day on the boat.",

  duration: "Approximately 8 hours",

  pickup: "Hotel Pickup",

  schedule:
    "Departure from the marina at approximately 8:00–8:30 AM; return around 4:00 PM",

  program: [
    "Morning hotel pickup and transfer to the marina.",
    "Departure from the marina by boat.",
    "Stop for snorkeling with snorkeling equipment provided.",
    "Continue to Paradise Island.",
    "Enjoy approximately 2–3 hours on the island.",
    "Enjoy lunch with an open buffet.",
    "Free drinks are available throughout the day on the boat.",
    "Return by boat to the marina.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Paradise Island",
    "Red Sea snorkeling",
    "2–3 hours on the island",
    "Open-buffet lunch",
    "Free drinks throughout the day on the boat",
    "Round-trip hotel transfer",
  ],

  included: [
    "Round-trip hotel transfer",
    "Boat trip",
    "Paradise Island entrance",
    "Snorkeling equipment",
    "Snorkeling stop",
    "Open-buffet lunch",
    "Free drinks throughout the day on the boat",
  ],

  excluded: [
    "Tips (optional)",
    "Photography services and photographers (optional)",
    "Drinks and orders from the bar on the island",
  ],

  notes: [
    "All services on the boat are free of charge and fully included in the tour price.",
    "Bring swimwear, a towel, sunscreen and sunglasses.",
    "The program may vary slightly depending on sea and weather conditions.",
  ],

  price: 50,

  childPrice: 25,

  infantPrice: 0,

  rating: 4.9,

  reviews: 128,

  badge: "Popular",

  available: true,

  type: "Full Day Boat Trip",

}),

  "orange-bay": baseTour("orange-bay", {
  name: "Orange Bay Island",

  destination: "hurghada",

  image: "/tours/orange-bay-hero.webp",

  description:
    "Enjoy an unforgettable day at Orange Bay Island with snorkeling, relaxing island time, an open-buffet lunch on the boat and free drinks throughout the day.",

  overview:
    "Orange Bay is a full-day boat excursion from Hurghada combining Red Sea snorkeling, relaxing on the island for 2–3 hours, lunch on board and complimentary drinks throughout the boat trip.",

  duration: "Approximately 8 hours",

  pickup: "Morning hotel pickup from Hurghada",

  schedule: "Daily, approximately 8:00 AM–4:00 PM",

  program: [
    "Morning pickup from your hotel.",
    "Transfer to the marina.",
    "Departure by boat in the morning.",
    "Enjoy a snorkeling stop with equipment provided.",
    "Have an open-buffet lunch on board the boat.",
    "Continue to Orange Bay Island.",
    "Enjoy 2–3 hours of free time on the island.",
    "Return by boat to the marina.",
    "Transfer back to your hotel.",
  ],

  highlights: [
    "Orange Bay Island",
    "Red Sea snorkeling",
    "Snorkeling equipment",
    "2–3 hours on the island",
    "Open-buffet lunch on the boat",
    "Free drinks throughout the boat trip",
    "Hotel transfers",
  ],

  included: [
    "Hotel Transfer",
    "Boat Trip",
    "Orange Bay Island Visit",
    "Snorkeling Equipment",
    "Snorkeling Stop",
    "Open-Buffet Lunch on the Boat",
    "Free Drinks Throughout the Boat Trip",
  ],

  excluded: [
    "Food and drinks ordered on the island",
    "Photography services",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "All food and drinks served on board the boat are fully included in the price.",
    "Food and drinks consumed on Orange Bay Island are charged separately.",
    "Bring swimwear, towel, sunscreen and sunglasses.",
    "The program may change slightly depending on sea and weather conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Full Day Boat Trip",
}),

  "mahmya-island": baseTour("mahmya-island", {
  name: "Mahmya Island",

  destination: "hurghada",

  image: "/tours/mahmya-island-hero.webp",

  description:
    "Spend an unforgettable day at Mahmya Island, enjoying the beautiful Red Sea beach, snorkeling, an open-buffet lunch and drinks included on the island.",

  overview:
    "Mahmya Island is a full-day Red Sea experience from Hurghada combining relaxing on the island, snorkeling with equipment provided, and an open-buffet lunch with drinks on the island.",

  duration: "Approximately 8 hours",

  pickup: "Marina departure at 8:00 AM",

  schedule: "Daily, departure from the marina at approximately 8:00 AM",

  program: [
    "Morning departure from the marina.",
    "Boat trip to Mahmya Island.",
    "Arrive at Mahmya Island and enjoy free time on the beach.",
    "Receive snorkeling equipment from the island.",
    "Enjoy a snorkeling stop in the Red Sea.",
    "Return to the island.",
    "Enjoy an open-buffet lunch with drinks on the island.",
    "Continue relaxing and enjoying the rest of the day on the island.",
    "Return by boat to the marina.",
  ],

  highlights: [
    "Mahmya Island",
    "Beautiful Red Sea beach",
    "Red Sea snorkeling",
    "Snorkeling equipment",
    "Open-buffet lunch",
    "Drinks included on the island",
    "Full day on the island",
  ],

  included: [
    "Mahmya Island Entrance",
    "Full Day on the Island",
    "Snorkeling Equipment",
    "Snorkeling Stop",
    "Open-Buffet Lunch",
    "Drinks on the Island",
  ],

  excluded: [
    "Hotel-to-marina transfers",
    "Marina-to-hotel transfers",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "All services, food and drinks mentioned on the island are fully included in the price.",
    "Hotel and marina transfers are not included.",
    "Bring swimwear, towel, sunscreen and sunglasses.",
    "The program may change slightly depending on sea and weather conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Island",

  available: true,

  type: "Full Day Island Trip",
}),

  "eden-island": baseTour("eden-island", {
  name: "Eden Island",
  destination: "hurghada",
  image: "/tours/eden-island-hero.webp",

  description:
    "Enjoy a full-day sea trip to Eden Island with snorkeling, swimming, white sandy beaches, an open buffet lunch and drinks throughout the day.",

  overview:
    "Cruise through the Red Sea to Eden Island, enjoy a 45–60 minute snorkeling stop, relax on the beautiful beach, have an open buffet lunch and spend a memorable day by the sea.",

  duration: "7–8 Hours",
  pickup: "Morning hotel pickup",
  schedule: "Daily. Approximately 8:30–9:00 AM to 4:30–5:00 PM.",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the yacht and cruise through the Red Sea.",
    "Stop at a coral reef area for 45–60 minutes of swimming and snorkeling with a snorkeling guide.",
    "Continue to Eden Island by Tender Boat.",
    "Relax on the equipped beach and enjoy swimming, white sand and photo opportunities at the island's decorative spots.",
    "Enjoy an open buffet lunch at the island's restaurant.",
    "Board the yacht again and cruise back to the marina.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Eden Island",
    "Red Sea cruise",
    "45–60 minute snorkeling stop",
    "White sandy beach",
    "Swimming",
    "Open buffet lunch",
    "Drinks and water throughout the day",
    "Snorkeling equipment",
    "Professional snorkeling guide",
    "Tender Boat transfer",
  ],

  included: [
    "Round-trip hotel transfer",
    "Yacht trip",
    "Snorkeling equipment",
    "Mask and fins",
    "Life jacket",
    "Eden Island beach entrance fees",
    "Tender Boat transfer to the island",
    "Open buffet lunch on the island",
    "Drinks and water throughout the day on the yacht",
    "Snorkeling guide",
  ],

  excluded: [
    "Additional drinks or special food outside the buffet",
    "Optional water activities such as parasailing or banana boat",
    "Optional underwater photo and video services",
    "Tips",
  ],

  notes: [
    "Eden Island is a luxurious and peaceful destination with a premium atmosphere, similar to the Maldives.",
    "The trip is ideal for families, couples and guests who enjoy beautiful and professional photo opportunities.",
    "The snorkeling stop lasts approximately 45–60 minutes.",
    "Guests are recommended to bring swimwear, a personal towel, sunglasses, sunscreen and beach shoes.",
    "Total excursion duration is approximately 7–8 hours including transfers.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,
  rating: 0,
  reviews: 0,
  badge: "Popular",
  available: true,
  type: "Island Boat Trip",

  seo: {
    title: "Eden Island Tour Hurghada | Snorkeling & Open Buffet",
    description:
      "Enjoy a full-day Eden Island tour from Hurghada with Red Sea snorkeling, white sandy beaches, Tender Boat transfer, open buffet lunch and drinks throughout the day.",
    keywords: [
      "Eden Island Tour",
      "Eden Island Hurghada",
      "Eden Island trip",
      "Hurghada Eden Island",
      "Eden Island snorkeling",
      "Hurghada island trips",
      "Hurghada boat trips",
      "Red Sea snorkeling",
      "Hurghada excursions",
      "Eden Island Egypt",
    ],
  },
}),

  "hula-hula": baseTour("hula-hula", {
  name: "Hola Hola Beach",
  destination: "hurghada",
  image: "/tours/hula-hula-hero.webp",

  description:
    "Enjoy a full-day sea trip to Hola Hola Beach on Giftun Island with snorkeling, swimming, soft sandy beaches, tropical bohemian décor, an open buffet lunch and drinks throughout the day.",

  overview:
    "Cruise through the Red Sea to Hola Hola Beach on Giftun Island, enjoy a 45–60 minute snorkeling stop, relax on the equipped beach and enjoy an open buffet lunch surrounded by a tropical bohemian atmosphere.",

  duration: "7–8 Hours",
  pickup: "Morning hotel pickup",
  schedule: "Daily. Approximately 8:30–9:00 AM to 4:30–5:00 PM.",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the yacht and cruise through the Red Sea.",
    "Stop at a coral reef area for 45–60 minutes of swimming and snorkeling with a snorkeling guide.",
    "Continue to Hola Hola Beach by Tender Boat.",
    "Relax on the equipped beach with umbrellas and comfortable bohemian seating.",
    "Enjoy swimming, soft sand and photos at the designated Photo Spots and tropical wooden decorations.",
    "Enjoy an open buffet lunch at the restaurant on the beach.",
    "Board the yacht again and cruise back to the marina.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Hola Hola Beach",
    "Giftun Island",
    "Red Sea cruise",
    "45–60 minute snorkeling stop",
    "Soft sandy beach",
    "Bohemian tropical atmosphere",
    "Tropical wooden decorations",
    "Photo Spots",
    "Open buffet lunch",
    "Drinks and water throughout the day",
    "Snorkeling equipment",
    "Professional snorkeling guide",
    "Tender Boat transfer",
  ],

  included: [
    "Round-trip hotel transfer",
    "Yacht trip",
    "Snorkeling equipment",
    "Mask and fins",
    "Life jacket",
    "Hola Hola Beach entrance fees",
    "Tender Boat transfer to the beach",
    "Open buffet lunch on the beach",
    "Drinks and water throughout the day on the yacht",
    "Snorkeling guide",
  ],

  excluded: [
    "Additional drinks or special food outside the buffet",
    "Optional water activities such as parasailing or banana boat",
    "Optional photo and video services",
    "Tips",
  ],

  notes: [
    "Hola Hola Beach features a tropical bohemian atmosphere with wooden decorations and dedicated photo spots.",
    "The trip is ideal for couples, families and guests who enjoy beautiful and relaxing surroundings.",
    "The snorkeling stop lasts approximately 45–60 minutes.",
    "Guests are recommended to bring swimwear, a personal towel, sunglasses, sunscreen and beach shoes.",
    "Total excursion duration is approximately 7–8 hours including transfers.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,
  rating: 0,
  reviews: 0,
  badge: "Popular",
  available: true,
  type: "Island Boat Trip",

  seo: {
    title: "Hola Hola Beach Tour Hurghada | Giftun Island & Snorkeling",
    description:
      "Enjoy a full-day Hola Hola Beach tour from Hurghada on Giftun Island with snorkeling, soft sandy beaches, tropical bohemian décor, open buffet lunch and drinks.",
    keywords: [
      "Hola Hola Beach",
      "Hola Hola Beach Hurghada",
      "Hola Hola Beach tour",
      "Giftun Island Hola Hola",
      "Giftun Island tour",
      "Hurghada island trips",
      "Hurghada boat trips",
      "Hurghada snorkeling",
      "Red Sea snorkeling",
      "Hurghada excursions",
    ],
  },
}),

  "magawish-island": baseTour("magawish-island", {
  name: "Magawish Island / Floating Island",

  destination: "hurghada",

  image: "/tours/magawish-island-hero.webp",

  description:
    "Enjoy a full-day trip to Magawish Island, featuring snorkeling, crystal-clear shallow waters, white sandy beaches and exciting water activities.",

  overview:
    "A full Red Sea island experience combining snorkeling, relaxing on the white sandy beach, swimming in shallow turquoise waters and fun water activities.",

  duration: "7–8 Hours",

  pickup: "Morning hotel pickup",

  schedule: "Daily",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the yacht and sail into the Red Sea.",
    "45–60 minute snorkeling stop around Magawish Island with a professional snorkeling guide.",
    "Take a tender boat to the island and enjoy the sandy beach stretching into the turquoise waters.",
    "Relax, swim in the shallow crystal-clear water and take memorable photos.",
    "Enjoy an open buffet lunch either onboard the yacht or on the island depending on the booking arrangement.",
    "Enjoy Banana Boat and Quattro water activities during the return trip.",
    "Return to the marina and transfer back to the hotel.",
  ],

  highlights: [
    "Magawish Island",
    "Floating Island",
    "White Sandy Beach",
    "Snorkeling",
    "Shallow Crystal-Clear Water",
    "Banana Boat",
    "Quattro",
    "Open Buffet Lunch",
  ],

  included: [
    "Hotel Transfer",
    "Boat Trip",
    "Magawish Island Entrance",
    "Tender Boat Transfer",
    "Snorkeling Stop",
    "Snorkeling Equipment",
    "Banana Boat",
    "Quattro",
    "Open Buffet Lunch",
    "Soft Drinks and Water",
    "Snorkeling Guide",
  ],

  excluded: [
    "Additional drinks or special food outside the buffet",
    "Photography and video services",
    "Tips",
  ],

  notes: [
    "Magawish Island is known as the Floating Island and is especially suitable for families and children thanks to its shallow and safe waters.",
    "Bring swimwear, a personal towel, sunglasses, sunscreen and beach shoes.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Island Boat Trip",
}),

  "amwaj-island": baseTour("amwaj-island", {
  name: "Amwaj Island",

  destination: "hurghada",

  image: "/tours/amwaj-island-hero.webp",

  description:
    "Enjoy a full-day trip to Amwaj Island with snorkeling, beautiful turquoise waters, a relaxing beach experience, lunch and exciting water activities.",

  overview:
    "A full-day Red Sea island excursion combining snorkeling, beach relaxation, lunch, photo spots and fun water activities at Amwaj Island.",

  duration: "7–8 Hours",

  pickup: "Morning hotel pickup",

  schedule: "Daily, approximately 8:30–9:00 AM to 4:30–5:00 PM",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the yacht and sail into the Red Sea.",
    "Snorkeling stop at the coral reef for approximately 45–60 minutes with a snorkeling guide.",
    "Transfer to Amwaj Island by tender boat.",
    "Relax on the beach under wooden umbrellas and comfortable seating areas.",
    "Enjoy swimming in the turquoise waters and take photos at the island's decorative photo spots and bohemian-style areas.",
    "Enjoy an open buffet lunch at the island's restaurant.",
    "Enjoy water activities including Banana Boat and Quattro.",
    "Return to the yacht and sail back to the marina.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Amwaj Island",
    "Snorkeling",
    "Turquoise Waters",
    "Beach Relaxation",
    "Photo Spots",
    "Open Buffet Lunch",
    "Banana Boat",
    "Quattro",
  ],

  included: [
    "Round-trip hotel transfer.",
    "Yacht boat trip.",
    "Amwaj Island entrance and beach access.",
    "Snorkeling stop.",
    "Snorkeling equipment.",
    "Life jacket.",
    "Snorkeling guide.",
    "Open buffet lunch on the island.",
    "Banana Boat.",
    "Quattro.",
    "Water and soft drinks on the yacht throughout the day.",
  ],

  excluded: [
    "Additional drinks or special food outside the buffet.",
    "Photography and underwater video services.",
    "Tips.",
  ],

  notes: [
    "Amwaj Island offers a modern tropical bohemian atmosphere and is suitable for families, couples and guests who enjoy relaxation and professional photography.",
    "Bring swimwear, a personal towel, sunglasses, sunscreen and beach shoes.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Island Boat Trip",
}),

  "bianca-island": baseTour("bianca-island", {
  name: "Bianca Island",
  destination: "hurghada",
  image: "/tours/bianca-island-hero.webp",

  description:
    "Enjoy a premium day at Bianca Island with crystal-clear turquoise waters, white sandy beaches, snorkeling, water activities and beautiful tropical photo spots.",

  overview:
    "A full-day island adventure combining snorkeling, relaxing on the beautiful Bianca Beach, an open-buffet lunch, water activities and a relaxing Red Sea boat trip.",

  duration: "7–8 Hours",
  pickup: "Morning hotel pickup",
  schedule: "Daily",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the yacht and sail into the Red Sea.",
    "Enjoy a 45–60 minute snorkeling stop at the coral reefs with a professional snorkeling guide.",
    "Take a Tender Boat to Bianca Island.",
    "Relax on the beach under wooden umbrellas and comfortable beach seating.",
    "Enjoy swimming in the crystal-clear turquoise waters and relaxing on the white sandy beach.",
    "Take photos at the island's beautiful photo spots, wooden swings and distinctive bohemian decorations.",
    "Enjoy an open-buffet lunch at the island restaurant.",
    "Enjoy Banana Boat and Quattro water activities.",
    "Board the yacht and sail back to the marina.",
    "Transfer back to your hotel.",
  ],

  highlights: [
    "Bianca Island",
    "Bianca Beach",
    "White Sandy Beach",
    "Crystal-Clear Turquoise Water",
    "Snorkeling",
    "Banana Boat & Quattro",
    "Bohemian Photo Spots",
    "Wooden Swings",
    "Open-Buffet Lunch",
    "Red Sea Yacht Trip",
  ],

  included: [
    "Hotel Transfer",
    "Boat Trip",
    "Bianca Island Visit",
    "Bianca Beach Access",
    "Tender Boat",
    "Snorkeling Stop",
    "Snorkeling Equipment",
    "Professional Snorkeling Guide",
    "Banana Boat",
    "Quattro",
    "Open-Buffet Lunch",
    "Drinks and Water on the Yacht",
  ],

  excluded: [
    "Additional drinks or special food outside the buffet",
    "Photography and video services",
    "Tips",
  ],

  notes: [
    "A premium tropical beach destination with a modern bohemian design and beautiful wooden swings.",
    "Perfect for couples, families and guests who love relaxing beaches and memorable photos.",
    "Bring swimwear, a personal towel, sunglasses, sunscreen and beach shoes.",
    "Departure is usually between 8:30 and 9:00 AM, with return between 4:30 and 5:00 PM.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Popular",
  available: true,
  type: "Island Boat Trip",
}),

  "utopia-island": baseTour("utopia-island", {
  name: "Utopia Island",

  destination: "hurghada",

  image: "/tours/utopia-island-hero.webp",

  description:
    "Discover Utopia Island with two snorkeling stops, a Glass Bottom Boat ride, beautiful coral reefs, warm waters, water activities and a relaxing island experience.",

  overview:
    "A full-day Red Sea adventure to Utopia Island combining two snorkeling stops, a Glass Bottom Boat ride, open-buffet lunch, water activities and relaxing time on the island.",

  duration: "8–9 Hours",

  pickup: "Morning hotel pickup",

  schedule: "Daily",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the yacht and sail towards the south of Hurghada and Safaga.",
    "Enjoy two different snorkeling stops at beautiful coral reef areas with a professional snorkeling guide.",
    "Swim in the clear Red Sea waters and discover colorful marine life.",
    "Enjoy an open-buffet lunch on board the yacht.",
    "Take the Glass Bottom Boat to Utopia Island while enjoying views of the coral reefs and underwater scenery.",
    "Relax on Utopia Island and enjoy swimming in the warm, calm waters.",
    "Enjoy the soft golden sand and take memorable photos.",
    "Return to the yacht and enjoy Banana Boat and Quattro water activities.",
    "Sail back to the marina.",
    "Transfer back to your hotel.",
  ],

  highlights: [
    "Utopia Island",
    "Two Snorkeling Stops",
    "Coral Reefs",
    "Colorful Marine Life",
    "Glass Bottom Boat",
    "Warm Calm Waters",
    "Golden Sandy Beach",
    "Banana Boat & Quattro",
    "Open-Buffet Lunch",
    "Red Sea Yacht Trip",
  ],

  included: [
    "Hotel Transfer",
    "Boat Trip",
    "Two Snorkeling Stops",
    "Snorkeling Equipment",
    "Professional Snorkeling Guide",
    "Glass Bottom Boat",
    "Utopia Island Visit",
    "Banana Boat",
    "Quattro",
    "Open-Buffet Lunch",
    "Drinks and Water on the Yacht",
  ],

  excluded: [
    "Additional drinks or special food outside the buffet",
    "Photography and video services",
    "Tips",
  ],

  notes: [
    "Utopia Island is known for its changing sandy areas influenced by the tides and its warm, calm waters.",
    "Perfect for families, children and guests who love nature, snorkeling and peaceful beaches.",
    "Bring swimwear, a personal towel, sunglasses, sunscreen and beach shoes.",
    "Departure is usually between 8:00 and 8:30 AM, with return around 5:00 PM.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Island Boat Trip",
}),

  "speed-boat": baseTour("speed-boat", {
  name: "Speedboat Tour",

  destination: "hurghada",

  image: "/tours/speed-boat-hero.webp",

  description:
    "Enjoy an exciting speedboat tour in the Red Sea with snorkeling, a visit to White Island and fresh fruit served during the trip.",

  overview:
    "A four-hour Red Sea speedboat experience combining a thrilling boat ride, a snorkeling stop, a visit to White Island and fresh fruit during the tour.",

  duration: "4 hours",

  pickup: "Hotel pickup and transfer",

  schedule:
    "Daily — Morning: 8:00 AM–12:00 PM or Afternoon: 1:00 PM–5:00 PM",

  program: [
    "Hotel pickup and transfer.",
    "Depart by speedboat for a Red Sea sea tour.",
    "Enjoy a snorkeling stop with equipment provided.",
    "Visit White Island.",
    "Enjoy fresh fruit during the trip.",
    "Return at the end of the scheduled tour.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Speedboat tour",
    "Red Sea snorkeling",
    "White Island",
    "Snorkeling equipment",
    "Fresh fruit",
    "Morning or afternoon departure",
  ],

  included: [
    "Hotel Transfer",
    "Speedboat Tour",
    "Snorkeling Stop",
    "Snorkeling Equipment",
    "White Island Visit",
    "Fresh Fruit",
  ],

  excluded: [
    "Personal expenses",
    "Photography services",
    "Tips",
  ],

  notes: [
    "The tour is available daily.",
    "Guests can choose between the morning or afternoon departure.",
    "Morning session: approximately 8:00 AM–12:00 PM.",
    "Afternoon session: approximately 1:00 PM–5:00 PM.",
    "Bring swimwear, towel, sunscreen and sunglasses.",
    "The program may change slightly depending on sea and weather conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Speedboat Tour",
}),

  "adventure-boat": baseTour("adventure-boat", {
  name: "Adventure",

  destination: "hurghada",

  image: "/tours/adventure-boat-hero.webp",

  description:
    "Enjoy an exciting four-floor Adventure Boat experience with a swimming pool party, a 45-minute submarine ride, snorkeling, Magawish Island and lunch with free drinks on board.",

  overview:
    "A fun-filled Red Sea adventure combining a four-floor boat, swimming pool party, a 45-minute submarine experience, snorkeling, approximately two hours on Magawish Island and lunch with complimentary drinks on board.",

  duration: "Approximately 6 hours",

  pickup: "Hotel pickup available",

  schedule: "Every day except Saturday, approximately 11:00 AM–5:00 PM",

  program: [
    "Hotel pickup.",
    "Transfer to the marina.",
    "Board the four-floor Adventure Boat.",
    "Enjoy the swimming pool party on board.",
    "Enjoy fresh fruit during the trip.",
    "Experience the 45-minute submarine ride.",
    "Enjoy a snorkeling stop with equipment provided.",
    "Visit Magawish Island and spend approximately 2 hours on the island.",
    "Enjoy lunch on board the boat.",
    "Enjoy free cola and water throughout the boat trip.",
    "Return to the marina and transfer back to the hotel.",
  ],

  highlights: [
    "Four-floor Adventure Boat",
    "Swimming pool party",
    "45-minute submarine experience",
    "Magawish Island",
    "Snorkeling stop",
    "Fresh fruit",
    "Lunch on the boat",
    "Free cola and water",
  ],

  included: [
    "Hotel Transfer",
    "Four-Floor Adventure Boat Trip",
    "Swimming Pool Party",
    "45-Minute Submarine Experience",
    "Snorkeling Stop",
    "Snorkeling Equipment",
    "Magawish Island Visit",
    "Approximately 2 Hours on the Island",
    "Lunch on the Boat",
    "Fresh Fruit",
    "Free Cola and Water on the Boat",
  ],

  excluded: [
    "Additional drinks available for extra charge",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "The trip operates every day except Saturday.",
    "Departure is approximately at 11:00 AM and return is around 5:00 PM.",
    "Cola and water are free throughout the boat trip.",
    "Additional drinks are available for an extra charge.",
    "Bring swimwear, towel, sunscreen and sunglasses.",
    "The program may change slightly depending on sea and weather conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Boat & Submarine Adventure",
}),

  "pirates": baseTour("pirates", {
  name: "Pirates Sailing Boat",

  destination: "hurghada",

  image: "/tours/pirates-hero.webp",

  description:
    "Enjoy a luxurious Pirates Sailing Boat experience in the Red Sea with two guided snorkeling stops, an open-buffet lunch and a unique sailing atmosphere aboard a beautifully decorated wooden pirate-style yacht.",

  overview:
    "A unique Red Sea sailing experience aboard a spacious twin-masted wooden yacht, featuring two guided snorkeling stops, an open-buffet lunch and relaxing time at sea.",

  duration: "Approximately 6 Hours",

  pickup: "Morning departure from the marina",

  schedule:
    "Daily. Main trip approximately 9:00 AM–3:00 PM. Saturday and Wednesday may have split departures depending on the operating schedule.",

  program: [
    "Meet at the marina and board the luxurious twin-masted Pirates Sailing Boat.",
    "Sail for approximately one hour towards the best local snorkeling sites.",
    "Enjoy the first guided snorkeling stop for approximately one hour.",
    "Enjoy the second guided snorkeling stop for approximately one hour.",
    "Return to the yacht and relax on the spacious upper sun deck or in the air-conditioned lower salons.",
    "Enjoy an open-buffet lunch served on board.",
    "Enjoy soft drinks during the trip.",
    "Relax and enjoy the unique Pirates-themed sailing atmosphere.",
    "Return to the marina at approximately 3:00 PM.",
  ],

  highlights: [
    "Pirates Sailing Boat",
    "Twin-Masted Wooden Yacht",
    "Two Snorkeling Stops",
    "Guided Snorkeling",
    "Red Sea Sailing",
    "Open-Buffet Lunch",
    "Spacious Sun Deck",
    "Air-Conditioned Salons",
    "Pirates-Themed Interior",
  ],

  included: [
    "Pirates Sailing Boat Trip",
    "Two Guided Snorkeling Stops",
    "Snorkeling Guide",
    "Open-Buffet Lunch",
    "Soft Drinks",
    "National Park Fee ($5 per person or 100 EGP)",
    "Optional Photo Session",
  ],

  excluded: [
    "Hotel Transfer",
    "Snorkeling Equipment",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "The Pirates Sailing Boats are twin-masted wooden vessels designed with a spacious upper sun deck and two air-conditioned lower salons decorated in a Pirates theme.",
    "Lunch is served as an open buffet in the air-conditioned salon.",
    "Lunch includes seafood soup, fresh salads, rice, pasta, potatoes, shrimp, calamari, fish, chicken, kofta and seasonal fresh fruit.",
    "Bring your ID or Passport and a towel.",
    "Snorkeling equipment is not included and should be arranged separately.",
    "Transfer is not included.",
  ],

  price: 50,

  childPrice: 25,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Pirates Boat Trip",
}),

  "nefertari-cruise": baseTour("nefertari-cruise", {
  name: "Nefertari Cruise",

  destination: "hurghada",

  image: "/tours/nefertari-cruise-hero.webp",

  description:
    "Enjoy a unique Red Sea cruise aboard Nefertari, a spectacular floating replica inspired by Queen Nefertari's tomb, featuring underwater viewing, snorkeling, ancient Egyptian photo experiences and a delicious meal.",

  overview:
    "A unique half-day Red Sea experience aboard Nefertari, combining underwater viewing through panoramic windows, snorkeling, ancient Egyptian-themed photos and a delicious 3-course lunch or dinner.",

  duration: "4.5 Hours",

  pickup: "Hotel pickup available",

  schedule:
    "Daily — 9:00 AM to 1:30 PM or 2:00 PM to 7:00 PM.",

  program: [
    "Hotel pickup and transfer to Hurghada Marina.",
    "Board the Nefertari cruise and begin the Red Sea journey.",
    "Cruise towards the Dolphin Area.",
    "Descend to the submarine-level observation deck and enjoy panoramic underwater views of the Red Sea through large windows.",
    "Enjoy a unique ancient Egyptian photo experience with replica costumes and Tutankhamun's throne.",
    "Stop at a prime snorkeling location.",
    "Enjoy approximately 45 minutes of snorkeling with professional and experienced guides.",
    "Return to the yacht and enjoy a delicious 3-course lunch or dinner.",
    "Cruise back to the marina.",
    "Transfer back to your hotel.",
  ],

  highlights: [
    "Nefertari Cruise",
    "Underwater Observation Deck",
    "Panoramic Underwater Windows",
    "Dolphin Area",
    "Red Sea Cruise",
    "45-Minute Snorkeling",
    "Professional Snorkeling Guide",
    "Ancient Egyptian Costumes",
    "Tutankhamun's Throne",
    "3-Course Meal",
  ],

  included: [
    "Nefertari Boat Trip",
    "Underwater Viewing",
    "Professional Snorkeling Guide",
    "Life Jacket",
    "Soft Drinks",
    "Wi-Fi",
    "Lunch or Dinner",
  ],

  excluded: [
    "Snorkeling Equipment",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "The Nefertari is a spectacular floating vessel inspired by ancient Egyptian heritage and designed with an underwater observation deck.",
    "The underwater viewing experience is suitable for guests of all ages.",
    "The snorkeling stop lasts approximately 45 minutes and is accompanied by professional guides.",
    "The meal is a 3-course lunch or dinner with a choice of seafood or chicken.",
    "The set menu includes three types of salad, seafood soup, rice, fish and calamari or chicken, and pasta.",
    "Bring your swimwear, towel, sunglasses and sunscreen.",
    "Snorkeling equipment is not included.",
    "Schedule may vary according to the operating schedule.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Boat Trip",
}),

  "elite-vip-cruise": baseTour("elite-vip-cruise", {

  name: "Elite VIP Cruise",

  destination: "hurghada",

  image: "/tours/elite-vip-cruise-hero.webp",

  description:
    "Enjoy a luxurious Elite VIP Cruise on the Red Sea with three snorkeling stops, professional guides, an open buffet BBQ lunch and premium onboard services.",

  overview:
    "A premium Red Sea cruise aboard a luxurious four-deck VIP boat, featuring guided snorkeling, dolphin spotting opportunities, an open buffet BBQ lunch and high-quality onboard services.",

  duration: "Full Day",

  pickup: "Hotel transfer available",

  schedule: "Daily, 9:00 AM to 3:30 PM",

  program: [
    "Hotel pickup.",
    "Transfer to the marina.",
    "Board the Elite VIP Cruise.",
    "Cruise for approximately one hour through the Red Sea.",
    "First guided snorkeling stop at one of the best coral reef areas.",
    "Continue cruising toward the north with a chance to spot dolphins, if possible.",
    "Second guided snorkeling stop with professional snorkeling guides.",
    "Enjoy an open buffet BBQ lunch on board.",
    "Relax on the spacious sun deck and enjoy the premium onboard services.",
    "Continue the cruise and enjoy the Red Sea scenery.",
    "Return to the marina.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Elite VIP Cruise",
    "Luxury Four-Deck Boat",
    "Three Snorkeling Stops",
    "Professional Snorkeling Guides",
    "Dolphin Spotting Opportunity",
    "Open Buffet BBQ Lunch",
    "Snorkeling Equipment",
    "Life Jackets",
    "Unlimited Soft Drinks",
    "Wi-Fi On Board",
  ],

  included: [
    "Elite VIP Cruise",
    "Open Buffet Lunch",
    "BBQ Chicken",
    "Egyptian Kofta",
    "Grilled Shrimp",
    "Oven-Baked Fish",
    "Soft Drinks",
    "Hot Drinks",
    "Snorkeling Equipment",
    "Life Jacket",
    "Professional Snorkeling Guide",
    "Diving Guide",
    "Wi-Fi",
    "National Park Fee",
  ],

  excluded: [
    "Hotel Transfer",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "The cruise operates daily from approximately 9:00 AM to 3:30 PM.",
    "Dolphin spotting is possible but not guaranteed and depends on sea conditions.",
    "National Park fee is $5 per person or 100 EGP.",
    "Optional photo session is available.",
    "Bring your ID or passport and towels.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "VIP",

  available: true,

  type: "VIP Cruise",

}),

  "elgouna-plus": baseTour("elgouna-plus", {

  name: "El Gouna Plus",

  destination: "hurghada",

  image: "/tours/elgouna-plus-hero.webp",

  description:
    "Discover El Gouna by land and sea with a traditional felucca tour, free time in the city, snorkeling, water activities and lunch on the boat.",

  overview:
    "El Gouna Plus combines an exploratory city experience with a Red Sea boat adventure. Explore El Gouna's beautiful lagoons by felucca with a guide, enjoy free time in the city, then continue to the marina for snorkeling, water activities and lunch on board.",

  duration: "Approximately 8–9 hours",

  pickup: "Hotel pickup and return transfer",

  schedule: "Approximately 8:00 AM–4:30 PM",

  program: [
    "Hotel pickup and transfer to El Gouna.",
    "Enjoy a traditional felucca tour through the lagoons of El Gouna.",
    "Learn about the history, development and founder of El Gouna with a tour guide.",
    "Enjoy a short break at a café in El Gouna.",
    "Free time to walk and explore El Gouna.",
    "Transfer to the marina and board the boat.",
    "Enjoy a snorkeling stop with equipment provided.",
    "Enjoy water activities during the boat trip.",
    "Have lunch and drinks on board.",
    "Return to the marina and transfer back to the hotel.",
  ],

  highlights: [
    "El Gouna city tour",
    "Felucca lagoon cruise",
    "Tour guide",
    "Free time in El Gouna",
    "Red Sea snorkeling",
    "Water activities",
    "Lunch and drinks on the boat",
    "Hotel transfers",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "El Gouna Felucca Tour",
    "Tour Guide",
    "Snorkeling Stop",
    "Snorkeling Equipment",
    "Water Activities",
    "Lunch on the Boat",
    "Drinks on the Boat",
  ],

  excluded: [
    "Drinks and personal orders at the café",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "The trip combines a land-based exploration of El Gouna with a Red Sea boat experience.",
    "The schedule is approximately 8:00 AM to 4:30 PM and may vary slightly.",
    "The program may change depending on weather and sea conditions.",
    "Bring comfortable walking shoes, swimwear, sunscreen and sunglasses.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Plus",

  available: true,

  type: "El Gouna & Boat Trip",

}),

  /* =======================================================
     SNORKELING & DIVING
     ======================================================= */

  snorkeling: baseTour("snorkeling", {

  name: "Snorkeling Trip",

  destination: "hurghada",

  image: "/tours/snorkeling-hero.webp",

  description:
    "Enjoy a full-day Red Sea snorkeling trip with two snorkeling stops, colorful coral reefs, tropical fish, an open-buffet lunch and complimentary hot and cold drinks on board.",

  overview:
    "A full-day Red Sea snorkeling experience from Hurghada, including hotel transfers, two snorkeling stops with equipment, lunch and complimentary hot and cold drinks throughout the boat trip.",

  duration: "Full Day — approximately 7–8 hours",

  pickup: "Hotel pickup and return transfer",

  schedule: "Usually approximately 8:00 AM–4:00 PM",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the boat and sail into the Red Sea.",
    "Enjoy the beautiful Red Sea scenery.",
    "Make two snorkeling stops to explore coral reefs and colorful fish.",
    "Use the provided snorkeling equipment.",
    "Enjoy an open-buffet lunch on board.",
    "Enjoy complimentary hot and cold drinks throughout the boat trip.",
    "Return to the marina and transfer back to the hotel.",
  ],

  highlights: [
    "Two snorkeling stops",
    "Colorful coral reefs",
    "Tropical fish",
    "Full-day boat trip",
    "Open-buffet lunch",
    "Free hot and cold drinks",
    "Hotel transfers",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Boat Trip",
    "Two Snorkeling Stops",
    "Snorkeling Equipment",
    "Open-Buffet Lunch",
    "Free Hot Drinks on the Boat",
    "Free Cold Drinks on the Boat",
  ],

  excluded: [
    "Professional photography and photo services",
    "Tips",
  ],

  notes: [
    "All listed services and equipment on board are included with no mandatory additional charges.",
    "Professional photography is optional and available at an additional cost.",
    "Tips are optional.",
    "Bring swimwear, towel, sunscreen and sunglasses.",
    "The exact schedule may vary depending on sea and weather conditions.",
  ],

  price: 35,
  childPrice: 25,
  infantPrice: 0,

  rating: 4.8,
  reviews: 96,

  badge: "Best Seller",

  available: true,

  type: "Boat Snorkeling Trip",

}),

  "dolphin-house": baseTour("dolphin-house", {

  name: "Dolphin House",

  destination: "hurghada",

  image: "/tours/dolphin-house-hero.webp",

  description:
    "Enjoy a full-day Red Sea adventure at Dolphin House, with snorkeling and swimming near dolphins, an open-buffet lunch and free drinks throughout the boat trip.",

  overview:
    "Dolphin House is a full-day Red Sea boat excursion from Hurghada heading north toward the Dolphin House area beyond El Gouna. Enjoy swimming and snorkeling in the area, followed by an open-buffet lunch and complimentary drinks on board.",

  duration: "Full Day — approximately 8 hours",

  pickup: "Hotel pickup and return transfer",

  schedule: "Approximately 8:00 AM–4:00 PM",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the boat and sail north from Hurghada toward the Dolphin House area beyond El Gouna.",
    "Reach the Dolphin House area where groups of dolphins may be present.",
    "Enjoy swimming and snorkeling in the area.",
    "Use the provided snorkeling equipment.",
    "Enjoy an open-buffet lunch on board the boat.",
    "Enjoy complimentary drinks throughout the boat trip.",
    "Return to the marina and transfer back to the hotel.",
  ],

  highlights: [
    "Dolphin House area",
    "Swimming and snorkeling",
    "Red Sea marine life",
    "Open-buffet lunch",
    "Free drinks on the boat",
    "Full-day boat trip",
    "Hotel transfers",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Boat Trip",
    "Dolphin House Area",
    "Snorkeling Equipment",
    "Snorkeling Stop",
    "Swimming in the Dolphin House Area",
    "Open-Buffet Lunch",
    "Free Drinks on the Boat",
  ],

  excluded: [
    "Professional photography and photo services",
    "Tips",
  ],

  notes: [
    "The trip includes all listed equipment, meals and drinks on board throughout the day.",
    "Dolphin sightings are natural and cannot be guaranteed.",
    "Professional photography is optional.",
    "Tips are optional.",
    "Bring swimwear, towel, sunscreen and sunglasses.",
    "The itinerary may change depending on sea and weather conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Dolphin & Snorkeling Trip",

}),

  diving: baseTour("diving", {

  name: "Diving Sea Trip",

  destination: "hurghada",

  image: "/tours/diving-hero.webp",

  description:
    "Enjoy a full-day Red Sea diving experience with two dives at different sites, professional dive instructors, complete diving equipment, lunch and free drinks on board.",

  overview:
    "A full-day diving trip from Hurghada suitable for beginners and experienced divers. Explore coral reefs and diverse marine life at two different diving sites under the supervision of professional divers, with complete diving equipment, lunch and complimentary drinks included.",

  duration: "Approximately 8 hours",

  pickup: "Hotel pickup and return transfer",

  schedule: "Approximately 8:00 AM–4:00 PM",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the boat and sail to the first diving site.",
    "Receive a professional diving briefing and prepare the diving equipment.",
    "Make the first dive and explore coral reefs and diverse marine life.",
    "Possibly observe dolphins if conditions allow.",
    "Move to a second different diving site.",
    "Enjoy the second dive under the supervision of professional divers.",
    "Enjoy lunch on board the boat.",
    "Enjoy complimentary drinks throughout the boat trip.",
    "Return to the marina and transfer back to the hotel.",
  ],

  highlights: [
    "Two dives at different sites",
    "Professional dive instructors",
    "Complete diving equipment",
    "Red Sea coral reefs",
    "Colorful marine life",
    "Beginner-friendly experience",
    "Lunch on board",
    "Free drinks on the boat",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Boat Trip",
    "Complete Diving Equipment",
    "Two Diving Sessions",
    "Two Different Diving Sites",
    "Professional Dive Instructors",
    "Lunch on the Boat",
    "Free Drinks on the Boat",
  ],

  excluded: [
    "Professional photography and photo services",
    "Tips",
  ],

  notes: [
    "The trip is suitable for beginners and is conducted under the supervision of professional diving instructors.",
    "Professional instructors explain and guide participants through every step with safety as a priority.",
    "Dolphin sightings are natural and cannot be guaranteed.",
    "Photography is optional.",
    "Tips are optional.",
    "Bring swimwear, towel, sunscreen and sunglasses.",
    "The diving sites and itinerary may change depending on sea and weather conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Diving Trip",

}),

  "sharm-elnaqa": baseTour("sharm-elnaqa", {
  name: "Sharm El Naga",

  destination: "hurghada",

  image: "/tours/sharm-elnaqa-hero.webp",

  description:
    "Enjoy a relaxing day at Sharm El Naga with crystal-clear Red Sea water, direct-from-shore snorkeling, colorful coral reefs and flexible beach time.",

  overview:
    "Spend a relaxing full day at Sharm El Naga, south of Hurghada, with direct access to beautiful coral reefs and marine life from the beach. Enjoy snorkeling, swimming, lunch and free time without needing a boat.",

  duration: "Flexible – Full Day",

  pickup: "Private hotel pickup and return transfer",

  schedule: "Daily, beach open approximately 8:00 AM–5:00 PM",

  program: [
    "Private pickup from your hotel.",
    "Drive south from Hurghada toward Sharm El Naga, after Makadi Bay.",
    "Arrive at Sharm El Naga Beach.",
    "Enjoy the beach and beautiful natural surroundings.",
    "Snorkel directly from the beach and explore colorful coral reefs and marine life.",
    "Enjoy lunch with a drink.",
    "Relax, swim and enjoy free time on the beach.",
    "Inform the driver approximately 30 minutes before your preferred departure time.",
    "Private transfer back to your hotel.",
  ],

  highlights: [
    "Sharm El Naga Beach",
    "Crystal-clear Red Sea water",
    "Direct-from-shore snorkeling",
    "Colorful coral reefs",
    "Red Sea marine life",
    "Private round-trip transfer",
    "Flexible departure and return time",
    "No boat required for snorkeling",
  ],

  included: [
    "Private Hotel Transfer",
    "Round-Trip Transportation",
    "Sharm El Naga Entrance Ticket",
    "Full Snorkeling Equipment",
    "Lunch",
    "Drink with Lunch",
  ],

  excluded: [
    "Additional drinks outside the included lunch drink",
    "Photography services",
    "Tips",
    "Personal expenses",
  ],

  notes: [
    "Sharm El Naga is famous for its coral reefs and marine life located very close to the beach.",
    "Snorkeling is available directly from the shore without taking a boat.",
    "The departure and return time can be arranged according to the customer's preference within beach operating hours.",
    "The beach is open daily approximately from 8:00 AM to 5:00 PM.",
    "Please inform the driver approximately 30 minutes before your preferred departure time.",
    "Bring swimwear, towel, sunscreen and sunglasses.",
    "The program may change slightly depending on weather and local conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Beach & Snorkeling Trip",
}),

  /* =======================================================
     SEA & WATER ACTIVITIES
     ======================================================= */

  "sea-scope-semi-submarine": baseTour("sea-scope-semi-submarine", {
  name: "Sea Scope Semi Submarine",

  destination: "hurghada",

  image: "/tours/sea-scope-semi-submarine-hero.webp",

  description:
    "Discover the colorful underwater world of the Red Sea from an air-conditioned underwater salon, with a one-hour underwater viewing experience and a 30-minute snorkeling stop.",

  overview:
    "Enjoy a family-friendly Red Sea experience without diving. Explore coral reefs and marine life from the air-conditioned underwater viewing salon, watch fish-feeding shows by divers and enjoy a 30-minute snorkeling stop.",

  duration: "2 Hours",

  pickup: "Hotel pickup and return transfer",

  schedule:
    "Daily: 9:00–11:00 AM, 11:00 AM–1:00 PM, 1:00–3:00 PM, or 3:00–5:00 PM",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the Sea Scope Semi Submarine and receive a welcome drink.",
    "Listen to a short briefing about the trip and safety procedures.",
    "Descend to the air-conditioned underwater salon.",
    "Enjoy one hour of underwater viewing of coral reefs and colorful marine life.",
    "Watch fish-feeding shows performed by professional divers.",
    "Return to the upper deck and receive snorkeling equipment.",
    "Enjoy a 30-minute snorkeling stop.",
    "Finish the tour and return to the marina.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Air-conditioned underwater salon",
    "One-hour underwater viewing",
    "Colorful Red Sea coral reefs",
    "Marine life",
    "Fish-feeding show",
    "30-minute snorkeling stop",
    "Welcome drink",
    "Four departure times daily",
    "Family-friendly experience",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Welcome Drink",
    "Sea Scope Semi Submarine Trip",
    "Air-Conditioned Underwater Viewing",
    "Marine Life Viewing",
    "Fish-Feeding Show",
    "Snorkeling Equipment",
    "30-Minute Snorkeling Stop",
  ],

  excluded: [
    "Drinks from the submarine bar",
    "Photography services",
    "Tips",
    "Personal expenses",
  ],

  notes: [
    "No diving experience is required.",
    "The underwater salon is air-conditioned.",
    "The underwater viewing experience lasts approximately one hour.",
    "The snorkeling stop lasts approximately 30 minutes.",
    "Four departure times are available daily: 9:00 AM, 11:00 AM, 1:00 PM and 3:00 PM.",
    "Additional drinks from the submarine bar are available for an extra charge.",
    "The program may change slightly depending on sea and weather conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Semi Submarine & Snorkeling",
}),

  "paradise-semi-submarine": baseTour("paradise-semi-submarine", {
  name: "Paradise Semi Submarine",

  destination: "hurghada",

  image: "/tours/paradise-semi-submarine-hero.webp",

  description:
    "Explore the underwater world of the Red Sea from the air-conditioned glass-bottom salon, with one hour of coral reef viewing followed by a snorkeling stop.",

  overview:
    "A family-friendly Red Sea experience combining one hour of underwater viewing through the glass-bottom semi-submarine salon with a snorkeling stop. Discover colorful coral reefs and marine life without diving.",

  duration: "2 Hours",

  pickup: "Hotel pickup and return transfer",

  schedule:
    "Daily: 9:00–11:00 AM, 11:00 AM–1:00 PM, 1:00–3:00 PM, or 3:00–5:00 PM",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the semi-submarine and listen to a short briefing about the trip.",
    "Cruise to the coral reef viewing location.",
    "Descend to the lower glass-bottom salon.",
    "Enjoy one hour of underwater viewing of colorful coral reefs and marine life.",
    "Return to the upper deck and prepare the snorkeling equipment.",
    "Enjoy a snorkeling stop in the open sea.",
    "Finish the tour and return to the marina.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Glass-bottom semi submarine",
    "Air-conditioned underwater salon",
    "One-hour underwater viewing",
    "Colorful coral reefs",
    "Red Sea marine life",
    "Snorkeling stop",
    "Family-friendly experience",
    "Suitable for non-swimmers",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Paradise Semi Submarine Trip",
    "One-Hour Underwater Viewing",
    "Glass-Bottom Viewing Salon",
    "Coral Reef Viewing",
    "Marine Life Viewing",
    "Snorkeling Equipment",
    "Snorkeling Stop",
  ],

  excluded: [
    "Additional drinks",
    "Photography services",
    "Tips",
    "Personal expenses",
  ],

  notes: [
    "Suitable for families and non-swimmers.",
    "No diving experience is required.",
    "The underwater viewing experience lasts approximately one hour.",
    "The snorkeling stop takes place in the open sea.",
    "Four departure times are available daily: 9:00 AM, 11:00 AM, 1:00 PM and 3:00 PM.",
    "The program may change slightly depending on sea and weather conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Semi Submarine & Snorkeling",
}),

  "panorama-semi-submarine": baseTour("panorama-semi-submarine", {
  name: "Panorama Semi Submarine",

  destination: "hurghada",

  image: "/tours/panorama-semi-submarine-hero.webp",

  description:
    "Discover beautiful Red Sea coral reefs and marine life from the glass-bottom underwater salon, followed by snorkeling and relaxation at a marine platform.",

  overview:
    "Explore the Red Sea underwater scenery from a Panorama Semi Submarine, then enjoy approximately one hour of snorkeling and free time at a dedicated marine platform in the middle of the sea.",

  duration: "3 Hours",

  pickup: "Hotel pickup and return transfer",

  schedule:
    "Daily: 9:00 AM–12:00 PM or 1:00 PM–4:00 PM",

  program: [
    "Hotel pickup and transfer to the marina.",
    "Board the boat and listen to the guide's briefing about the activities and safety instructions.",
    "Descend to the lower glass-bottom salon.",
    "Enjoy approximately one hour viewing coral reefs and colorful marine life.",
    "Return to the upper deck and cruise toward the marine platform in the middle of the sea.",
    "Spend approximately one hour at the marine platform for snorkeling and relaxation.",
    "Use the provided snorkeling equipment and enjoy the Red Sea.",
    "Finish the tour and return by boat to the marina.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Panorama Semi Submarine",
    "Glass-bottom underwater viewing",
    "Coral reefs and marine life",
    "Approximately one hour underwater viewing",
    "Marine platform in the middle of the sea",
    "Snorkeling and relaxation",
    "Snorkeling equipment",
    "Two daily departure times",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Panorama Semi Submarine Trip",
    "Glass-Bottom Underwater Viewing",
    "Coral Reef Viewing",
    "Marine Life Viewing",
    "Snorkeling Stop",
    "Snorkeling Equipment",
    "Marine Platform Stop",
  ],

  excluded: [
    "Drinks and orders at the marine platform",
    "Photography services",
    "Tips",
    "Personal expenses",
  ],

  notes: [
    "No diving experience is required.",
    "The underwater viewing experience lasts approximately one hour.",
    "Guests spend approximately one hour at the marine platform for snorkeling and relaxation.",
    "Additional drinks and orders at the marine platform are available for an extra charge.",
    "Two departure times are available daily: 9:00 AM–12:00 PM and 1:00 PM–4:00 PM.",
    "The program may change slightly depending on sea and weather conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Semi Submarine & Snorkeling",
}),

  "sindbad-submarine": baseTour("sindbad-submarine", {

  name: "Sindbad Submarine",

  destination: "hurghada",

  image: "/tours/sindbad-submarine-hero.webp",

  description:
    "Experience a real submarine adventure in the Red Sea, diving to a depth of 22–25 meters to discover colorful coral reefs and marine life through panoramic underwater windows.",

  overview:
    "Enjoy a unique underwater adventure aboard the Sindbad Submarine. Travel by motorboat to the floating marine station, then descend approximately 22–25 meters below the surface for 45–50 minutes. Watch colorful coral reefs, marine life and professional divers feeding fish directly in front of the panoramic windows.",

  duration: "2–3 Hours",

  pickup: "Hotel pickup not included",

  schedule: "Daily, with multiple departure times",

  program: [
    "Meet at the Sindbad Hotel Marina.",
    "Take a motorboat to the floating marine station.",
    "Board the submarine and settle into the air-conditioned cabin.",
    "Descend approximately 22–25 meters below the surface.",
    "Enjoy approximately 45–50 minutes of underwater exploration.",
    "Observe coral reefs and colorful marine life through panoramic windows.",
    "Watch professional divers perform fish-feeding shows.",
    "Return to the floating station.",
    "Take the motorboat back to the marina.",
  ],

  highlights: [
    "Real submarine experience",
    "Dive to 22–25 meters",
    "45–50 minutes underwater",
    "Panoramic underwater windows",
    "Professional divers and fish-feeding show",
    "Air-conditioned cabin",
    "Family-friendly experience",
  ],

  included: [
    "Real Submarine Trip",
    "Underwater Dive to 22–25 Meters",
    "Motorboat Transfer to the Floating Station",
    "Motorboat Return to the Marina",
    "Air-Conditioned Cabin",
    "Panoramic Underwater Windows",
    "Professional Divers' Fish-Feeding Show",
  ],

  excluded: [
    "Hotel Transfer",
    "Personal Expenses",
    "Photography",
    "Tips",
  ],

  notes: [
    "The submarine dives fully underwater to approximately 22–25 meters.",
    "The actual underwater experience lasts approximately 45–50 minutes.",
    "The total experience takes approximately 2–3 hours including the marine transfer.",
    "Suitable for children, families, elderly guests and non-swimmers.",
    "No swimming or diving experience is required.",
    "The cabin accommodates approximately 44 passengers.",
    "The submarine operates under the supervision of professional captains with safety standards in place.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 4.8,
  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Real Submarine Experience",

}),

  "fishing-trip": baseTour("fishing-trip", {

  name: "Fishing Trip",

  destination: "hurghada",

  image: "/tours/fishing-trip-hero.webp",

  description:
    "Enjoy a full-day fishing adventure in the Red Sea, combining recreational fishing, snorkeling and a relaxing boat trip with lunch and fresh drinks.",

  overview:
    "Experience a complete Red Sea fishing adventure from the marina. Sail to fishing areas rich in marine life, enjoy fishing with basic equipment provided, take a snorkeling and swimming break, and have an open buffet lunch with hot and cold drinks on board. Freshly caught fish may also be prepared and cooked as part of the experience.",

  duration: "Approximately 7.5–8 Hours",

  pickup: "Hotel pickup not included",

  schedule: "Approximately 8:30 AM–4:00 PM",

  program: [
    "Departure from the marina toward the open fishing areas.",
    "First fishing stop in an area rich in fish, such as Abu Ramad or Giftun Islands.",
    "Receive the basic fishing equipment and start fishing.",
    "Enjoy a snorkeling and swimming stop.",
    "Continue fishing for guests who prefer to keep fishing.",
    "Enjoy an open buffet lunch on board the yacht.",
    "Freshly caught fish may be prepared and cooked on board, depending on the catch and arrangements.",
    "Enjoy hot and cold drinks throughout the trip.",
    "Return to the marina at the end of the excursion.",
  ],

  highlights: [
    "Red Sea fishing adventure",
    "Fishing in rich fishing areas",
    "Basic fishing equipment provided",
    "Snorkeling and swimming stop",
    "Open buffet lunch",
    "Hot and cold drinks",
    "Possibility to cook freshly caught fish",
    "Life jacket provided",
  ],

  included: [
    "Basic Fishing Equipment",
    "Fishing Lines",
    "Fishing Rods",
    "Fishing Bait",
    "Snorkeling Equipment",
    "Snorkeling Stop",
    "Open Buffet Lunch",
    "Hot and Cold Drinks",
    "Water",
    "Juice",
    "Tea",
    "Coffee",
    "Life Jacket",
  ],

  excluded: [
    "Hotel Transfer",
    "Photography Services",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "The trip combines recreational fishing with snorkeling and swimming activities.",
    "Fishing areas may include Abu Ramad or Giftun Islands depending on the trip itinerary.",
    "Freshly caught fish may be prepared and cooked on board, depending on the catch and available arrangements.",
    "Fishing locations and the itinerary may change depending on weather and sea conditions.",
    "Hotel transfers are not included unless requested as an additional service.",
    "Photography services and tips are optional.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Fishing & Snorkeling Trip",

}),

  parasailing: baseTour("parasailing", {

  name: "Parasailing",

  destination: "hurghada",

  image: "/tours/parasailing-hero.webp",

  description:
    "Enjoy an exciting parasailing adventure above the Red Sea, flying approximately 40–50 meters above the water and enjoying panoramic views of Hurghada's coastline and turquoise waters.",

  overview:
    "Experience the Red Sea from above on an exciting parasailing flight. After a short speedboat ride and safety briefing, enjoy a safe flight approximately 40–50 meters above the sea, with single, double or triple flight options available.",

  duration: "Approximately 30–45 Minutes",

  pickup: "Hotel pickup not included",

  schedule: "Available throughout the day, weather permitting",

  program: [
    "Meet at the water sports center or depart by speedboat from the marina.",
    "Receive a safety briefing and instructions.",
    "Put on the life jacket and parasailing harness.",
    "Board the speedboat and begin the parasailing activity.",
    "Gradually rise approximately 40–50 meters above the sea.",
    "Enjoy panoramic views of Hurghada's coastline and turquoise waters.",
    "Enjoy approximately 8–12 minutes of actual flight time.",
    "Descend gradually and safely onto the rear platform of the boat.",
    "Optional gentle water touch with your feet during landing.",
    "Return to the departure point.",
  ],

  highlights: [
    "Parasailing 40–50 meters above the Red Sea",
    "8–12 minutes actual flight time",
    "Speedboat ride",
    "Panoramic Hurghada coastline views",
    "Single, Double or Triple flight options",
    "Safe mechanical landing",
    "No swimming experience required",
  ],

  included: [
    "Speedboat Ride",
    "Parasailing Flight",
    "Safety Equipment",
    "Life Jacket",
    "Parasailing Harness",
    "Safety Briefing",
  ],

  excluded: [
    "Hotel Transfer",
    "Photography Services",
    "Video Services",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "No previous experience or swimming ability is required.",
    "The actual parasailing flight lasts approximately 8–12 minutes.",
    "The total activity takes approximately 30–45 minutes including the speedboat ride.",
    "Single, Double and Triple flight options are available.",
    "Triple flights are subject to the maximum permitted combined weight, approximately 150–170 kg.",
    "Flight availability depends on daily wind and weather conditions.",
    "Safety equipment and instructions must be followed throughout the activity.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Parasailing",

}),

  "banana-boat": baseTour("banana-boat", {

  name: "Banana Boat & Tube Rides",

  destination: "hurghada",

  image: "/tours/banana-boat-hero.webp",

  description:
    "Enjoy an exciting Banana Boat and Tube Ride in the Red Sea, with thrilling speedboat maneuvers and fun on the water for families and groups.",

  overview:
    "Have fun on the Red Sea with an exciting Banana Boat or inflatable tube ride. After receiving safety equipment and a life jacket, enjoy a thrilling speedboat ride with turns and maneuvers. Swimming in the water at the end is optional, making the activity suitable for families and children.",

  duration: "10–15 Minutes",

  pickup: "Hotel pickup not included",

  schedule: "Available throughout the day, weather permitting",

  program: [
    "Meet at the water sports center on the beach or at the marina.",
    "Receive a safety briefing and life jacket.",
    "Board the inflatable Banana Boat and hold the designated handles.",
    "Enjoy a thrilling speedboat ride with exciting turns and maneuvers.",
    "Enjoy approximately 10–15 minutes of fun on the water.",
    "Optional drop into the water for swimming and additional fun.",
    "Return safely to the shore.",
  ],

  highlights: [
    "Banana Boat ride",
    "Thrilling speedboat maneuvers",
    "10–15 minutes on the water",
    "Life jacket and safety equipment",
    "Fun for families and groups",
    "Suitable for children",
    "5–6 people per Banana Boat ride",
  ],

  included: [
    "Banana Boat Ride",
    "Speedboat Ride",
    "Safety Equipment",
    "Life Jacket",
    "Professional Speedboat Driver",
    "Exciting Water Maneuvers",
  ],

  excluded: [
    "Hotel Transfer",
    "Photography Services",
    "Video Services",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "The Banana Boat can accommodate approximately 5–6 people per ride.",
    "The activity is suitable for families, children and groups.",
    "Guests can request not to be dropped into the water, especially when traveling with children.",
    "The activity is subject to weather and sea conditions.",
    "Swimming at the end of the ride is optional.",
    "The activity can be booked as part of a combo package with Parasailing or other water activities such as Crazy Tube.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Banana Boat & Tube Ride",

}),

  "sofa-boat": baseTour("sofa-boat", {

  name: "Sofa Boat / Crazy Sofa",

  destination: "hurghada",

  image: "/tours/sofa-boat-hero.webp",

  description:
    "Enjoy an exciting Sofa Boat adventure in the Red Sea with thrilling speedboat maneuvers, waves and turns. A fun and safe water activity for families, children and non-swimmers.",

  overview:
    "Experience the exciting Sofa Boat ride while being pulled by a speedboat across the Red Sea. Sit comfortably on the wide inflatable sofa, hold the side handles and enjoy sliding and bouncing over the waves with exciting turns and maneuvers. Its wide base and backrest provide excellent stability compared with a traditional Banana Boat.",

  duration: "10–15 Minutes",

  pickup: "Hotel pickup not included",

  schedule: "Available throughout the day, weather permitting",

  program: [
    "Meet at the water sports center on the beach or at the marina.",
    "Receive a safety briefing and wear the life jacket and safety equipment.",
    "Sit comfortably on the inflatable sofa and hold the side handles.",
    "The speedboat begins pulling the Sofa Boat across the Red Sea.",
    "Enjoy sliding, bouncing over the waves and exciting turns and maneuvers.",
    "Enjoy approximately 10–15 minutes of fun on the water.",
    "Return safely to the departure point.",
  ],

  highlights: [
    "Sofa Boat / Crazy Sofa",
    "Exciting speedboat maneuvers",
    "10–15 minutes on the water",
    "Wide inflatable base with backrest",
    "Stable and family-friendly experience",
    "Suitable for children and non-swimmers",
    "3–4 people per ride",
  ],

  included: [
    "Sofa Boat Ride",
    "Speedboat Ride",
    "Speedboat Pulling and Maneuvers",
    "Safety Equipment",
    "Life Jacket",
  ],

  excluded: [
    "Hotel Transfer",
    "Photography Services",
    "Video Services",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "The Sofa Boat accommodates approximately 3–4 people side by side.",
    "Its wide base and backrest provide greater stability and make the risk of overturning very low compared with a Banana Boat.",
    "The activity is an excellent and safe option for families and children.",
    "Suitable for guests who are not confident swimmers.",
    "The activity is subject to weather and sea conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Sofa Boat / Crazy Sofa",

}),

  "twister": baseTour("twister", {

  name: "Twister Speedboat",

  destination: "hurghada",

  image: "/tours/twister-hero.webp",

  description:
    "Enjoy an exciting high-speed Twister Speedboat adventure in the Red Sea with sharp turns, fast maneuvers and an adrenaline-filled experience.",

  overview:
    "Experience the thrill of the Red Sea aboard the Twister Speedboat, featuring high-speed cruising, sharp turns, sudden maneuvers and an exciting 360-degree spin over the water.",

  duration: "10–20 Minutes",

  pickup: "Hotel pickup available upon request",

  schedule: "Daily, with repeated trips throughout the day",

  program: [
    "Meet at the marina.",
    "Wear life vests and secure yourself in the designated seats.",
    "Board the Twister Speedboat.",
    "Start the high-speed ride across the Red Sea.",
    "Enjoy sharp turns and exciting sudden maneuvers.",
    "Experience a full 360-degree spin over the water.",
    "Stop briefly in a calm area for swimming and photos, depending on the program.",
    "Continue the high-speed ride.",
    "Return safely to the marina.",
  ],

  highlights: [
    "High-speed Twister Speedboat",
    "Sharp turns and exciting maneuvers",
    "360-degree spin",
    "Red Sea adventure",
    "Swimming stop",
    "Professional captain",
  ],

  included: [
    "Twister Speedboat Ride",
    "High-Speed Maneuvers",
    "Life Vests",
    "Safety Equipment",
    "Professional Captain",
    "Swimming Stop",
  ],

  excluded: [
    "Hotel Transfer",
    "Personal expenses",
    "Photography and video services",
    "Tips",
  ],

  notes: [
    "The activity usually lasts approximately 10–20 minutes.",
    "The duration may reach up to 1 hour when included as part of a longer boat tour.",
    "The boat accommodates approximately 10–12 passengers.",
    "The boat is equipped with secure seats and hand grips.",
    "A professional captain operates the boat.",
    "Swimming and photography stops depend on the selected program.",
    "The activity is subject to sea and weather conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Twister Speedboat",

}),

  /* =======================================================
     DOLPHIN EXPERIENCES
     ======================================================= */

  "dolphin-show": baseTour("dolphin-show", {

  name: "Dolphin World Show",

  destination: "hurghada",

  image: "/tours/dolphin-show-hero.webp",

  description:
    "Enjoy an entertaining Dolphin World Show in Makadi Bay featuring amazing dolphin performances, sea lions and fun family entertainment.",

  overview:
    "Visit Dolphin World in Makadi Bay and enjoy a spectacular one-hour dolphin show featuring acrobatic performances, jumps through hoops, ball games, dancing and entertaining sea lion performances.",

  duration: "2–3 Hours",

  pickup: "Hotel pickup and return transfer",

  schedule:
    "Daily, morning show usually at 10:30 AM. Evening shows may be available depending on the season.",

  program: [
    "Hotel pickup and transfer to Dolphin World in Makadi Bay.",
    "Arrive at Dolphin World and take your seats for the entertainment show.",
    "Enjoy the main Dolphin Show.",
    "Watch spectacular dolphin acrobatics and jumps through hoops.",
    "Enjoy dolphin performances with balls, dancing and other entertaining activities.",
    "Watch the sea lion performances and funny interactive moments with the audience.",
    "Finish the show and transfer back to the hotel.",
  ],

  highlights: [
    "Dolphin World Show",
    "Amazing dolphin performances",
    "Acrobatic dolphin jumps",
    "Sea lion show",
    "Family-friendly entertainment",
    "Suitable for all ages",
  ],

  included: [
    "Hotel Transfer",
    "Dolphin World Entrance Ticket",
    "Main Dolphin Show",
    "Dolphin Performance",
    "Sea Lion Show",
  ],

  excluded: [
    "Swimming with dolphins",
    "Private dolphin photos",
    "Food and drinks",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "The actual Dolphin Show lasts approximately 60 minutes.",
    "The total excursion duration is approximately 2–3 hours including transfers.",
    "The morning show usually starts at 10:30 AM.",
    "Evening shows may be available depending on the season.",
    "Swimming with dolphins and private photos require an additional booking and fee.",
    "Food and drinks inside the venue are not included.",
    "A perfect family experience suitable for children and guests of all ages.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Family",

  available: true,

  type: "Dolphin Show",

}),

  "dolphin-session": baseTour("dolphin-session", {

  name: "Swimming with Dolphins",

  destination: "hurghada",

  image: "/tours/dolphin-session-hero.webp",

  description:
    "Enjoy an unforgettable swimming and interaction experience with dolphins at Dolphin World, accompanied by professional trainers.",

  overview:
    "Get close to dolphins in a safe and supervised environment. Enjoy touching, playing, dancing, kissing and the Dolphin Tow experience according to the selected session.",

  duration: "5–15 Minutes",

  pickup: "Available upon request",

  schedule:
    "Daily, at scheduled session times. Can be booked separately or after the main Dolphin Show.",

  program: [
    "Arrive at Dolphin World and prepare for the experience.",
    "Put on suitable swimwear and a life jacket.",
    "Listen to the safety instructions from the professional trainer.",
    "Enter the designated pool with the professional trainer.",
    "Interact and play with the dolphin.",
    "Enjoy touching, dancing and kissing the dolphin.",
    "Experience the Dolphin Tow according to the selected session.",
    "Finish the session and leave the pool.",
    "View the professional photos and videos available from the center photographer.",
  ],

  highlights: [
    "Swimming with dolphins",
    "Direct dolphin interaction",
    "Dolphin Tow experience",
    "Professional trainer",
    "Safe supervised experience",
    "Family-friendly activity",
  ],

  included: [
    "Dolphin Swimming Session",
    "Dolphin Interaction",
    "Life Jacket",
    "Swimming Suit",
    "Towel",
    "Professional Trainer",
  ],

  excluded: [
    "Hotel Transfer",
    "Professional Photos and Videos",
    "Main Dolphin Show Ticket",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "5-minute session: A short experience with basic interaction for one person.",
    "10-minute session: Extended swimming, interaction and Dolphin Tow; it may be shared between two people.",
    "15-minute session: A dedicated session suitable for families or groups.",
    "Sessions are organized at scheduled times throughout the day.",
    "The experience can be booked separately or combined with the main Dolphin Show.",
    "Suitable for children from approximately 3–4 years old and non-swimmers, subject to operator requirements.",
    "Life jackets and professional trainers are provided throughout the session.",
    "Personal phones and cameras are not allowed inside the pool for safety and dolphin welfare reasons.",
    "Professional photos and videos are available for purchase separately.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Family",

  available: true,

  type: "Dolphin Swimming Experience",

}),

  "swimming-with-dolphin": baseTour("swimming-with-dolphin", {

  name: "Swimming with Dolphins",

  destination: "hurghada",

  image: "/tours/swimming-with-dolphin-hero.webp",

  description:
    "Enjoy an unforgettable swimming and interaction experience with dolphins at Dolphin World, accompanied by a professional trainer.",

  overview:
    "Get up close with dolphins in a safe and supervised environment. Enjoy touching, playing, dancing, kissing and the Dolphin Tow experience according to the selected session.",

  duration: "5–15 Minutes",

  pickup: "Available upon request",

  schedule:
    "Daily at scheduled session times. Can be booked separately or directly after the main Dolphin Show.",

  program: [
    "Arrive at Dolphin World and prepare for the dolphin experience.",
    "Put on suitable swimwear and a life jacket.",
    "Listen to the safety instructions from the professional trainer.",
    "Enter the designated pool with the professional trainer.",
    "Interact and play with the dolphin.",
    "Enjoy touching, dancing and kissing the dolphin.",
    "Experience the Dolphin Tow according to the selected session.",
    "Finish the session and leave the pool.",
    "View and purchase professional photos and videos from the center photographer if desired.",
  ],

  highlights: [
    "Swimming with dolphins",
    "Direct dolphin interaction",
    "Dolphin Tow experience",
    "Professional trainer",
    "Life jacket and safety equipment",
    "Suitable for non-swimmers",
    "Family-friendly experience",
  ],

  included: [
    "Dolphin Swimming Session",
    "Dolphin Interaction",
    "Life Jacket",
    "Swimming Suit",
    "Towel",
    "Professional Trainer",
  ],

  excluded: [
    "Hotel Transfer",
    "Professional Photos and Videos",
    "Main Dolphin Show Ticket",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "5-minute session: A quick experience with basic dolphin interaction for one person.",
    "10-minute session: More time for swimming, Dolphin Tow and interaction; the session can be shared between two people.",
    "15-minute session: A dedicated session suitable for families or groups to enjoy the experience together.",
    "Sessions are organized at scheduled times throughout the day.",
    "The experience can be booked separately or directly after the main Dolphin Show.",
    "Suitable for children from approximately 3–4 years old and non-swimmers, subject to operator requirements.",
    "Life jackets and professional trainers are provided throughout the session.",
    "Personal phones and cameras are not allowed inside the pool for safety and dolphin welfare reasons.",
    "Professional photos and videos can be viewed and purchased separately from the center photographer.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Popular",

  available: true,

  type: "Dolphin Swimming Experience",

}),

  /* =======================================================
     DESERT ADVENTURES
     ======================================================= */

  "desert-safari": baseTour("desert-safari", {

  name: "Morning Desert Safari",

  destination: "hurghada",

  image: "/tours/desert-safari-hero.webp",

  description:
    "Enjoy an exciting morning desert adventure with quad biking, Spider Buggy, Bedouin culture, camel riding and traditional Bedouin hospitality.",

  overview:
    "Start your day with an exciting desert safari from Hurghada. Ride a quad bike through the desert, enjoy a Spider Buggy experience, visit a Bedouin village, ride camels and discover traditional Bedouin culture before returning to your hotel before lunchtime.",

  duration: "Approximately 3–4 Hours",

  pickup: "Morning hotel pickup",

  schedule: "Daily, approximately 8:00–8:30 AM to 12:00–1:00 PM",

  program: [
    "Hotel pickup and transfer to the desert safari station.",
    "Receive the safety instructions and prepare for the adventure.",
    "Wear the Bedouin scarf and safety glasses and enjoy a short test drive.",
    "Ride the quad bike through the desert for approximately 22–25 km (45–60 minutes).",
    "Enjoy a Spider Buggy ride for approximately 10–15 minutes, depending on the selected booking.",
    "Arrive at the Bedouin village and relax inside the traditional tent.",
    "Enjoy traditional Bedouin tea with marjoram.",
    "Enjoy a camel ride and discover Bedouin traditions and lifestyle.",
    "Learn about traditional bread making and the Bedouin herbal pharmacy.",
    "Return by quad bike to the main safari station.",
    "Transfer back to the hotel.", 
  ],

  highlights: [
    "Morning desert safari",
    "Quad bike adventure",
    "Spider Buggy experience",
    "Bedouin village",
    "Camel riding",
    "Bedouin tea",
    "Egyptian desert scenery",
    "Bedouin culture",
  ],

  included: [
    "Hotel Transfer",
    "Quad Bike Experience",
    "Single or Double Quad Bike",
    "Spider Buggy Experience according to booking",
    "Bedouin Village Visit",
    "Camel Ride",
    "Bedouin Tea",
    "Professional Guide",
    "Safety Instructions",
  ],

  excluded: [
    "Bedouin scarf",
    "Sunglasses",
    "Personal expenses",
    "Additional drinks outside Bedouin tea",
    "Photos and videos",
    "Tips",
  ],

  notes: [
    "The morning departure helps avoid the intense midday heat and allows guests to return to the hotel before lunchtime.",
    "Quad bike options are available as Single or Double.",
    "Quad bike driving is allowed for guests aged 16 and above.",
    "Children may ride as passengers with their parents while following the safety instructions.",
    "The Spider Buggy experience depends on the selected booking.",
    "Wear comfortable clothes, closed shoes and suitable clothing for the desert.",
  ],

  price: 30,

  childPrice: 20,

  infantPrice: 0,

  rating: 4.7,

  reviews: 84,

  badge: "Adventure",

  available: true,

  type: "Morning Desert Safari",

}),

  "quad-bike": baseTour("quad-bike", {

  name: "Quad Bike Safari",

  destination: "hurghada",

  image: "/tours/quad-bike-hero.webp",

  description:
    "Enjoy an exciting quad bike safari through the Egyptian desert, riding across desert trails, hills and rugged landscapes.",

  overview:
    "Experience an exciting desert quad bike adventure with a safety briefing, test drive and guided ride through the desert. Enjoy scenic views, a rest stop and a photo opportunity in the mountains.",

  duration: "2–3 Hours",

  pickup: "Hotel pickup available",

  schedule: "Daily, morning or sunset sessions",

  program: [
    "Gather at the main safari station.",
    "Wear the Bedouin scarf and protective goggles.",
    "Receive a safety briefing and instructions on how to control the quad bike.",
    "Enjoy a short test drive on a closed track.",
    "Start the guided quad bike ride through the desert.",
    "Ride approximately 20–25 km across desert trails, hills and rugged terrain.",
    "Enjoy a rest and photo stop in a scenic elevated area between the mountains.",
    "Drink water and enjoy a short break.",
    "Return by quad bike to the main safari station.",
  ],

  highlights: [
    "Quad Bike Safari",
    "20–25 km Desert Ride",
    "Desert Trails & Hills",
    "Test Drive",
    "Mountain Scenery",
    "Photo & Rest Stop",
    "Single or Double Quad",
  ],

  included: [
    "Quad Bike Experience",
    "Single or Double Quad Bike",
    "Helmet",
    "Safety Equipment",
    "Professional Guide",
    "Desert Rest Stop",
    "Water",
  ],

  excluded: [
    "Hotel Transfer",
    "Bedouin Scarf",
    "Protective Desert Goggles",
    "Professional Photos & Videos",
    "Tips",
  ],

  notes: [
    "The actual quad bike riding time is approximately 45–60 minutes.",
    "The total experience takes approximately 2–3 hours including preparation and rest stops.",
    "Morning and sunset sessions are available daily.",
    "Single quad bike driving is allowed from 16 years old.",
    "Children from 6 years old may ride as passengers on a double quad bike.",
    "Closed shoes are required.",
    "Guests must follow the guide and remain in line throughout the desert ride.",
    "The route and timing may vary depending on weather and desert conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Quad Bike Safari",

}),

  "super-safari": baseTour("super-safari", {

  name: "Super Safari",

  destination: "hurghada",

  image: "/tours/super-safari-hero.webp",

  description:
    "Enjoy a complete desert safari combining Jeep 4x4 adventure, quad biking, Spider Buggy, Bedouin culture, camel riding, sunset views, dinner and evening entertainment.",

  overview:
    "Experience a full desert adventure from Hurghada combining exciting quad biking and Spider Buggy rides with a Jeep 4x4 journey into the desert, a visit to a traditional Bedouin village, camel riding, sunset views, an open buffet dinner and an oriental evening show with a Fire Show.",

  duration: "Approximately 7.5–8 Hours",

  pickup: "Afternoon hotel pickup by Jeep 4x4",

  schedule: "Daily, approximately 1:00 PM–8:30/9:00 PM",

  program: [
    "Hotel pickup by Jeep 4x4.",
    "Transfer to the main desert safari station.",
    "Wear the Bedouin scarf and protective goggles and receive the safety instructions.",
    "Enjoy a short test drive before starting the activities.",
    "Enjoy a quad bike ride through the desert for approximately 45–60 minutes.",
    "Experience a Spider Buggy ride for approximately 10–15 minutes.",
    "Continue by Jeep 4x4 into the desert for approximately 25–30 km.",
    "Visit the Bedouin village and enjoy traditional Bedouin tea with marjoram.",
    "Enjoy a camel ride and discover traditional Bedouin culture.",
    "Learn about traditional bread making and Bedouin herbs.",
    "Enjoy sunset views from a scenic mountain viewpoint.",
    "Enjoy an open buffet dinner including grilled meat, kofta, chicken, rice and salads.",
    "Enjoy drinks during dinner.",
    "Watch the oriental entertainment show and Tanoura performance.",
    "Enjoy the Fire Show.",
    "Return by Jeep 4x4 to the safari station.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Jeep 4x4 Desert Adventure",
    "Quad Bike",
    "Spider Buggy",
    "Bedouin Village",
    "Camel Riding",
    "Bedouin Tea",
    "Mountain Sunset",
    "Open Buffet Dinner",
    "Oriental Show",
    "Tanoura Dance",
    "Fire Show",
  ],

  included: [
    "Hotel Transfer by Jeep 4x4",
    "Quad Bike Experience",
    "Spider Buggy Experience",
    "Jeep 4x4 Desert Safari",
    "Bedouin Village Visit",
    "Camel Ride",
    "Traditional Bedouin Tea",
    "Bedouin Cultural Experience",
    "Open Buffet Dinner",
    "Drinks During Dinner",
    "Oriental Show",
    "Tanoura Show",
    "Fire Show",
    "Professional Safari Guide",
    "Safety Briefing",
    "Test Drive",
  ],

  excluded: [
    "Bedouin Scarf",
    "Protective Desert Goggles",
    "Additional Drinks Outside Dinner",
    "Professional Photos & Videos",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "The total excursion takes approximately 7.5–8 hours including transfers.",
    "Departure is approximately at 1:00 PM and return is around 8:30–9:00 PM.",
    "The program combines adventure activities, Bedouin culture, dinner and evening entertainment.",
    "The Bedouin scarf and protective desert goggles can be purchased at the safari station.",
    "Wear comfortable closed shoes suitable for desert activities.",
    "A light jacket is recommended during winter evenings because temperatures can become cooler in the desert.",
    "The itinerary may vary slightly depending on weather and desert conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Desert Safari",

}),

  "horse-riding": baseTour("horse-riding", {

  name: "Horse Riding Tour",

  destination: "hurghada",

  image: "/tours/horse-riding-hero.webp",

  description:
    "Enjoy a memorable horse riding adventure through the Egyptian desert, mountains and Red Sea beach with professional supervision.",

  overview:
    "Experience Hurghada on horseback with a guided ride through the desert and mountain scenery, followed by a beach experience and optional horseback swimming depending on the selected program.",

  duration: "2–3 Hours",

  pickup: "Hotel pickup and return transfer",

  schedule:
    "Daily. Sunrise/Morning: 6:00 AM or 8:00 AM. Midday: 10:00 AM–2:00 PM. Sunset/Evening: 3:30 PM or 4:00 PM.",

  program: [
    "Hotel pickup and transfer to the horse stable.",
    "Meet the professional riding team and prepare for the experience.",
    "Wear the helmet and required safety equipment.",
    "Choose a suitable horse according to your riding level.",
    "Receive basic instructions on horse control and riding techniques.",
    "Start the guided horse riding tour through the desert and between the mountain ranges.",
    "Continue toward the Red Sea beach.",
    "Enjoy horseback riding along the beach.",
    "Enjoy horseback swimming in the sea and a photo opportunity, depending on the selected program.",
    "Return to the stable after the riding experience.",
    "Transfer back to the hotel.",
  ],

  highlights: [
    "Horse Riding",
    "Egyptian Desert",
    "Mountain Scenery",
    "Red Sea Beach",
    "Horseback Swimming",
    "Professional Instructor",
    "Personal Assistant",
    "Suitable for Beginners and Experienced Riders",
    "Sunrise & Sunset Options",
  ],

  included: [
    "Hotel Transfer",
    "Horse Riding Experience",
    "Professional Instructor",
    "Personal Assistant",
    "Helmet",
    "Safety Equipment",
    "Horse Suitable for Your Riding Level",
    "Horseback Swimming according to the selected program",
  ],

  excluded: [
    "Professional Photos & Videos",
    "Food & Drinks",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "The actual riding time is available as 1 or 2 hours depending on the selected option.",
    "The total experience takes approximately 2–3 hours including preparation and transfers.",
    "Available sessions include sunrise, morning, midday and sunset options.",
    "Sunrise sessions are available at approximately 6:00 AM or 8:00 AM.",
    "Midday sessions are available from approximately 10:00 AM to 2:00 PM.",
    "Sunset sessions are available at approximately 3:30 PM or 4:00 PM.",
    "Horseback swimming is available with the 2-hour beach program.",
    "Suitable for complete beginners as well as experienced riders.",
    "Wear comfortable long trousers and closed shoes.",
    "Follow the instructor's safety instructions throughout the experience.",
    "The route and horseback swimming experience may vary depending on weather and sea conditions.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,

  rating: 0,
  reviews: 0,

  badge: "Adventure",

  available: true,

  type: "Horse Riding",

}),

  stargazing: baseTour("stargazing", {

  name: "Stargazing",

  destination: "hurghada",

  image: "/tours/stargazing-hero.webp",

  description:
    "Experience a peaceful evening in the Egyptian desert with Bedouin culture, a traditional dinner and professional stargazing under the clear desert sky.",

  overview:
    "Enjoy a unique desert evening combining Bedouin hospitality, camel riding, sunset views, traditional dinner and professional astronomy with telescopes.",

  duration: "5–6 Hours",

  pickup: "Afternoon hotel pickup",

  schedule: "Daily, subject to availability",

  program: [
    "Hotel pickup and transfer to the desert by equipped vehicles or 4x4 Jeep.",
    "Travel deep into the desert mountains.",
    "Welcome at the Bedouin village with traditional Bedouin tea and coffee.",
    "Relax in the Bedouin tent.",
    "Climb the hills to enjoy the sunset between the mountains and take memorable photos.",
    "Enjoy a camel riding experience and discover Bedouin traditions.",
    "Watch the traditional Bedouin bread-making process.",
    "Enjoy a traditional Bedouin dinner including grilled meat, kofta, chicken, rice, salads and fruit.",
    "Move to the dark observation area away from city lights.",
    "Enjoy an astronomy session with a specialized astronomer.",
    "Learn about stars, planets and the Milky Way.",
    "Use professional telescopes to observe the Moon, planets such as Saturn and Jupiter, and star clusters.",
    "Finish the evening and return to the hotel.",
  ],

  highlights: [
    "Professional Stargazing",
    "Astronomy Experience",
    "Professional Telescopes",
    "Bedouin Village",
    "Camel Riding",
    "Desert Sunset",
    "Traditional Dinner",
    "Milky Way & Stars",
  ],

  included: [
    "Hotel Transfer",
    "4x4 Desert Transfer",
    "Bedouin Village Visit",
    "Bedouin Tea & Coffee",
    "Camel Ride",
    "Traditional Bedouin Dinner",
    "Drinks During Dinner",
    "Astronomy Session",
    "Professional Astronomer",
    "Professional Telescopes",
    "Stargazing Experience",
    "Professional Guide",
  ],

  excluded: [
    "Additional drinks outside dinner",
    "Personal expenses",
    "Photos & Videos",
    "Tips",
  ],

  notes: [
    "A peaceful cultural and romantic experience suitable for families, children and couples.",
    "The astronomy program is subject to weather and visibility conditions.",
    "Bring a warm jacket during cooler desert evenings.",
    "Wear comfortable closed shoes.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Romantic",

  available: true,

  type: "Stargazing & Desert Experience",

}),

  "photo-session-desert": baseTour("photo-session-desert", {

  name: "Desert Photo Session",

  destination: "hurghada",

  image: "/tours/photo-session-desert-hero.webp",

  description:
    "Capture unforgettable memories in the Egyptian desert with a professional photography session during the beautiful golden hour.",

  overview:
    "Enjoy a private desert photography experience with a professional photographer, scenic mountain and sand dune backgrounds, Bedouin-style props, and beautiful sunset silhouette shots.",

  duration: "2.5–3 Hours",

  pickup: "Private hotel pickup",

  schedule: "Daily, subject to availability",

  program: [
    "Private pickup from the hotel by car.",
    "Transfer to a dedicated desert photography location away from crowded areas.",
    "Begin the professional photography session during the golden hour.",
    "Capture panoramic photos among the sand dunes and open mountain landscapes.",
    "Enjoy Bedouin-style photography using camels, horses, a Bedouin tent and traditional tea.",
    "Capture creative silhouette photos during sunset behind the mountains.",
    "Finish the photography session and return by private car to the hotel.",
  ],

  highlights: [
    "Professional Photography",
    "Golden Hour Session",
    "Desert & Mountain Scenery",
    "Bedouin-Style Photos",
    "Camel & Horse Photos",
    "Sunset Silhouette",
    "Private Experience",
  ],

  included: [
    "Private Hotel Transfer",
    "Private Car / Jeep",
    "Professional Photographer",
    "Professional Photography Equipment",
    "Dedicated Desert Location",
    "Photography Props",
    "Camel / Horse Photography",
    "Bedouin Tent Setup",
    "Traditional Bedouin Tea",
    "All Original High-Resolution Photos",
    "Professional Retouching",
    "20–50 Professionally Edited Photos",
  ],

  excluded: [
    "Special Dresses & Outfits",
    "Makeup Artist (MUA)",
    "Hair Stylist",
    "Personal expenses",
    "Tips",
  ],

  notes: [
    "A private experience ideal for couples, newlyweds and individuals looking for professional desert memories.",
    "The best time for the session is during the golden hour before sunset.",
    "Guests are recommended to prepare two outfits in colors that complement the desert, such as white, beige and earthy tones.",
    "Long and flowing dresses are recommended for the best photography results.",
    "The exact number of professionally retouched photos depends on the selected package.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Private",

  available: true,

  type: "Desert Photo Session",

}),

  /* =======================================================
     EGYPT TOURS & EXCURSIONS
     ======================================================= */

  "hurghada-city-tour": baseTour("hurghada-city-tour", {

  name: "Hurghada City Tour",

  destination: "hurghada",

  image: "/tours/hurghada-city-tour-hero.webp",

  description:
    "Discover the culture, history and local life of Hurghada on a guided city tour covering the Grand El Mina Mosque, Coptic Church, marina, fish market and traditional bazaars.",

  overview:
    "Explore Hurghada's most important cultural and local attractions, from the Grand El Mina Mosque and St. Shenouda Church to the marina, fish market, shopping center and traditional El Dahar markets.",

  duration: "3.5–4 Hours",

  pickup: "Afternoon hotel pickup",

  schedule: "Daily, approximately 3:30–4:00 PM",

  program: [
    "Hotel pickup by air-conditioned car or bus with a professional tour guide.",
    "Visit the Grand El Mina Mosque by the sea and explore its courtyards and Islamic architecture.",
    "Ladies can use the provided abayas when entering the mosque.",
    "Visit St. Shenouda Coptic Church in El Dahar and discover its Coptic architecture and historic icons.",
    "Stop at a shopping center offering fixed and reasonable prices.",
    "Visit the main fish market near the marina and discover fresh Red Sea fish.",
    "Enjoy free time at the new Hurghada Marina among luxury yachts, restaurants and the waterfront.",
    "Explore the old El Dahar market and traditional bazaars for souvenirs, spices, oils and papyrus.",
    "Return to the hotel.",
  ],

  highlights: [
    "Grand El Mina Mosque",
    "St. Shenouda Coptic Church",
    "Hurghada Marina",
    "Red Sea Fish Market",
    "El Dahar Old Market",
    "Traditional Bazaars",
    "Shopping Center",
    "Local Culture & History",
  ],

  included: [
    "Hotel Transfer",
    "Air-Conditioned Transportation",
    "Professional Tour Guide",
    "Grand El Mina Mosque Visit",
    "Abayas for Ladies",
    "St. Shenouda Coptic Church Visit",
    "Shopping Center Visit",
    "Red Sea Fish Market Visit",
    "Hurghada Marina Visit",
    "El Dahar Old Market Visit",
    "Traditional Bazaar Visit",
  ],

  excluded: [
    "Personal Shopping",
    "Souvenirs",
    "Food and Drinks",
    "Tips",
  ],

  notes: [
    "A cultural and entertaining experience suitable for families and all ages.",
    "The tour is available as a private tour or group tour.",
    "Ladies can use provided abayas when visiting the mosque.",
    "Shopping and purchases are at the guest's own expense.",
    "Please dress respectfully when visiting religious sites.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Popular",

  available: true,

  type: "City Tour",

}),

  "cairo-over-day": baseTour("cairo-over-day", {

  name: "Cairo Overday Tour",

  destination: "hurghada",

  image: "/tours/cairo-over-day-hero.webp",

  description:
    "Discover the legendary pyramids, Sphinx and fascinating history of Cairo on a full-day trip from Hurghada.",

  overview:
    "Travel from Hurghada to Cairo in a private car or modern air-conditioned tourist bus and explore the Giza Pyramids, Sphinx, Valley Temple and a major Egyptian museum, followed by lunch and optional shopping.",

  duration: "15–17 Hours",

  pickup: "Early morning hotel pickup",

  schedule: "Selected days, approximately 1:30–2:30 AM",

  program: [
    "Early morning pickup from the hotel in Hurghada.",
    "Travel to Cairo by private car or modern air-conditioned tourist bus.",
    "Visit the Giza Pyramids: Khufu, Khafre and Menkaure.",
    "Explore the panoramic area and enjoy time for photos.",
    "Visit the Great Sphinx and the Valley Temple.",
    "Enjoy lunch at a local restaurant in Cairo.",
    "Visit the Egyptian Museum in Tahrir, the Grand Egyptian Museum, or the National Museum of Egyptian Civilization depending on the selected package.",
    "Enjoy a short shopping stop for papyrus and perfumes or visit Khan El Khalili, depending on the available time and selected program.",
    "Start the return journey to Hurghada.",
    "Hotel drop-off upon arrival.",
  ],

  highlights: [
    "Giza Pyramids",
    "Khufu, Khafre & Menkaure",
    "Great Sphinx",
    "Valley Temple",
    "Egyptian Museum",
    "Cairo",
    "Local Lunch",
    "Khan El Khalili",
    "Papyrus & Perfume Shopping",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Air-Conditioned Vehicle",
    "Transportation To Cairo",
    "Giza Pyramids Entrance",
    "Sphinx Visit",
    "Valley Temple Visit",
    "Museum Entrance",
    "Professional Tour Guide",
    "Local Lunch",
  ],

  excluded: [
    "Entrance Ticket Inside the Pyramid",
    "Mummies Hall Entrance if charged separately",
    "Drinks During Lunch",
    "Personal Shopping",
    "Souvenirs",
    "Tips",
  ],

  notes: [
    "The total trip duration is approximately 15–17 hours including the journey between Hurghada and Cairo.",
    "Departure is usually between 1:30 and 2:30 AM, with return to Hurghada between 10:00 and 11:00 PM.",
    "Available as a Group Tour or Private Tour by private car or limousine.",
    "The exact museum and shopping stops depend on the selected booking package and available time.",
    "The journey is long and requires an early departure.",
    "Guests are recommended to request a Breakfast Box from their hotel.",
    "Wear comfortable clothes and closed shoes suitable for walking.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Excursion",

  available: true,

  type: "Cairo Overday Tour",

}),

  "luxor-over-day": baseTour("luxor-over-day", {

  name: "Luxor Overday Tour",

  destination: "hurghada",

  image: "/tours/luxor-over-day-hero.webp",

  description:
    "Discover the magnificent temples, royal tombs and ancient treasures of Luxor on a full-day trip from Hurghada.",

  overview:
    "Travel from Hurghada to Luxor by private car or modern air-conditioned tourist bus and explore Karnak Temple, the Valley of the Kings, Hatshepsut Temple and the famous Colossi of Memnon with a professional Egyptologist guide.",

  duration: "14–16 Hours",

  pickup: "Early morning hotel pickup",

  schedule: "Selected days, approximately 4:30–5:30 AM",

  program: [
    "Early morning pickup from the hotel in Hurghada.",
    "Travel to Luxor through the Eastern Desert.",
    "Visit Karnak Temple on the East Bank and explore the Great Hypostyle Hall and ancient Egyptian monuments.",
    "Enjoy lunch at a local restaurant overlooking the Nile or on the West Bank.",
    "Cross the Nile River to the West Bank, depending on the selected tour.",
    "Visit the Valley of the Kings and explore the ancient royal tombs carved into the mountains.",
    "Visit the magnificent Temple of Hatshepsut at Deir el-Bahari.",
    "Stop at the famous Colossi of Memnon for photos.",
    "Optional visit to an alabaster factory or Egyptian souvenir center.",
    "Start the return journey to Hurghada.",
    "Hotel drop-off upon arrival.",
  ],

  highlights: [
    "Karnak Temple",
    "Valley of the Kings",
    "Hatshepsut Temple",
    "Colossi of Memnon",
    "East & West Banks of Luxor",
    "Ancient Egyptian History",
    "Local Lunch",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Air-Conditioned Vehicle",
    "Transportation To Luxor",
    "Karnak Temple Entrance",
    "Valley of the Kings Entrance",
    "3 Tombs in the Valley of the Kings",
    "Hatshepsut Temple Entrance",
    "Professional Egyptologist Guide",
    "Local Lunch",
  ],

  excluded: [
    "Tutankhamun Tomb Entrance",
    "Ramesses VI Tomb Entrance",
    "Nefertari Tomb Entrance",
    "Nile Felucca Ride",
    "Banana Island Visit",
    "Drinks During Lunch",
    "Personal Expenses",
    "Souvenirs",
    "Tips",
  ],

  notes: [
    "The total trip duration is approximately 14–16 hours including the journey between Hurghada and Luxor.",
    "Departure is usually between 4:30 and 5:30 AM, with return to Hurghada between 8:30 and 9:30 PM.",
    "Available as a Group Tour or Private Tour by private vehicle.",
    "The optional alabaster factory or souvenir stop depends on the selected package and available time.",
    "The journey is long and requires an early departure.",
    "Guests are recommended to request a Breakfast Box from their hotel.",
    "Wear comfortable walking shoes and bring a hat and sunscreen.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Excursion",

  available: true,

  type: "Luxor Overday Tour",

}),

  "cairo-over-night": baseTour("cairo-over-night", {

  name: "Cairo Overnight Tour",

  destination: "hurghada",

  image: "/tours/cairo-over-night-hero.webp",

  description:
    "Explore Cairo at a relaxed pace with the Giza Pyramids, Sphinx, Egyptian Museum, Salah El Din Citadel and an overnight stay in the Egyptian capital.",

  overview:
    "Enjoy a two-day Cairo excursion from Hurghada including the Giza Pyramids, Great Sphinx, Egyptian Museum, Salah El Din Citadel, Muhammad Ali Mosque and Khan El Khalili, with one night in a Cairo hotel.",

  duration: "2 Days / 1 Night",

  pickup: "Early morning hotel pickup",

  schedule: "Selected dates, approximately 1:30–2:30 AM",

  program: [
    "Day 1: Early morning pickup from the hotel in Hurghada.",
    "Travel to Cairo by private car or modern air-conditioned tourist bus.",
    "Visit the Giza Pyramids: Khufu, Khafre and Menkaure.",
    "Visit the panoramic area and the Great Sphinx.",
    "Enjoy lunch at a local restaurant.",
    "Visit the Egyptian Museum in Tahrir, the Grand Egyptian Museum, or the National Museum of Egyptian Civilization depending on the selected package.",
    "Transfer to the hotel and check in for the overnight stay.",
    "Free time to relax at the hotel.",
    "Optional evening activity: Nile cruise dinner with folkloric entertainment or a visit to Al-Muizz Street and Khan El Khalili.",
    "Day 2: Breakfast at the hotel and check out.",
    "Visit Salah El Din Citadel and the Mosque of Muhammad Ali.",
    "Explore Khan El Khalili and the old markets.",
    "Enjoy lunch at a local restaurant.",
    "Start the return journey to Hurghada.",
    "Hotel drop-off upon arrival.",
  ],

  highlights: [
    "Giza Pyramids",
    "Khufu, Khafre & Menkaure",
    "Great Sphinx",
    "Egyptian Museum",
    "Salah El Din Citadel",
    "Muhammad Ali Mosque",
    "Khan El Khalili",
    "Cairo Overnight Stay",
    "Nile Cruise Option",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Air-Conditioned Vehicle",
    "Transportation To Cairo",
    "One Night Hotel Accommodation",
    "Hotel Breakfast",
    "Archaeological Site Entrance Tickets",
    "Professional Tour Guide",
    "Day 1 Lunch",
    "Day 2 Lunch",
    "Cairo Sightseeing",
  ],

  excluded: [
    "Entrance Inside the Pyramids",
    "Special Tomb Entrance Tickets",
    "Optional Nile Cruise Dinner",
    "Optional Sound & Light Show",
    "Drinks During Meals",
    "Personal Expenses",
    "Shopping & Souvenirs",
    "Tips",
  ],

  notes: [
    "The tour includes two days and one night in Cairo, allowing guests to explore the city more comfortably without the rush of a one-day trip.",
    "Departure on Day 1 is usually between 1:30 and 2:30 AM.",
    "Return to Hurghada on Day 2 is usually between 10:00 and 11:00 PM.",
    "Available as a Private Tour or Group Tour.",
    "The exact hotel, museum and sightseeing schedule depends on the selected package.",
    "Optional evening activities such as the Nile cruise dinner or Sound & Light Show are not included.",
    "Guests are recommended to request a Breakfast Box from their hotel before departure.",
    "Wear comfortable clothes and closed shoes suitable for walking.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Excursion",

  available: true,

  type: "Cairo Excursion",

}),

  "luxor-over-night": baseTour("luxor-over-night", {

  name: "Luxor Overnight Tour",

  destination: "hurghada",

  image: "/tours/luxor-over-night-hero.webp",

  description:
    "Discover the ancient treasures of Luxor over two days with an overnight stay, exploring the East and West Banks at a relaxed pace.",

  overview:
    "Enjoy a two-day journey from Hurghada to Luxor with one night in a hotel, visiting Karnak Temple, Luxor Temple, the Valley of the Kings, Hatshepsut Temple and the Colossi of Memnon.",

  duration: "2 Days / 1 Night",

  pickup: "Early morning hotel pickup",

  schedule: "Selected dates, approximately 4:30–5:30 AM",

  program: [
    "Day 1: Early morning pickup from the hotel in Hurghada.",
    "Travel to Luxor.",
    "Visit Karnak Temple and explore the Great Hypostyle Hall and ancient obelisks.",
    "Enjoy lunch at a local restaurant.",
    "Visit Luxor Temple in the heart of the city.",
    "Transfer to the hotel, check in and relax.",
    "Optional evening activity: attend the Sound & Light Show at Karnak Temple or enjoy free time in the old Luxor markets.",
    "Day 2: Optional sunrise hot air balloon ride.",
    "Enjoy breakfast at the hotel and check out.",
    "Cross the Nile to the West Bank.",
    "Visit the Valley of the Kings and explore the ancient royal tombs.",
    "Visit the Temple of Hatshepsut at Deir el-Bahari.",
    "Stop at the famous Colossi of Memnon for photos.",
    "Enjoy lunch at a local restaurant.",
    "Start the return journey to Hurghada.",
    "Hotel drop-off upon arrival.",
  ],

  highlights: [
    "Karnak Temple",
    "Luxor Temple",
    "Valley of the Kings",
    "Hatshepsut Temple",
    "Colossi of Memnon",
    "East & West Banks",
    "Luxor Overnight Stay",
    "Ancient Egyptian History",
    "Optional Hot Air Balloon",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Air-Conditioned Vehicle",
    "Transportation To Luxor",
    "One Night Hotel Accommodation",
    "Hotel Breakfast",
    "Archaeological Site Entrance Tickets",
    "Professional Egyptologist Guide",
    "Day 1 Lunch",
    "Day 2 Lunch",
    "Karnak Temple Visit",
    "Luxor Temple Visit",
    "Valley of the Kings Visit",
    "Hatshepsut Temple Visit",
    "Colossi of Memnon Visit",
  ],

  excluded: [
    "Hot Air Balloon Ride",
    "Tutankhamun Tomb Entrance",
    "Nefertari Tomb Entrance",
    "Other Special Tomb Entrance Tickets",
    "Karnak Sound & Light Show",
    "Optional Nile Felucca Ride",
    "Drinks During Meals",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "The tour includes two days and one overnight stay in Luxor, allowing guests to explore both the East and West Banks without the pressure of a one-day trip.",
    "Departure on Day 1 is usually between 4:30 and 5:30 AM.",
    "Return to Hurghada on Day 2 is usually between 7:30 and 8:30 PM.",
    "Available as a Private Tour or Group Tour.",
    "The hot air balloon ride at sunrise is optional and requires a separate booking.",
    "Optional evening activities such as the Sound & Light Show or Nile Felucca ride are not included.",
    "Special tomb entrances such as Tutankhamun or Nefertari require an additional ticket.",
    "Guests are recommended to request a Breakfast Box from their hotel before departure.",
    "Wear comfortable walking shoes and bring a hat and sunscreen.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Excursion",

  available: true,

  type: "Luxor Excursion",

}),

  "hot-air-balloon": baseTour("hot-air-balloon", {

  name: "Hot Air Balloon Ride",

  destination: "luxor",

  image: "/tours/hot-air-balloon-hero.webp",

  description:
    "Enjoy an unforgettable sunrise hot air balloon ride over Luxor and admire the ancient monuments, Nile Valley and surrounding landscape from above.",

  overview:
    "Experience Luxor from the sky on a magical sunrise hot air balloon flight, with panoramic views of the Valley of the Kings, Hatshepsut Temple, Colossi of Memnon and the Nile Valley.",

  duration: "2–3 Hours",

  pickup: "Early morning hotel or Nile cruise pickup",

  schedule: "Daily, weather permitting, approximately 4:00–5:00 AM",

  program: [
    "Early morning pickup from the hotel or Nile cruise in Luxor.",
    "Cross the Nile by local ferry to the West Bank if required.",
    "Arrive at the launch site.",
    "Enjoy tea or coffee while the balloon is prepared and inflated.",
    "Receive a safety briefing from the captain and professional crew.",
    "Board the hot air balloon basket.",
    "Take off around sunrise.",
    "Fly over Luxor and enjoy panoramic aerial views of the ancient monuments and Nile Valley.",
    "See the Valley of the Kings, Hatshepsut Temple, Colossi of Memnon and the green banks of the Nile from above.",
    "Enjoy a safe landing.",
    "Receive a commemorative flight certificate.",
    "Return to the hotel or continue with the day's sightseeing program.",
  ],

  highlights: [
    "Sunrise Hot Air Balloon",
    "Aerial Views of Luxor",
    "Valley of the Kings",
    "Hatshepsut Temple",
    "Colossi of Memnon",
    "Nile Valley Views",
    "Professional Licensed Pilot",
    "Flight Certificate",
  ],

  included: [
    "Hotel or Nile Cruise Transfer in Luxor",
    "Hot Air Balloon Flight",
    "Professional Licensed Pilot",
    "Professional Crew",
    "Safety Briefing",
    "Tea & Coffee Before the Flight",
    "Commemorative Flight Certificate",
  ],

  excluded: [
    "Transportation To and From Hurghada",
    "Professional Photos & Videos",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "The actual flight duration is approximately 45–60 minutes.",
    "The total experience takes approximately 2–3 hours including preparation and transfers.",
    "Departure is usually between 4:00 and 5:00 AM depending on the season and sunrise time.",
    "The experience is available as a standalone activity in Luxor or can be added to a Luxor Overnight Tour.",
    "Transportation from Hurghada is not included unless it is part of a selected Luxor Overnight package.",
    "The flight is completely weather dependent and may be delayed or cancelled due to wind or unsuitable weather conditions.",
    "Guests should wear comfortable clothes and bring a light jacket as early morning temperatures can be cool.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Experience",

  available: true,

  type: "Hot Air Balloon",

}),

  /* =======================================================
     FAMILY & ATTRACTIONS
     ======================================================= */

  "aqua-park": baseTour("aqua-park", {

  name: "Aqua Park",

  destination: "hurghada",

  image: "/tours/aqua-park-hero.webp",

  description:
    "Enjoy an exciting full day at a Hurghada aqua park with thrilling water slides, swimming pools and fun activities for the whole family.",

  overview:
    "Spend a fun-filled day at a Hurghada water park with a variety of water slides, swimming pools and family-friendly attractions suitable for children and adults.",

  duration: "Full Day",

  pickup: "Morning hotel pickup",

  schedule: "Daily, subject to availability",

  program: [
    "Hotel pickup.",
    "Transfer to the aqua park.",
    "Enter the water park and receive the entrance pass.",
    "Enjoy a variety of water slides and attractions.",
    "Relax and swim in the available pools.",
    "Enjoy family-friendly water activities.",
    "Take free time to relax between the attractions.",
    "Continue enjoying the aqua park facilities.",
    "Finish the day and return to the hotel.",
  ],

  highlights: [
    "Water Slides",
    "Swimming Pools",
    "Family Activities",
    "Kids' Water Area",
    "Water Attractions",
    "Full Day Water Fun",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Aqua Park Entry",
    "Water Slides",
    "Swimming Pools",
    "Water Attractions",
    "Life Jacket",
  ],

  excluded: [
    "Personal Expenses",
    "Food & Drinks Unless Specified",
    "Locker Rental If Required",
    "Towels",
    "Tips",
  ],

  notes: [
    "The aqua park is suitable for families, children and adults.",
    "Available attractions, pools and facilities depend on the selected water park.",
    "Food and drinks are only included when specifically stated in the selected package.",
    "Guests are recommended to bring swimwear, a towel, sunscreen and comfortable water shoes.",
    "Some facilities or services may require additional payment.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Family",

  available: true,

  type: "Water Park",

}),

  "aquarium": baseTour("aquarium", {

  name: "Hurghada Grand Aquarium",

  destination: "hurghada",

  image: "/tours/aquarium-hero.webp",

  description:
    "Discover the fascinating underwater world of the Red Sea at Hurghada Grand Aquarium, featuring marine life, a glass underwater tunnel, rainforest exhibits and family attractions.",

  overview:
    "Explore Hurghada Grand Aquarium, known as the Red Sea under one roof, and discover sharks, rays, colorful marine life, a rainforest area, Whale Valley, and a mini zoo in a family-friendly environment.",

  duration: "3.5–4 Hours",

  pickup: "Hotel pickup",

  schedule: "Daily, approximately 9:00 AM–5:00 PM",

  program: [
    "Hotel pickup.",
    "Transfer to Hurghada Grand Aquarium in the Magawish area.",
    "Enter the aquarium and begin the visit.",
    "Walk through the glass underwater tunnel and observe sharks, rays and other marine life.",
    "Explore the Rainforest area and marine museum.",
    "Discover the Whale Valley exhibition featuring ancient whale fossils and skeletons.",
    "Visit the Mini Zoo and see crocodiles, turtles and birds.",
    "Watch scheduled fish-feeding and diver presentations when available.",
    "Enjoy free time for photos and exploration.",
    "Finish the visit and return to the hotel.",
  ],

  highlights: [
    "Hurghada Grand Aquarium",
    "Glass Underwater Tunnel",
    "Sharks & Rays",
    "Red Sea Marine Life",
    "Rainforest",
    "Whale Valley",
    "Mini Zoo",
    "Fish Feeding Shows",
    "Family Experience",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Hurghada Grand Aquarium Entry",
    "Full Aquarium Access",
    "Glass Underwater Tunnel",
    "Rainforest Area",
    "Marine Museum",
    "Whale Valley",
    "Mini Zoo",
  ],

  excluded: [
    "Food & Drinks",
    "Professional Photos & Videos",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "The actual visit usually takes approximately 2–3 hours, while the total experience takes around 3.5–4 hours including transfers.",
    "The aquarium is an excellent family-friendly attraction suitable for children and visitors of all ages.",
    "The attraction is mostly indoors and air-conditioned, making it a comfortable option during hot weather and afternoon hours.",
    "Fish-feeding and diver presentations take place at scheduled times and are subject to the aquarium's daily program.",
    "Personal photography is allowed, but flash photography should be avoided to help protect the marine animals.",
    "Opening hours and presentation schedules may change according to the venue's operating schedule.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Family",

  available: true,

  type: "Attraction",

}),

  "sand-city": baseTour("sand-city", {

  name: "Sand City Hurghada",

  destination: "hurghada",

  image: "/tours/sand-city-hero.webp",

  description:
    "Explore the fascinating world of sand art at Sand City Hurghada, featuring impressive sculptures inspired by ancient civilizations, mythology, history, movies and famous cartoon characters.",

  overview:
    "Discover Sand City Hurghada, a unique open-air museum featuring detailed giant sand sculptures across themed areas, offering a fun and memorable experience for families, children and photography lovers.",

  duration: "2.5–3 Hours",

  pickup: "Hotel pickup",

  schedule: "Daily, approximately 9:00 AM until sunset",

  program: [
    "Hotel pickup.",
    "Transfer to Sand City Hurghada in the Magawish area.",
    "Enter the open-air sand sculpture museum.",
    "Explore the Mythology section featuring sculptures inspired by Pharaohs, Greek mythology and famous historical figures.",
    "Discover the Disney and Cartoon section featuring popular superheroes, movie characters and beloved cartoon figures.",
    "Walk through the exhibition areas and admire the detailed sand sculptures.",
    "Enjoy free time for photography and memorable pictures.",
    "Visit the children's entertainment area and available sand art activities.",
    "Finish the visit and return to the hotel.",
  ],

  highlights: [
    "Sand City Hurghada",
    "Giant Sand Sculptures",
    "Ancient Egyptian Art",
    "Greek Mythology",
    "Historical Figures",
    "Superheroes",
    "Disney & Cartoon Characters",
    "Open-Air Museum",
    "Family Experience",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Sand City Entry",
    "Full Museum Access",
    "Sand Sculpture Exhibition",
    "Mythology Section",
    "Disney & Cartoon Section",
  ],

  excluded: [
    "Children's Sand Workshops",
    "Sand Painting Activities",
    "Food & Drinks",
    "Professional Photography Services",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "The actual visit usually takes approximately 1–2 hours, while the total experience takes around 2.5–3 hours including transfers.",
    "Sand City is an open-air attraction suitable for families, children and photography enthusiasts.",
    "The museum features themed sculptures inspired by Egyptian history, mythology, famous historical figures, movies and cartoon characters.",
    "Children's sand sculpting and painting activities may be available for an additional fee.",
    "The attraction is open during the daytime, with afternoon visits recommended for a more comfortable experience.",
    "Guests are recommended to bring sunglasses, a hat, sunscreen and drinking water.",
    "Opening hours and available activities may vary according to the venue's operating schedule.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Family",

  available: true,

  type: "Attraction",

}),

  "mini-egypt-park": baseTour("mini-egypt-park", {

  name: "Mini Egypt Park",

  destination: "hurghada",

  image: "/tours/mini-egypt-park-hero.webp",

  description:
    "Discover Egypt's most famous landmarks in miniature at Mini Egypt Park, featuring more than 55 detailed models in a fun and educational outdoor attraction.",

  overview:
    "Explore miniature versions of Egypt's iconic landmarks from Cairo, Giza, Luxor, Aswan and Alexandria, all brought together in one family-friendly park in Makadi Bay.",

  duration: "2.5–3 Hours",

  pickup: "Hotel pickup",

  schedule: "Daily, approximately 10:00 AM–7:00 PM",

  program: [
    "Hotel pickup.",
    "Transfer to Mini Egypt Park in Makadi Bay.",
    "Meet the guide and begin the tour.",
    "Explore more than 55 detailed miniature models of famous Egyptian landmarks.",
    "Discover Cairo and Giza landmarks, including the Pyramids, Sphinx, Cairo Tower and Egyptian Museum.",
    "Explore Luxor and Aswan landmarks, including Karnak Temple, Hatshepsut Temple, the High Dam and Abu Simbel.",
    "Discover Alexandria landmarks, including the Library of Alexandria, Qaitbay Citadel and Stanley Bridge.",
    "Enjoy free time to explore the park and take memorable photos.",
    "Enjoy optional water pedal boat activities in the artificial lake.",
    "Finish the visit and return to the hotel.",
  ],

  highlights: [
    "Mini Egypt Park",
    "55+ Miniature Landmarks",
    "Pyramids & Sphinx",
    "Cairo Tower",
    "Karnak Temple",
    "Hatshepsut Temple",
    "Abu Simbel",
    "Library of Alexandria",
    "Qaitbay Citadel",
    "Family Experience",
    "Photography",
  ],

  included: [
    "Hotel Transfer",
    "Round-Trip Transportation",
    "Mini Egypt Park Entry",
    "Full Park Access",
    "Professional Guide",
    "Egyptian Landmark Exhibits",
  ],

  excluded: [
    "Water Pedal Boats",
    "Food & Drinks",
    "Professional Photography Services",
    "Personal Expenses",
    "Tips",
  ],

  notes: [
    "The actual visit usually takes approximately 1–2 hours, while the total experience takes around 2.5–3 hours including transfers.",
    "The park features more than 55 miniature models representing famous landmarks from different regions of Egypt.",
    "The attraction is suitable for families, children and visitors interested in Egyptian history and photography.",
    "Water pedal boat activities are optional and may require an additional fee.",
    "The park is an outdoor attraction, so guests are recommended to bring sunglasses, a hat, sunscreen and drinking water.",
    "The best visiting time is generally during the afternoon when temperatures are more comfortable.",
    "Opening hours and available activities may vary according to the park's operating schedule.",
  ],

  price: 0,

  childPrice: 0,

  infantPrice: 0,

  rating: 0,

  reviews: 0,

  badge: "Family",

  available: true,

  type: "Attraction",

}),

    "hurghada-museum": baseTour("hurghada-museum", {
  name: "Hurghada Museum",
  destination: "hurghada",
  image: "/tours/hurghada-museum-hero.webp",

  gallery: [
    "/tours/hurghada-museum-1.webp",
    "/tours/hurghada-museum-2.webp",
    "/tours/hurghada-museum-3.webp",
    "/tours/hurghada-museum-4.webp",
    "/tours/hurghada-museum-5.webp",
  ],

  description:
    "Discover Egyptian history, art and artifacts at Hurghada Museum.",

  overview:
    "Visit Hurghada Museum and explore Egyptian artifacts from different historical periods in a comfortable, air-conditioned environment.",

  duration: "2.5–3 Hours",

  pickup:
    "Hotel pickup by air-conditioned car or bus",

  schedule:
    "Daily. Morning period: 10:00 AM–2:00 PM. Evening period: 5:00 PM–11:00 PM.",

  program: [
    "Depart from the hotel by air-conditioned car or bus and travel to Hurghada Museum near the airport.",
    "Meet the specialized archaeological guide.",
    "Explore the main museum halls equipped with modern lighting and display systems.",
    "Discover artifacts from the Pharaonic, Roman, Greek, Coptic and Islamic periods.",
    "Learn about the museum's main concept: beauty, sport and entertainment throughout ancient Egyptian history.",
    "Visit the mummy, sarcophagus, gold and ancient jewelry sections.",
    "Enjoy free time in the commercial area with bazaars and cafés.",
    "Finish the visit and return to the hotel.",
  ],

  highlights: [
    "Egyptian antiquities",
    "Pharaonic artifacts",
    "Roman and Greek collections",
    "Coptic and Islamic heritage",
    "Mummies and sarcophagi",
    "Ancient gold and jewelry",
    "Air-conditioned museum",
    "Professional archaeological guide",
  ],

  included: [
    "Full museum admission tickets",
    "Access to archaeological halls",
    "Round-trip hotel transfer",
    "Specialized archaeological guide",
    "Professional explanation",
  ],

  excluded: [
    "Personal purchases from the museum bazaars",
    "Food and drinks at cafés",
    "Tips",
  ],

  notes: [
    "Hurghada Museum is one of Egypt's archaeological museums established through cooperation between the private sector and the Ministry of Tourism and Antiquities.",
    "The museum is very suitable for history lovers, families and children.",
    "It is an excellent option during hot weather because the museum is fully air-conditioned.",
    "Actual museum visit time is approximately 1–2 hours, with total excursion time around 2.5–3 hours including transfers.",
  ],

  price: 0,
  childPrice: 0,
  infantPrice: 0,
  rating: 0,
  reviews: 0,
  badge: "Culture",
  available: true,
  type: "Museum",

  seo: {
    title: "Hurghada Museum Tour | Egyptian Antiquities & History",
    description:
      "Visit Hurghada Museum and discover Egyptian artifacts from the Pharaonic, Greek, Roman, Coptic and Islamic periods with hotel transfers and a professional archaeological guide.",
    keywords: [
      "Hurghada Museum",
      "Hurghada Museum tour",
      "Hurghada Museum tickets",
      "Egyptian Museum Hurghada",
      "Hurghada attractions",
      "things to do in Hurghada",
      "Hurghada excursions",
      "Egyptian antiquities Hurghada",
      "Pharaonic museum Hurghada",
      "Hurghada family attractions",
    ],
  },
}),

"spa-massage": baseTour("spa-massage", {
  name: "Hurghada Spa & Massage Package",
  destination: "hurghada",
  image: "/tours/spa-massage-hero.webp",
  description:
    "Enjoy a relaxing spa experience in Hurghada including sauna, steam room, jacuzzi, Turkish or Moroccan bath and a full body massage.",
  overview:
    "Relax and recharge with a complete Hurghada Spa & Massage experience including wellness facilities, traditional bath treatments and a full body massage.",
  duration: "3.5–4 Hours",
  pickup: "Hotel pickup",
  schedule: "Daily from 09:00 AM to 06:00 PM",
  program: [
    "Hotel pickup by air-conditioned vehicle.",
    "Welcome drink at the spa center.",
    "Relax in the sauna.",
    "Enjoy the steam room.",
    "Relax in the jacuzzi.",
    "Turkish / Moroccan bath with exfoliation.",
    "Full body massage for 45–60 minutes.",
    "Relax in the lounge and enjoy a warm drink.",
    "Transfer back to the hotel.",
  ],
  highlights: [
    "Sauna",
    "Steam Room",
    "Jacuzzi",
    "Turkish / Moroccan Bath",
    "Full Body Massage",
    "Hotel Transfers",
  ],
  included: [
    "Round-trip hotel transfer",
    "Sauna",
    "Steam Room",
    "Jacuzzi",
    "Turkish / Moroccan Bath",
    "Body exfoliation",
    "Full Body Massage",
    "Welcome and warm drinks",
  ],
  excluded: [
    "Additional facial treatments",
    "Specialized massage treatments",
    "Tips",
  ],
  notes: [
    "Ideal for relaxing after a boat trip or desert safari.",
    "Separate facilities are available for men and women.",
    "Female sections are served by female specialists.",
    "Bring swimwear and comfortable flip-flops.",
  ],
  price: 40,
  childPrice: 0,
  infantPrice: 0,
  rating: 0,
  reviews: 0,
  badge: "Relaxation",
  available: true,
  type: "Spa & Massage",
}),
} satisfies Record<TourSlug, TourData>;

/* =========================================================
   HELPERS
   ========================================================= */

export const tourList: TourData[] = Object.values(tours);

export const getTourBySlug = (slug: string): TourData | null => {
  return tours[slug as TourSlug] ?? null;
};

export const getToursByCategory = (
  category: TourCategory,
): TourData[] => {
  return tourList.filter((tour) => tour.category === category);
};

export const getToursByDestination = (
  destination: string,
): TourData[] => {
  return tourList.filter(
    (tour) => tour.destination === destination,
  );
};

export const getAvailableTours = (): TourData[] => {
  return tourList.filter((tour) => tour.available);
};