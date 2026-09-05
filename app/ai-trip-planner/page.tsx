"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  tours,
  tourCategories,
  type TourCategory,
} from "@/data/tours";

type Interest =
  | "islands-boat-trips"
  | "snorkeling-diving"
  | "sea-water-activities"
  | "dolphin-experiences"
  | "desert-adventures"
  | "egypt-tours-excursions"
  | "family-attractions";

type Pace = "relaxed" | "balanced" | "packed";
type Style = "relaxed" | "adventure" | "luxury" | "family";

type PlannerTour = (typeof tours)[keyof typeof tours];

type Recommendation = {
  tour: PlannerTour;
  day: number;
  reason: string;
};

const interestOptions: {
  id: Interest;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "islands-boat-trips",
    label: "Islands & Beaches",
    description: "Beautiful islands, beaches and boat days",
    icon: "🏝️",
  },
  {
    id: "snorkeling-diving",
    label: "Snorkeling & Diving",
    description: "Coral reefs and Red Sea marine life",
    icon: "🤿",
  },
  {
    id: "sea-water-activities",
    label: "Sea Adventures",
    description: "Fun and exciting water activities",
    icon: "🌊",
  },
  {
    id: "dolphin-experiences",
    label: "Dolphins",
    description: "Dolphin and marine experiences",
    icon: "🐬",
  },
  {
    id: "desert-adventures",
    label: "Desert",
    description: "Safari, quad bikes and desert experiences",
    icon: "🏜️",
  },
  {
    id: "egypt-tours-excursions",
    label: "History & Egypt",
    description: "Luxor, Cairo and Egyptian culture",
    icon: "🏛️",
  },
  {
    id: "family-attractions",
    label: "Family",
    description: "Easy and fun experiences for families",
    icon: "👨‍👩‍👧‍👦",
  },
];

const categoryLabels: Record<Interest, string> = {
  "islands-boat-trips": "Islands & Boat Trips",
  "snorkeling-diving": "Snorkeling & Diving",
  "sea-water-activities": "Sea & Water Activities",
  "dolphin-experiences": "Dolphin Experiences",
  "desert-adventures": "Desert Adventures",
  "egypt-tours-excursions": "Egypt Tours & Excursions",
  "family-attractions": "Family & Attractions",
};

const categoryWeights: Record<Interest, number> = {
  "islands-boat-trips": 10,
  "snorkeling-diving": 9,
  "sea-water-activities": 8,
  "dolphin-experiences": 8,
  "desert-adventures": 8,
  "egypt-tours-excursions": 7,
  "family-attractions": 7,
};

function getTourArray() {
  return Object.values(tours) as PlannerTour[];
}

function getDurationScore(tour: PlannerTour) {
  const duration = tour.duration.toLowerCase();

  if (duration.includes("half")) return 1;
  if (duration.includes("full")) return 2;
  if (duration.includes("overnight")) return 3;

  return 2;
}

function getStyleScore(tour: PlannerTour, style: Style) {
  const category = tour.category;

  if (style === "adventure") {
    if (
      category === "desert-adventures" ||
      category === "sea-water-activities" ||
      category === "snorkeling-diving"
    ) {
      return 8;
    }

    return 3;
  }

  if (style === "luxury") {
    if (
      tour.badge?.toLowerCase().includes("vip") ||
      tour.name.toLowerCase().includes("vip") ||
      tour.name.toLowerCase().includes("elite") ||
      tour.name.toLowerCase().includes("private")
    ) {
      return 10;
    }

    return 4;
  }

  if (style === "family") {
    if (category === "family-attractions") return 10;

    if (
      category === "islands-boat-trips" ||
      category === "sea-water-activities"
    ) {
      return 7;
    }

    return 4;
  }

  if (style === "relaxed") {
    if (category === "islands-boat-trips") return 9;

    if (
      category === "snorkeling-diving" ||
      category === "dolphin-experiences"
    ) {
      return 7;
    }

    return 4;
  }

  return 5;
}

function getReason(
  tour: PlannerTour,
  interests: Interest[],
  style: Style,
) {
  const category = tour.category as Interest;

  if (interests.includes(category)) {
    if (category === "islands-boat-trips") {
      return "A perfect Red Sea day with beaches, sea views and island time.";
    }

    if (category === "snorkeling-diving") {
      return "Adds a real Red Sea underwater experience to your trip.";
    }

    if (category === "sea-water-activities") {
      return "Adds excitement and variety without using an entire travel day.";
    }

    if (category === "dolphin-experiences") {
      return "A memorable marine-life experience that makes the itinerary more special.";
    }

    if (category === "desert-adventures") {
      return "Balances your sea days with an authentic Egyptian desert experience.";
    }

    if (category === "egypt-tours-excursions") {
      return "Adds Egyptian history and culture to your Hurghada holiday.";
    }

    if (category === "family-attractions") {
      return "A family-friendly option that keeps the itinerary enjoyable for everyone.";
    }
  }

  if (style === "luxury") {
    return "Selected to give your trip a more premium feel.";
  }

  if (style === "adventure") {
    return "Selected to keep your trip active and exciting.";
  }

  if (style === "family") {
    return "Selected for a comfortable and enjoyable family itinerary.";
  }

  return "Selected to create a balanced Hurghada experience.";
}

export default function AITripPlannerPage() {
  const [step, setStep] = useState(1);

  const [days, setDays] = useState(5);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState(500);

  const [hotelArea, setHotelArea] = useState("Hurghada");
  const [interests, setInterests] = useState<Interest[]>([]);
  const [notSure, setNotSure] = useState(false);

  const [pace, setPace] = useState<Pace>("balanced");
  const [style, setStyle] = useState<Style>("relaxed");

  const [generated, setGenerated] = useState(false);

  const pricedTours = useMemo(() => {
    return getTourArray().filter(
      (tour) => tour.available && tour.price > 0,
    );
  }, []);

  const toggleInterest = (interest: Interest) => {
    setNotSure(false);

    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  const travelerCount = adults + children;

  const recommendationData = useMemo(() => {
    if (!pricedTours.length) {
      return {
        recommendations: [] as Recommendation[],
        total: 0,
        remaining: budget,
      };
    }

    const selectedInterests =
      notSure || interests.length === 0
        ? (Object.keys(tourCategories) as Interest[])
        : interests;

    const scored = pricedTours
      .map((tour) => {
        const category = tour.category as Interest;

        let score = 0;

        if (selectedInterests.includes(category)) {
          score += categoryWeights[category];
        }

        score += getStyleScore(tour, style);

        if (tour.badge?.toLowerCase().includes("best")) {
          score += 3;
        }

        if (tour.rating >= 4.8) {
          score += 2;
        }

        if (tour.rating >= 4.9) {
          score += 1;
        }

        if (pace === "relaxed" && getDurationScore(tour) === 1) {
          score += 4;
        }

        if (pace === "packed" && getDurationScore(tour) === 1) {
          score += 3;
        }

        if (pace === "balanced" && getDurationScore(tour) === 2) {
          score += 2;
        }

        return {
          tour,
          score,
          cost:
            tour.price * adults +
            tour.childPrice * children,
        };
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return a.cost - b.cost;
      });

    const maxActivities =
      pace === "relaxed"
        ? Math.min(days, 4)
        : pace === "packed"
          ? Math.min(days, 7)
          : Math.min(days, 5);

    const recommendations: Recommendation[] = [];
    const usedCategories = new Set<string>();

    let runningTotal = 0;

    for (const item of scored) {
      if (recommendations.length >= maxActivities) break;

      if (item.cost <= 0) continue;

      if (runningTotal + item.cost > budget) continue;

      /*
       * Avoid filling the itinerary with the same type of activity.
       * We allow one category repeat only when the budget/days are larger.
       */
      if (usedCategories.has(item.tour.category) && recommendations.length < 4) {
        continue;
      }

      recommendations.push({
        tour: item.tour,
        day: recommendations.length + 1,
        reason: getReason(item.tour, selectedInterests, style),
      });

      runningTotal += item.cost;
      usedCategories.add(item.tour.category);
    }

    /*
     * If the budget is generous and we still have empty days,
     * allow additional highly-rated activities.
     */
    if (recommendations.length < Math.min(maxActivities, scored.length)) {
      for (const item of scored) {
        if (recommendations.length >= maxActivities) break;
        if (recommendations.some((item2) => item2.tour.slug === item.tour.slug)) {
          continue;
        }

        if (runningTotal + item.cost > budget) {
          continue;
        }

        recommendations.push({
          tour: item.tour,
          day: recommendations.length + 1,
          reason: getReason(
            item.tour,
            selectedInterests,
            style,
          ),
        });

        runningTotal += item.cost;
      }
    }

    return {
      recommendations,
      total: runningTotal,
      remaining: Math.max(0, budget - runningTotal),
    };
  }, [
    adults,
    budget,
    children,
    days,
    interests,
    notSure,
    pace,
    pricedTours,
    style,
  ]);

  const handleGenerate = () => {
    setGenerated(true);
    setStep(5);

    window.setTimeout(() => {
      document
        .getElementById("planner-results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const resetPlanner = () => {
    setGenerated(false);
    setStep(1);
    setDays(5);
    setAdults(2);
    setChildren(0);
    setBudget(500);
    setHotelArea("Hurghada");
    setInterests([]);
    setNotSure(false);
    setPace("balanced");
    setStyle("relaxed");
  };

  const total =
    recommendationData.recommendations.reduce(
      (sum, item) =>
        sum +
        item.tour.price * adults +
        item.tour.childPrice * children,
      0,
    );

  const progress = generated ? 100 : ((step - 1) / 4) * 100;

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#172033]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#04142f]">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#f59a23]/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur">
              <span className="flex h-2 w-2 rounded-full bg-[#f59a23]" />
              Via Blue Smart Travel Planner
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your perfect Hurghada trip,
              <span className="block text-[#f59a23]">
                planned around you.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Tell us how long you&apos;re staying, what you love and how much
              you want to spend. Via Blue will build a smart excursion plan
              that fits your trip and your budget.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/60">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Smart budget planning
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Real Via Blue tours
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Personalized itinerary
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANNER */}
      <section className="-mt-8 relative z-10 mx-auto max-w-6xl px-5 pb-20 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#e6e9ef] bg-white shadow-[0_25px_70px_rgba(4,20,47,0.12)]">
          {/* STEPPER */}
          <div className="border-b border-[#e6e9ef] bg-white px-6 py-5 lg:px-10">
            <div className="flex items-center justify-between">
              {[
                ["01", "Your Trip"],
                ["02", "Budget"],
                ["03", "Interests"],
                ["04", "Style"],
                ["05", "Your Plan"],
              ].map(([number, label], index) => {
                const current = index + 1;
                const active = step >= current;

                return (
                  <div
                    key={number}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition ${
                        active
                          ? "bg-[#071d49] text-white"
                          : "bg-[#f1f3f6] text-[#98a2b3]"
                      }`}
                    >
                      {number}
                    </div>

                    <span
                      className={`hidden text-sm font-semibold sm:block ${
                        active
                          ? "text-[#071d49]"
                          : "text-[#98a2b3]"
                      }`}
                    >
                      {label}
                    </span>

                    {index < 4 && (
                      <div className="hidden h-px w-8 bg-[#e6e9ef] md:block lg:w-14" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#f1f3f6]">
              <div
                className="h-full rounded-full bg-[#f59a23] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="p-6 lg:p-10">
            {/* STEP 1 */}
            {step === 1 && !generated && (
              <div>
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f59a23]">
                    Step 01
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#071d49]">
                    Tell us about your trip
                  </h2>

                  <p className="mt-2 text-[#667085]">
                    We&apos;ll use this to create a realistic itinerary.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      How many days?
                    </label>

                    <div className="flex items-center rounded-2xl border border-[#e6e9ef] bg-[#f7f8fa] p-2">
                      <button
                        type="button"
                        onClick={() =>
                          setDays((value) => Math.max(1, value - 1))
                        }
                        className="h-11 w-11 rounded-xl bg-white text-xl font-semibold shadow-sm"
                      >
                        −
                      </button>

                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-[#071d49]">
                          {days}
                        </span>
                        <span className="ml-2 text-sm text-[#667085]">
                          days
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setDays((value) => Math.min(30, value + 1))
                        }
                        className="h-11 w-11 rounded-xl bg-white text-xl font-semibold shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Hotel / area
                    </label>

                    <select
                      value={hotelArea}
                      onChange={(event) =>
                        setHotelArea(event.target.value)
                      }
                      className="h-15 w-full rounded-2xl border border-[#e6e9ef] bg-[#f7f8fa] px-4 outline-none transition focus:border-[#f59a23]"
                    >
                      <option>Hurghada</option>
                      <option>Sahl Hasheesh</option>
                      <option>Makadi Bay</option>
                      <option>El Gouna</option>
                      <option>Soma Bay</option>
                      <option>Safaga</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Adults
                    </label>

                    <div className="flex items-center rounded-2xl border border-[#e6e9ef] bg-[#f7f8fa] p-2">
                      <button
                        type="button"
                        onClick={() =>
                          setAdults((value) => Math.max(1, value - 1))
                        }
                        className="h-11 w-11 rounded-xl bg-white text-xl font-semibold shadow-sm"
                      >
                        −
                      </button>

                      <div className="flex-1 text-center text-xl font-bold text-[#071d49]">
                        {adults}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setAdults((value) => Math.min(20, value + 1))
                        }
                        className="h-11 w-11 rounded-xl bg-white text-xl font-semibold shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Children
                      <span className="ml-2 font-normal text-[#98a2b3]">
                        5–10 years
                      </span>
                    </label>

                    <div className="flex items-center rounded-2xl border border-[#e6e9ef] bg-[#f7f8fa] p-2">
                      <button
                        type="button"
                        onClick={() =>
                          setChildren((value) => Math.max(0, value - 1))
                        }
                        className="h-11 w-11 rounded-xl bg-white text-xl font-semibold shadow-sm"
                      >
                        −
                      </button>

                      <div className="flex-1 text-center text-xl font-bold text-[#071d49]">
                        {children}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setChildren((value) => Math.min(10, value + 1))
                        }
                        className="h-11 w-11 rounded-xl bg-white text-xl font-semibold shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-3 rounded-2xl bg-[#071d49] px-7 py-4 font-semibold text-white transition hover:bg-[#04142f]"
                  >
                    Continue
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && !generated && (
              <div>
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f59a23]">
                    Step 02
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#071d49]">
                    What&apos;s your activity budget?
                  </h2>

                  <p className="mt-2 text-[#667085]">
                    We&apos;ll build the best combination of excursions without
                    going over it.
                  </p>
                </div>

                <div className="mx-auto max-w-2xl">
                  <div className="rounded-3xl border border-[#e6e9ef] bg-[#f7f8fa] p-6 text-center sm:p-10">
                    <p className="text-sm font-medium text-[#667085]">
                      Your excursion budget
                    </p>

                    <div className="mt-3 flex items-center justify-center">
                      <span className="mr-3 text-4xl font-bold text-[#071d49]">
                        €
                      </span>

                      <input
                        type="number"
                        min={0}
                        step={10}
                        value={budget}
                        onChange={(event) =>
                          setBudget(
                            Math.max(
                              0,
                              Number(event.target.value) || 0,
                            ),
                          )
                        }
                        className="w-44 bg-transparent text-center text-6xl font-bold text-[#071d49] outline-none"
                      />
                    </div>

                    <p className="mt-4 text-sm text-[#667085]">
                      For {travelerCount} traveler
                      {travelerCount !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[250, 500, 750, 1000].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setBudget(value)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                          budget === value
                            ? "border-[#f59a23] bg-[#fff5e7] text-[#df8413]"
                            : "border-[#e6e9ef] bg-white hover:border-[#f59a23]"
                        }`}
                      >
                        €{value}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-[#f59a23]/20 bg-[#fffaf3] p-4 text-sm text-[#667085]">
                    <strong className="text-[#071d49]">
                      Smart budget tip:
                    </strong>{" "}
                    This budget is for excursions and activities. Your hotel,
                    flights and personal expenses are not included.
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-2xl border border-[#e6e9ef] px-6 py-4 font-semibold text-[#071d49]"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="rounded-2xl bg-[#071d49] px-7 py-4 font-semibold text-white transition hover:bg-[#04142f]"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && !generated && (
              <div>
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f59a23]">
                    Step 03
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#071d49]">
                    What do you enjoy?
                  </h2>

                  <p className="mt-2 text-[#667085]">
                    Pick as many as you like — or let Via Blue decide.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setNotSure(true);
                    setInterests([]);
                  }}
                  className={`mb-6 flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
                    notSure
                      ? "border-[#071d49] bg-[#071d49] text-white"
                      : "border-[#e6e9ef] bg-[#f7f8fa] hover:border-[#f59a23]"
                  }`}
                >
                  <div>
                    <div className="font-bold">
                      ✨ I&apos;m not sure — surprise me
                    </div>
                    <div
                      className={`mt-1 text-sm ${
                        notSure
                          ? "text-white/70"
                          : "text-[#667085]"
                      }`}
                    >
                      Build the best mix for my budget and trip length.
                    </div>
                  </div>

                  <span className="text-xl">
                    {notSure ? "✓" : "→"}
                  </span>
                </button>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {interestOptions.map((option) => {
                    const selected = interests.includes(option.id);

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleInterest(option.id)}
                        className={`group rounded-2xl border p-5 text-left transition ${
                          selected
                            ? "border-[#f59a23] bg-[#fff5e7]"
                            : "border-[#e6e9ef] bg-white hover:-translate-y-0.5 hover:border-[#f59a23] hover:shadow-lg"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-3xl">
                            {option.icon}
                          </span>

                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                              selected
                                ? "bg-[#f59a23] text-white"
                                : "bg-[#f1f3f6] text-transparent"
                            }`}
                          >
                            ✓
                          </span>
                        </div>

                        <h3 className="mt-5 font-bold text-[#071d49]">
                          {option.label}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-[#667085]">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-2xl border border-[#e6e9ef] px-6 py-4 font-semibold text-[#071d49]"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="rounded-2xl bg-[#071d49] px-7 py-4 font-semibold text-white transition hover:bg-[#04142f]"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && !generated && (
              <div>
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f59a23]">
                    Step 04
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#071d49]">
                    What kind of holiday do you want?
                  </h2>

                  <p className="mt-2 text-[#667085]">
                    This helps us decide how much activity to pack into your
                    days.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-bold text-[#071d49]">
                      Trip style
                    </h3>

                    <div className="space-y-3">
                      {[
                        {
                          id: "relaxed" as Style,
                          title: "Relaxed",
                          description:
                            "More beach time, fewer busy days.",
                          icon: "🌴",
                        },
                        {
                          id: "adventure" as Style,
                          title: "Adventure",
                          description:
                            "More action, sea and desert experiences.",
                          icon: "⚡",
                        },
                        {
                          id: "luxury" as Style,
                          title: "Luxury",
                          description:
                            "Premium and more exclusive experiences.",
                          icon: "✨",
                        },
                        {
                          id: "family" as Style,
                          title: "Family",
                          description:
                            "Comfortable activities for everyone.",
                          icon: "👨‍👩‍👧‍👦",
                        },
                      ].map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setStyle(option.id)}
                          className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                            style === option.id
                              ? "border-[#f59a23] bg-[#fff5e7]"
                              : "border-[#e6e9ef] hover:border-[#f59a23]"
                          }`}
                        >
                          <span className="text-2xl">
                            {option.icon}
                          </span>

                          <span className="flex-1">
                            <span className="block font-bold text-[#071d49]">
                              {option.title}
                            </span>

                            <span className="mt-1 block text-sm text-[#667085]">
                              {option.description}
                            </span>
                          </span>

                          {style === option.id && (
                            <span className="text-[#f59a23]">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-bold text-[#071d49]">
                      Trip pace
                    </h3>

                    <div className="space-y-3">
                      {[
                        {
                          id: "relaxed" as Pace,
                          title: "Relaxed",
                          description:
                            "1 main activity every couple of days.",
                          icon: "☀️",
                        },
                        {
                          id: "balanced" as Pace,
                          title: "Balanced",
                          description:
                            "A good mix of activities and free time.",
                          icon: "⚖️",
                        },
                        {
                          id: "packed" as Pace,
                          title: "Packed",
                          description:
                            "Make the most of every day.",
                          icon: "🚀",
                        },
                      ].map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setPace(option.id)}
                          className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                            pace === option.id
                              ? "border-[#071d49] bg-[#071d49] text-white"
                              : "border-[#e6e9ef] hover:border-[#071d49]"
                          }`}
                        >
                          <span className="text-2xl">
                            {option.icon}
                          </span>

                          <span className="flex-1">
                            <span className="block font-bold">
                              {option.title}
                            </span>

                            <span
                              className={`mt-1 block text-sm ${
                                pace === option.id
                                  ? "text-white/70"
                                  : "text-[#667085]"
                              }`}
                            >
                              {option.description}
                            </span>
                          </span>

                          {pace === option.id && (
                            <span className="text-[#f59a23]">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="rounded-2xl border border-[#e6e9ef] px-6 py-4 font-semibold text-[#071d49]"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="group inline-flex items-center gap-3 rounded-2xl bg-[#f59a23] px-7 py-4 font-bold text-white shadow-lg shadow-[#f59a23]/20 transition hover:bg-[#df8413]"
                  >
                    <span>✨</span>
                    Create My Trip
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* RESULTS */}
            {generated && (
              <div id="planner-results">
                <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f59a23]">
                      Your personalized plan
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-[#071d49] sm:text-4xl">
                      Your €{budget} Hurghada Plan
                    </h2>

                    <p className="mt-2 text-[#667085]">
                      {days} days · {adults} adult
                      {adults !== 1 ? "s" : ""}
                      {children > 0
                        ? ` · ${children} child${children !== 1 ? "ren" : ""}`
                        : ""}
                      {" · "}
                      {hotelArea}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetPlanner}
                    className="self-start rounded-xl border border-[#e6e9ef] px-4 py-2 text-sm font-semibold text-[#071d49] hover:border-[#f59a23]"
                  >
                    Start Again
                  </button>
                </div>

                {/* BUDGET SUMMARY */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-[#071d49] p-5 text-white">
                    <p className="text-sm text-white/60">
                      Activity budget
                    </p>
                    <p className="mt-1 text-3xl font-bold">
                      €{budget}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#e6e9ef] bg-white p-5">
                    <p className="text-sm text-[#667085]">
                      Planned activities
                    </p>
                    <p className="mt-1 text-3xl font-bold text-[#071d49]">
                      {recommendationData.recommendations.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#f59a23]/20 bg-[#fff5e7] p-5">
                    <p className="text-sm text-[#667085]">
                      Budget remaining
                    </p>
                    <p className="mt-1 text-3xl font-bold text-[#df8413]">
                      €{recommendationData.remaining}
                    </p>
                  </div>
                </div>

                {/* EMPTY STATE */}
                {recommendationData.recommendations.length === 0 && (
                  <div className="mt-8 rounded-3xl border border-[#e6e9ef] bg-[#f7f8fa] p-8 text-center">
                    <div className="text-5xl">🤔</div>

                    <h3 className="mt-4 text-xl font-bold text-[#071d49]">
                      We need a little more budget
                    </h3>

                    <p className="mx-auto mt-2 max-w-lg text-[#667085]">
                      There aren&apos;t enough currently priced activities in
                      your selected budget. Increase the budget and we&apos;ll
                      build a stronger itinerary.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setGenerated(false);
                        setStep(2);
                      }}
                      className="mt-6 rounded-2xl bg-[#071d49] px-6 py-3 font-semibold text-white"
                    >
                      Adjust My Budget
                    </button>
                  </div>
                )}

                {/* ITINERARY */}
                {recommendationData.recommendations.length > 0 && (
                  <>
                    <div className="mt-10">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-[#071d49]">
                            Your smart itinerary
                          </h3>
                          <p className="mt-1 text-sm text-[#667085]">
                            We&apos;ve balanced your interests, budget and free
                            time.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {recommendationData.recommendations.map(
                          ({ tour, day, reason }) => {
                            const activityTotal =
                              tour.price * adults +
                              tour.childPrice * children;

                            return (
                              <div
                                key={tour.slug}
                                className="group overflow-hidden rounded-3xl border border-[#e6e9ef] bg-white transition hover:border-[#f59a23] hover:shadow-[0_15px_40px_rgba(4,20,47,0.08)]"
                              >
                                <div className="flex flex-col lg:flex-row">
                                  <div className="relative h-56 overflow-hidden lg:h-auto lg:w-72">
                                    <img
                                      src={tour.image}
                                      alt={tour.name}
                                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                    <div className="absolute left-4 top-4 rounded-full bg-[#071d49] px-3 py-1.5 text-xs font-bold text-white shadow">
                                      Day {day}
                                    </div>
                                  </div>

                                  <div className="flex flex-1 flex-col p-6">
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                                      <div>
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                          <span className="rounded-full bg-[#eef3fa] px-3 py-1 text-xs font-semibold text-[#071d49]">
                                            {categoryLabels[
                                              tour.category as Interest
                                            ] ??
                                              tourCategories[
                                                tour.category as TourCategory
                                              ]}
                                          </span>

                                          {tour.badge && (
                                            <span className="rounded-full bg-[#fff5e7] px-3 py-1 text-xs font-semibold text-[#df8413]">
                                              {tour.badge}
                                            </span>
                                          )}
                                        </div>

                                        <h4 className="text-xl font-bold text-[#071d49]">
                                          {tour.name}
                                        </h4>

                                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-[#667085]">
                                          <span>
                                            ⏱ {tour.duration}
                                          </span>

                                          {tour.rating > 0 && (
                                            <span>
                                              ★ {tour.rating.toFixed(1)}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="sm:text-right">
                                        <p className="text-xs font-medium text-[#98a2b3]">
                                          Estimated total
                                        </p>

                                        <p className="text-2xl font-bold text-[#071d49]">
                                          €{activityTotal}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="mt-5 rounded-2xl bg-[#f7f8fa] p-4">
                                      <div className="flex gap-3">
                                        <div className="mt-0.5 text-[#f59a23]">
                                          ✨
                                        </div>

                                        <p className="text-sm leading-6 text-[#667085]">
                                          {reason}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                      <Link
                                        href={`/tours/${tour.slug}`}
                                        className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#e6e9ef] px-4 py-3 text-sm font-semibold text-[#071d49] transition hover:border-[#071d49]"
                                      >
                                        View Tour
                                      </Link>

                                      <Link
                                        href={`/tours/${tour.slug}/book`}
                                        className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#071d49] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#04142f]"
                                      >
                                        Book This Tour
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>

                    {/* WHY THIS PLAN */}
                    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
                      <div className="rounded-3xl bg-[#04142f] p-7 text-white">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f59a23]">
                            ✨
                          </div>

                          <div>
                            <h3 className="font-bold">
                              Why Via Blue chose this plan
                            </h3>

                            <p className="text-sm text-white/60">
                              Built around your answers
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 space-y-4 text-sm leading-6 text-white/70">
                          <p>
                            • Your itinerary stays within your activity budget
                            of <strong className="text-white">€{budget}</strong>.
                          </p>

                          <p>
                            • We considered your{" "}
                            <strong className="text-white">
                              {style}
                            </strong>{" "}
                            travel style and{" "}
                            <strong className="text-white">
                              {pace}
                            </strong>{" "}
                            pace.
                          </p>

                          <p>
                            • We&apos;ve tried to create variety instead of
                            filling your holiday with the same type of
                            excursion.
                          </p>

                          <p>
                            • You still have{" "}
                            <strong className="text-[#f59a23]">
                              €{recommendationData.remaining}
                            </strong>{" "}
                            available if you want to add another experience.
                          </p>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-[#e6e9ef] bg-white p-7">
                        <p className="text-sm font-semibold text-[#667085]">
                          Plan total
                        </p>

                        <p className="mt-1 text-4xl font-bold text-[#071d49]">
                          €{total}
                        </p>

                        <div className="my-5 h-px bg-[#e6e9ef]" />

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#667085]">
                              Budget
                            </span>
                            <strong>€{budget}</strong>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-[#667085]">
                              Remaining
                            </span>
                            <strong className="text-[#df8413]">
                              €{recommendationData.remaining}
                            </strong>
                          </div>
                        </div>

                        <Link
                          href="/contact"
                          className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#f59a23] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#df8413]"
                        >
                          Need a Custom Plan?
                        </Link>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-10 overflow-hidden rounded-3xl bg-[#eef3fa] p-7 sm:p-9">
                      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f59a23]">
                            Your holiday, your way
                          </p>

                          <h3 className="mt-2 text-2xl font-bold text-[#071d49]">
                            Want us to fine-tune this itinerary?
                          </h3>

                          <p className="mt-2 max-w-xl text-sm leading-6 text-[#667085]">
                            Our team can help adjust the plan, add private
                            transfers or build a completely custom experience
                            for you.
                          </p>
                        </div>

                        <Link
                          href="/contact"
                          className="shrink-0 rounded-2xl bg-[#071d49] px-6 py-4 font-semibold text-white transition hover:bg-[#04142f]"
                        >
                          Talk to Via Blue →
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}