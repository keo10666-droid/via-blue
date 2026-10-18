"use client";

import { supabase } from "@/lib/supabase";

import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import BookingSuccessModal from "@/app/components/BookingSuccessModal";
import HomeText from "@/app/components/HomeText";
import type { LuxuryPricing } from "@/lib/luxuryPricing";

type LuxuryBookingFormProps = {
  tourName: string;
  tourSlug?: string;
  adultPrice?: number;
  tourType?: string;
  included?: string[];
  pricing: LuxuryPricing;
};

const privatePrices: Record<number, number> = {
  2: 150,
  3: 180,
  4: 210,
  5: 240,
  6: 270,
  7: 300,
  8: 330,
  9: 360,
  10: 390,
  11: 420,
  12: 450,
  13: 480,
  14: 510,
  15: 540,
  16: 570,
  17: 600,
  18: 630,
  19: 660,
  20: 690,
  21: 720,
  22: 750,
  23: 780,
  24: 810,
  25: 840,
};

const nationalities = [
  "Egyptian",
  "German",
  "British",
  "French",
  "Italian",
  "Polish",
  "Dutch",
  "Belgian",
  "Swiss",
  "Austrian",
  "Russian",
  "Ukrainian",
  "Spanish",
  "Portuguese",
  "Turkish",
  "American",
  "Canadian",
  "Brazilian",
  "Australian",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Czech",
  "Slovak",
  "Romanian",
  "Hungarian",
  "Serbian",
  "Croatian",
  "Slovenian",
  "Irish",
  "Greek",
  "Saudi",
  "Emirati",
  "Kuwaiti",
  "Qatari",
  "Bahraini",
  "Omani",
  "Jordanian",
  "Lebanese",
  "Moroccan",
  "Algerian",
  "Tunisian",
  "Libyan",
  "South African",
  "Indian",
  "Pakistani",
  "Chinese",
  "Japanese",
  "Korean",
];

const germanLuxuryTourNames: Record<string, string> = {
  "Luxor Private Tour": "Private Tour nach Luxor",
  "Cairo Private Tour": "Private Tour nach Kairo",
  "Alexandria Private Tour": "Private Tour nach Alexandria",
  "Aswan Private Tour": "Private Tour nach Assuan",
  "Private Speed Boat": "Privates Schnellboot",
  "Private Quad Safari": "Private Quad-Safari",
  "Private Buggy Safari": "Private Buggy-Safari",
  "Private Boat": "Privates Boot",
};

const germanLuxuryTourTypes: Record<string, string> = {
  "Private Tour": "Private Tour",
  "Private Boat": "Privates Boot",
  "Private Safari": "Private Safari",
};

const germanLuxuryIncluded: Record<string, string> = {
  "Private transportation": "Privater Transfer",
  "Professional driver": "Professioneller Fahrer",
  "Hotel pickup and drop-off": "Abholung und Rücktransfer zum Hotel",
  "Flexible private experience": "Flexibles privates Erlebnis",
  "Private modern air-conditioned transportation": "Privater, moderner und klimatisierter Transport",
  "Professional private tour guide": "Professioneller privater Reiseleiter",
  "Entrance tickets to all listed attractions": "Eintrittskarten für alle aufgeführten Sehenswürdigkeiten",
  "Lunch": "Mittagessen",
  "Fully private experience": "Exklusives privates Erlebnis",
  "Private speed boat": "Privates Schnellboot",
  "Professional crew": "Professionelle Crew",
  "Hotel transfer": "Hoteltransfer",
  "Private safari experience": "Privates Safari-Erlebnis",
  "Quad bike": "Quad",
  "Professional guide": "Professioneller Guide",
  "Private buggy experience": "Privates Buggy-Erlebnis",
  "Desert adventure": "Wüstenabenteuer",
  "Private boat": "Privates Boot",
  "Exclusive private experience": "Exklusives privates Erlebnis",
  "Flexible timing": "Flexible Zeitplanung",
};

const countryCodes = [
  { name: "Egypt", dialCode: "+20", iso: "eg" },
  { name: "Germany", dialCode: "+49", iso: "de" },
  { name: "United Kingdom", dialCode: "+44", iso: "gb" },
  { name: "France", dialCode: "+33", iso: "fr" },
  { name: "Italy", dialCode: "+39", iso: "it" },
  { name: "Poland", dialCode: "+48", iso: "pl" },
  { name: "Netherlands", dialCode: "+31", iso: "nl" },
  { name: "Belgium", dialCode: "+32", iso: "be" },
  { name: "Switzerland", dialCode: "+41", iso: "ch" },
  { name: "Austria", dialCode: "+43", iso: "at" },
  { name: "Russia", dialCode: "+7", iso: "ru" },
  { name: "Ukraine", dialCode: "+380", iso: "ua" },
  { name: "Spain", dialCode: "+34", iso: "es" },
  { name: "Portugal", dialCode: "+351", iso: "pt" },
  { name: "Turkey", dialCode: "+90", iso: "tr" },
  { name: "United States", dialCode: "+1", iso: "us" },
  { name: "Canada", dialCode: "+1", iso: "ca" },
  { name: "Brazil", dialCode: "+55", iso: "br" },
  { name: "Australia", dialCode: "+61", iso: "au" },
  { name: "Sweden", dialCode: "+46", iso: "se" },
  { name: "Norway", dialCode: "+47", iso: "no" },
  { name: "Denmark", dialCode: "+45", iso: "dk" },
  { name: "Finland", dialCode: "+358", iso: "fi" },
  { name: "Czech Republic", dialCode: "+420", iso: "cz" },
  { name: "Slovakia", dialCode: "+421", iso: "sk" },
  { name: "Romania", dialCode: "+40", iso: "ro" },
  { name: "Hungary", dialCode: "+36", iso: "hu" },
  { name: "Serbia", dialCode: "+381", iso: "rs" },
  { name: "Croatia", dialCode: "+385", iso: "hr" },
  { name: "Slovenia", dialCode: "+386", iso: "si" },
  { name: "Ireland", dialCode: "+353", iso: "ie" },
  { name: "Greece", dialCode: "+30", iso: "gr" },
  { name: "Saudi Arabia", dialCode: "+966", iso: "sa" },
  { name: "United Arab Emirates", dialCode: "+971", iso: "ae" },
  { name: "Kuwait", dialCode: "+965", iso: "kw" },
  { name: "Qatar", dialCode: "+974", iso: "qa" },
  { name: "Bahrain", dialCode: "+973", iso: "bh" },
  { name: "Oman", dialCode: "+968", iso: "om" },
  { name: "Jordan", dialCode: "+962", iso: "jo" },
  { name: "Lebanon", dialCode: "+961", iso: "lb" },
  { name: "Morocco", dialCode: "+212", iso: "ma" },
  { name: "Algeria", dialCode: "+213", iso: "dz" },
  { name: "Tunisia", dialCode: "+216", iso: "tn" },
  { name: "Libya", dialCode: "+218", iso: "ly" },
  { name: "South Africa", dialCode: "+27", iso: "za" },
  { name: "India", dialCode: "+91", iso: "in" },
  { name: "Pakistan", dialCode: "+92", iso: "pk" },
  { name: "China", dialCode: "+86", iso: "cn" },
  { name: "Japan", dialCode: "+81", iso: "jp" },
  { name: "South Korea", dialCode: "+82", iso: "kr" },
];

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M7 3h3l1.5 4-2 1.5c1 2.2 2.8 4 5 5l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C11.4 18 6 12.6 6 6c0-1.7.4-3 1-3Z" />
    </svg>
  );
}

function HotelIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
      <path d="M4 13h16M7 8h2M13 8h2M7 11h2M13 11h2M3 21h18" />
    </svg>
  );
}

function DoorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M5 21V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17" />
      <path d="M3 21h18M15 12h.01" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function ChevronDownIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`h-4 w-4 transition-transform ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      className="h-4 w-4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2 1.2-3.6A7.5 7.5 0 1 1 20 11.5Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c.5-3.3 2.5-5 6-5s5.5 1.7 6 5" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M17 14c2.4.5 3.7 2 4 4" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" />
      <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
    </svg>
  );
}

const FlagIcon = ({
  iso,
  name,
}: {
  iso: string;
  name: string;
}) => (
  <img
    src={`https://flagcdn.com/24x18/${iso}.png`}
    srcSet={`https://flagcdn.com/48x36/${iso}.png 2x`}
    alt={name}
    width={24}
    height={18}
    className="inline-block rounded-sm object-cover"
  />
);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatDateDisplay(value: string) {
  if (!value) return "";

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return "";

  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getLocalTomorrow() {
  const d = new Date();

  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);

  return d;
}

function dateToIso(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startOffset = (firstDay.getDay() + 6) % 7;

  const days: Array<Date | null> = [];

  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  while (days.length < 42) {
    days.push(null);
  }

  return days;
}

function NoPeriods({ children }: { children: ReactNode }) {
  const cleanTextNodes = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === "string") {
        return child.replace(/\./g, "");
      }

      if (!isValidElement(child)) {
        return child;
      }

      const props = child.props as {
        children?: ReactNode;
      };

      if (props.children === undefined) {
        return child;
      }

      return cloneElement(
        child as ReactElement<any>,
        {
          children: cleanTextNodes(props.children),
        }
      );
    });

  return <>{cleanTextNodes(children)}</>;
}

export default function LuxuryBookingForm({
  tourName,
  tourSlug = "",
  tourType = "Private Luxury",
  included = [],
  pricing,
}: LuxuryBookingFormProps) {
  const [isGerman, setIsGerman] = useState(false);
  const displayTourName = isGerman ? (germanLuxuryTourNames[tourName] ?? tourName) : tourName;
  const displayTourType = isGerman ? (germanLuxuryTourTypes[tourType] ?? tourType) : tourType;
  const displayIncluded = isGerman
    ? included.map((item) => germanLuxuryIncluded[item] ?? item)
    : included;
  useEffect(() => {
    const syncLanguage = () => setIsGerman(localStorage.getItem("via-blue-language") === "de");
    syncLanguage();
    window.addEventListener("via-blue-language-change", syncLanguage);
    return () => window.removeEventListener("via-blue-language-change", syncLanguage);
  }, []);

  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [isNationalityOpen, setIsNationalityOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes[0]
  );

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hotel, setHotel] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const [date, setDate] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(
    () => getLocalTomorrow()
  );

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childAges, setChildAges] = useState<string[]>([]);
  const [infantAges, setInfantAges] = useState<string[]>([]);

  const [selectedVehicle, setSelectedVehicle] = useState("limousine");
  const [selectedMuseum, setSelectedMuseum] = useState("old");
  const [selectedQuadDuration, setSelectedQuadDuration] = useState<"1-hour" | "3-hours">("1-hour");
  const [selectedQuadStartTime, setSelectedQuadStartTime] = useState<"09:00" | "15:00">("09:00");
  const [singleQuadCount, setSingleQuadCount] = useState(0);
  const [doubleQuadCount, setDoubleQuadCount] = useState(1);
  const [twoSeatBuggyCount, setTwoSeatBuggyCount] = useState(1);
  const [fourSeatBuggyCount, setFourSeatBuggyCount] = useState(0);
  const [selectedIslands, setSelectedIslands] = useState<string[]>([]);

  const [notes, setNotes] = useState("");

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmationEmailSent, setConfirmationEmailSent] =
    useState(false);

  // Infants are recorded for the booking, but never affect price or vehicle/boat capacity.
  const totalGuests = adults + children;
  const recordedGuests = adults + children + infants;
  const chargeableGuests = adults + children;

  const pricingTour = ["luxor", "cairo", "speed-boat", "private-boat", "quad-safari", "buggy-safari"].includes(tourSlug);
  const singleQuadUnitPrice = selectedQuadDuration === "1-hour" ? 40 : 55;
  const doubleQuadUnitPrice = selectedQuadDuration === "1-hour" ? 50 : 70;
  const requiredQuadCount = singleQuadCount + doubleQuadCount;
  const quadTotalPrice = singleQuadCount * singleQuadUnitPrice + doubleQuadCount * doubleQuadUnitPrice;
  const childrenUnderTen = childAges.filter((age) => age !== "" && Number(age) < 10).length;
  const quadSeatsSelected = singleQuadCount + doubleQuadCount * 2;
  const quadAllocationValid =
    quadSeatsSelected === recordedGuests &&
    requiredQuadCount <= adults &&
    doubleQuadCount >= infants + childrenUnderTen;
  const requiredBuggyCount = twoSeatBuggyCount + fourSeatBuggyCount;
  const buggySeatsSelected = twoSeatBuggyCount * 2 + fourSeatBuggyCount * 4;
  const buggyTotalPrice = twoSeatBuggyCount * 100 + fourSeatBuggyCount * 125;
  const buggyAllocationValid =
    buggySeatsSelected === recordedGuests &&
    requiredBuggyCount <= adults;
  const islandPrices: Record<string, number> = {
    paradise: pricing.island_paradise,
    orange: pricing.island_orange,
    hula: pricing.island_hula,
    magaweesh: pricing.island_magaweesh,
    amwaj: pricing.island_amwaj,
    eden: pricing.island_eden,
    ouzeria: pricing.island_ouzeria,
    mahmya: pricing.island_mahmya,
  };

  let baseTourPrice: number | null = null;

  if (tourSlug === "luxor") {
    if (selectedVehicle === "limousine" && chargeableGuests === 1) baseTourPrice = pricing.luxor_limo_1;
    if (selectedVehicle === "limousine" && chargeableGuests === 2) baseTourPrice = pricing.luxor_limo_2;
    if (selectedVehicle === "xpander" && chargeableGuests === 2) baseTourPrice = pricing.luxor_xpander_2;
    if (selectedVehicle === "xpander" && chargeableGuests === 3) baseTourPrice = pricing.luxor_xpander_3;
    if (selectedVehicle === "hiace" && chargeableGuests >= 4 && chargeableGuests <= 8) {
      baseTourPrice = pricing.luxor_hiace_4 + (chargeableGuests - 4) * pricing.luxor_hiace_extra;
    }
  } else if (tourSlug === "cairo") {
    if (selectedVehicle === "limousine" && chargeableGuests === 1) {
      baseTourPrice = selectedMuseum === "old" ? pricing.cairo_old_limo_1 : pricing.cairo_grand_limo_1;
    }
    if (selectedVehicle === "limousine" && chargeableGuests === 2) {
      baseTourPrice = selectedMuseum === "old" ? pricing.cairo_old_limo_2 : pricing.cairo_grand_limo_2;
    }
    if (selectedVehicle === "xpander" && chargeableGuests === 2) {
      baseTourPrice = selectedMuseum === "old" ? pricing.cairo_old_xpander_2 : pricing.cairo_grand_xpander_2;
    }
    if (selectedVehicle === "xpander" && chargeableGuests === 3) {
      baseTourPrice = selectedMuseum === "old" ? pricing.cairo_old_xpander_3 : pricing.cairo_grand_xpander_3;
    }
    if (selectedVehicle === "hiace" && chargeableGuests >= 4 && chargeableGuests <= 8) {
      baseTourPrice =
        (selectedMuseum === "old" ? pricing.cairo_old_hiace_4 : pricing.cairo_grand_hiace_4) +
        (chargeableGuests - 4) * (selectedMuseum === "old" ? pricing.cairo_old_hiace_extra : pricing.cairo_grand_hiace_extra);
    }
  } else if (tourSlug === "speed-boat") {
    // Boat capacity/size is based on adults and children; infants are recorded but excluded.
    if (totalGuests >= 1 && totalGuests <= 4) baseTourPrice = pricing.speed_boat_up_to_4;
    if (totalGuests >= 5 && totalGuests <= 8) baseTourPrice = pricing.speed_boat_up_to_8;
  } else if (tourSlug === "private-boat") {
    // Boat capacity/size is based on adults and children; infants are recorded but excluded.
    if (totalGuests >= 1 && totalGuests <= 15) baseTourPrice = pricing.private_boat_up_to_15;
    if (totalGuests >= 16 && totalGuests <= 30) baseTourPrice = pricing.private_boat_up_to_30;
  } else if (tourSlug === "quad-safari") {
    // Price each selected quad and multiply by the number needed for the group.
    if (chargeableGuests >= 1 && totalGuests <= 25) baseTourPrice = quadTotalPrice;
  } else if (tourSlug === "buggy-safari") {
    // One fixed 3-hour private buggy program; price each selected vehicle.
    if (recordedGuests >= 1 && recordedGuests <= 25) baseTourPrice = buggyTotalPrice;
  }

  const islandExtra = selectedIslands.reduce(
    (sum, island) => sum + (islandPrices[island] ?? 0),
    0
  ) * chargeableGuests;

  const pricingCapacity =
    tourSlug === "private-boat" ? 30 :
    ["luxor", "cairo", "speed-boat"].includes(tourSlug) ? 8 : 25;
  const pricingValid =
    !pricingTour ||
    (baseTourPrice !== null &&
      totalGuests <= pricingCapacity &&
      (tourSlug !== "quad-safari" || quadAllocationValid) &&
      (tourSlug !== "buggy-safari" || buggyAllocationValid));
  const totalPrice = pricingTour
    ? (baseTourPrice ?? 0) + islandExtra
    : privatePrices[Math.min(Math.max(chargeableGuests, 2), 25)] ?? privatePrices[25];
  const displayedTotalPrice = pricingValid ? `€${totalPrice}` : "—";

  const pricingDetails = [
    pricingTour && (tourSlug === "luxor" || tourSlug === "cairo")
      ? `Vehicle: ${selectedVehicle}`
      : "",
    tourSlug === "quad-safari" ? `Quad duration: ${selectedQuadDuration === "1-hour" ? "1 hour" : "3 hours"}\nStart time: ${selectedQuadStartTime}\nSingle Quads: ${singleQuadCount} × €${singleQuadUnitPrice}\nDouble Quads: ${doubleQuadCount} × €${doubleQuadUnitPrice}\nTotal quads: ${requiredQuadCount}\nTotal quad price: €${quadTotalPrice}\nGuest seats selected: ${quadSeatsSelected}/${recordedGuests}\nChildren under 10 and infants must be passengers on Double Quads.` : "",
    tourSlug === "buggy-safari" ? `Program duration: 3 hours\n2-person buggies: ${twoSeatBuggyCount} × €100\n4-person buggies: ${fourSeatBuggyCount} × €125\nTotal buggies: ${requiredBuggyCount}\nTotal buggy price: €${buggyTotalPrice}\nGuest seats selected: ${buggySeatsSelected}/${recordedGuests}` : "",
    tourSlug === "cairo" ? `Museum: ${selectedMuseum === "old" ? "Old Egyptian Museum" : "Grand Egyptian Museum"}` : "",
    selectedIslands.length
      ? `Islands: ${selectedIslands.join(", ")}`
      : "",
  ].filter(Boolean).join("\n");

  const filteredNationalities = useMemo(() => {
    if (!nationality) return [];

    return nationalities
      .filter((n) =>
        n.toLowerCase().includes(nationality.toLowerCase())
      )
      .slice(0, 7);
  }, [nationality]);

  const filteredCountryCodes = useMemo(() => {
    if (!countrySearch) return countryCodes;

    return countryCodes.filter(
      (c) =>
        c.name
          .toLowerCase()
          .includes(countrySearch.toLowerCase()) ||
        c.dialCode.includes(countrySearch)
    );
  }, [countrySearch]);

  const tomorrowIso = useMemo(
    () => dateToIso(getLocalTomorrow()),
    []
  );

  const calendarDays = useMemo(
    () => getCalendarDays(calendarMonth),
    [calendarMonth]
  );

  const calendarMonthLabel = calendarMonth.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  const canGoPreviousMonth = useMemo(() => {
    const tomorrow = getLocalTomorrow();

    return (
      calendarMonth.getFullYear() > tomorrow.getFullYear() ||
      (calendarMonth.getFullYear() ===
        tomorrow.getFullYear() &&
        calendarMonth.getMonth() > tomorrow.getMonth())
    );
  }, [calendarMonth]);

  const selectDate = (selectedDate: Date) => {
    const tomorrow = getLocalTomorrow();

    if (selectedDate < tomorrow) return;

    setDate(dateToIso(selectedDate));
    setIsCalendarOpen(false);
  };

  const isPhoneValid =
    phone.replace(/\D/g, "").length >= 6;

  const isEmailValid = EMAIL_REGEX.test(email.trim());

  const isNameValid = name.trim().length >= 2;

  const isDateValid =
    date.length > 0 && date >= tomorrowIso;

  const maxGuests =
    tourSlug === "private-boat" ? 30 :
    ["luxor", "cairo", "speed-boat"].includes(tourSlug) ? 8 : 25;

  const minGuests = pricingTour ? 1 : 2;

  const isGuestsValid =
    chargeableGuests >= minGuests && totalGuests <= maxGuests && adults >= 1;
  const allChildAgesSet =
    childAges.length === children && childAges.every((age) => age !== "");
  const allInfantAgesSet =
    infantAges.length === infants && infantAges.every((age) => age !== "");
  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isDateValid &&
    isGuestsValid &&
    allChildAgesSet &&
    allInfantAgesSet &&
    pricingValid;
  const inputClass = (invalid: boolean) =>
    `h-[54px] w-full rounded-2xl border bg-white px-4 text-[15px] font-medium text-slate-800 placeholder:text-slate-400 transition-all duration-200 outline-none ${
      invalid
        ? "border-red-400 ring-4 ring-red-50"
        : "border-slate-200 hover:border-slate-300 focus:border-blue-900 focus:ring-4 focus:ring-blue-900/5"
    }`;

  const labelClass =
    "mb-2.5 block text-[13px] font-bold uppercase tracking-[0.08em] text-slate-500";

  const errorText = (msg: ReactNode) => (
    <p className="mt-2 text-xs font-semibold text-red-600">
      {msg}
    </p>
  );


  const handleSubmit = async () => {
  setSubmitAttempted(true);

  if (!isFormValid) return;

  const fullPhone = `${selectedCountry.dialCode} ${phone.trim()}`;

  const message = `
NEW LUXURY BOOKING REQUEST

Tour: ${displayTourName}

Type: ${displayTourType}

Full Name: ${name.trim()}

Nationality: ${nationality || "Not specified"}

Email: ${email.trim()}

Hotel: ${hotel || "Not specified"}

Room Number: ${roomNumber || "Not specified"}

Date: ${date}

Adults: ${adults}\nChildren: ${children} (ages: ${childAges.join(", ") || "not specified"})\nInfants: ${infants} (ages in months: ${infantAges.join(", ") || "not specified"})\nTotal chargeable/capacity guests: ${totalGuests}\nTotal people including infants: ${recordedGuests}

${pricingDetails ? `${pricingDetails}; ` : ""}

PRIVATE TOUR PRICE: €${totalPrice}${pricingValid ? "" : " (Please select a vehicle/range that supports your group size)"}

WhatsApp: ${fullPhone}

Notes:
${notes.trim() || "-"}
`;

  const html = message
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br />");

  const { data: { session } } = await supabase.auth.getSession();

  try {
    const response = await fetch(
      "/api/send-booking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `New Luxury Tour Booking - ${displayTourName}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
              <h2 style="color: #0f172a;">New Luxury Tour Booking Request</h2>
              <div>${html}</div>
            </div>
          `,
          replyTo: email.trim(),
          accessToken: session?.access_token || null,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.error || "Failed to send booking"
      );
    }

    setConfirmationEmailSent(result.customerEmailSent !== false);
    setShowSuccess(true);
  } catch (error) {
    console.error(
      "Luxury booking submission error:",
      error
    );

    alert(
      isGerman
        ? "Beim Senden Ihrer Buchung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
        : "Something went wrong while submitting your booking. Please try again"
    );
  }
};

  return (
    <NoPeriods>
      <BookingSuccessModal
        open={showSuccess}
        guestName={name.trim()}
        bookingName={displayTourName}
        email={email.trim()}
        emailSent={confirmationEmailSent}
        backHref="/luxury-tours"
        backLabel="Back to Luxury Tours"
        onClose={() => setShowSuccess(false)}
      />
      <main className="min-h-screen bg-[#f5f7fa] px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-[1280px]">

          {/* HERO */}
          <section className="relative mb-8 overflow-hidden rounded-[30px] bg-[#071a36] shadow-[0_24px_70px_rgba(7,26,54,0.18)]">
            <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="relative px-6 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-12">
              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div className="max-w-3xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-300">
                    <SparklesIcon />
                    <HomeText en="Private Luxury Experience" de="Luxuriöses privates Erlebnis" />
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[1.08]">
                    <HomeText en="Reserve your private" de="Reservieren Sie Ihr privates" />
                    <span className="block text-orange-400">
                      {displayTourName}
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    <HomeText en="Complete your details below and send your booking request directly to our team. We will confirm your private experience with you." de="Vervollständigen Sie die Angaben und senden Sie Ihre Buchungsanfrage direkt an unser Team. Wir bestätigen anschließend Ihr privates Erlebnis." />
                  </p>
                </div>

                <div className="hidden shrink-0 lg:block">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      <HomeText en="Experience" de="Erlebnis" />
                    </div>

                    <div className="mt-1 text-lg font-bold text-white">
                      {displayTourType}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_350px]">

            {/* FORM */}
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">

              <div className="border-b border-slate-100 px-6 py-6 sm:px-9">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-500">
                      Step 01
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-[#071a36] sm:text-2xl">
                      <HomeText en="Guest details" de="Angaben zu den Gästen" />
                    </h2>
                  </div>

                  <div className="hidden items-center gap-2 sm:flex">
                    <div className="h-1.5 w-10 rounded-full bg-orange-500" />
                    <div className="h-1.5 w-10 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-10 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-9">

                {/* PERSONAL */}
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0b3a78]">
                      <UserIcon />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#071a36]">
                        <HomeText en="Personal information" de="Persönliche Angaben" />
                      </h3>

                      <p className="text-xs text-slate-400">
                        <HomeText en="Tell us who will be joining the experience" de="Teilen Sie uns mit, wer an diesem Erlebnis teilnimmt" />
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label className={labelClass}>
                        <HomeText en="Full Name *" de="Vollständiger Name *" />
                      </label>

                      <div className="relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <UserIcon />
                        </div>

                        <input
                          type="text"
                          placeholder={isGerman ? "Vollständigen Namen eingeben" : "Enter full name"}
                          value={name}
                          onChange={(e) =>
                            setName(e.target.value)
                          }
                          className={`${inputClass(
                            submitAttempted && !isNameValid
                          )} pl-12`}
                        />
                      </div>

                      {submitAttempted &&
                        !isNameValid &&
                        errorText(
                          <HomeText en="Please enter the guest's full name." de="Bitte geben Sie den vollständigen Namen des Gastes ein." />
                        )}
                    </div>

                    <div className="relative">
                      <label className={labelClass}>
                        <HomeText en="Nationality" de="Nationalität" />
                      </label>

                      <div className="relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <GlobeIcon />
                        </div>

                        <input
                          type="text"
                          placeholder={isGerman ? "Nationalität auswählen" : "Select nationality"}
                          value={nationality}
                          onChange={(e) => {
                            setNationality(e.target.value);
                            setIsNationalityOpen(true);
                          }}
                          onFocus={() =>
                            setIsNationalityOpen(true)
                          }
                          onBlur={() =>
                            setTimeout(
                              () =>
                                setIsNationalityOpen(false),
                              150
                            )
                          }
                          className={`${inputClass(false)} pl-12`}
                        />
                      </div>

                      {isNationalityOpen &&
                        filteredNationalities.length > 0 && (
                          <div className="absolute left-0 right-0 top-[78px] z-40 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_45px_rgba(15,23,42,0.15)]">
                            {filteredNationalities.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onMouseDown={(e) =>
                                  e.preventDefault()
                                }
                                onClick={() => {
                                  setNationality(item);
                                  setIsNationalityOpen(false);
                                }}
                                className="flex w-full items-center rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-[#0b3a78]"
                              >
                                <GlobeIcon />

                                <span className="ml-3">
                                  {item}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                    </div>

                    <div>
                      <label className={labelClass}>
                        <HomeText en="Email *" de="E-Mail *" />
                      </label>

                      <div className="relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <MailIcon />
                        </div>

                        <input
                          type="email"
                          placeholder={isGerman ? "du@beispiel.de" : "you@example.com"}
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          className={`${inputClass(
                            submitAttempted && !isEmailValid
                          )} pl-12`}
                        />
                      </div>

                      {submitAttempted &&
                        !isEmailValid &&
                        errorText(
                          <HomeText en="Please enter a valid email address." de="Bitte geben Sie eine gültige E-Mail-Adresse ein." />
                        )}
                    </div>

                    <div>
                      <label className={labelClass}>
                        <HomeText en="WhatsApp Number *" de="WhatsApp-Nummer *" />
                      </label>

                      <div className="flex gap-2">

                        <div className="relative shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              setIsCountryOpen((v) => !v)
                            }
                            className="flex h-[54px] items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-slate-700 transition hover:border-slate-300"
                          >
                            <FlagIcon
                              iso={selectedCountry.iso}
                              name={selectedCountry.name}
                            />

                            <span className="text-sm font-bold">
                              {selectedCountry.dialCode}
                            </span>

                            <ChevronDownIcon
                              open={isCountryOpen}
                            />
                          </button>

                          {isCountryOpen && (
                            <div className="absolute left-0 top-[62px] z-50 w-[300px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_50px_rgba(15,23,42,0.18)]">

                              <div className="border-b border-slate-100 p-3">
                                <input
                                  type="text"
                                  placeholder={isGerman ? "Land oder Vorwahl suchen..." : "Search country or dial code..."}
                                  value={countrySearch}
                                  onChange={(e) =>
                                    setCountrySearch(
                                      e.target.value
                                    )
                                  }
                                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none focus:border-blue-900 focus:bg-white"
                                  autoFocus
                                />
                              </div>

                              <div className="max-h-64 overflow-y-auto p-1.5">
                                {filteredCountryCodes.map(
                                  (country) => (
                                    <button
                                      key={country.name}
                                      type="button"
                                      onMouseDown={(e) =>
                                        e.preventDefault()
                                      }
                                      onClick={() => {
                                        setSelectedCountry(
                                          country
                                        );
                                        setIsCountryOpen(false);
                                        setCountrySearch("");
                                      }}
                                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-blue-50"
                                    >
                                      <FlagIcon
                                        iso={country.iso}
                                        name={country.name}
                                      />

                                      <span className="flex-1 text-sm font-semibold text-slate-700">
                                        {country.name}
                                      </span>

                                      <span className="text-xs font-bold text-slate-400">
                                        {country.dialCode}
                                      </span>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="relative min-w-0 flex-1">
                          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <PhoneIcon />
                          </div>

                          <input
                            type="tel"
                            placeholder={isGerman ? "WhatsApp-Nummer" : "WhatsApp number"}
                            value={phone}
                            onChange={(e) =>
                              setPhone(e.target.value)
                            }
                            className={`${inputClass(
                              submitAttempted &&
                                !isPhoneValid
                            )} pl-12`}
                          />
                        </div>
                      </div>

                      {submitAttempted &&
                        !isPhoneValid &&
                        errorText(
                          <HomeText en="Please enter a valid number (at least 6 digits)." de="Bitte geben Sie eine gültige Nummer mit mindestens 6 Ziffern ein." />
                        )}
                    </div>
                  </div>
                </div>

                <div className="my-9 h-px bg-slate-100" />

                {/* HOTEL */}
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <HotelIcon />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#071a36]">
                        <HomeText en="Hotel information" de="Hotelinformationen" />
                      </h3>

                      <p className="text-xs text-slate-400">
                        <HomeText en="Pickup details help us arrange your transfer" de="Die Abholdetails helfen uns, Ihren Transfer zu organisieren" />
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label className={labelClass}>
                        <HomeText en="Hotel Name" de="Hotelname" />
                      </label>

                      <div className="relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <HotelIcon />
                        </div>

                        <input
                          type="text"
                          placeholder={isGerman ? "Name Ihres Hotels" : "Hotel name"}
                          value={hotel}
                          onChange={(e) =>
                            setHotel(e.target.value)
                          }
                          className={`${inputClass(false)} pl-12`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        <HomeText en="Room Number" de="Zimmernummer" />
                      </label>

                      <div className="relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <DoorIcon />
                        </div>

                        <input
                          type="text"
                          placeholder={isGerman ? "Zimmernummer" : "Room number"}
                          value={roomNumber}
                          onChange={(e) =>
                            setRoomNumber(e.target.value)
                          }
                          className={`${inputClass(false)} pl-12`}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="my-9 h-px bg-slate-100" />

                {/* DATE */}
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0b3a78]">
                      <CalendarIcon />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#071a36]">
                        <HomeText en="Choose your date" de="Wählen Sie Ihr Datum" />
                      </h3>

                      <p className="text-xs text-slate-400">
                        <HomeText en="Select a date from tomorrow onward" de="Wählen Sie ein Datum ab morgen" />
                      </p>
                    </div>
                  </div>

                  <div className="relative">

                    <button
                      type="button"
                      onClick={() =>
                        setIsCalendarOpen((v) => !v)
                      }
                      className={`flex h-[68px] w-full items-center rounded-2xl border bg-white px-5 text-left transition-all ${
                        submitAttempted && !isDateValid
                          ? "border-red-400 ring-4 ring-red-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#071a36] text-white">
                        <CalendarIcon />
                      </div>

                      <div className="ml-4 flex-1">
                        <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          <HomeText en="Tour date" de="Reisedatum" />
                        </div>

                        <div
                          className={`mt-0.5 text-sm font-bold ${
                            date
                              ? "text-[#071a36]"
                              : "text-slate-400"
                          }`}
                        >
                          {date
                            ? formatDateDisplay(date)
                            : <HomeText en="Select your preferred date" de="Wählen Sie Ihr Wunschdatum" />}
                        </div>
                      </div>

                      <ChevronDownIcon
                        open={isCalendarOpen}
                      />
                    </button>

                    {isCalendarOpen && (
                      <div className="absolute left-0 right-0 top-[76px] z-40 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_25px_60px_rgba(15,23,42,0.18)] sm:max-w-[430px]">

                        <div className="mb-5 flex items-center justify-between">

                          <button
                            type="button"
                            disabled={!canGoPreviousMonth}
                            onClick={() =>
                              setCalendarMonth(
                                new Date(
                                  calendarMonth.getFullYear(),
                                  calendarMonth.getMonth() - 1,
                                  1
                                )
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <ChevronLeftIcon />
                          </button>

                          <div className="text-center">
                            <p className="text-sm font-bold text-[#071a36]">
                              {calendarMonthLabel}
                            </p>

                            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                              <HomeText en="Select a date" de="Datum auswählen" />
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setCalendarMonth(
                                new Date(
                                  calendarMonth.getFullYear(),
                                  calendarMonth.getMonth() + 1,
                                  1
                                )
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                          >
                            <ChevronRightIcon />
                          </button>

                        </div>

                        <div className="mb-2 grid grid-cols-7">
                          {[
                            "Mo",
                            "Tu",
                            "We",
                            "Th",
                            "Fr",
                            "Sa",
                            "Su",
                          ].map((day) => (
                            <div
                              key={day}
                              className="py-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400"
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {calendarDays.map((day, index) => {
                            if (!day) {
                              return (
                                <div
                                  key={`empty-${index}`}
                                  className="aspect-square"
                                />
                              );
                            }

                            const tomorrow =
                              getLocalTomorrow();

                            const disabled = day < tomorrow;

                            const iso = dateToIso(day);

                            const selected = date === iso;

                            const today = isSameDay(
                              day,
                              new Date()
                            );

                            return (
                              <button
                                key={iso}
                                type="button"
                                disabled={disabled}
                                onClick={() =>
                                  selectDate(day)
                                }
                                className={`relative flex aspect-square items-center justify-center rounded-xl text-sm font-bold transition ${
                                  selected
                                    ? "bg-[#071a36] text-white shadow-lg"
                                    : disabled
                                      ? "cursor-not-allowed text-slate-200"
                                      : "text-slate-700 hover:bg-blue-50 hover:text-[#0b3a78]"
                                }`}
                              >
                                {day.getDate()}

                                {today && !selected && (
                                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-orange-500" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-[11px] font-semibold text-slate-400">
                          <div className="h-2 w-2 rounded-full bg-orange-500" />
                          <HomeText en="Available from tomorrow" de="Ab morgen verfügbar" />
                        </div>
                      </div>
                    )}
                  </div>

                  {submitAttempted &&
                    !isDateValid &&
                    errorText(
                      <HomeText en="Please select a valid tour date (from tomorrow onward)." de="Bitte wählen Sie ein gültiges Reisedatum ab morgen." />
                    )}
                </div>

                <div className="my-9 h-px bg-slate-100" />

                {/* GUEST COUNT & PREMIUM OPTIONS */}
                <section className="my-9 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(7,26,54,0.06)]">
                  <div className="relative overflow-hidden bg-[#071a36] px-6 py-6 text-white sm:px-8">
                    <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border border-white/10" />
                    <div className="absolute -right-1 -top-5 h-24 w-24 rounded-full border border-orange-400/20" />
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/20 bg-white/10 text-orange-300">
                        <UsersIcon />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-300">
                          <HomeText en="Your private experience" de="Ihr privates Erlebnis" />
                        </p>
                        <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                          <HomeText en="Build your trip" de="Gestalten Sie Ihre Reise" />
                        </h3>
                        <p className="mt-1 text-sm text-slate-300">
                          <HomeText en="Infants are free; children pay the adult rate." de="Babys reisen kostenlos; Kinder zahlen den Erwachsenenpreis." />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 p-5 sm:p-8">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                      <div className="mb-4">
                        <p className="text-sm font-bold text-[#071a36]"><HomeText en="Who is travelling?" de="Wer reist mit?" /></p>
                        <p className="mt-1 text-xs leading-5 text-slate-500"><HomeText en="Infants are free. Children are charged at the adult rate." de="Babys reisen kostenlos. Kinder zahlen den Erwachsenenpreis." /></p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {[
                          { key: "adults", title: "Adults", subtitle: "Age 12+", count: adults, set: setAdults, min: 1 },
                          { key: "children", title: "Children", subtitle: "Age 2–11", count: children, set: setChildren, min: 0 },
                          { key: "infants", title: "Infants", subtitle: "Under 2 · Free", count: infants, set: setInfants, min: 0 },
                        ].map((group) => (
                          <div key={group.key} className="rounded-xl border border-slate-200 bg-white p-4">
                            <p className="text-sm font-bold text-[#071a36]">{group.title}</p>
                            <p className="mt-1 text-[11px] text-slate-500">{group.subtitle}</p>
                            <div className="mt-4 flex items-center justify-between gap-3">
                              <button type="button" aria-label={"Remove " + group.key} onClick={() => {
                                const next = Math.max(group.min, group.count - 1);
                                group.set(next);
                                if (group.key === "children") setChildAges((ages) => ages.slice(0, next));
                                if (group.key === "infants") setInfantAges((ages) => ages.slice(0, next));
                              }} disabled={group.count <= group.min} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[#071a36] disabled:opacity-30"><MinusIcon /></button>
                              <span className="text-xl font-bold tabular-nums text-[#071a36]">{group.count}</span>
                              <button type="button" aria-label={"Add " + group.key} onClick={() => {
                                if (totalGuests >= maxGuests) return;
                                group.set(group.count + 1);
                                if (group.key === "children") setChildAges((ages) => [...ages, ""]);
                                if (group.key === "infants") setInfantAges((ages) => [...ages, ""]);
                              }} disabled={totalGuests >= maxGuests} className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#071a36] text-white disabled:opacity-30"><PlusIcon /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {children > 0 && (
                        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500"><HomeText en="Children’s ages" de="Alter der Kinder" /></p>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {Array.from({ length: children }, (_, index) => (
                              <label key={index} className="text-xs font-semibold text-slate-600">
                                <HomeText en={"Child " + (index + 1)} de={"Kind " + (index + 1)} />
                                <select value={childAges[index] ?? ""} onChange={(e) => setChildAges((ages) => Array.from({ length: children }, (_, i) => i === index ? e.target.value : (ages[i] ?? "")))} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800">
                                  <option value="">Select age</option>
                                  {Array.from({ length: 10 }, (_, age) => <option key={age + 2} value={String(age + 2)}>{age + 2} years</option>)}
                                </select>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                      {infants > 0 && (
                        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500"><HomeText en="Infants’ ages (free)" de="Alter der Babys (kostenlos)" /></p>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {Array.from({ length: infants }, (_, index) => (
                              <label key={index} className="text-xs font-semibold text-slate-600">
                                <HomeText en={"Infant " + (index + 1)} de={"Baby " + (index + 1)} />
                                <select value={infantAges[index] ?? ""} onChange={(e) => setInfantAges((ages) => Array.from({ length: infants }, (_, i) => i === index ? e.target.value : (ages[i] ?? "")))} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800">
                                  <option value="">Select age</option>
                                  {Array.from({ length: 24 }, (_, age) => <option key={age} value={String(age)}>{age} months</option>)}
                                </select>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4 text-xs">
                        <span className="text-slate-500">{totalGuests} <HomeText en="people total" de="Personen insgesamt" /></span>
                        <span className="font-bold text-[#071a36]">{chargeableGuests} <HomeText en="paying guests" de="zahlende Gäste" /></span>
                      </div>
                    </div>
                    {submitAttempted && !isGuestsValid && errorText(
                      <HomeText en={"Choose at least " + minGuests + " paying guest and no more than " + maxGuests + " people total."} de={"Wählen Sie mindestens " + minGuests + " zahlenden Gast und höchstens " + maxGuests + " Personen insgesamt."} />
                    )}

                    {tourSlug === "quad-safari" && (
                      <div className="space-y-5 rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                            <HomeText en="01 · Duration" de="01 · Dauer" />
                          </p>
                          <h4 className="mt-1 text-lg font-semibold text-[#071a36]">
                            <HomeText en="Choose your quad experience" de="Wählen Sie Ihr Quad-Erlebnis" />
                          </h4>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            {[
                              { id: "1-hour" as const, title: "1 Hour", deTitle: "1 Stunde" },
                              { id: "3-hours" as const, title: "3 Hours", deTitle: "3 Stunden" },
                            ].map((option) => {
                              const active = selectedQuadDuration === option.id;
                              return (
                                <button
                                  key={option.id}
                                  type="button"
                                  onClick={() => setSelectedQuadDuration(option.id)}
                                  aria-pressed={active}
                                  className={`rounded-2xl border p-4 text-left transition-all ${active ? "border-[#071a36] bg-white shadow-md ring-1 ring-[#071a36]" : "border-slate-200 bg-white/70 hover:border-slate-300"}`}
                                >
                                  <span className="block text-base font-bold text-[#071a36]">
                                    <HomeText en={option.title} de={option.deTitle} />
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                            <HomeText en="02 · Start time" de="02 · Startzeit" />
                          </p>
                          <h4 className="mt-1 text-base font-semibold text-[#071a36]">
                            <HomeText en="Choose your start time" de="Wählen Sie Ihre Startzeit" />
                          </h4>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            {(["09:00", "15:00"] as const).map((time) => {
                              const active = selectedQuadStartTime === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setSelectedQuadStartTime(time)}
                                  aria-pressed={active}
                                  className={`rounded-2xl border p-4 text-left transition-all ${active ? "border-[#071a36] bg-white shadow-md ring-1 ring-[#071a36]" : "border-slate-200 bg-white/70 hover:border-slate-300"}`}
                                >
                                  <span className="block text-base font-bold text-[#071a36]">{time}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                            <HomeText en="03 · Quad allocation" de="03 · Quad-Aufteilung" />
                          </p>
                          <h4 className="mt-1 text-base font-semibold text-[#071a36]">
                            <HomeText en="Choose how many Single and Double Quads" de="Anzahl der Einzel- und Doppelquads wählen" />
                          </h4>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            {[
                              { id: "single" as const, title: "Single Quad", deTitle: "Einzelquad", detail: "1 person · €" + singleQuadUnitPrice, deDetail: "1 Person · €" + singleQuadUnitPrice, count: singleQuadCount, set: setSingleQuadCount, seats: 1 },
                              { id: "double" as const, title: "Double Quad", deTitle: "Doppelquad", detail: "2 people · €" + doubleQuadUnitPrice, deDetail: "2 Personen · €" + doubleQuadUnitPrice, count: doubleQuadCount, set: setDoubleQuadCount, seats: 2 },
                            ].map((option) => (
                              <div key={option.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <span className="block text-sm font-bold text-[#071a36]">
                                      <HomeText en={option.title} de={option.deTitle} />
                                    </span>
                                    <span className="mt-1 block text-xs text-slate-500">
                                      <HomeText en={option.detail} de={option.deDetail} />
                                    </span>
                                  </div>
                                  <span className="text-lg font-bold text-orange-600">€{option.id === "single" ? singleQuadUnitPrice : doubleQuadUnitPrice}</span>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                  <button type="button" aria-label={"Remove " + option.id + " quad"} onClick={() => option.set((count) => Math.max(0, count - 1))} disabled={option.count === 0} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xl font-bold text-[#071a36] disabled:opacity-30">−</button>
                                  <span className="text-xl font-bold tabular-nums text-[#071a36]">{option.count}</span>
                                  <button type="button" aria-label={"Add " + option.id + " quad"} onClick={() => option.set((count) => count + 1)} disabled={quadSeatsSelected + option.seats > 25} className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#071a36] text-xl font-bold text-white disabled:opacity-30">+</button>
                                </div>
                                <p className="mt-2 text-right text-xs font-semibold text-slate-500">Subtotal: €{option.count * (option.id === "single" ? singleQuadUnitPrice : doubleQuadUnitPrice)}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 rounded-xl border border-orange-200 bg-white px-3 py-3 text-sm">
                            <div className="flex justify-between gap-3"><span className="text-slate-600"><HomeText en="Seats selected" de="Ausgewählte Plätze" /></span><span className="font-bold text-[#071a36]">{quadSeatsSelected} / {recordedGuests}</span></div>
                            <div className="mt-1 flex justify-between gap-3"><span className="text-slate-600"><HomeText en="Total quad price" de="Quad-Gesamtpreis" /></span><span className="font-bold text-orange-600">€{quadTotalPrice}</span></div>
                          </div>
                          {!quadAllocationValid && (
                            <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold leading-5 text-red-700">
                              {quadSeatsSelected !== recordedGuests
                                ? <HomeText en={`The number of seats must match all ${recordedGuests} people, including infants. Selected seats: ${quadSeatsSelected}.`} de={`Die Sitzplätze müssen allen ${recordedGuests} Personen einschließlich Babys entsprechen. Ausgewählte Plätze: ${quadSeatsSelected}.`} />
                                : requiredQuadCount > adults
                                  ? <HomeText en={`You selected ${requiredQuadCount} quads, but only ${adults} adult(s) are available to drive. Reduce the number of quads or update the group details.`} de={`Sie haben ${requiredQuadCount} Quads ausgewählt, aber nur ${adults} Erwachsene können fahren. Reduzieren Sie die Quad-Anzahl oder ändern Sie die Gruppendetails.`} />
                                  : <HomeText en={`At least ${infants + childrenUnderTen} Double Quad passenger seats are needed for infants and children under 10. You selected ${doubleQuadCount} Double Quads.`} de={`Für Babys und Kinder unter 10 Jahren sind mindestens ${infants + childrenUnderTen} Beifahrerplätze in Doppelquads nötig. Ausgewählt: ${doubleQuadCount} Doppelquads.`} />}
                            </p>
                          )}
                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            <HomeText en="Infants and children under 10 must ride as passengers with an adult. Choose the Single/Double mix to match your group and anyone who will not drive." de="Babys und Kinder unter 10 Jahren müssen als Beifahrer bei einem Erwachsenen mitfahren. Wählen Sie die passende Mischung aus Einzel- und Doppelquads." />
                          </p>
                        </div>
                      </div>
                    )}

                    {tourSlug === "buggy-safari" && (
                      <div className="space-y-5 rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                            <HomeText en="01 · 3-hour program" de="01 · 3-Stunden-Programm" />
                          </p>
                          <h4 className="mt-1 text-lg font-semibold text-[#071a36]">
                            <HomeText en="Choose your buggy vehicles" de="Wählen Sie Ihre Buggy-Fahrzeuge" />
                          </h4>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            <HomeText en="One fixed 3-hour program. Select the number of 2-person and 4-person buggies to match everyone in your group." de="Ein festes 3-Stunden-Programm. Wählen Sie die Anzahl der 2- und 4-Personen-Buggys passend für Ihre Gruppe." />
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            { id: "two" as const, title: "2-person buggy", deTitle: "Buggy für 2 Personen", detail: "2 seats · €100 per buggy", deDetail: "2 Plätze · 100 € pro Buggy", count: twoSeatBuggyCount, set: setTwoSeatBuggyCount, seats: 2, price: 100 },
                            { id: "four" as const, title: "4-person buggy", deTitle: "Buggy für 4 Personen", detail: "4 seats · €125 per buggy", deDetail: "4 Plätze · 125 € pro Buggy", count: fourSeatBuggyCount, set: setFourSeatBuggyCount, seats: 4, price: 125 },
                          ].map((option) => (
                            <div key={option.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <span className="block text-sm font-bold text-[#071a36]"><HomeText en={option.title} de={option.deTitle} /></span>
                                  <span className="mt-1 block text-xs text-slate-500"><HomeText en={option.detail} de={option.deDetail} /></span>
                                </div>
                                <span className="text-lg font-bold text-orange-600">€{option.price}</span>
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <button type="button" aria-label={"Remove " + option.id + " buggy"} onClick={() => option.set((count) => Math.max(0, count - 1))} disabled={option.count === 0} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xl font-bold text-[#071a36] disabled:opacity-30">−</button>
                                <span className="text-xl font-bold tabular-nums text-[#071a36]">{option.count}</span>
                                <button type="button" aria-label={"Add " + option.id + " buggy"} onClick={() => option.set((count) => count + 1)} disabled={buggySeatsSelected + option.seats > 25} className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#071a36] text-xl font-bold text-white disabled:opacity-30">+</button>
                              </div>
                              <p className="mt-2 text-right text-xs font-semibold text-slate-500">Subtotal: €{option.count * option.price}</p>
                            </div>
                          ))}
                        </div>
                        <div className="rounded-xl border border-orange-200 bg-white px-3 py-3 text-sm">
                          <div className="flex justify-between gap-3"><span className="text-slate-600"><HomeText en="Seats selected" de="Ausgewählte Plätze" /></span><span className="font-bold text-[#071a36]">{buggySeatsSelected} / {recordedGuests}</span></div>
                          <div className="mt-1 flex justify-between gap-3"><span className="text-slate-600"><HomeText en="Total buggy price" de="Buggy-Gesamtpreis" /></span><span className="font-bold text-orange-600">€{buggyTotalPrice}</span></div>
                        </div>
                        {!buggyAllocationValid && (
                          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold leading-5 text-red-700">
                            {buggySeatsSelected !== recordedGuests
                              ? <HomeText en={`The number of seats must match all ${recordedGuests} people, including infants. Selected seats: ${buggySeatsSelected}.`} de={`Die Sitzplätze müssen allen ${recordedGuests} Personen einschließlich Babys entsprechen. Ausgewählte Plätze: ${buggySeatsSelected}.`} />
                              : <HomeText en={`You selected ${requiredBuggyCount} buggies, but only ${adults} adult(s) are available to drive. Reduce the number of buggies or update the group details.`} de={`Sie haben ${requiredBuggyCount} Buggys ausgewählt, aber nur ${adults} Erwachsene können fahren. Reduzieren Sie die Anzahl oder ändern Sie die Gruppendetails.`} />}
                          </p>
                        )}
                        <p className="text-xs leading-5 text-slate-500">
                          <HomeText en="Every buggy needs an adult driver. The selected seats must match the total number of people, including infants." de="Jeder Buggy benötigt einen erwachsenen Fahrer. Die ausgewählten Sitzplätze müssen der Gesamtzahl aller Personen einschließlich Babys entsprechen." />
                        </p>
                      </div>
                    )}

                    {(tourSlug === "luxor" || tourSlug === "cairo") && (
                      <div>
                        <div className="mb-4 flex items-end justify-between gap-3">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                              <HomeText en="01 · Transportation" de="01 · Transport" />
                            </p>
                            <h4 className="mt-1 text-lg font-semibold text-[#071a36]">
                              <HomeText en="Choose your private vehicle" de="Wählen Sie Ihr Privatfahrzeug" />
                            </h4>
                          </div>
                          <span className="hidden text-xs text-slate-400 sm:block">
                            <HomeText en="Price depends on group size" de="Preis abhängig von der Gruppengröße" />
                          </span>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {[
                            { id: "limousine", title: "Limousine", detail: "1–2 guests", symbol: "L" },
                            { id: "xpander", title: "Xpander", detail: "2–3 guests", symbol: "X" },
                            { id: "hiace", title: "HiAce", detail: tourSlug === "luxor" ? "4–8 guests" : "4–8 guests", symbol: "H" },
                          ].map((vehicle) => {
                            const active = selectedVehicle === vehicle.id;
                            return (
                              <button
                                key={vehicle.id}
                                type="button"
                                onClick={() => setSelectedVehicle(vehicle.id)}
                                aria-pressed={active}
                                className={`group relative min-h-[142px] rounded-2xl border p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100 ${active ? "border-[#071a36] bg-slate-50 shadow-[0_14px_34px_rgba(7,26,54,0.12)] ring-1 ring-[#071a36]" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_28px_rgba(7,26,54,0.07)]"}`}
                              >
                                <span className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black ${active ? "bg-[#071a36] text-orange-300" : "bg-slate-100 text-slate-500"}`}>{vehicle.symbol}</span>
                                <span className="block text-sm font-bold text-[#071a36]">{vehicle.title}</span>
                                <span className="mt-1 block text-xs text-slate-500">{vehicle.detail}</span>
                                <span className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${active ? "border-orange-500 bg-orange-500 text-white" : "border-slate-300 text-transparent"}`}>✓</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {tourSlug === "cairo" && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                          <HomeText en="02 · Museum visit" de="02 · Museumsbesuch" />
                        </p>
                        <h4 className="mt-1 text-lg font-semibold text-[#071a36]">
                          <HomeText en="Choose your museum" de="Wählen Sie Ihr Museum" />
                        </h4>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {[
                            { id: "old", title: "Old Egyptian Museum", subtitle: "Tahrir Square", short: "THE CLASSIC" },
                            { id: "new", title: "Grand Egyptian Museum", subtitle: "GEM · Giza", short: "THE NEW LANDMARK" },
                          ].map((museum) => {
                            const active = selectedMuseum === museum.id;
                            return (
                              <button
                                key={museum.id}
                                type="button"
                                onClick={() => setSelectedMuseum(museum.id)}
                                aria-pressed={active}
                                className={`relative min-h-[132px] overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100 ${active ? "border-[#071a36] bg-slate-50 shadow-[0_12px_28px_rgba(7,26,54,0.10)] ring-1 ring-[#071a36]" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"}`}
                              >
                                <span className="text-[9px] font-bold tracking-[0.18em] text-orange-500">{museum.short}</span>
                                <span className="mt-2 block text-base font-bold text-[#071a36]">{museum.title}</span>
                                <span className="mt-1 block text-sm text-slate-500">{museum.subtitle}</span>
                                <span className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${active ? "border-orange-500 bg-orange-500 text-white" : "border-slate-300 text-transparent"}`}>✓</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {(tourSlug === "speed-boat" || tourSlug === "private-boat") && (
                      <div>
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                              <HomeText en="Optional experiences" de="Optionale Erlebnisse" />
                            </p>
                            <h4 className="mt-1 text-lg font-semibold text-[#071a36]">
                              <HomeText en="Make it your perfect sea day" de="Gestalten Sie Ihren perfekten Tag auf dem Meer" />
                            </h4>
                          </div>
                          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            {selectedIslands.length} <HomeText en="selected" de="ausgewählt" />
                          </span>
                        </div>
                        <p className="mb-4 max-w-2xl text-sm leading-6 text-slate-500">
                          <HomeText en="Choose one or more islands. Each selected island is charged per guest." de="Wählen Sie eine oder mehrere Inseln. Jede ausgewählte Insel wird pro Gast berechnet." />
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          {[
                            { id: "paradise", name: "Paradise Island", price: pricing.island_paradise, category: "Island escape", tone: "from-cyan-50 to-sky-100" },
                            { id: "orange", name: "Orange Bay", price: pricing.island_orange, category: "Beach club", tone: "from-orange-50 to-amber-100" },
                            { id: "hula", name: "Hula Hula", price: pricing.island_hula, category: "Island vibes", tone: "from-rose-50 to-orange-100" },
                            { id: "magaweesh", name: "Magawish", price: pricing.island_magaweesh, category: "Natural beauty", tone: "from-teal-50 to-emerald-100" },
                            { id: "amwaj", name: "Amwaj", price: pricing.island_amwaj, category: "Sea & sand", tone: "from-blue-50 to-cyan-100" },
                            { id: "eden", name: "Eden Island", price: pricing.island_eden, category: "Premium beach", tone: "from-amber-50 to-yellow-100" },
                            { id: "ouzeria", name: "Ouzeria", price: pricing.island_ouzeria, category: "Private escape", tone: "from-violet-50 to-fuchsia-100" },
                            { id: "mahmya", name: "Mahmya", price: pricing.island_mahmya, category: "Protected island", tone: "from-emerald-50 to-lime-100" },
                          ].map((island) => {
                            const active = selectedIslands.includes(island.id);
                            return (
                              <label
                                key={island.id}
                                className={`group relative flex min-h-[158px] cursor-pointer flex-col overflow-hidden rounded-2xl border p-4 transition-all duration-300 focus-within:ring-4 focus-within:ring-orange-100 ${active ? "border-[#071a36] bg-slate-50 shadow-[0_14px_32px_rgba(7,26,54,0.10)] ring-1 ring-[#071a36]" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_28px_rgba(7,26,54,0.07)]"}`}
                              >
                                <input
                                  type="checkbox"
                                  checked={active}
                                  onChange={(e) => setSelectedIslands((current) =>
                                    e.target.checked ? [...current, island.id] : current.filter((item) => item !== island.id)
                                  )}
                                  className="sr-only"
                                />
                                <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${island.tone} ${active ? "opacity-100" : "opacity-45"}`} />
                                <span className="flex items-start justify-between gap-2 pt-1">
                                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${island.tone} text-xs font-black text-[#071a36]`}>{island.name.slice(0, 1)}</span>
                                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold ${active ? "border-orange-500 bg-orange-500 text-white" : "border-slate-300 bg-white text-transparent"}`}>✓</span>
                                </span>
                                <span className="mt-3 text-sm font-bold text-[#071a36]">{island.name}</span>
                                <span className="mt-0.5 text-[10px] font-medium text-slate-400">{island.category}</span>
                                <span className="mt-auto flex items-baseline gap-1 pt-3">
                                  <span className="text-lg font-bold tracking-tight text-[#071a36]">€{island.price}</span>
                                  <span className="text-[10px] text-slate-400"><HomeText en="/ person" de="/ Person" /></span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="overflow-hidden rounded-2xl bg-[#071a36] text-white">
                      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300">
                            <HomeText en="Your trip estimate" de="Ihre Reiseübersicht" />
                          </p>
                          <p className="mt-1 text-sm text-slate-300">
                            {adults} <HomeText en="adults" de="Erwachsene" />, {children} <HomeText en="children" de="Kinder" />, {infants} <HomeText en="infants free" de="Babys kostenlos" />
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedIslands.map((id) => (
                              <span key={id} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-100">
                                {({ paradise: "Paradise", orange: "Orange Bay", hula: "Hula Hula", magaweesh: "Magawish", amwaj: "Amwaj", eden: "Eden", ouzeria: "Ouzeria", mahmya: "Mahmya" } as Record<string, string>)[id]}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-xs font-medium text-slate-300"><HomeText en="Estimated total" de="Geschätzter Gesamtpreis" /></p>
                          <p className="mt-1 text-3xl font-bold tracking-tight text-white">{displayedTotalPrice}</p>
                          {pricingValid && selectedIslands.length > 0 && (
                            <p className="mt-1 text-xs text-slate-400">
                              <HomeText en={`Includes €${islandExtra} island options`} de={`Enthält €${islandExtra} für Inseloptionen`} />
                            </p>
                          )}
                        </div>
                      </div>
                      {!pricingValid && (
                        <div className="border-t border-white/10 px-5 py-3 text-sm font-semibold text-orange-200 sm:px-6">
                          <HomeText en={tourSlug === "luxor" || tourSlug === "cairo" ? "This vehicle does not support the selected group size. Choose a different vehicle to continue." : "This option does not support the selected number of guests. Adjust the guest count to continue."} de={tourSlug === "luxor" || tourSlug === "cairo" ? "Dieses Fahrzeug ist für die gewählte Gruppengröße nicht geeignet. Bitte wählen Sie ein anderes Fahrzeug." : "Diese Option ist für die gewählte Gästezahl nicht verfügbar. Bitte passen Sie die Gästezahl an."} />
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* NOTES */}
                <div>
                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <MessageIcon />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#071a36]">
                        <HomeText en="Additional information" de="Zusätzliche Informationen" />
                      </h3>

                      <p className="text-xs text-slate-400">
                        <HomeText en="Anything else we should know?" de="Gibt es noch etwas, das wir wissen sollten?" />
                      </p>
                    </div>

                  </div>

                  <label className={labelClass}>
                    <HomeText en="Special Requests / Notes" de="Besondere Wünsche / Anmerkungen" />
                  </label>

                  <textarea
                    rows={5}
                    placeholder={isGerman ? "Teilen Sie uns besondere Wünsche, Vorlieben oder wichtige Details mit..." : "Tell us any special requests, preferences, or important details..."}
                    value={notes}
                    onChange={(e) =>
                      setNotes(e.target.value)
                    }
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-900 focus:ring-4 focus:ring-blue-900/5"
                  />
                </div>

                {submitAttempted && !isFormValid && (
                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                    <p className="text-sm font-semibold leading-6 text-red-700">
                      <HomeText en="Please complete the required fields highlighted above before sending your booking request." de="Bitte füllen Sie die oben markierten Pflichtfelder aus, bevor Sie Ihre Buchungsanfrage senden." />
                    </p>
                  </div>
                )}

                {/* MOBILE PRICE */}
                <div className="mt-7 overflow-hidden rounded-3xl border border-blue-950 bg-blue-950 p-5 text-white shadow-[0_16px_38px_rgba(7,26,54,0.16)] lg:hidden">
                  <div className="flex items-end justify-between gap-4">

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-300">
                        <HomeText en="Private tour" de="Private Tour" />
                      </p>

                      <p className="mt-1 text-sm font-semibold text-white/70">
                        {adults} <HomeText en="adults" de="Erwachsene" /> · {children} <HomeText en="children" de="Kinder" /> · {infants} <HomeText en="infants free" de="Babys kostenlos" />
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-3xl font-black tracking-tight text-white">
                        {displayedTotalPrice}
                      </p>

                      <p className="text-[10px] font-semibold text-orange-200/80">
                        <HomeText en="total experience" de="Gesamtes Erlebnis" />
                      </p>
                    </div>

                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="group mt-6 flex h-[62px] w-full items-center justify-center gap-3 rounded-2xl bg-[#071a36] px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(7,26,54,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b2b55] hover:shadow-[0_18px_38px_rgba(7,26,54,0.24)]"
                >

                  <span>
                    <HomeText en="Send Booking Request" de="Buchungsanfrage senden" />
                  </span>

                  <span className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] font-semibold text-slate-400">
                  <LockIcon />

                  <span>
                    <HomeText en="Your booking request is sent securely via" de="Ihre Buchungsanfrage wird sicher übermittelt via" />
                    <HomeText en="WhatsApp" de="WhatsApp" />
                  </span>
                </div>

              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:sticky lg:top-6">

              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)]">

                <div className="relative overflow-hidden bg-[#071a36] px-6 py-7 text-white">

                  <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-orange-500/20 blur-2xl" />

                  <div className="relative">

                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-300">
                      <HomeText en="Your reservation" de="Ihre Reservierung" />
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      <HomeText en="Private Tour Summary" de="Zusammenfassung der privaten Tour" />
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-300">
                      <HomeText en="Everything is private and arranged" de="Alles wird privat organisiert" />
                      <HomeText en="exclusively for your group." de="exklusiv für Ihre Gruppe." />
                    </p>

                  </div>
                </div>

                <div className="p-5 sm:p-6">

                  <div className="rounded-2xl bg-slate-50 p-4">

                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      <HomeText en="Tour" de="Tour" />
                    </p>

                    <p className="mt-2 text-sm font-bold leading-6 text-[#071a36]">
                      {displayTourName}
                    </p>

                    <div className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0b3a78]">
                      {displayTourType}
                    </div>

                  </div>

                  <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-end justify-between gap-4 p-5 sm:p-6">

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">
                          <HomeText en="Total price" de="Gesamtpreis" />
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          <HomeText en="Private experience" de="Privates Erlebnis" />
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-3xl font-black tracking-tight text-[#071a36] sm:text-4xl">
                          {displayedTotalPrice}
                        </p>
                      </div>

                    </div>

                    <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-[10px] font-semibold leading-5 text-slate-500">
                      <HomeText en="Price updates automatically with guest" de="Der Preis wird automatisch anhand der Gästeanzahl" />
                      <HomeText en="count" de="aktualisiert" />
                    </div>

                  </div>

                  <div className="mt-3 overflow-hidden rounded-2xl border border-slate-100">

                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">

                      <div className="flex items-center gap-3">
                        <div className="text-slate-400">
                          <CalendarIcon />
                        </div>

                        <span className="text-xs font-bold text-slate-500">
                          <HomeText en="Date" de="Datum" />
                        </span>
                      </div>

                      <span className="max-w-[150px] text-right text-xs font-bold text-[#071a36]">
                        {date
                          ? formatDateDisplay(date)
                          : <HomeText en="Not selected" de="Nicht ausgewählt" />}
                      </span>

                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">

                      <div className="flex items-center gap-3">
                        <div className="text-slate-400">
                          <UsersIcon />
                        </div>

                        <span className="text-xs font-bold text-slate-500">
                          <HomeText en="Guests" de="Gäste" />
                        </span>
                      </div>

                      <span className="text-xs font-bold text-[#071a36]">
                        {totalGuests} ({infants} <HomeText en="free infants" de="kostenlose Babys" />)
                      </span>

                    </div>

                    <div className="flex items-center justify-between px-4 py-4">

                      <div className="flex items-center gap-3">
                        <div className="text-slate-400">
                          <HotelIcon />
                        </div>

                        <span className="text-xs font-bold text-slate-500">
                          <HomeText en="Pickup" de="Abholung" />
                        </span>
                      </div>

                      <span className="max-w-[150px] truncate text-right text-xs font-bold text-[#071a36]">
                        {hotel || "Hotel"}
                      </span>

                    </div>

                  </div>

                  {included.length > 0 && (
                    <div className="mt-6">

                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#071a36]">
                          <HomeText en="Included in your experience" de="In Ihrem Erlebnis enthalten" />
                        </h4>

                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <HomeText en="Included" de="Inklusive" />
                        </span>
                      </div>

                      <div className="space-y-3">

                        {displayIncluded.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                              <CheckIcon />
                            </span>

                            <span className="text-xs font-semibold leading-5 text-slate-600">
                              {item}
                            </span>
                          </div>
                        ))}

                      </div>
                    </div>
                  )}

                  <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0b3a78] shadow-sm">
                        <LockIcon />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#071a36]">
                          <HomeText en="Simple & direct booking" de="Einfache und direkte Buchung" />
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-400">
                          <HomeText en="Send your request and our team will" de="Senden Sie Ihre Anfrage; unser Team wird sich" />
                          <HomeText en="contact you directly to confirm the" de="direkt mit Ihnen in Verbindung setzen, um die" />
                          <HomeText en="details." de="Details zu bestätigen." />
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
    </NoPeriods>
  );
}