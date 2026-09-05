import Link from "next/link";

const luxuryTours = {
  luxor: {
    name: "Private Luxor Overday Tour",
    description:
      "Discover the wonders of ancient Luxor in complete privacy, with a dedicated private vehicle, professional Egyptologist guide and a carefully planned full-day experience from Hurghada.",
    price: 150,
    duration: "Full Day",
    emoji: "🏛️",
    subtitle: "A Private Journey Through Ancient Egypt",
    departure: "04:30 AM",
    returnTime: "08:30 – 09:30 PM",
    highlights: [
      "Private transportation",
      "Private Egyptologist guide",
      "Hotel pickup & drop-off",
      "Karnak Temple",
      "Valley of the Kings – 3 tombs",
      "Temple of Hatshepsut",
      "Lunch included",
      "Fully private experience",
    ],
    itinerary: [
      {
        title: "Private Early-Morning Departure",
        description:
          "Your private journey begins with pickup from your hotel in Hurghada at 04:30 AM. Relax in your selected private vehicle as you travel comfortably towards Luxor through the Eastern Desert.",
      },
      {
        title: "Karnak Temple",
        description:
          "Explore the magnificent Karnak Temple complex with your private Egyptologist guide. Discover the Great Hypostyle Hall, monumental columns and fascinating stories from ancient Egyptian history.",
      },
      {
        title: "Lunch by the Nile",
        description:
          "Take a relaxing break and enjoy a freshly prepared Egyptian lunch at a carefully selected local restaurant, with the opportunity to enjoy the atmosphere of the Nile.",
      },
      {
        title: "Cross to the West Bank",
        description:
          "Continue your private exploration by crossing the Nile to Luxor's legendary West Bank, home to some of Egypt's most remarkable ancient monuments.",
      },
      {
        title: "Valley of the Kings",
        description:
          "Enter the Valley of the Kings and explore three included royal tombs carved deep into the mountains, while your private guide explains the history and stories behind them.",
      },
      {
        title: "Temple of Hatshepsut",
        description:
          "Visit the spectacular Temple of Hatshepsut at Deir el-Bahari and discover the story of one of ancient Egypt's most remarkable rulers.",
      },
      {
        title: "Colossi of Memnon",
        description:
          "Stop at the iconic Colossi of Memnon for photographs and a closer look at the monumental statues that have watched over the West Bank for thousands of years.",
      },
      {
        title: "Return to Hurghada",
        description:
          "After a full day of discovery, settle back into your private vehicle and enjoy a comfortable journey back to your hotel in Hurghada.",
      },
    ],
    included: [
      "Private round-trip transportation from your hotel",
      "Your selected private vehicle",
      "Professional private Egyptologist guide",
      "Entrance ticket to Karnak Temple",
      "Valley of the Kings – 3 tombs",
      "Entrance ticket to Hatshepsut Temple",
      "Lunch at a local restaurant",
      "Hotel pickup & drop-off",
      "Fully private experience with no shared transportation",
    ],
    excluded: [
      "Tutankhamun, Ramses VI or Nefertari tomb tickets",
      "Nile felucca ride or Banana Island visit",
      "Drinks during lunch",
      "Tips and personal expenses",
    ],
    notes: [
      "Request a breakfast box from your hotel the evening before departure.",
      "Wear comfortable shoes as the tour involves walking.",
      "Bring a hat, sunglasses and sunscreen.",
      "Private experiences can be tailored around your preferences and schedule.",
    ],
  },

  cairo: {
    name: "Cairo Private Tour",

    description:
      "Discover the legendary Pyramids of Giza, the Great Sphinx and the highlights of Cairo on a completely private journey from Hurghada, with the flexibility to choose your preferred museum experience.",

    price: 180,

    duration: "Full Day",

    emoji: "🏺",

    subtitle: "The Wonders of Cairo, Your Way",

    departure: "02:30 AM",

    returnTime: "10:00 – 11:00 PM",

    highlights: [
      "Private transportation",
      "Private Egyptologist guide",
      "Hotel pickup & drop-off",
      "Pyramids of Giza",
      "Great Sphinx",
      "Valley Temple",
      "Museum of your choice",
      "Premium private experience",
      "Flexible itinerary",
      "No shared transportation",
    ],

    itinerary: [
      {
        title: "Private Departure from Hurghada",
        description:
          "Your private Cairo journey begins at 02:30 AM with pickup from your hotel in Hurghada. Travel comfortably in your selected private vehicle or tourist bus with air conditioning throughout the journey.",
      },

      {
        title: "Pyramids of Giza",
        description:
          "Arrive in Giza and explore the legendary Pyramids of Khufu, Khafre and Menkaure with your private Egyptologist guide. Enjoy time at the panoramic viewpoint for unforgettable photographs overlooking the pyramids.",
      },

      {
        title: "The Great Sphinx & Valley Temple",
        description:
          "Continue to the iconic Great Sphinx and the nearby Valley Temple. Discover the history, legends and architectural secrets behind two of the most famous monuments of ancient Egypt.",
      },

      {
        title: "Lunch in Cairo",
        description:
          "Take a relaxing break and enjoy a freshly prepared lunch at a carefully selected local restaurant in Cairo.",
      },

      {
        title: "Choose Your Museum Experience",
        description:
          "Customize your private Cairo experience by choosing whether to visit a museum. Depending on your selected option, you can visit the Egyptian Museum in Tahrir Square, explore the Grand Egyptian Museum, or continue the tour without a museum visit.",
      },

      {
        title: "Shopping & Cairo Highlights",
        description:
          "If time allows, enjoy a short shopping stop for authentic papyrus and perfumes, or explore the atmosphere of Khan el-Khalili according to the selected program and available time.",
      },

      {
        title: "Return to Hurghada",
        description:
          "After an unforgettable private day in Cairo, relax in your comfortable vehicle and begin the journey back to Hurghada, arriving at your hotel approximately between 10:00 and 11:00 PM.",
      },
    ],

    included: [
      "Private round-trip transportation",
      "Professional private Egyptologist guide",
      "Hotel pickup & drop-off",
      "Private experience",
      "Entrance tickets to the included attractions",
      "Pyramids of Giza visit",
      "Great Sphinx & Valley Temple visit",
      "Lunch at a local restaurant",
    ],

    excluded: [
      "Optional museum tickets according to the selected option",
      "Entrance tickets inside the pyramids",
      "Mummy Hall or other optional museum areas",
      "Drinks during lunch",
      "Personal purchases and souvenirs",
      "Tips and personal expenses",
    ],

    notes: [
      "Departure from Hurghada is fixed at 02:30 AM.",
      "Guests can choose whether to include a museum visit in their experience.",
      "The museum option can be selected according to the preferred program.",
      "Breakfast box from your hotel is recommended.",
      "Comfortable walking shoes and suitable clothing are recommended.",
      "Private itinerary adjustments can be requested when possible.",
    ],
  },

  "speed-boat": {
    name: "Private Speed Boat",

    description:
      "Enjoy an exclusive private speed boat experience across the beautiful Red Sea, with a dedicated crew, snorkeling stop, White Island visit and the freedom to choose your preferred additional island destination.",

    price: 200,

    duration: "4 Hours",

    emoji: "🚤",

    subtitle: "Your Private Escape on the Red Sea",

    departure: "08:00 AM – 12:00 PM / 01:00 PM – 05:00 PM",

    returnTime: "12:00 PM / 05:00 PM",

    highlights: [
      "Private speed boat",
      "Professional crew",
      "Hotel pickup & drop-off",
      "White Island visit",
      "Additional island of your choice",
      "Snorkeling stop",
      "Snorkeling equipment",
      "Fresh fruit onboard",
      "Exclusive experience",
      "Flexible timing",
      "Complete privacy",
    ],

    islands: [
      {
        name: "Paradise Island",
        slug: "paradise",
        price: 0,
      },
      {
        name: "El Aden Island",
        slug: "aden",
        price: 0,
      },
      {
        name: "Protected Area",
        slug: "protected-area",
        price: 0,
      },
      {
        name: "Orange Bay",
        slug: "orange-bay",
        price: 0,
      },
      {
        name: "Hula Hula Island",
        slug: "hula-hula",
        price: 0,
      },
      {
        name: "Magaweesh Island",
        slug: "magaweesh",
        price: 0,
      },
      {
        name: "Amwaj Island",
        slug: "amwaj",
        price: 0,
      },
    ],

    timeSlots: [
      {
        label: "Morning",
        time: "08:00 AM – 12:00 PM",
      },
      {
        label: "Afternoon",
        time: "01:00 PM – 05:00 PM",
      },
    ],

    itinerary: [
      {
        title: "Private Hotel Pickup",
        description:
          "Start your experience with private transportation from your hotel to the marina, ready for your exclusive Red Sea adventure.",
      },

      {
        title: "Private Speed Boat Departure",
        description:
          "Board your private speed boat and set out across the crystal-clear waters of the Red Sea with your dedicated professional crew.",
      },

      {
        title: "Snorkeling Stop",
        description:
          "Enjoy a dedicated snorkeling stop at one of the beautiful Red Sea spots and discover the vibrant marine life beneath the crystal-clear waters. Snorkeling equipment is provided.",
      },

      {
        title: "White Island",
        description:
          "Visit the beautiful White Island as a fixed part of your private speed boat experience. Enjoy the unique scenery, crystal-clear waters and time to relax and take unforgettable photographs.",
      },

      {
        title: "Choose Your Additional Island",
        description:
          "After visiting White Island, choose your preferred additional island destination. You can select Paradise Island, El Aden, the Protected Area, Orange Bay, Hula Hula, Magaweesh or Amwaj Island. Each island option has its own additional price.",
      },

      {
        title: "Fresh Fruit Onboard",
        description:
          "Relax during the journey and enjoy fresh seasonal fruit served onboard while taking in the beautiful views of the Red Sea.",
      },

      {
        title: "Return to the Marina",
        description:
          "After your four-hour private experience, return comfortably to the marina before your private transfer back to your hotel.",
      },
    ],

    included: [
      "Private speed boat",
      "Professional crew",
      "Private hotel transportation",
      "Hotel pickup & drop-off",
      "Snorkeling stop",
      "Snorkeling equipment",
      "White Island visit",
      "Selected additional island visit",
      "Fresh fruit onboard",
      "Exclusive private experience",
    ],

    excluded: [
      "Additional island option price",
      "Personal expenses",
      "Optional activities not mentioned",
      "Drinks other than the included fresh fruit",
      "Tips",
    ],

    notes: [
      "The experience is available daily.",
      "Guests can choose between the morning or afternoon departure.",
      "Morning session: 08:00 AM – 12:00 PM.",
      "Afternoon session: 01:00 PM – 05:00 PM.",
      "White Island is included as a fixed part of the experience.",
      "Guests can choose one additional island from the available options.",
      "Each additional island option will have its own price.",
      "Bring swimwear, sunglasses, a hat and sunscreen.",
    ],
  },

  "quad-safari": {
    name: "Quad Bike Safari",

    description:
      "Experience an exciting guided quad bike adventure through the Egyptian desert, riding as part of a dedicated group with a professional guide leading the way throughout the journey.",

    price: 120,

    duration: "2–3 Hours",

    emoji: "🏜️",

    subtitle: "Guided Quad Adventure Through the Desert",

    departure: "Morning / Sunset",

    returnTime: "Morning / Evening",

    highlights: [
      "Guided quad bike adventure",
      "Dedicated group experience",
      "Professional desert guide",
      "Single or Double Quad",
      "Safety equipment",
      "Test drive before departure",
      "20–25 km desert ride",
      "Mountain & desert trails",
      "Photo & rest stop",
      "Morning or sunset departure",
    ],

    itinerary: [
      {
        title: "Arrival & Desert Preparation",
        description:
          "Meet at the main safari station and get ready for your adventure. Put on your Bedouin scarf and protective goggles before receiving the necessary riding equipment and instructions.",
      },

      {
        title: "Safety Briefing & Riding Instructions",
        description:
          "Your professional guide will explain the safety rules and demonstrate how to control the quad bike, including acceleration, braking and proper riding techniques.",
      },

      {
        title: "Test Drive",
        description:
          "Before heading into the desert, each guest will complete a short test drive on a closed track to make sure they are comfortable and confident operating the quad bike.",
      },

      {
        title: "Guided Desert Quad Adventure",
        description:
          "Follow your professional guide as part of your dedicated group and ride through the Egyptian desert across hills, rocky paths and challenging terrain for approximately 20–25 km.",
      },

      {
        title: "Mountain Rest & Photo Stop",
        description:
          "Take a relaxing break at an elevated location between the mountains. Enjoy the spectacular desert scenery, take memorable photographs and have some water before continuing the adventure.",
      },

      {
        title: "Return to the Safari Station",
        description:
          "Ride the quads back to the main safari station with your guide, completing your desert adventure before your onward journey.",
      },
    ],

    included: [
      "Quad bike experience",
      "Single or Double Quad option",
      "Professional desert guide",
      "Safety briefing",
      "Helmet and riding safety equipment",
      "Test drive before the main ride",
      "Guided desert ride",
      "20–25 km desert route",
      "Mountain rest and photo stop",
    ],

    excluded: [
      "Hotel transfers unless specifically requested",
      "Bedouin scarf",
      "Protective dust goggles",
      "Optional photography and video services",
      "Personal expenses",
      "Drinks other than included water",
      "Tips",
    ],

    notes: [
      "The experience is operated as a dedicated group with a professional guide leading the group throughout the ride.",
      "Guests can choose between a Single Quad or Double Quad.",
      "Minimum age for driving a Single Quad is 16 years.",
      "Children from 6 years old can ride as passengers on a Double Quad with an accompanying adult.",
      "Actual quad riding time is approximately 45–60 minutes.",
      "Total experience duration is approximately 2–3 hours including preparation, transfers and rest stops.",
      "Trips are available daily in the morning or around sunset.",
      "Closed shoes are required.",
      "Guests must follow the guide and remain within the group for safety.",
      "Comfortable clothing, sunglasses and sunscreen are recommended.",
      "The experience is subject to weather and operational conditions.",
    ],
  },

  "buggy-safari": {
    name: "Buggy Safari",

    description:
      "Enjoy an exciting guided buggy adventure through the Egyptian desert, riding as part of a dedicated group with a professional guide leading the way throughout the experience.",

    price: 160,

    duration: "2–3 Hours",

    emoji: "🏎️",

    subtitle: "Guided Buggy Adventure Through the Desert",

    departure: "Morning / Sunset",

    returnTime: "Morning / Evening",

    highlights: [
      "Guided buggy adventure",
      "Dedicated group experience",
      "Professional desert guide",
      "Buggy driving experience",
      "Safety briefing",
      "Safety equipment",
      "Test drive",
      "Desert & mountain trails",
      "20–25 km desert ride",
      "Mountain photo & rest stop",
      "Morning or sunset departure",
    ],

    itinerary: [
      {
        title: "Arrival & Desert Preparation",
        description:
          "Meet at the main safari station and prepare for your buggy adventure. Get your riding equipment ready and receive the necessary instructions before departure.",
      },

      {
        title: "Safety Briefing & Driving Instructions",
        description:
          "Your professional guide will explain the safety rules and demonstrate how to operate the buggy correctly, including acceleration, braking and safe driving techniques.",
      },

      {
        title: "Test Drive",
        description:
          "Before heading into the desert, enjoy a short test drive on a controlled track to make sure you are comfortable and confident with the buggy.",
      },

      {
        title: "Guided Desert Buggy Adventure",
        description:
          "Follow your professional guide as part of your dedicated group and ride through the Egyptian desert across hills, rough trails and spectacular mountain landscapes for approximately 20–25 km.",
      },

      {
        title: "Mountain Rest & Photo Stop",
        description:
          "Take a relaxing break at an elevated mountain location, enjoy the surrounding desert scenery, have some water and capture memorable photographs before continuing the adventure.",
      },

      {
        title: "Return to the Safari Station",
        description:
          "Complete your guided buggy ride back at the main safari station, finishing your desert adventure before your onward journey.",
      },
    ],

    included: [
      "Buggy driving experience",
      "Professional desert guide",
      "Dedicated group experience",
      "Safety briefing",
      "Safety equipment",
      "Test drive before the main ride",
      "Guided desert ride",
      "20–25 km desert route",
      "Mountain rest and photo stop",
    ],

    excluded: [
      "Hotel transfers unless specifically requested",
      "Optional photography and video services",
      "Personal expenses",
      "Drinks other than included water",
      "Tips",
    ],

    notes: [
      "The experience is operated as a dedicated group with a professional guide leading the group throughout the ride.",
      "Guests must follow the guide and remain within the group for safety.",
      "Actual driving time is approximately 45–60 minutes.",
      "Total experience duration is approximately 2–3 hours including preparation, transfers and rest stops.",
      "Trips are available daily in the morning or around sunset.",
      "Closed shoes are recommended.",
      "Comfortable outdoor clothing, sunglasses and sunscreen are recommended.",
      "The experience is subject to weather and operational conditions.",
    ],
  },

  alexandria: {
  name: "Alexandria Private Tour",
  description:
    "Discover the historic Mediterranean city of Alexandria on a completely private full-day journey from Hurghada, exploring ancient Roman and Greek heritage, museums, royal gardens and the city's iconic Mediterranean landmarks with your private guide.",
  price: 120,
  duration: "Full Day",
  emoji: "🏛️",
  subtitle: "A Private Journey Through Alexandria",
  departure: "02:00 – 03:00 AM",
  returnTime: "10:30 – 11:30 PM",

  highlights: [
    "Private round-trip transportation",
    "Modern air-conditioned vehicle",
    "Private professional tour guide",
    "Pompey's Pillar",
    "Catacombs of Kom El Shoqafa",
    "Alexandria National Museum",
    "Bibliotheca Alexandrina",
    "Stanley Bridge",
    "Montaza Palace & Gardens",
    "Lunch included",
    "Fully private experience",
  ],

  itinerary: [
    {
      title: "Private Early-Morning Departure",
      description:
        "Your private Alexandria journey begins with pickup from your hotel in Hurghada between 02:00 and 03:00 AM. Travel comfortably in a modern air-conditioned private vehicle towards Alexandria.",
    },
    {
      title: "Pompey's Pillar",
      description:
        "Visit Pompey's Pillar and admire one of Alexandria's most important Roman monuments.",
    },
    {
      title: "Catacombs of Kom El Shoqafa",
      description:
        "Explore the underground tunnels, chambers and fascinating Roman and Greek funerary architecture.",
    },
    {
      title: "Alexandria National Museum",
      description:
        "Visit the Alexandria National Museum and discover its remarkable collection representing Pharaonic, Greek, Coptic and Islamic history.",
    },
    {
      title: "Bibliotheca Alexandrina",
      description:
        "Continue to the Bibliotheca Alexandrina, one of Alexandria's most important cultural landmarks overlooking the Mediterranean Sea.",
    },
    {
      title: "Lunch at a Local Restaurant",
      description:
        "Enjoy lunch at a carefully selected local restaurant in Alexandria.",
    },
    {
      title: "Stanley Bridge",
      description:
        "Visit the famous Stanley Bridge and enjoy time for photographs overlooking the Mediterranean coastline.",
    },
    {
      title: "Montaza Palace & Gardens",
      description:
        "Explore Montaza Palace and Gardens, enjoying the landscaped gardens, Mediterranean views and royal architecture.",
    },
    {
      title: "Return to Hurghada",
      description:
        "After a full day of private exploration, return comfortably to your hotel in Hurghada.",
    },
  ],

  included: [
    "Private round-trip transportation from your hotel",
    "Modern air-conditioned private vehicle",
    "Professional private tour guide",
    "Guide available in multiple languages",
    "Entrance tickets to all listed attractions and museums",
    "Lunch during the tour",
    "Hotel pickup & drop-off",
    "All taxes and tour fees",
    "Fully private experience",
  ],

  excluded: [
    "Additional drinks during lunch",
    "Special food requests or extra meals",
    "Personal purchases",
    "Additional activities not mentioned in the program",
    "Tips and personal expenses",
  ],

  notes: [
    "Fully private tour designed for maximum comfort and privacy.",
    "Free cancellation up to 24 hours before departure.",
    "A breakfast box from your hotel is recommended.",
    "Comfortable clothing and walking shoes are recommended.",
    "Bring sunglasses, a hat and sunscreen.",
    "The total journey takes approximately 16–18 hours.",
  ],
},

  aswan: {
    name: "Aswan Private Tour",
    description:
      "Discover the beauty and history of Aswan with a premium private tour from Hurghada, designed for guests who appreciate comfort, privacy and personalized service.",
    price: 250,
    duration: "Full Day",
    emoji: "🌅",
    subtitle: "A Private Journey to Southern Egypt",
    departure: "Early Morning",
    returnTime: "Evening",
    highlights: [
      "Private transportation",
      "Private experience",
      "Professional Egyptologist guide",
      "Hotel pickup & drop-off",
      "Aswan highlights",
      "Flexible itinerary",
    ],
    itinerary: [
      {
        title: "Private Departure",
        description:
          "Depart from your hotel in Hurghada in your selected private vehicle and travel comfortably towards Aswan.",
      },
      {
        title: "Discover Aswan",
        description:
          "Explore the city's most important landmarks and discover the unique beauty and history of southern Egypt with your private guide.",
      },
      {
        title: "Private Exploration",
        description:
          "Enjoy a flexible private itinerary designed around the highlights you want to experience during your visit.",
      },
      {
        title: "Return to Hurghada",
        description:
          "After your private day in Aswan, relax during the return journey to your hotel.",
      },
    ],
    included: [
      "Private round-trip transportation",
      "Professional private guide",
      "Hotel pickup & drop-off",
      "Private experience",
      "Included entrance tickets according to the final itinerary",
    ],
    excluded: [
      "Optional entrance tickets",
      "Drinks",
      "Tips and personal expenses",
    ],
    notes: [
      "An early departure is recommended.",
      "Comfortable walking shoes are recommended.",
      "The itinerary can be customized upon request.",
    ],
  },

  "private-boat": {
    name: "Private Boat Charter",

    description:
      "Enjoy an exclusive 8-hour private boat charter on the Red Sea, created for families, couples and groups who want complete privacy, flexible timing and the freedom to enjoy their perfect day at sea.",

    price: 180,

    duration: "8 Hours",

    emoji: "🛥️",

    subtitle: "Your Own Private Day at Sea",

    departure: "Flexible — Usually 08:30 or 09:00 AM",

    returnTime: "Approximately 04:30 or 05:00 PM",

    highlights: [
      "Private boat charter",
      "8 hours at sea",
      "Private transportation",
      "Professional captain & crew",
      "Private snorkeling guide",
      "Multiple snorkeling stops",
      "Fresh lunch onboard",
      "Seafood or BBQ lunch",
      "Drinks throughout the day",
      "Complete privacy",
      "Flexible itinerary",
      "Optional Giftun Islands",
      "Fishing & free swimming",
    ],

    itinerary: [
      {
        title: "Private Hotel Pickup",
        description:
          "Your private experience begins with a comfortable air-conditioned transfer from your hotel in Hurghada directly to Hurghada Marina.",
      },

      {
        title: "Welcome Aboard Your Private Boat",
        description:
          "Board your private boat and meet your dedicated captain and professional crew before setting out across the Red Sea.",
      },

      {
        title: "Cruise Across the Red Sea",
        description:
          "Enjoy a relaxing private cruise across the crystal-clear waters of the Red Sea. Your route can be adjusted according to your group's preferences and the conditions of the day.",
      },

      {
        title: "Multiple Snorkeling Stops",
        description:
          "Stop at some of the Red Sea's most beautiful coral reef locations for swimming and snorkeling. Enjoy multiple snorkeling stops and discover colorful fish and vibrant marine life with your private snorkeling guide.",
      },

      {
        title: "Optional Giftun Islands",
        description:
          "If you wish, add a visit to one of the beautiful Giftun Islands, such as Orange Bay, Paradise, El Aden, Magaweesh or Hula Hula. Island entry is optional and available at an additional cost depending on the selected island.",
      },

      {
        title: "Fresh Private Lunch Onboard",
        description:
          "Enjoy a freshly prepared private lunch served onboard your boat. Choose between a seafood or BBQ-style meal prepared especially for your group, accompanied by drinks throughout the day.",
      },

      {
        title: "Relax, Swim & Enjoy Complete Privacy",
        description:
          "Spend time relaxing on board, enjoying free swimming or trying your hand at fishing. With the entire boat reserved for your group, you can control the pace of your day and enjoy complete privacy at sea.",
      },

      {
        title: "Return to the Marina",
        description:
          "After approximately eight hours at sea, return to Hurghada Marina. Your private vehicle will then take you comfortably back to your hotel.",
      },
    ],

    included: [
      "Private round-trip hotel transportation",
      "Private air-conditioned transfer",
      "Private boat charter for 8 hours",
      "Professional captain and crew",
      "Private snorkeling guide",
      "Complete snorkeling equipment",
      "Masks",
      "Fins",
      "Life jackets",
      "Multiple snorkeling stops",
      "Fresh lunch prepared onboard",
      "Seafood or BBQ lunch",
      "Water and soft drinks throughout the day",
      "Fresh juices",
      "Private experience",
    ],

    excluded: [
      "Giftun Island entry fees",
      "Orange Bay entry fee",
      "Paradise Island entry fee",
      "El Aden Island entry fee",
      "Magaweesh Island entry fee",
      "Hula Hula Island entry fee",
      "Optional water sports activities",
      "Parasailing and water games",
      "Professional photography and video services",
      "Tips for the boat crew",
      "Personal expenses",
    ],

    notes: [
      "This is a fully private 8-hour boat charter.",
      "The experience is ideal for families, couples and groups looking for complete privacy.",
      "Departure time is flexible and is usually arranged around 08:30 or 09:00 AM.",
      "Return is approximately 04:30 or 05:00 PM depending on the selected departure time.",
      "The itinerary can be customized according to your group's preferences and sea conditions.",
      "Guests can choose how long they would like to spend snorkeling, swimming or relaxing at sea.",
      "Giftun Island visits are optional and available at an additional cost depending on the selected island.",
      "Bring swimwear, personal towels, sunglasses and sunscreen.",
      "The experience is subject to weather and sea conditions.",
    ],
  },
};

type LuxuryTourSlug = keyof typeof luxuryTours;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function CrownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="m3 7 4.5 4L12 4l4.5 7L21 7l-2 12H5L3 7Z" />
      <path d="M5 16h14" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default async function LuxuryTourPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const tour = luxuryTours[slug as LuxuryTourSlug];

  if (!tour) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-950 text-orange-400">
            <CrownIcon />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
            Private Collection
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-blue-950">
            Tour Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-gray-600">
            Sorry, this luxury experience is not available.
          </p>

          <Link
            href="/luxury-tours"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-900"
          >
            Back to Luxury Tours
            <ArrowRightIcon />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-blue-950 px-6 py-20 text-white md:px-8 md:py-28">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />

        <div className="absolute -bottom-48 -right-32 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-orange-400" />

              <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400">
                Private Collection
              </p>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              {tour.name}
            </h1>

            <p className="mt-4 text-lg font-medium text-orange-300 md:text-xl">
              {tour.subtitle}
            </p>

            <p className="mt-6 max-w-3xl text-base leading-8 text-blue-100 md:text-lg">
              {tour.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold backdrop-blur-sm">
                <span className="text-orange-400">
                  <CrownIcon />
                </span>
                Private Experience
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold backdrop-blur-sm">
                <span className="text-orange-400">
                  <ClockIcon />
                </span>
                {tour.duration}
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold backdrop-blur-sm">
                <span className="text-orange-400">
                  <CheckIcon />
                </span>
                Premium Service
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* EXPERIENCE OVERVIEW */}
            <section className="rounded-[28px] border border-gray-200/80 bg-white p-7 shadow-sm md:p-9">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-950 text-orange-400">
                  <CrownIcon />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                    The Experience
                  </p>

                  <h2 className="mt-1 text-3xl font-semibold tracking-tight text-blue-950">
                    A Private Journey, Designed Around You
                  </h2>
                </div>
              </div>

              <p className="mt-6 text-base leading-8 text-gray-600">
                Enjoy a premium private experience created for guests who
                value comfort, privacy and personal attention. From the moment
                you leave your hotel until your return, your journey is
                designed to feel effortless, exclusive and flexible.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#fafaf8] px-4 py-3.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                      <CheckIcon />
                    </span>

                    <span className="text-sm font-semibold text-blue-950">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ITINERARY */}
            <section className="rounded-[28px] border border-gray-200/80 bg-white p-7 shadow-sm md:p-9">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                  Your Journey
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-blue-950">
                  Private Itinerary
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
                  A carefully planned experience with the flexibility and
                  privacy of a dedicated private tour.
                </p>
              </div>

              <div className="mt-8">
                {tour.itinerary.map((item, index) => (
                  <div
                    key={item.title}
                    className="relative flex gap-5 pb-8 last:pb-0"
                  >
                    {index !== tour.itinerary.length - 1 && (
                      <span className="absolute left-[19px] top-10 h-[calc(100%-18px)] w-px bg-gray-200" />
                    )}

                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-orange-400 shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="pt-0.5">
                      <h3 className="text-lg font-bold text-blue-950">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INCLUDED / EXCLUDED */}
            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[28px] border border-gray-200/80 bg-white p-7 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                  Included
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-blue-950">
                  Everything Prepared For You
                </h2>

                <div className="mt-6 space-y-3">
                  {tour.included.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                        <CheckIcon />
                      </span>

                      <span className="text-sm leading-6 text-gray-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-gray-200/80 bg-white p-7 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                  Not Included
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-blue-950">
                  Optional Extras
                </h2>

                <div className="mt-6 space-y-3">
                  {tour.excluded.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <span className="text-sm font-bold">–</span>
                      </span>

                      <span className="text-sm leading-6 text-gray-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* NOTES */}
            <section className="rounded-[28px] border border-orange-100 bg-orange-50/60 p-7 md:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                Good To Know
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-blue-950">
                Before Your Experience
              </h2>

              <div className="mt-5 space-y-3">
                {tour.notes.map((note) => (
                  <div
                    key={note}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />

                    <p className="text-sm leading-7 text-gray-700">
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside>
            <div className="sticky top-28 overflow-hidden rounded-[28px] border border-gray-200/80 bg-white shadow-xl">
              <div className="bg-blue-950 p-7 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                  Private Collection
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Reserve Your Experience
                </h2>

                <p className="mt-2 text-sm leading-6 text-blue-200">
                  Premium service, private transportation and a journey
                  designed around you.
                </p>
              </div>

              <div className="p-7">
                {/* PRICE */}
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Starting From
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight text-orange-500">
                    €{tour.price}
                  </span>

                  <span className="pb-1 text-xs text-gray-400">
                    / private experience
                  </span>
                </div>

                <div className="my-6 h-px bg-gray-100" />

                {/* DETAILS */}
                <div className="space-y-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Duration
                        </p>

                        <p className="mt-1 text-sm font-bold text-blue-950">
                          {tour.duration}
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-950 shadow-sm">
                        <ClockIcon />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Departure
                    </p>

                    <p className="mt-1 text-sm font-bold text-blue-950">
                      {tour.departure}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Return
                    </p>

                    <p className="mt-1 text-sm font-bold text-blue-950">
                      {tour.returnTime}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                      Experience Type
                    </p>

                    <p className="mt-1 text-sm font-bold text-orange-700">
                      Fully Private
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/luxury-tours/${slug}/book`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl"
                >
                  Reserve Your Experience
                  <ArrowRightIcon />
                </Link>

                <Link
                  href="/luxury-tours"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-blue-950 py-3.5 text-sm font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
                >
                  Back to Luxury Tours
                </Link>

                <div className="mt-6 border-t border-gray-100 pt-5 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-500">
                    <span className="text-orange-500">
                      <ShieldIcon />
                    </span>
                    Premium private service
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8 md:pb-24">
        <div className="relative overflow-hidden rounded-[30px] bg-blue-950 px-6 py-12 text-center text-white shadow-xl md:px-12 md:py-16">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-700/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400">
              <CrownIcon />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
              Your Private Experience
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Travel Privately.
              <span className="block text-orange-400">
                Experience More.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100 md:text-base">
              Looking for something more personalized? Our private experiences
              can be arranged around your preferences and schedule.
            </p>

            <div className="mt-7">
              <Link
                href={`/luxury-tours/${slug}/book`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Reserve This Experience
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M12 3 20 6v5c0 5-3.3 8.2-8 10-4.7-1.8-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.3 2.3 4.7-4.7" />
    </svg>
  );
}