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
        price: 13,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "X-Pander",
        price: 17,
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
        price: 95,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 35,
        passengers: 15,
        luggage: 15,
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
        price: 16,
        passengers: 2,
        luggage: 2,
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
        price: 110,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 45,
        passengers: 15,
        luggage: 15,
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
        price: 18,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "X-Pander",
        price: 22,
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
        price: 120,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 50,
        passengers: 15,
        luggage: 15,
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
        passengers: 2,
        luggage: 2,
      },
      {
        type: "X-Pander",
        price: 25,
        passengers: 4,
        luggage: 4,
      },
      {
        type: "Van",
        price: 35,
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
        price: 60,
        passengers: 15,
        luggage: 15,
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
        passengers: 2,
        luggage: 2,
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
        price: 150,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 70,
        passengers: 15,
        luggage: 15,
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
        price: 33,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "X-Pander",
        price: 37,
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
        price: 160,
        passengers: 2,
        luggage: 2,
      },
      {
        type: "Coster",
        price: 75,
        passengers: 15,
        luggage: 15,
      },
    ],
  },
} as const;