import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/apiRateLimit";
import { tourList } from "@/data/tours";

type Currency = "EUR" | "USD";
type PlannerRequest = {
  adults: number;
  children: number;
  area: string;
  days: number;
  currency: Currency;
  budget: number;
  selectedCategories: string[];
  surpriseMe: boolean;
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
  currency: Currency;
  activities: number;
  itinerary: { day: number; tours: PackageTour[] }[];
};

const EUR_TO_USD = 1.17;
const AREA_KEYWORDS: Record<string, string[]> = {
  Hurghada: ["hurghada", "dahar", "magawish", "makadi", "sahl hasheesh", "red sea"],
  "Sahl Hasheesh": ["sahl hasheesh", "hurghada", "red sea"],
  "Makadi Bay": ["makadi", "hurghada", "red sea"],
  "El Gouna": ["el gouna", "hurghada", "red sea"],
  Safaga: ["safaga", "hurghada", "red sea"],
  "Soma Bay": ["soma bay", "safaga", "hurghada", "red sea"],
};
const PACKAGE_STYLES = [
  {
    id: "budget",
    title: "The Smart Saver",
    summary: "A budget-conscious selection of real Via Blue experiences, leaving room in your holiday budget.",
  },
  {
    id: "balanced",
    title: "The Balanced Escape",
    summary: "A thoughtful mix of highly rated experiences, variety and value for your stay.",
  },
  {
    id: "premium",
    title: "The Signature Experience",
    summary: "A more premium selection of memorable experiences, while staying within your budget.",
  },
] as const;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function tourText(tour: Tour) {
  return [
    tour.name, tour.description, tour.overview, tour.pickup, tour.schedule,
    tour.type, ...tour.highlights, ...tour.notes,
  ].join(" ").toLowerCase();
}

function matchesArea(tour: Tour, area: string) {
  // The selected area is the customer's hotel/pickup area. Keep Hurghada-based
  // experiences plus Cairo/Luxor excursions that depart from the Red Sea region.
  return Boolean(AREA_KEYWORDS[area]) &&
    ["hurghada", "cairo", "luxor"].includes(tour.destination);
}

function durationHours(duration: string) {
  const values = duration.match(/\d+(?:\.\d+)?/g);
  if (!values?.length) return 3;
  const nums = values.map(Number);
  return nums.length === 1 ? nums[0] : (nums[0] + nums[1]) / 2;
}

function isFullDay(tour: Tour) {
  const duration = tour.duration.toLowerCase();
  return durationHours(tour.duration) >= 6 ||
    duration.includes("over") || duration.includes("2 days") ||
    duration.includes("overnight");
}

function tourCost(tour: Tour, request: PlannerRequest) {
  return tour.price * request.adults + tour.childPrice * request.children;
}

function convertCurrency(amount: number, currency: Currency) {
  const converted = currency === "USD" ? amount * EUR_TO_USD : amount;
  return Math.round(converted * 100) / 100;
}

function buildItinerary(tours: Tour[], days: number, request: PlannerRequest) {
  const itinerary = Array.from({ length: days }, (_, index) => ({
    day: index + 1,
    tours: [] as PackageTour[],
    hours: 0,
    fullDay: false,
  }));

  for (const tour of tours) {
    const hours = durationHours(tour.duration);
    const fullDay = isFullDay(tour);
    const day = itinerary.find((candidate) =>
      candidate.tours.length < 2 &&
      !candidate.fullDay &&
      !(fullDay && candidate.tours.length > 0) &&
      candidate.hours + hours <= 8
    );
    if (!day) return null;
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
      estimatedTotal: convertCurrency(tourCost(tour, request), request.currency),
      day: day.day,
    });
    day.hours += hours;
    day.fullDay = fullDay;
  }

  return itinerary.map(({ day, tours }) => ({ day, tours }));
}

function createPackage(
  availableTours: Tour[],
  request: PlannerRequest,
  styleIndex: number,
): PackageOption | null {
  const style = PACKAGE_STYLES[styleIndex];
  const budgetEUR = request.currency === "USD" ? request.budget / EUR_TO_USD : request.budget;
  const maxActivities = Math.min(5, request.days);
  const targetSpend = budgetEUR * (styleIndex === 0 ? 0.7 : styleIndex === 1 ? 0.88 : 0.97);
  const selected: Tour[] = [];
  let total = 0;
  const categoryCounts = new Map<string, number>();
  const candidates = [...availableTours];

  // Vary tie-breaking between packages so the three recommendations are distinct.
  const rotated = candidates.map((tour, index) => ({ tour, index })).sort((a, b) => {
    const aCost = tourCost(a.tour, request);
    const bCost = tourCost(b.tour, request);
    const aRating = a.tour.rating ?? 0;
    const bRating = b.tour.rating ?? 0;
    if (styleIndex === 0) return aCost - bCost || bRating - aRating || a.index - b.index;
    if (styleIndex === 2) return bCost - aCost || bRating - aRating || a.index - b.index;
    return bRating - aRating || aCost - bCost || a.index - b.index;
  }).map((item) => item.tour);

  while (selected.length < maxActivities) {
    let best: { tour: Tour; score: number; newTotal: number } | null = null;
    for (const tour of rotated) {
      if (selected.some((item) => item.slug === tour.slug)) continue;
      const cost = tourCost(tour, request);
      const newTotal = total + cost;
      if (cost <= 0 || newTotal > budgetEUR) continue;
      if (!buildItinerary([...selected, tour], request.days, request)) continue;

      const categoryCount = categoryCounts.get(tour.category) ?? 0;
      const rating = tour.rating ?? 0;
      const remainingAfter = budgetEUR - newTotal;
      let score: number;
      if (styleIndex === 0) {
        score = -cost + rating * 4 - categoryCount * 12;
      } else if (styleIndex === 1) {
        score = rating * 10 - Math.abs(targetSpend - newTotal) * 0.04 - categoryCount * 10;
      } else {
        score = cost * 0.55 + rating * 5 - Math.max(0, newTotal - targetSpend) * 0.12 - categoryCount * 8;
      }
      // Avoid spending everything on one activity if it prevents a useful itinerary.
      score -= remainingAfter < budgetEUR * 0.03 ? 3 : 0;
      if (!best || score > best.score) best = { tour, score, newTotal };
    }
    if (!best) break;
    selected.push(best.tour);
    total = best.newTotal;
    categoryCounts.set(best.tour.category, (categoryCounts.get(best.tour.category) ?? 0) + 1);
    if (total >= targetSpend && styleIndex !== 0) break;
  }

  const itinerary = buildItinerary(selected, request.days, request);
  if (!itinerary || selected.length === 0) return null;
  const actualEUR = itinerary.reduce((sum, day) =>
    sum + day.tours.reduce((daySum, item) =>
      daySum + tourCost(selected.find((tour) => tour.slug === item.slug)!, request), 0), 0);
  const totalCost = convertCurrency(actualEUR, request.currency);

  return {
    id: style.id,
    title: style.title,
    summary: style.summary,
    totalCost,
    budget: request.budget,
    remainingBudget: Math.round((request.budget - totalCost) * 100) / 100,
    currency: request.currency,
    activities: itinerary.reduce((sum, day) => sum + day.tours.length, 0),
    itinerary,
  };
}

function validateRequest(body: unknown): PlannerRequest {
  if (!body || typeof body !== "object") throw new Error("Invalid request body.");
  const data = body as Record<string, unknown>;
  const adults = typeof data.adults === "number" ? data.adults : NaN;
  const children = typeof data.children === "number" ? data.children : NaN;
  const days = typeof data.days === "number" ? data.days : NaN;
  const budget = typeof data.budget === "number" ? data.budget : NaN;
  const area = typeof data.area === "string" ? data.area.trim() : "";
  if (data.currency !== "EUR" && data.currency !== "USD") throw new Error("Currency must be EUR or USD.");
  if (!Number.isInteger(adults) || adults < 1 || adults > 20) throw new Error("Adults must be between 1 and 20.");
  if (!Number.isInteger(children) || children < 0 || children > 20) throw new Error("Children must be between 0 and 20.");
  if (!AREA_KEYWORDS[area]) throw new Error("Please select a supported destination.");
  if (!Number.isInteger(days) || days < 1 || days > 30) throw new Error("Days must be between 1 and 30.");
  if (!Number.isFinite(budget) || budget <= 0 || budget > 100000) throw new Error("Budget must be between 1 and 100,000.");
  if (data.selectedCategories !== undefined &&
      (!Array.isArray(data.selectedCategories) || data.selectedCategories.some((value) => typeof value !== "string"))) {
    throw new Error("Selected categories must be a list of valid categories.");
  }
  const selectedCategories = Array.isArray(data.selectedCategories) ? data.selectedCategories as string[] : [];
  const surpriseMe = data.surpriseMe === true;
  const validCategories = new Set(tourList.map((tour) => tour.category as string));
  if (selectedCategories.length > 20 || selectedCategories.some((category) => !validCategories.has(category))) {
    throw new Error("One or more selected categories are invalid.");
  }
  if (!surpriseMe && selectedCategories.length === 0) {
    throw new Error("Select at least one experience category or choose Surprise Me.");
  }
  return { adults, children, area, days, currency: data.currency, budget, selectedCategories, surpriseMe };
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
      return NextResponse.json({ success: false, error: "Invalid trip-planning request format." }, { status: 415 });
    }
    if (await isRateLimited(request, "ai-trip-planner", 5, 3600)) {
      return NextResponse.json({ success: false, error: "Too many trip-planning requests. Please try again later." }, { status: 429 });
    }
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 16_384) {
      return NextResponse.json({ success: false, error: "Request is too large." }, { status: 413 });
    }
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON request." }, { status: 400 });
    }

    const plannerRequest = validateRequest(body);
    const sellableTours = tourList.filter((tour) =>
      tour.available === true && Number.isFinite(tour.price) && tour.price > 0 &&
      Number.isFinite(tour.childPrice) && tour.childPrice >= 0);
    const areaTours = sellableTours.filter((tour) => matchesArea(tour, plannerRequest.area));
    const categoryTours = plannerRequest.surpriseMe
      ? areaTours
      : areaTours.filter((tour) => plannerRequest.selectedCategories.includes(tour.category));

    if (categoryTours.length === 0) {
      return NextResponse.json({
        success: false,
        error: "We couldn't find priced experiences matching this destination and your selected categories. Try another category or choose Surprise Me.",
      }, { status: 422 });
    }

    const packages = PACKAGE_STYLES.map((_, index) =>
      createPackage(categoryTours, plannerRequest, index)
    ).filter((item): item is PackageOption => Boolean(item));

    if (packages.length !== 3) {
      return NextResponse.json({
        success: false,
        error: "Your budget may be too low for the selected activities and number of travelers. Try increasing it or selecting different categories.",
      }, { status: 422 });
    }

    return NextResponse.json({ success: true, packages });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create your trip plan.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
