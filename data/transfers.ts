export const transfers = {
  "hurghada-city": {
    name: "Hurghada Airport → Hurghada City",
    slug: "hurghada-city",
    from: "Hurghada International Airport",
    to: "Hurghada City",
    available: true,

    vehicles: [
      {
        type: "Sedan",
        price: 10,
        passengers: 3,
        luggage: 3,
      },
      {
        type: "X-Pander",
        price: 15,
        passengers: 4,
        luggage: 4,
      },
      {
        type: "Van",
        price: 20,
        passengers: 9,
        luggage: 9,
      },
      {
        type: "Luxury",
        price: 100,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 60,
        passengers: 12,
        luggage: 12,
      },
    ],
  },

  "sahl-hasheesh": {
    name: "Hurghada Airport → Sahl Hasheesh",
    slug: "sahl-hasheesh",
    from: "Hurghada International Airport",
    to: "Sahl Hasheesh",
    available: true,

    vehicles: [
      {
        type: "Sedan",
        price: 15,
        passengers: 3,
        luggage: 3,
      },
      {
        type: "X-Pander",
        price: 20,
        passengers: 4,
        luggage: 4,
      },
      {
        type: "Van",
        price: 25,
        passengers: 9,
        luggage: 9,
      },
      {
        type: "Luxury",
        price: 120,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 75,
        passengers: 12,
        luggage: 12,
      },
    ],
  },

  "makadi-bay": {
    name: "Hurghada Airport → Makadi Bay",
    slug: "makadi-bay",
    from: "Hurghada International Airport",
    to: "Makadi Bay",
    available: true,

    vehicles: [
      {
        type: "Sedan",
        price: 20,
        passengers: 3,
        luggage: 3,
      },
      {
        type: "X-Pander",
        price: 20,
        passengers: 4,
        luggage: 4,
      },
      {
        type: "Van",
        price: 25,
        passengers: 9,
        luggage: 9,
      },
      {
        type: "Luxury",
        price: 130,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 85,
        passengers: 12,
        luggage: 12,
      },
    ],
  },

  "el-gouna": {
    name: "Hurghada Airport → El Gouna",
    slug: "el-gouna",
    from: "Hurghada International Airport",
    to: "El Gouna",
    available: true,

    vehicles: [
      {
        type: "Sedan",
        price: 20,
        passengers: 3,
        luggage: 3,
      },
      {
        type: "X-Pander",
        price: 25,
        passengers: 4,
        luggage: 4,
      },
      {
        type: "Van",
        price: 30,
        passengers: 9,
        luggage: 9,
      },
      {
        type: "Luxury",
        price: 140,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 95,
        passengers: 12,
        luggage: 12,
      },
    ],
  },

  "soma-bay": {
    name: "Hurghada Airport → Soma Bay",
    slug: "soma-bay",
    from: "Hurghada International Airport",
    to: "Soma Bay",
    available: true,

    vehicles: [
      {
        type: "Sedan",
        price: 30,
        passengers: 3,
        luggage: 3,
      },
      {
        type: "X-Pander",
        price: 35,
        passengers: 4,
        luggage: 4,
      },
      {
        type: "Van",
        price: 40,
        passengers: 9,
        luggage: 9,
      },
      {
        type: "Luxury",
        price: 160,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 110,
        passengers: 12,
        luggage: 12,
      },
    ],
  },

  safaga: {
    name: "Hurghada Airport → Safaga",
    slug: "safaga",
    from: "Hurghada International Airport",
    to: "Safaga",
    available: true,

    vehicles: [
      {
        type: "Sedan",
        price: 35,
        passengers: 3,
        luggage: 3,
      },
      {
        type: "X-Pander",
        price: 40,
        passengers: 4,
        luggage: 4,
      },
      {
        type: "Van",
        price: 45,
        passengers: 9,
        luggage: 9,
      },
      {
        type: "Luxury",
        price: 180,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 125,
        passengers: 12,
        luggage: 12,
      },
    ],
  },
} as const;