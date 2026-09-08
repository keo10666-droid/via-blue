import { NextResponse } from "next/server";
import OpenAI from "openai";

import { tourList } from "@/data/tours";

type PlannerRequest = {
  adults: number;
  children: number;
  area: string;
  days: number;
  currency: "EUR" | "USD";
  budget: number;
  selectedCategories?: string[];
  surpriseMe?: boolean;
};

type Tour = (typeof tourList)[number];

type PackageTour = {
  slug: string;
  name: string;
  category: Tour["category"];
  image: string;
  duration: string;
  rating: number;
  reviews: number;
  price: number;
  childPrice: number;
  estimatedTotal: number;
  day: number;
};

type PackageOption = {
  id: string;
  title: string;
  summary: string;
  totalCost: number;
  budget: number;
  remainingBudget: number;
  currency: "EUR" | "USD";
  activities: number;
  itinerary: {
    day: number;
    tours: PackageTour[];
  }[];
};

type AIPackage = {
  id: string;
  title: string;
  summary: string;
  tourSlugs: string[];
};

type AIPlannerResponse = {
  packages: AIPackage[];
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const EUR_TO_USD = 1.17;

const AREA_KEYWORDS: Record<string, string[]> = {
  Hurghada: [
    "hurghada",
    "dahar",
    "magawish",
    "makadi",
    "sahl hasheesh",
    "red sea",
  ],
  "Sahl Hasheesh": [
    "sahl hasheesh",
    "hurghada",
    "red sea",
  ],
  "Makadi Bay": [
    "makadi",
    "hurghada",
    "red sea",
  ],
  "El Gouna": [
    "el gouna",
    "hurghada",
    "red sea",
  ],
  Safaga: [
    "safaga",
    "hurghada",
    "red sea",
  ],
  "Soma Bay": [
    "soma bay",
    "safaga",
    "hurghada",
    "red sea",
  ],
};

const PACKAGE_STYLES = [
  {
    id: "balanced",
    fallbackTitle: "The Balanced Escape",
    fallbackSummary:
      "A well-balanced mix of sea, adventure and culture with comfortable pacing.",
  },
  {
    id: "adventure",
    fallbackTitle: "The Adventure Edition",
    fallbackSummary:
      "A more energetic holiday built around memorable sea and desert experiences.",
  },
  {
    id: "signature",
    fallbackTitle: "The Signature Experience",
    fallbackSummary:
      "A refined selection of highly rated experiences with a relaxed premium feel.",
  },
] as const;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function convertFromEUR(amount: number, currency: "EUR" | "USD") {
  if (currency === "USD") {
    return Math.round(amount * EUR_TO_USD * 100) / 100;
  }

  return Math.round(amount * 100) / 100;
}

function getTourText(tour: Tour) {
  return [
    tour.name,
    tour.description,
    tour.overview,
    tour.pickup,
    tour.schedule,
    tour.type,
    ...tour.highlights,
    ...tour.notes,
  ]
    .join(" ")
    .toLowerCase();
}

function matchesArea(tour: Tour, area: string) {
  const normalizedArea = normalize(area);

  if (normalizedArea === "hurghada") {
    return tour.destination === "hurghada";
  }

  const keywords = AREA_KEYWORDS[area] ?? [normalizedArea];
  const text = getTourText(tour);

  return (
    tour.destination === "hurghada" &&
    keywords.some((keyword) =>
      text.includes(normalize(keyword)),
    )
  );
}

function parseDurationHours(duration: string) {
  const values = duration.match(/\d+(?:\.\d+)?/g);

  if (!values || values.length === 0) {
    return 3;
  }

  const numbers = values.map(Number);

  if (numbers.length === 1) {
    return numbers[0];
  }

  return (numbers[0] + numbers[1]) / 2;
}

function isFullDayTour(tour: Tour) {
  const hours = parseDurationHours(tour.duration);

  return (
    hours >= 6 ||
    tour.duration.toLowerCase().includes("over") ||
    tour.duration.toLowerCase().includes("2 days")
  );
}

function calculateTourTotal(
  tour: Tour,
  adults: number,
  children: number,
) {
  return (
    tour.price * adults +
    tour.childPrice * children
  );
}

function buildItinerary(
  selectedTours: Tour[],
  days: number,
): { day: number; tours: PackageTour[] }[] {
  const itinerary: {
    day: number;
    tours: PackageTour[];
  }[] = Array.from(
    { length: days },
    (_, index) => ({
      day: index + 1,
      tours: [],
    }),
  );

  let currentDay = 0;

  for (const tour of selectedTours) {
    let placed = false;

    for (
      let offset = 0;
      offset < days;
      offset++
    ) {
      const dayIndex =
        (currentDay + offset) % days;

      const day = itinerary[dayIndex];

      const currentTours = day.tours;

      if (currentTours.length >= 2) {
        continue;
      }

      if (
        isFullDayTour(tour) &&
        currentTours.length > 0
      ) {
        continue;
      }

      if (
  currentTours.some((item) => {
    return (
      parseDurationHours(item.duration) >= 6 ||
      item.duration
        .toLowerCase()
        .includes("over") ||
      item.duration
        .toLowerCase()
        .includes("2 days")
    );
  })
) {
  continue;
}

      const currentHours =
        currentTours.reduce(
          (total, item) =>
            total +
            parseDurationHours(item.duration),
          0,
        );

      const nextHours =
        currentHours +
        parseDurationHours(tour.duration);

      if (nextHours > 8) {
        continue;
      }

      day.tours.push({
        slug: tour.slug,
        name: tour.name,
        category: tour.category,
        image: tour.image,
        duration: tour.duration,
        rating: tour.rating,
        reviews: tour.reviews,
        price: tour.price,
        childPrice: tour.childPrice,
        estimatedTotal: 0,
        day: day.day,
      });

      placed = true;
      currentDay = (dayIndex + 1) % days;

      break;
    }

    if (!placed) {
      continue;
    }
  }

  return itinerary;
}

function buildPackageFromAI(
  aiPackage: AIPackage,
  catalogTours: Tour[],
  request: PlannerRequest,
  packageIndex: number,
): PackageOption {
  const budgetEUR =
    request.currency === "USD"
      ? request.budget / EUR_TO_USD
      : request.budget;

  const catalogBySlug = new Map(
    catalogTours.map((tour) => [
      tour.slug,
      tour,
    ]),
  );

  const selectedTours: Tour[] = [];
  const usedSlugs = new Set<string>();

  for (const slug of aiPackage.tourSlugs) {
    const tour = catalogBySlug.get(slug);

    if (!tour) {
      continue;
    }

    if (usedSlugs.has(tour.slug)) {
      continue;
    }

    const nextTours = [
      ...selectedTours,
      tour,
    ];

    const nextTotal = nextTours.reduce(
      (total, item) =>
        total +
        calculateTourTotal(
          item,
          request.adults,
          request.children,
        ),
      0,
    );

    if (nextTotal > budgetEUR) {
      continue;
    }

    selectedTours.push(tour);
    usedSlugs.add(tour.slug);

    if (selectedTours.length >= 5) {
      break;
    }
  }

  const itinerary = buildItinerary(
    selectedTours,
    request.days,
  );

  for (const day of itinerary) {
    for (const item of day.tours) {
      const sourceTour = tourList.find(
        (tour) => tour.slug === item.slug,
      );

      if (!sourceTour) {
        continue;
      }

      item.estimatedTotal =
        convertFromEUR(
          calculateTourTotal(
            sourceTour,
            request.adults,
            request.children,
          ),
          request.currency,
        );
    }
  }

  const actualTours =
    itinerary.flatMap(
      (day) => day.tours,
    );

  const totalEUR =
    actualTours.reduce(
      (total, item) => {
        const sourceTour = tourList.find(
          (tour) =>
            tour.slug === item.slug,
        );

        if (!sourceTour) {
          return total;
        }

        return (
          total +
          calculateTourTotal(
            sourceTour,
            request.adults,
            request.children,
          )
        );
      },
      0,
    );

  const totalCost =
    convertFromEUR(
      totalEUR,
      request.currency,
    );

  const style =
    PACKAGE_STYLES[packageIndex];

  return {
    id:
      aiPackage.id ||
      style.id,

    title:
      aiPackage.title ||
      style.fallbackTitle,

    summary:
      aiPackage.summary ||
      style.fallbackSummary,

    totalCost,

    budget: request.budget,

    remainingBudget:
      Math.round(
        (request.budget - totalCost) *
          100,
      ) / 100,

    currency: request.currency,

    activities:
      actualTours.length,

    itinerary,
  };
}

function validateRequest(
  body: unknown,
): PlannerRequest {
  if (
    !body ||
    typeof body !== "object"
  ) {
    throw new Error(
      "Invalid request body.",
    );
  }

  const data =
    body as Record<string, unknown>;

  const adults = Number(data.adults);
  const children = Number(data.children);
  const days = Number(data.days);
  const budget = Number(data.budget);

  const area =
    typeof data.area === "string"
      ? data.area.trim()
      : "";

  const currency =
    data.currency === "USD"
      ? "USD"
      : "EUR";

  const selectedCategories =
    Array.isArray(
      data.selectedCategories,
    )
      ? data.selectedCategories.filter(
          (
            value,
          ): value is string =>
            typeof value === "string",
        )
      : [];

  const surpriseMe =
    Boolean(data.surpriseMe);

  if (
    !Number.isInteger(adults) ||
    adults < 1 ||
    adults > 20
  ) {
    throw new Error(
      "Adults must be between 1 and 20.",
    );
  }

  if (
    !Number.isInteger(children) ||
    children < 0 ||
    children > 20
  ) {
    throw new Error(
      "Children must be between 0 and 20.",
    );
  }

  if (!area) {
    throw new Error(
      "Area is required.",
    );
  }

  if (!AREA_KEYWORDS[area]) {
    throw new Error(
      "Unsupported area.",
    );
  }

  if (
    !Number.isInteger(days) ||
    days < 1 ||
    days > 30
  ) {
    throw new Error(
      "Days must be between 1 and 30.",
    );
  }

  if (
    !Number.isFinite(budget) ||
    budget <= 0
  ) {
    throw new Error(
      "Budget must be greater than zero.",
    );
  }

  if (
    !surpriseMe &&
    selectedCategories.length === 0
  ) {
    throw new Error(
      "Select at least one experience category or choose Surprise Me.",
    );
  }

  return {
    adults,
    children,
    area,
    days,
    currency,
    budget,
    selectedCategories,
    surpriseMe,
  };
}

function buildTourCatalog(
  tours: Tour[],
) {
  return tours.map((tour) => ({
    slug: tour.slug,
    name: tour.name,
    category: tour.category,
    description: tour.description,
    overview: tour.overview,
    duration: tour.duration,
    pickup: tour.pickup,
    schedule: tour.schedule,
    type: tour.type,
    highlights: tour.highlights,
    notes: tour.notes,
    rating: tour.rating,
    reviews: tour.reviews,
    priceEUR: tour.price,
    childPriceEUR: tour.childPrice,
  }));
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json();

    const plannerRequest =
      validateRequest(body);

    /*
     * SERVER-SIDE SOURCE OF TRUTH
     *
     * Only tours that:
     * - exist in data/tours.ts
     * - are available
     * - have a real adult price
     * can be sent to the AI.
     */
    const sellableTours =
      tourList.filter(
        (tour) =>
          tour.available === true &&
          Number.isFinite(tour.price) &&
          tour.price > 0,
      );

    /*
     * Area filtering happens BEFORE OpenAI.
     */
    const areaTours =
      sellableTours.filter(
        (tour) =>
          matchesArea(
            tour,
            plannerRequest.area,
          ),
      );

    /*
     * Category filtering.
     *
     * Surprise Me = all valid categories.
     */
    const categoryTours =
      plannerRequest.surpriseMe
        ? areaTours
        : areaTours.filter(
            (tour) =>
              plannerRequest.selectedCategories?.includes(
                tour.category,
              ),
          );

    if (categoryTours.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "We couldn't find enough priced experiences matching your current preferences.",
        },
        { status: 422 },
      );
    }

    /*
     * Send ONLY real tours from data/tours.ts
     * to OpenAI.
     */
    const tourCatalog =
      buildTourCatalog(
        categoryTours,
      );

    const budgetEUR =
      plannerRequest.currency === "USD"
        ? plannerRequest.budget /
          EUR_TO_USD
        : plannerRequest.budget;

    const systemPrompt = `
You are the AI Trip Planner for Via Blue, a tourism company in Hurghada, Egypt.

Your job is to create exactly 3 distinct trip package options.

IMPORTANT RULES:

1. You may ONLY select tours using the exact "slug" values from the supplied tour catalog.
2. NEVER invent a tour.
3. NEVER invent a price.
4. NEVER modify a tour slug.
5. NEVER use tours outside the supplied catalog.
6. Every package must be meaningfully different from the others.
7. Respect the customer's selected experience categories.
8. If Surprise Me is true, you may use any supplied category.
9. Respect the customer's destination/area.
10. Respect the customer's budget.
11. Consider the number of adults and children when choosing experiences.
12. Prefer highly rated tours when reasonable.
13. Avoid repeating the same tour inside one package.
14. Keep the itinerary realistic and comfortable.
15. Do not overload a trip with too many activities.
16. Prefer approximately one main experience per day, with a maximum of five selected tours per package.
17. Full-day experiences should not be combined with another heavy/full-day experience on the same day.
18. Do not return more than 5 tour slugs in a package.
19. Return EXACTLY 3 packages.
20. The three packages should have different concepts:
   - Balanced
   - Adventure
   - Signature / Premium
21. Package titles and summaries should be attractive and natural for customers.
22. Do not mention internal IDs, implementation details, or the tour catalog.

The server will calculate all prices itself, so you only select tour slugs.
`;

    const userPrompt = `
Create 3 Via Blue trip packages for this customer.

Travelers:
- Adults: ${plannerRequest.adults}
- Children: ${plannerRequest.children}

Area:
- ${plannerRequest.area}

Trip duration:
- ${plannerRequest.days} days

Currency:
- ${plannerRequest.currency}

Customer budget:
- ${plannerRequest.budget} ${plannerRequest.currency}

Equivalent budget in EUR:
- ${Math.round(budgetEUR * 100) / 100} EUR

Selected categories:
- ${
      plannerRequest.surpriseMe
        ? "Surprise Me — choose freely from the supplied tours."
        : plannerRequest.selectedCategories?.join(
            ", ",
          )
    }

Tour catalog:
${JSON.stringify(
  tourCatalog,
  null,
  2,
)}

Return exactly 3 package options.
Each package must contain a list of exact tour slugs from the catalog.
`;

    /*
     * REAL OPENAI CALL
     */
    const response =
      await openai.responses.create({
        model: "gpt-5.6-luna",

        instructions:
          systemPrompt,

        input: userPrompt,

        text: {
          format: {
            type: "json_schema",

            name:
              "via_blue_trip_planner",

            strict: true,

            schema: {
              type: "object",

              properties: {
                packages: {
                  type: "array",

                  minItems: 3,
                  maxItems: 3,

                  items: {
                    type: "object",

                    properties: {
                      id: {
                        type: "string",
                      },

                      title: {
                        type: "string",
                      },

                      summary: {
                        type: "string",
                      },

                      tourSlugs: {
                        type: "array",

                        items: {
                          type: "string",
                        },
                      },
                    },

                    required: [
                      "id",
                      "title",
                      "summary",
                      "tourSlugs",
                    ],

                    additionalProperties:
                      false,
                  },
                },
              },

              required: [
                "packages",
              ],

              additionalProperties:
                false,
            },
          },
        },
      });

    /*
     * Parse OpenAI structured output.
     */
    if (!response.output_text) {
      throw new Error(
        "AI returned an empty response.",
      );
    }

    const aiResult =
      JSON.parse(
        response.output_text,
      ) as AIPlannerResponse;

    if (
      !Array.isArray(
        aiResult.packages,
      ) ||
      aiResult.packages.length !== 3
    ) {
      throw new Error(
        "AI did not return exactly 3 packages.",
      );
    }

    /*
     * SERVER-SIDE VALIDATION
     *
     * AI suggestions are NEVER trusted directly.
     */
    const packages =
      aiResult.packages.map(
        (aiPackage, index) =>
          buildPackageFromAI(
            aiPackage,
            categoryTours,
            plannerRequest,
            index,
          ),
      );

    /*
     * Make sure every package contains
     * at least one real activity.
     */
    if (
      packages.some(
        (pkg) =>
          pkg.activities === 0,
      )
    ) {
      throw new Error(
        "The AI could not create three valid packages within the selected budget and preferences.",
      );
    }

    /*
     * Final authoritative validation.
     *
     * Re-check every tour directly against
     * data/tours.ts.
     */
    const validatedPackages =
      packages.map((pkg) => {
        const validItinerary =
          pkg.itinerary
            .map((day) => ({
              ...day,

              tours:
                day.tours.filter(
                  (item) => {
                    const sourceTour =
                      tourList.find(
                        (tour) =>
                          tour.slug ===
                          item.slug,
                      );

                    return Boolean(
                      sourceTour &&
                        sourceTour.available &&
                        sourceTour.price >
                          0,
                    );
                  },
                ),
            }))
            .filter(
              (day) =>
                day.tours.length > 0,
            );

        const validTours =
          validItinerary.flatMap(
            (day) => day.tours,
          );

        const recalculatedTotal =
          validTours.reduce(
            (total, item) =>
              total +
              item.estimatedTotal,
            0,
          );

        return {
          ...pkg,

          itinerary:
            validItinerary,

          activities:
            validTours.length,

          totalCost:
            Math.round(
              recalculatedTotal *
                100,
            ) / 100,

          remainingBudget:
            Math.round(
              (plannerRequest.budget -
                recalculatedTotal) *
                100,
            ) / 100,
        };
      });

    /*
     * Exactly 3 packages.
     */
    return NextResponse.json({
      success: true,

      packages:
        validatedPackages,

      meta: {
        source:
          "OpenAI + data/tours.ts",

        totalAvailableTours:
          sellableTours.length,

        matchedTours:
          categoryTours.length,

        packagesGenerated: 3,

        currency:
          plannerRequest.currency,

        exchangeRateEURtoUSD:
          EUR_TO_USD,

        aiModel:
          "gpt-5.6-luna",
      },
    });
  } catch (error) {
    console.error(
      "AI Trip Planner error:",
      error,
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to create your trip plan.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 400 },
    );
  }
}