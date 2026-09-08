"use client";

import { useEffect, useState } from "react";

const areas = [
  "Hurghada",
  "Sahl Hasheesh",
  "Makadi Bay",
  "El Gouna",
  "Safaga",
  "Soma Bay",
];

const currencies = ["EUR", "USD"] as const;

const experienceCategories = [
  {
    id: "islands-boat-trips",
    title: "Islands & Boat Trips",
    description: "Boats, islands, cruises & sea days",
    icon: "01",
  },
  {
    id: "snorkeling-diving",
    title: "Snorkeling & Diving",
    description: "Coral reefs, snorkeling & diving",
    icon: "02",
  },
  {
    id: "sea-water-activities",
    title: "Sea & Water Activities",
    description: "Parasailing, water sports & fun",
    icon: "03",
  },
  {
    id: "dolphin-experiences",
    title: "Dolphin Experiences",
    description: "Dolphins, encounters & marine life",
    icon: "04",
  },
  {
    id: "desert-adventures",
    title: "Desert Adventures",
    description: "Safaris, quad bikes & Bedouin life",
    icon: "05",
  },
  {
    id: "egypt-tours-excursions",
    title: "Egypt Tours",
    description: "Luxor, Cairo & ancient Egypt",
    icon: "06",
  },
  {
    id: "family-attractions",
    title: "Family Attractions",
    description: "Fun experiences for the whole family",
    icon: "07",
  },
];

type PackageTour = {
  slug: string;
  name: string;
  category: string;
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

function ArrowRightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 6l6 6-6 6"
      />
    </svg>
  );
}

function ArrowLeftIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 12H5m6 6-6-6 6-6"
      />
    </svg>
  );
}

function SparklesIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l1.2 4.3L17.5 9l-4.3 1.2L12 14.5l-1.2-4.3L6.5 9l4.3-1.7L12 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 14l.6 2.4L22 17l-2.4.6L19 20l-.6-2.4L16 17l2.4-.6L19 14z"
      />
    </svg>
  );
}

function UsersIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <circle cx="9" cy="8" r="3" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 20c.6-3.5 2.4-5.2 5.5-5.2s4.9 1.7 5.5 5.2"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 5.5a3 3 0 010 5.8M16 14.8c2.5.4 4 2 4.5 5.2"
      />
    </svg>
  );
}

function LocationIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 10.5c0 5-8 10-8 10s-8-5-8-10a8 8 0 1116 0z"
      />
      <circle cx="12" cy="10.5" r="2.5" />
    </svg>
  );
}

function CalendarIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path strokeLinecap="round" d="M7 3v4M17 3v4M3.5 9h17" />
    </svg>
  );
}

function WalletIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6.5A2.5 2.5 0 016.5 4H19a1 1 0 011 1v14a1 1 0 01-1 1H6.5A2.5 2.5 0 014 17.5v-11z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7h14.5A2.5 2.5 0 0121 9.5v4H16a2.5 2.5 0 110-5h5"
      />
      <circle cx="16" cy="11.5" r=".7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function StarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 3.8l2.45 4.96 5.47.8-3.96 3.86.94 5.45L12 16.3l-4.9 2.57.94-5.45-3.96-3.86 5.47-.8L12 3.8z" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" d="M12 7v5l3 2" />
    </svg>
  );
}

export default function AITripPlannerPage() {
  const [step, setStep] = useState(1);

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [area, setArea] = useState("Hurghada");

  const [days, setDays] = useState(5);

  const [currency, setCurrency] =
    useState<(typeof currencies)[number]>("EUR");
  const [budget, setBudget] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [surpriseMe, setSurpriseMe] = useState(false);

  const [processingStage, setProcessingStage] = useState(0);

  const [packages, setPackages] = useState<PackageOption[]>([]);
  const [selectedPackage, setSelectedPackage] =
    useState<PackageOption | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const totalTravelers = adults + children;

  const canContinue =
    step === 1
      ? adults > 0
      : step === 2
      ? !!area
      : step === 3
      ? days > 0
      : step === 4
      ? !!budget && Number(budget) > 0
      : step === 5
      ? surpriseMe || selectedCategories.length > 0
      : true;

  const toggleCategory = (categoryId: string) => {
    setSurpriseMe(false);

    setSelectedCategories((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId]
    );
  };

  const selectSurpriseMe = () => {
    setSurpriseMe(true);
    setSelectedCategories([]);
  };

  const generateTrip = async () => {
    if (!canContinue || isGenerating) return;

    setError("");
    setPackages([]);
    setSelectedPackage(null);
    setProcessingStage(0);
    setIsGenerating(true);
    setStep(6);

    try {
      const response = await fetch("/api/ai-trip-planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adults,
          children,
          area,
          days,
          currency,
          budget: Number(budget),
          selectedCategories,
          surpriseMe,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to create your trip plan."
        );
      }

      setProcessingStage(4);

      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      setPackages(data.packages ?? []);

      if (!data.packages || data.packages.length !== 3) {
        throw new Error(
          "We couldn't create three complete package options."
        );
      }

      setStep(7);
    } catch (err) {
      console.error("AI Trip Planner:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating your trip."
      );

      setStep(6);
    } finally {
      setIsGenerating(false);
    }
  };

  const nextStep = () => {
    if (!canContinue) return;

    if (step < 5) {
      setStep(step + 1);
      return;
    }

    if (step === 5) {
      generateTrip();
    }
  };

  const previousStep = () => {
    if (step > 1 && step < 6) {
      setStep(step - 1);
    }

    if (step === 7) {
      setPackages([]);
      setSelectedPackage(null);
      setError("");
      setStep(5);
    }
  };

  useEffect(() => {
    if (step !== 6 || !isGenerating) return;

    setProcessingStage(0);

    const timers = [
      window.setTimeout(() => setProcessingStage(1), 700),
      window.setTimeout(() => setProcessingStage(2), 1600),
      window.setTimeout(() => setProcessingStage(3), 2700),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [step, isGenerating]);

  const processingItems = [
    "Understanding your travel style",
    "Matching real Via Blue experiences",
    "Optimizing your days and activities",
    "Building 3 personalized packages",
  ];

  const currencySymbol = currency === "EUR" ? "€" : "$";

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}

      <section className="relative overflow-hidden bg-blue-950 text-white">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-700/30 blur-3xl" />

        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute right-[15%] top-[20%] h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-12 bg-orange-400" />

              <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400 sm:text-sm">
                Via Blue AI Trip Planner
              </p>
            </div>

            <h1 className="text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
              Your Holiday.
              <span className="block text-orange-400">
                Designed Around You.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">
              Tell us what you&apos;re looking for and let our AI build a
              personalized Red Sea experience around you.
            </p>

            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white">
                <SparklesIcon className="h-4 w-4" />
              </span>

              <span className="text-sm font-semibold text-white">
                Intelligent planning · Real Via Blue experiences
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRESS */}

      {step < 6 && (
        <section className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="flex h-[82px] items-center">
              <div className="flex w-full items-center">
                {[1, 2, 3, 4, 5].map((item, index) => {
                  const labels = [
                    "Travelers",
                    "Location",
                    "Duration",
                    "Budget",
                    "Experiences",
                  ];

                  const active = step === item;
                  const completed = step > item;

                  return (
                    <div
                      key={item}
                      className={`flex items-center ${
                        index !== 4 ? "flex-1" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                            active || completed
                              ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                              : "border border-gray-200 bg-white text-gray-400"
                          }`}
                        >
                          {completed ? "✓" : `0${item}`}
                        </div>

                        <p
                          className={`hidden text-sm font-bold sm:block ${
                            active || completed
                              ? "text-blue-950"
                              : "text-gray-400"
                          }`}
                        >
                          {labels[index]}
                        </p>
                      </div>

                      {index !== 4 && (
                        <div
                          className={`mx-3 h-px flex-1 transition ${
                            completed ? "bg-orange-300" : "bg-gray-100"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MAIN */}

      <section className="min-h-[650px] bg-slate-50 px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          {/* STEP LABEL */}

          {step < 6 && (
            <div className="mx-auto mb-8 max-w-4xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-orange-500" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                  Step 0{step}
                </p>
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
                {step === 1 && "Who are you travelling with?"}
                {step === 2 && "Where are you staying?"}
                {step === 3 && "How long are you staying?"}
                {step === 4 && "What's your budget?"}
                {step === 5 && "What would you love to experience?"}
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
                {step === 1 &&
                  "Tell us who is joining you so we can build experiences that fit your group."}

                {step === 2 &&
                  "Choose your main area and we'll focus on experiences that work naturally from there."}

                {step === 3 &&
                  "Your trip length helps our AI decide how many experiences can comfortably fit."}

                {step === 4 &&
                  "Set your spending limit and we'll keep your recommendations within it."}

                {step === 5 &&
                  "Choose your favorite experiences, or let our AI surprise you with the best combination."}
              </p>
            </div>
          )}

          {/* AI PROCESSING */}

          {step === 6 && (
            <div className="flex min-h-[560px] items-center justify-center">
              <div className="w-full max-w-2xl text-center">
                <div className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center">
                  <div className="absolute inset-0 animate-ping rounded-full bg-orange-500/10" />

                  <div className="absolute inset-2 rounded-full border border-orange-200" />

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-950 text-white shadow-2xl shadow-blue-950/20">
                    <SparklesIcon className="h-9 w-9 animate-pulse" />
                  </div>
                </div>

                <div className="mb-10">
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-orange-500" />

                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                      Via Blue AI
                    </p>

                    <span className="h-px w-10 bg-orange-500" />
                  </div>

                  <h2 className="text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
                    Designing your perfect trip
                  </h2>

                  <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500">
                    We&apos;re combining your preferences with real Via Blue
                    experiences to create three different ways to enjoy your
                    holiday.
                  </p>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-xl shadow-blue-950/5 md:p-8">
                  {error ? (
                    <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                      <p className="font-bold text-red-700">
                        We couldn&apos;t create your trip.
                      </p>

                      <p className="mt-2 text-sm leading-6 text-red-600">
                        {error}
                      </p>

                      <button
                        type="button"
                        onClick={generateTrip}
                        className="mt-5 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-5">
                        {processingItems.map((item, index) => {
                          const active = processingStage === index;
                          const completed = processingStage > index;

                          return (
                            <div
                              key={item}
                              className={`flex items-center gap-4 transition duration-500 ${
                                active || completed
                                  ? "opacity-100"
                                  : "opacity-40"
                              }`}
                            >
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition duration-500 ${
                                  completed
                                    ? "bg-orange-500 text-white"
                                    : active
                                    ? "border-2 border-orange-500 bg-orange-50 text-orange-500"
                                    : "border border-gray-200 bg-white text-gray-300"
                                }`}
                              >
                                {completed ? (
                                  "✓"
                                ) : active ? (
                                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-orange-500" />
                                ) : (
                                  `0${index + 1}`
                                )}
                              </div>

                              <div className="flex-1">
                                <p
                                  className={`font-bold ${
                                    active || completed
                                      ? "text-blue-950"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {item}
                                </p>

                                {active && (
                                  <p className="mt-1 text-xs font-medium text-orange-500">
                                    Working on it...
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-8 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-orange-500 transition-all duration-700"
                          style={{
                            width: `${Math.min(
                              100,
                              ((processingStage + 1) /
                                processingItems.length) *
                                100
                            )}%`,
                          }}
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs font-semibold text-gray-400">
                        <span>Personalizing your journey</span>

                        <span>
                          {Math.min(
                            100,
                            Math.round(
                              ((processingStage + 1) /
                                processingItems.length) *
                                100
                            )
                          )}
                          %
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {!error && (
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-semibold text-gray-400">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      Real Via Blue experiences
                    </span>

                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      Real prices
                    </span>

                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      3 personalized options
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PACKAGES */}

          {step === 7 && (
            <div>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <div className="mb-5 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-orange-500" />

                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                    Your Via Blue AI Plan
                  </p>

                  <span className="h-px w-10 bg-orange-500" />
                </div>

                <h2 className="text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
                  Your holiday, your way.
                </h2>

                <p className="mt-4 text-base leading-7 text-gray-500">
                  We created three different options using real Via Blue
                  experiences and real prices.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <span className="rounded-full bg-blue-950 px-4 py-2 text-xs font-bold text-white">
                    {area}
                  </span>

                  <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-blue-950 shadow-sm ring-1 ring-gray-100">
                    {days} days
                  </span>

                  <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-blue-950 shadow-sm ring-1 ring-gray-100">
                    {totalTravelers} travelers
                  </span>

                  <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-blue-950 shadow-sm ring-1 ring-gray-100">
                    Budget {currencySymbol}
                    {budget}
                  </span>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {packages.map((pkg, index) => {
                  const selected = selectedPackage?.id === pkg.id;

                  return (
                    <div
                      key={pkg.id}
                      className={`group overflow-hidden rounded-3xl border bg-white shadow-xl transition duration-300 ${
                        selected
                          ? "border-orange-500 shadow-orange-500/10"
                          : "border-gray-100 shadow-blue-950/5 hover:-translate-y-1 hover:shadow-2xl"
                      }`}
                    >
                      <div className="relative h-56 overflow-hidden bg-blue-950">
                        {pkg.itinerary[0]?.tours[0]?.image ? (
                          <img
                            src={pkg.itinerary[0].tours[0].image}
                            alt={pkg.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-white">
                            <SparklesIcon className="h-12 w-12 text-orange-400" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/20 to-transparent" />

                        <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-lg">
                          0{index + 1}
                        </div>

                        {index === 0 && (
                          <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-950 shadow-lg">
                            Recommended
                          </span>
                        )}

                        <div className="absolute bottom-5 left-5 right-5">
                          <h3 className="text-2xl font-bold text-white">
                            {pkg.title}
                          </h3>

                          <p className="mt-1 text-sm text-blue-100">
                            {pkg.activities}{" "}
                            {pkg.activities === 1
                              ? "experience"
                              : "experiences"}
                          </p>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="min-h-[72px] text-sm leading-6 text-gray-500">
                          {pkg.summary}
                        </p>

                        <div className="mt-6 flex items-end justify-between border-b border-gray-100 pb-5">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                              Estimated total
                            </p>

                            <p className="mt-1 text-3xl font-bold text-blue-950">
                              {pkg.currency === "EUR" ? "€" : "$"}
                              {pkg.totalCost.toFixed(2)}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-xs font-semibold text-gray-400">
                              Remaining
                            </p>

                            <p className="mt-1 text-sm font-bold text-orange-500">
                              {pkg.currency === "EUR" ? "€" : "$"}
                              {pkg.remainingBudget.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 space-y-4">
                          {pkg.itinerary
                            .filter((day) => day.tours.length > 0)
                            .slice(0, 4)
                            .map((day) => (
                              <div key={day.day}>
                                <div className="mb-2 flex items-center gap-2">
                                  <span className="rounded-full bg-blue-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                    Day {day.day}
                                  </span>
                                </div>

                                <div className="space-y-2">
                                  {day.tours.map((tour) => (
                                    <div
                                      key={tour.slug}
                                      className="rounded-xl bg-slate-50 p-3"
                                    >
                                      <p className="text-sm font-bold text-blue-950">
                                        {tour.name}
                                      </p>

                                      <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] font-medium text-gray-400">
                                        <span className="flex items-center gap-1">
                                          <ClockIcon className="h-3.5 w-3.5" />
                                          {tour.duration}
                                        </span>

                                        {tour.rating > 0 && (
                                          <span className="flex items-center gap-1 text-orange-500">
                                            <StarIcon className="h-3.5 w-3.5" />
                                            {tour.rating.toFixed(1)}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPackage(
                              selected ? null : pkg
                            )
                          }
                          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 font-bold transition ${
                            selected
                              ? "bg-orange-500 text-white"
                              : "bg-blue-950 text-white hover:bg-orange-500"
                          }`}
                        >
                          {selected ? "Package Selected" : "Choose This Package"}

                          {selected ? (
                            <span>✓</span>
                          ) : (
                            <ArrowRightIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedPackage && (
                <div className="sticky bottom-5 z-20 mt-8">
                  <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-3xl border border-blue-900/10 bg-blue-950 p-5 text-white shadow-2xl shadow-blue-950/20 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                        Selected package
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        {selectedPackage.title}
                      </p>

                      <p className="mt-1 text-sm text-blue-200">
                        {selectedPackage.activities} experiences ·{" "}
                        {selectedPackage.currency === "EUR" ? "€" : "$"}
                        {selectedPackage.totalCost.toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
  if (!selectedPackage) return;

  sessionStorage.setItem(
    "viaBlueAITripBooking",
    JSON.stringify({
      package: selectedPackage,
      adults,
      children,
      area,
      days,
      currency,
      budget: Number(budget),
    }),
  );

  window.location.href = "/ai-trip-planner/book";
}}
                      className="flex shrink-0 items-center justify-center gap-3 rounded-xl bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-600"
                    >
                      Book This Package
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={previousStep}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-blue-950 transition hover:border-blue-950"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  Adjust My Preferences
                </button>
              </div>
            </div>
          )}

          {/* CARD */}

          {step < 6 && (
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-blue-950/5">
              {/* STEP 1 */}

              {step === 1 && (
                <div className="p-6 md:p-10">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <UsersIcon className="h-8 w-8" />
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-5">
                      <div>
                        <p className="font-bold text-blue-950">Adults</p>
                        <p className="mt-1 text-sm text-gray-400">Age 11+</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-lg font-bold text-blue-950 transition hover:border-orange-500 hover:text-orange-500"
                        >
                          −
                        </button>

                        <span className="w-5 text-center text-lg font-bold text-blue-950">
                          {adults}
                        </span>

                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 text-lg font-bold text-white transition hover:bg-orange-500"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-5">
                      <div>
                        <p className="font-bold text-blue-950">Children</p>
                        <p className="mt-1 text-sm text-gray-400">Age 5–10</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setChildren(Math.max(0, children - 1))
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-lg font-bold text-blue-950 transition hover:border-orange-500 hover:text-orange-500"
                        >
                          −
                        </button>

                        <span className="w-5 text-center text-lg font-bold text-blue-950">
                          {children}
                        </span>

                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 text-lg font-bold text-white transition hover:bg-orange-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl bg-blue-950 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                      Your group
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      {totalTravelers}{" "}
                      {totalTravelers === 1 ? "traveler" : "travelers"}
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2 */}

              {step === 2 && (
                <div className="p-6 md:p-10">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <LocationIcon className="h-8 w-8" />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {areas.map((item) => {
                      const selected = area === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setArea(item)}
                          className={`group rounded-2xl border p-5 text-left transition duration-300 ${
                            selected
                              ? "border-blue-950 bg-blue-950 text-white shadow-lg shadow-blue-950/10"
                              : "border-gray-100 bg-white text-blue-950 hover:border-blue-200 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold">{item}</p>

                              <p
                                className={`mt-1 text-xs ${
                                  selected
                                    ? "text-blue-200"
                                    : "text-gray-400"
                                }`}
                              >
                                Red Sea area
                              </p>
                            </div>

                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                                selected
                                  ? "bg-orange-500 text-white"
                                  : "bg-blue-50 text-blue-700"
                              }`}
                            >
                              {selected ? "✓" : "→"}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3 */}

              {step === 3 && (
                <div className="p-6 md:p-10">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <CalendarIcon className="h-8 w-8" />
                  </div>

                  <div className="rounded-3xl border border-gray-100 p-7 md:p-10">
                    <p className="text-center text-sm font-semibold text-gray-400">
                      I&apos;m staying for
                    </p>

                    <div className="mt-7 flex items-center justify-center gap-6">
                      <button
                        type="button"
                        onClick={() => setDays(Math.max(1, days - 1))}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-2xl font-bold text-blue-950 transition hover:border-orange-500 hover:text-orange-500"
                      >
                        −
                      </button>

                      <div className="min-w-[150px] text-center">
                        <p className="text-6xl font-bold tracking-tight text-blue-950">
                          {days}
                        </p>

                        <p className="mt-2 text-sm font-semibold text-gray-400">
                          {days === 1 ? "day" : "days"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setDays(days + 1)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-950 text-2xl font-bold text-white transition hover:bg-orange-500"
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-9 grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {[3, 4, 5, 6, 7, 10, 14].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setDays(value)}
                          className={`rounded-xl py-3 text-sm font-bold transition ${
                            days === value
                              ? "bg-orange-500 text-white"
                              : "bg-slate-50 text-blue-950 hover:bg-blue-50"
                          }`}
                        >
                          {value}d
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-blue-950 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                      Trip overview
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      {days} days in {area}
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 4 */}

              {step === 4 && (
                <div className="p-6 md:p-10">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <WalletIcon className="h-8 w-8" />
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-bold text-blue-950">
                      Currency
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {currencies.map((item) => {
                        const selected = currency === item;

                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setCurrency(item)}
                            className={`rounded-2xl border p-5 text-left transition ${
                              selected
                                ? "border-blue-950 bg-blue-950 text-white"
                                : "border-gray-100 text-blue-950 hover:border-blue-200"
                            }`}
                          >
                            <p className="text-lg font-bold">{item}</p>

                            <p
                              className={`mt-1 text-xs ${
                                selected
                                  ? "text-blue-200"
                                  : "text-gray-400"
                              }`}
                            >
                              {item === "EUR" ? "Euro" : "US Dollar"}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="mb-4 text-sm font-bold text-blue-950">
                      Your experience budget
                    </p>

                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">
                        {currencySymbol}
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Enter amount"
                        className="h-16 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-5 text-xl font-bold text-blue-950 outline-none transition placeholder:text-base placeholder:font-normal placeholder:text-gray-300 focus:border-blue-950 focus:ring-4 focus:ring-blue-950/5"
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {(currency === "EUR"
                      ? [150, 300, 500, 800]
                      : [175, 350, 600, 950]
                    ).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setBudget(String(value))}
                        className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                          budget === String(value)
                            ? "border-orange-500 bg-orange-50 text-orange-600"
                            : "border-gray-100 bg-white text-blue-950 hover:border-orange-200"
                        }`}
                      >
                        {currencySymbol}
                        {value}
                      </button>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl bg-blue-950 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                      Current plan
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      {days} days · {totalTravelers} travelers · {area}
                    </p>

                    {budget && (
                      <p className="mt-1 text-sm text-blue-200">
                        Budget: {currencySymbol}
                        {budget}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 5 */}

              {step === 5 && (
                <div className="p-6 md:p-10">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <SparklesIcon className="h-8 w-8" />
                  </div>

                  {/* SURPRISE ME */}

                  <button
                    type="button"
                    onClick={selectSurpriseMe}
                    className={`group mb-6 w-full rounded-3xl border p-6 text-left transition duration-300 ${
                      surpriseMe
                        ? "border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/10"
                        : "border-gray-100 bg-white hover:border-orange-200 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition ${
                            surpriseMe
                              ? "bg-orange-500 text-white"
                              : "bg-blue-950 text-white group-hover:bg-orange-500"
                          }`}
                        >
                          <SparklesIcon className="h-7 w-7" />
                        </div>

                        <div>
                          <p className="text-lg font-bold text-blue-950">
                            Surprise Me
                          </p>

                          <p className="mt-1 text-sm leading-6 text-gray-500">
                            Let our AI choose the perfect mix of experiences
                            for your trip.
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${
                          surpriseMe
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-gray-200 bg-white text-transparent"
                        }`}
                      >
                        ✓
                      </div>
                    </div>
                  </button>

                  {/* CATEGORY TITLE */}

                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-blue-950">
                        Or choose your favorites
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        You can select more than one.
                      </p>
                    </div>

                    {selectedCategories.length > 0 && (
                      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                        {selectedCategories.length} selected
                      </span>
                    )}
                  </div>

                  {/* CATEGORIES */}

                  <div className="grid gap-3 sm:grid-cols-2">
                    {experienceCategories.map((category) => {
                      const selected = selectedCategories.includes(
                        category.id
                      );

                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => toggleCategory(category.id)}
                          className={`group rounded-2xl border p-5 text-left transition duration-300 ${
                            selected
                              ? "border-blue-950 bg-blue-950 text-white shadow-lg shadow-blue-950/10"
                              : "border-gray-100 bg-white text-blue-950 hover:border-blue-200 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                                  selected
                                    ? "bg-orange-500 text-white"
                                    : "bg-blue-50 text-blue-700"
                                }`}
                              >
                                {category.icon}
                              </div>

                              <div>
                                <p className="font-bold">{category.title}</p>

                                <p
                                  className={`mt-1 text-xs leading-5 ${
                                    selected
                                      ? "text-blue-200"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {category.description}
                                </p>
                              </div>
                            </div>

                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                                selected
                                  ? "border-orange-500 bg-orange-500 text-white"
                                  : "border-gray-200 text-transparent"
                              }`}
                            >
                              ✓
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* SELECTION SUMMARY */}

                  <div className="mt-7 rounded-2xl bg-blue-950 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                      Your preferences
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      {surpriseMe
                        ? "Surprise me with the best experiences"
                        : selectedCategories.length > 0
                        ? `${selectedCategories.length} experience ${
                            selectedCategories.length === 1
                              ? "category"
                              : "categories"
                          } selected`
                        : "Choose at least one category"}
                    </p>

                    {!surpriseMe && selectedCategories.length > 0 && (
                      <p className="mt-2 text-sm leading-6 text-blue-200">
                        Our AI will use these preferences together with your
                        destination, duration, group size and budget.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* NAVIGATION */}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between md:px-10">
                <button
                  type="button"
                  onClick={previousStep}
                  disabled={step === 1}
                  className={`flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold transition ${
                    step === 1
                      ? "cursor-not-allowed text-gray-300"
                      : "border border-gray-200 bg-white text-blue-950 hover:border-blue-950"
                  }`}
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  Back
                </button>

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canContinue}
                    className={`group flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-bold text-white shadow-lg transition ${
                      canContinue
                        ? "bg-orange-500 shadow-orange-500/20 hover:-translate-y-0.5 hover:bg-orange-600"
                        : "cursor-not-allowed bg-gray-300 shadow-none"
                    }`}
                  >
                    Next

                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canContinue || isGenerating}
                    className={`group flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-bold text-white shadow-lg transition ${
                      canContinue && !isGenerating
                        ? "bg-orange-500 shadow-orange-500/20 hover:-translate-y-0.5 hover:bg-orange-600"
                        : "cursor-not-allowed bg-gray-300 shadow-none"
                    }`}
                  >
                    {isGenerating ? "Creating Your Trip..." : "Create My Trip"}

                    {!isGenerating && (
                      <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TRUST */}

          {step < 6 && (
            <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-semibold text-gray-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Real Via Blue experiences
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Real prices
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Personalized planning
              </span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}