"use client";

import { useEffect, useRef, useState } from "react";
import HomeText from "@/app/components/HomeText";

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
  const processingSectionRef = useRef<HTMLDivElement>(null);

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
  const [availableTours, setAvailableTours] = useState<PackageTour[]>([]);
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

  const replacePackageTour = (
    packageId: string,
    dayNumber: number,
    oldSlug: string,
    newSlug: string,
  ) => {
    const replacement = availableTours.find((tour) => tour.slug === newSlug);
    if (!replacement) return;

    const updatePackage = (pkg: PackageOption): PackageOption => {
      if (pkg.id !== packageId) return pkg;
      const alreadyIncluded = pkg.itinerary.some((day) =>
        day.tours.some((tour) => tour.slug === newSlug && tour.slug !== oldSlug)
      );
      if (alreadyIncluded) return pkg;

      const itinerary = pkg.itinerary.map((day) =>
        day.day !== dayNumber
          ? day
          : {
              ...day,
              tours: day.tours.map((tour) =>
                tour.slug === oldSlug
                  ? { ...replacement, day: dayNumber }
                  : tour
              ),
            }
      );
      const totalCost = Math.round(
        itinerary.reduce(
          (sum, day) =>
            sum + day.tours.reduce((daySum, tour) => daySum + tour.estimatedTotal, 0),
          0
        ) * 100
      ) / 100;

      return {
        ...pkg,
        itinerary,
        totalCost,
        remainingBudget: Math.round((pkg.budget - totalCost) * 100) / 100,
        activities: itinerary.reduce((sum, day) => sum + day.tours.length, 0),
      };
    };

    setPackages((current) => current.map(updatePackage));
    setSelectedPackage((current) => current ? updatePackage(current) : current);
  };

  const generateTrip = async () => {
    if (!canContinue || isGenerating) return;

    setError("");
    setPackages([]);
    setSelectedPackage(null);
    setProcessingStage(0);
    setIsGenerating(true);
    // Start the preparation screen at the top instead of preserving the form's scroll position.
    window.scrollTo(0, 0);
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
      setAvailableTours(data.alternatives ?? []);

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
    if (step !== 6) return;
    processingSectionRef.current?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  }, [step]);

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
    { en: "Understanding your travel style", de: "Wir verstehen Ihren Reisestil" },
    { en: "Matching real Via Blue experiences", de: "Wir finden passende Via-Blue-Erlebnisse" },
    { en: "Optimizing your days and activities", de: "Wir optimieren Ihre Tage und Aktivitäten" },
    { en: "Building 3 personalized packages", de: "Wir erstellen 3 persönliche Pakete" },
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
                <HomeText en="Via Blue Smart Trip Planner" de="Via Blue Smart Trip Planner" />
              </p>
            </div>

            <h1 className="text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
              <HomeText en="Your Holiday." de="Ihr Urlaub." />
              <span className="block text-orange-400">
                <HomeText en="Designed Around You." de="Ganz auf Sie zugeschnitten." />
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">
              <HomeText en="Tell us what you’re looking for and let our planner build a personalized Red Sea experience around you." de="Sagen Sie uns, was Sie suchen, und unser Planer gestaltet ein persönliches Erlebnis am Roten Meer für Sie." />
            </p>

            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white">
                <SparklesIcon className="h-4 w-4" />
              </span>

              <span className="text-sm font-semibold text-white">
                <HomeText en="Smart planning · <HomeText en="Real Via Blue experiences" de="Echte Via-Blue-Erlebnisse" />" de="Intelligente Planung · Echte Via-Blue-Erlebnisse" />
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
                  <HomeText en={`Step 0${step}`} de={`Schritt 0${step}`} />
                </p>
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
                {step === 1 && <HomeText en="Who are you travelling with?" de="Mit wem reisen Sie?" />}
                {step === 2 && <HomeText en="Where are you staying?" de="Wo wohnen Sie?" />}
                {step === 3 && <HomeText en="How long are you staying?" de="Wie lange bleiben Sie?" />}
                {step === 4 && <HomeText en="What’s your budget?" de="Wie hoch ist Ihr Budget?" />}
                {step === 5 && <HomeText en="What would you love to experience?" de="Was möchten Sie erleben?" />}
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
                {step === 1 &&
                  <HomeText en="Tell us who is joining you so we can build experiences that fit your group." de="Geben Sie an, wer mitreist, damit wir passende Erlebnisse für Ihre Gruppe planen können." />}

                {step === 2 &&
                  <HomeText en="Choose your main area and we’ll focus on experiences that work naturally from there." de="Wählen Sie Ihre Urlaubsregion, damit wir passende Erlebnisse in der Umgebung finden." />}

                {step === 3 &&
                  <HomeText en="Your trip length helps our planner decide how many experiences can comfortably fit." de="Anhand Ihrer Reisedauer planen wir, wie viele Erlebnisse gut hineinpassen." />}

                {step === 4 &&
                  <HomeText en="Set your spending limit and we’ll keep your recommendations within it." de="Legen Sie Ihr Budget fest, damit unsere Empfehlungen dazu passen." />}

                {step === 5 &&
                  <HomeText en="Choose your favorite experiences, or let the planner surprise you with the best combination." de="Wählen Sie Ihre Lieblingsaktivitäten oder lassen Sie sich von der besten Kombination überraschen." />}
              </p>
            </div>
          )}

          {/* AI PROCESSING */}

          {step === 6 && (
            <div
              ref={processingSectionRef}
              id="trip-planner-processing"
              className="scroll-mt-6 flex min-h-[560px] items-center justify-center"
            >
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
                      Via Blue Smart Planner
                    </p>

                    <span className="h-px w-10 bg-orange-500" />
                  </div>

                  <h2 className="text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
                    <HomeText en="Designing your perfect trip" de="Wir gestalten Ihre perfekte Reise" />
                  </h2>

                  <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500">
                    <HomeText en="We’re combining your preferences with real Via Blue experiences to create three different ways to enjoy your holiday." de="Wir kombinieren Ihre Wünsche mit echten Via-Blue-Erlebnissen und erstellen drei verschiedene Urlaubspakete." />
                  </p>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-xl shadow-blue-950/5 md:p-8">
                  {error ? (
                    <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                      <p className="font-bold text-red-700">
                        <HomeText en="We couldn’t create your trip." de="Ihre Reise konnte nicht erstellt werden." />
                      </p>

                      <p className="mt-2 text-sm leading-6 text-red-600">
                        {error}
                      </p>

                      <button
                        type="button"
                        onClick={generateTrip}
                        className="mt-5 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                      >
                        <HomeText en="Try Again" de="Erneut versuchen" />
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
                              key={item.en}
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
                        <span><HomeText en="Personalizing your journey" de="Ihre Reise wird personalisiert" /></span>

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
                      <HomeText en="Real prices" de="Echte Preise" />
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
                    Your Via Blue Trip Plan
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
                            <HomeText en="Recommended" de="Empfohlen" />
                          </span>
                        )}

                        <div className="absolute bottom-5 left-5 right-5">
                          <h3 className="text-2xl font-bold text-white">
                            {pkg.title}
                          </h3>

                          <p className="mt-1 text-sm text-blue-100">
                            {pkg.activities}{" "}
                            {pkg.activities === 1 ? <HomeText en="experience" de="Erlebnis" /> : <HomeText en="experiences" de="Erlebnisse" />}
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
                              <HomeText en="Estimated total" de="Geschätzter Gesamtpreis" />
                            </p>

                            <p className="mt-1 text-3xl font-bold text-blue-950">
                              {pkg.currency === "EUR" ? "€" : "$"}
                              {pkg.totalCost.toFixed(2)}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-xs font-semibold text-gray-400">
                              <HomeText en="Remaining" de="Übrig" />
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
                                    <HomeText en={`Day ${day.day}`} de={`Tag ${day.day}`} />
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

                                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 pt-3">
                                        <span className="text-xs font-semibold text-gray-500">
                                          {tour.estimatedTotal.toFixed(2)} {pkg.currency}
                                        </span>
                                        <select
                                          key={`${pkg.id}-${tour.slug}`}
                                          defaultValue=""
                                          aria-label={`Ersetzen: ${tour.name}`}
                                          onChange={(event) => {
                                            if (event.target.value) {
                                              replacePackageTour(
                                                pkg.id,
                                                day.day,
                                                tour.slug,
                                                event.target.value
                                              );
                                            }
                                          }}
                                          className="max-w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs font-bold text-blue-950 outline-none focus:border-orange-500"
                                        >
                                          <option value="" disabled>
                                            <HomeText en="Replace experience…" de="Erlebnis ersetzen…" />
                                          </option>
                                          {availableTours
                                            .filter((option) =>
                                              option.slug !== tour.slug &&
                                              !pkg.itinerary.some((item) =>
                                                item.tours.some((existing) =>
                                                  existing.slug === option.slug &&
                                                  existing.slug !== tour.slug
                                                )
                                              )
                                            )
                                            .map((option) => (
                                              <option key={option.slug} value={option.slug}>
                                                {option.name} · {pkg.currency === "EUR" ? "€" : "$"}{option.estimatedTotal.toFixed(2)}
                                              </option>
                                            ))}
                                        </select>
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
                          {selected ? <HomeText en="Package Selected" de="Paket ausgewählt" /> : <HomeText en="Choose This Package" de="Dieses Paket auswählen" />}

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
                        <HomeText en="Selected package" de="Ausgewähltes Paket" />
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        {selectedPackage.title}
                      </p>

                      <p className="mt-1 text-sm text-blue-200">
                        {selectedPackage.activities} <HomeText en="experiences" de="Erlebnisse" /> ·{" "}
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
                      <HomeText en="Book This Package" de="Dieses Paket buchen" />
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
                  <HomeText en="Adjust My Preferences" de="Meine Angaben anpassen" />
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
                        <p className="font-bold text-blue-950"><HomeText en="Adults" de="Erwachsene" /></p>
                        <p className="mt-1 text-sm text-gray-400"><HomeText en="Age 11+" de="Ab 11 Jahren" /></p>
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
                        <p className="font-bold text-blue-950"><HomeText en="Children" de="Kinder" /></p>
                        <p className="mt-1 text-sm text-gray-400"><HomeText en="Age 5–10" de="5–10 Jahre" /></p>
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
                                <HomeText en="Red Sea area" de="Region am Roten Meer" />
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
                      <HomeText en="I’m staying for" de="Ich bleibe" />
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
                          {days === 1 ? <HomeText en="day" de="Tag" /> : <HomeText en="days" de="Tage" />}
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
                          {value}<HomeText en="d" de="T" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-blue-950 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                      <HomeText en="Trip overview" de="Reiseübersicht" />
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      {days} <HomeText en="days in" de="Tage in" /> {area}
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
                              {item === "EUR" ? <HomeText en="Euro" de="Euro" /> : <HomeText en="US Dollar" de="US-Dollar" />}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="mb-4 text-sm font-bold text-blue-950">
                      <HomeText en="Your experience budget" de="Ihr Budget für Erlebnisse" />
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
                        placeholder="Betrag eingeben"
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
                      <HomeText en="Current plan" de="Aktueller Plan" />
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      {days} <HomeText en="days" de="Tage" /> · {totalTravelers} <HomeText en="travelers" de="Reisende" /> · {area}
                    </p>

                    {budget && (
                      <p className="mt-1 text-sm text-blue-200">
                        <HomeText en="Budget:" de="Budget:" /> {currencySymbol}
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
                            <HomeText en="Surprise Me" de="Überraschen Sie mich" />
                          </p>

                          <p className="mt-1 text-sm leading-6 text-gray-500">
                            <HomeText en="Let the planner choose the perfect mix of experiences for your trip." de="Lassen Sie den Planer die perfekte Mischung an Erlebnissen für Ihre Reise auswählen." />
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
                        <HomeText en="Or choose your favorites" de="Oder wählen Sie Ihre Favoriten" />
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        <HomeText en="You can select more than one." de="Sie können mehrere auswählen." />
                      </p>
                    </div>

                    {selectedCategories.length > 0 && (
                      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                        {selectedCategories.length} <HomeText en="selected" de="ausgewählt" />
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
                                <p className="font-bold">{category.id === "islands-boat-trips" ? <HomeText en="Islands & Boat Trips" de="Inseln und Bootsausflüge" /> : category.id === "snorkeling-diving" ? <HomeText en="Snorkeling & Diving" de="Schnorcheln und Tauchen" /> : category.id === "sea-water-activities" ? <HomeText en="Sea & Water Activities" de="Wasseraktivitäten" /> : category.id === "dolphin-experiences" ? <HomeText en="Dolphin Experiences" de="Delfinerlebnisse" /> : category.id === "desert-adventures" ? <HomeText en="Desert Adventures" de="Wüstenabenteuer" /> : category.id === "egypt-tours-excursions" ? <HomeText en="Egypt Tours" de="Ägypten-Ausflüge" /> : <HomeText en="Family Attractions" de="Familienattraktionen" />}</p>

                                <p
                                  className={`mt-1 text-xs leading-5 ${
                                    selected
                                      ? "text-blue-200"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {category.id === "islands-boat-trips" ? <HomeText en="Boats, islands, cruises & sea days" de="Boote, Inseln, Kreuzfahrten und Meer" /> : category.id === "snorkeling-diving" ? <HomeText en="Coral reefs, snorkeling & diving" de="Korallenriffe, Schnorcheln und Tauchen" /> : category.id === "sea-water-activities" ? <HomeText en="Parasailing, water sports & fun" de="Parasailing, Wassersport und Spaß" /> : category.id === "dolphin-experiences" ? <HomeText en="Dolphins, encounters & marine life" de="Delfine und Meereslebewesen" /> : category.id === "desert-adventures" ? <HomeText en="Safaris, quad bikes & Bedouin life" de="Safaris, Quads und Beduinenleben" /> : category.id === "egypt-tours-excursions" ? <HomeText en="Luxor, Cairo & ancient Egypt" de="Luxor, Kairo und das alte Ägypten" /> : <HomeText en="Fun experiences for the whole family" de="Erlebnisse für die ganze Familie" />}
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
                      <HomeText en="Your preferences" de="Ihre Wünsche" />
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      {surpriseMe
                        ? <HomeText en="Surprise me with the best experiences" de="Überraschen Sie mich mit den besten Erlebnissen" />
                        : selectedCategories.length > 0
                        ? <>{selectedCategories.length} {selectedCategories.length === 1 ? <HomeText en="category" de="Kategorie" /> : <HomeText en="categories" de="Kategorien" />} <HomeText en="selected" de="ausgewählt" /></>
                        : <HomeText en="Choose at least one category" de="Wählen Sie mindestens eine Kategorie aus" />}
                    </p>

                    {!surpriseMe && selectedCategories.length > 0 && (
                      <p className="mt-2 text-sm leading-6 text-blue-200">
                        <HomeText en="The planner will use these preferences together with your destination, duration, group size and budget." de="Der Planer berücksichtigt diese Wünsche zusammen mit Reiseziel, Dauer, Gruppengröße und Budget." />
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
                  <HomeText en="Back" de="Zurück" />
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
                    <HomeText en="Next" de="Weiter" />

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
                    {isGenerating ? <HomeText en="Creating Your Trip..." de="Ihre Reise wird erstellt..." /> : <HomeText en="Create My Trip" de="Meine Reise erstellen" />}

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
                <HomeText en="Personalized planning" de="Individuelle Planung" />
              </span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}