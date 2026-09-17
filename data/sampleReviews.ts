export type SampleReview = {
  id: string;
  guest_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

type ReviewTheme = {
  experiences: string[];
  details: string[];
  highlights: string[];
};

function getReviewTheme(tourSlug: string): ReviewTheme {
  const value = tourSlug.toLowerCase();

  if (
    value.includes("cairo") ||
    value.includes("luxor") ||
    value.includes("aswan") ||
    value.includes("museum") ||
    value.includes("egypt")
  ) {
    return {
      experiences: [
        "The tour was very well organized from the first pickup until we returned",
        "The day was packed with interesting places but still felt comfortable",
        "The guide made the historical parts easy to understand and enjoyable",
        "Everything was clearly arranged and the transportation was smooth",
        "We got to see a lot in one day without feeling completely rushed",
        "The combination of sightseeing and good organization made the trip easy",
      ],
      details: [
        "Our guide was knowledgeable and explained the history in a simple way",
        "The driver was professional and the vehicle was comfortable for the long journey",
        "The timing between the different stops was handled very well",
        "The guide answered our questions and gave us plenty of time to look around",
        "Pickup was on time and everything was clearly explained during the day",
        "The long drive was much easier because everything was organized properly",
      ],
      highlights: [
        "The historical sites were definitely the highlight of the trip",
        "The guide made the monuments feel much more interesting than expected",
        "Having everything organized in one day saved us a lot of planning",
        "The sightseeing stops were well chosen and the schedule worked well",
        "The experience gave us a great impression of Egypt beyond Hurghada",
        "It was a great way to explore more of Egypt while staying in Hurghada",
      ],
    };
  }

  if (
    value.includes("desert") ||
    value.includes("safari") ||
    value.includes("quad") ||
    value.includes("buggy") ||
    value.includes("bedouin") ||
    value.includes("jeep")
  ) {
    return {
      experiences: [
        "The desert experience was exciting from the first moment",
        "This was easily one of the most fun activities of our holiday",
        "The whole safari felt adventurous but still well organized",
        "We had a fantastic time exploring the desert away from the city",
        "The experience had a great mix of adventure and relaxation",
        "The desert scenery made this trip very different from the usual sea activities",
      ],
      details: [
        "The team explained the safety instructions clearly before we started",
        "The quad bikes were easy to handle and the guides stayed nearby",
        "The staff were friendly and made sure everyone was comfortable",
        "The timing was good and there was enough time for the different activities",
        "The guide was patient and helpful even when some of us were beginners",
        "Everything felt organized without taking away from the adventure",
      ],
      highlights: [
        "The desert views were incredible, especially around sunset",
        "The quad biking was the most memorable part of the day",
        "The Bedouin stop added a nice cultural side to the experience",
        "The sunset views made the whole trip feel special",
        "The desert landscape looked completely different from the Red Sea",
        "It was a great change of pace from spending every day by the sea",
      ],
    };
  }

  if (
    value.includes("dolphin") ||
    value.includes("dolphins")
  ) {
    return {
      experiences: [
        "We had a wonderful day on the Red Sea and really enjoyed the atmosphere",
        "The trip was relaxed, fun and very well organized",
        "This was one of the nicest boat days we had in Hurghada",
        "The whole experience felt enjoyable from pickup until we returned",
        "We loved the combination of sea time, snorkeling and the dolphin experience",
        "The crew created a very friendly atmosphere throughout the trip",
      ],
      details: [
        "The crew was helpful and explained the schedule clearly",
        "There was enough time to enjoy the water without feeling rushed",
        "The boat was comfortable and the staff were attentive",
        "The guides were friendly and made the day easy for everyone",
        "Everything was coordinated smoothly between the different stops",
        "The crew kept the group organized while still keeping the atmosphere relaxed",
      ],
      highlights: [
        "The marine-life experience was definitely the highlight",
        "Seeing dolphins in the open sea made the day unforgettable",
        "The snorkeling stop was beautiful and full of colorful fish",
        "The sea conditions were great and the views were amazing",
        "The atmosphere on the boat was one of the best parts of the experience",
        "The combination of dolphins and snorkeling made the day special",
      ],
    };
  }

  if (
    value.includes("snorkel") ||
    value.includes("diving") ||
    value.includes("dive") ||
    value.includes("scuba")
  ) {
    return {
      experiences: [
        "The Red Sea was absolutely beautiful and the whole trip was well organized",
        "We had a great time exploring the water and the marine life",
        "The snorkeling and diving experience was much better than we expected",
        "This was one of the most relaxing days of our holiday",
        "The sea was clear and the underwater scenery was incredible",
        "The whole day felt easy and enjoyable from beginning to end",
      ],
      details: [
        "The team explained everything clearly before we entered the water",
        "The equipment was prepared properly and the staff were very helpful",
        "The instructors were patient and made us feel comfortable",
        "The crew checked on everyone regularly and kept things organized",
        "The snorkeling and diving stops were timed very well",
        "Even the first-time swimmers in our group felt comfortable with the team",
      ],
      highlights: [
        "The coral reefs were the most impressive part of the day",
        "The visibility underwater was excellent",
        "We saw a lot of colorful fish and beautiful reef formations",
        "The underwater scenery was the highlight of the whole trip",
        "The calm water made the experience even more enjoyable",
        "The Red Sea marine life was even more beautiful than we imagined",
      ],
    };
  }

  if (
    value.includes("family") ||
    value.includes("aquarium") ||
    value.includes("kids") ||
    value.includes("children")
  ) {
    return {
      experiences: [
        "It was a very easy and enjoyable experience for the whole family",
        "The activity worked really well for both adults and children",
        "We were looking for something family-friendly and this was a great choice",
        "The whole experience was comfortable and well planned",
        "Everyone in our family enjoyed the day, especially the children",
        "It was fun without being too tiring for the younger members of the group",
      ],
      details: [
        "The staff were patient and helpful with the children",
        "The schedule gave us enough time without making the day feel rushed",
        "Pickup and transportation were smooth and easy",
        "The team was friendly and made the whole experience comfortable",
        "Everything was explained clearly and the organization was excellent",
        "There were enough breaks and the pace was easy for the whole family",
      ],
      highlights: [
        "The children enjoyed the experience from beginning to end",
        "The balance between activities and relaxation was perfect for our family",
        "The kids talked about the trip for the rest of the holiday",
        "The experience gave us great family memories",
        "It was a good choice for families wanting something simple and enjoyable",
        "The relaxed organization made the day much easier with children",
      ],
    };
  }

  if (
    value.includes("boat") ||
    value.includes("island") ||
    value.includes("paradise") ||
    value.includes("mahmya") ||
    value.includes("orange") ||
    value.includes("yacht") ||
    value.includes("cruise") ||
    value.includes("speed")
  ) {
    return {
      experiences: [
        "We had a beautiful day on the Red Sea with excellent organization",
        "The boat trip was one of our favorite parts of the holiday",
        "The sea was stunning and the whole day had a very relaxed atmosphere",
        "We really enjoyed the island and the time spent on the water",
        "The experience was fun, comfortable and very easy from start to finish",
        "This was exactly the kind of relaxing Red Sea day we were looking for",
      ],
      details: [
        "The boat was comfortable and the crew were friendly throughout the trip",
        "The schedule was easy to follow and everything happened on time",
        "The crew were helpful with the snorkeling and made everything simple",
        "The pickup was smooth and the communication before the trip was very good",
        "There was enough free time to enjoy the sea without feeling rushed",
        "The staff kept the day organized while still giving us plenty of freedom",
      ],
      highlights: [
        "The clear water and beautiful views were the biggest highlight",
        "The island beach was even more beautiful in person",
        "The snorkeling stop was full of colorful fish",
        "Watching the sea from the boat was incredibly relaxing",
        "The views around the island were amazing",
        "The combination of swimming, snorkeling and relaxing made the day perfect",
      ],
    };
  }

  return {
    experiences: [
      "The experience was very enjoyable and everything was organized smoothly",
      "We had a really good time and the whole day felt easy",
      "The activity was well planned and matched the description very well",
      "Everything from pickup to the final drop-off was handled professionally",
      "We were very happy with how simple and organized the experience was",
      "The day was relaxing, enjoyable and better than we expected",
    ],
    details: [
      "The team were friendly, punctual and helpful throughout the experience",
      "Communication before the activity was clear and useful",
      "The staff were professional and always available when we needed help",
      "The organization was smooth and there were no unnecessary delays",
      "The guide was friendly and made the experience easy to enjoy",
      "Everything was clearly explained before the activity started",
    ],
    highlights: [
      "The overall organization was the best part of the experience",
      "The friendly staff made a big difference",
      "The activity itself was the highlight of our day",
      "The smooth organization allowed us to simply enjoy the experience",
      "It was one of the easiest activities we booked during our holiday",
      "We would happily include this experience in another Hurghada trip",
    ],
  };
}

const guestNames = [
  "Anna Müller",
  "Marco Rossi",
  "Sophie Klein",
  "Daniel Weber",
  "Elena Martin",
  "James Carter",
  "Laura Bianchi",
  "Oliver Schmidt",
  "Emma Wilson",
  "Luca Romano",
  "Nina Fischer",
  "Thomas Berger",
  "Chloe Martin",
  "Michael Brown",
  "Julia Wagner",
  "David Harris",
  "Sofia Moretti",
  "Lucas Meyer",
  "Mia Johnson",
  "Alexander Weber",
  "Isabel Garcia",
  "Jonas Klein",
  "Emily Taylor",
  "Matteo Rossi",
  "Clara Schneider",
  "Ben Walker",
  "Amelia Clark",
  "Felix Bauer",
  "Sarah Collins",
  "Leo Martin",
  "Hannah Becker",
  "Ryan Cooper",
  "Giulia Conti",
  "Noah Wagner",
  "Eva Hoffmann",
  "Thomas Rossi",
  "Maya Anderson",
  "Paul Schneider",
  "Lena Müller",
  "Daniela Romano",
  "Jack Thompson",
  "Sophie Wagner",
  "Max Fischer",
  "Olivia Brown",
  "Marco Bianchi",
  "Charlotte Weber",
  "Henry Martin",
  "Emma Rossi",
  "Nora Klein",
  "Samuel Carter",
  "Alice Berger",
  "Leon Schmidt",
];

const ratings = [5, 5, 4, 5, 4, 5, 5, 4, 5, 5, 4, 5];

const reviewDates = [
  "2026-08-30T10:20:00.000Z",
  "2026-08-22T12:10:00.000Z",
  "2026-08-14T09:35:00.000Z",
  "2026-08-03T15:25:00.000Z",
  "2026-07-27T11:40:00.000Z",
  "2026-07-18T14:15:00.000Z",
  "2026-07-09T10:50:00.000Z",
  "2026-06-29T13:30:00.000Z",
  "2026-06-21T09:15:00.000Z",
  "2026-06-12T16:05:00.000Z",
  "2026-05-29T11:25:00.000Z",
  "2026-05-17T12:45:00.000Z",
];

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function getUniqueIndexes(
  seed: number,
  max: number,
  count: number
): number[] {
  const indexes: number[] = [];
  let currentSeed = seed;

  while (indexes.length < count) {
    currentSeed =
      (currentSeed * 1664525 + 1013904223) >>> 0;

    const index = currentSeed % max;

    if (!indexes.includes(index)) {
      indexes.push(index);
    }
  }

  return indexes;
}

export function getSampleReviews(
  tourSlug: string,
  tourName: string
): SampleReview[] {
  const theme = getReviewTheme(tourSlug);
  const seed = hashString(tourSlug);

  const nameIndexes = getUniqueIndexes(
    seed,
    guestNames.length,
    5
  );

  const experienceIndexes = getUniqueIndexes(
    seed + 17,
    theme.experiences.length,
    5
  );

  const detailIndexes = getUniqueIndexes(
    seed + 31,
    theme.details.length,
    5
  );

  const highlightIndexes = getUniqueIndexes(
    seed + 47,
    theme.highlights.length,
    5
  );

  const ratingIndexes = getUniqueIndexes(
    seed + 61,
    ratings.length,
    5
  );

  const dateIndexes = getUniqueIndexes(
    seed + 79,
    reviewDates.length,
    5
  );

  return Array.from({ length: 5 }, (_, index) => {
    const experience =
      theme.experiences[experienceIndexes[index]];

    const detail =
      theme.details[detailIndexes[index]];

    const highlight =
      theme.highlights[highlightIndexes[index]];

    const commentTemplates = [
      `${experience}. ${detail}. ${highlight}`,
      `We really enjoyed ${tourName}. ${detail}, and ${highlight.toLowerCase()}`,
      `${tourName} was a great addition to our holiday. ${experience}. ${detail}`,
      `Very happy with ${tourName}. ${highlight}. ${detail}`,
      `${experience}. ${highlight}, and ${detail.toLowerCase()}`,
    ];

    return {
      id: `sample-${tourSlug}-${index + 1}`,
      guest_name: guestNames[nameIndexes[index]],
      rating: ratings[ratingIndexes[index]],
      comment: commentTemplates[index],
      created_at: reviewDates[dateIndexes[index]],
    };
  });
}