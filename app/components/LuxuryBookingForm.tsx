"use client";

import { useMemo, useState } from "react";

type LuxuryBookingFormProps = {
  tourName: string;
  adultPrice?: number;
  tourType?: string;
  included?: string[];
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

export default function LuxuryBookingForm({
  tourName,
  tourType = "Private Luxury",
  included = [],
}: LuxuryBookingFormProps) {
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

  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");

  const [notes, setNotes] = useState("");

  const [childrenAgeValues, setChildrenAgeValues] =
    useState<string[]>([]);

  const [infantAgeValues, setInfantAgeValues] =
    useState<string[]>([]);

  const [submitAttempted, setSubmitAttempted] =
    useState(false);

  const childAges = Array.from(
    { length: Number(children || 0) },
    (_, i) => i
  );

  const infantAges = Array.from(
    { length: Number(infants || 0) },
    (_, i) => i
  );

  const totalGuests =
    Number(adults || 0) +
    Number(children || 0) +
    Number(infants || 0);

  const totalPrice =
    privatePrices[
      Math.min(Math.max(totalGuests, 2), 25)
    ] ?? privatePrices[25];

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

  const isGuestsValid =
    totalGuests >= 2 && totalGuests <= 25;

  const allChildAgesSet = childAges.every((_, i) =>
    Boolean(childrenAgeValues[i])
  );

  const allInfantAgesSet = infantAges.every((_, i) =>
    Boolean(infantAgeValues[i])
  );

  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isDateValid &&
    isGuestsValid &&
    allChildAgesSet &&
    allInfantAgesSet;

  const inputClass = (invalid: boolean) =>
    `h-[54px] w-full rounded-2xl border bg-white px-4 text-[15px] font-medium text-slate-800 placeholder:text-slate-400 transition-all duration-200 outline-none ${
      invalid
        ? "border-red-400 ring-4 ring-red-50"
        : "border-slate-200 hover:border-slate-300 focus:border-blue-900 focus:ring-4 focus:ring-blue-900/5"
    }`;

  const labelClass =
    "mb-2.5 block text-[13px] font-bold uppercase tracking-[0.08em] text-slate-500";

  const errorText = (msg: string) => (
    <p className="mt-2 text-xs font-semibold text-red-600">
      {msg}
    </p>
  );

  const setGuestCount = (
    type: "adults" | "children" | "infants",
    value: number
  ) => {
    if (type === "adults") {
      const next = Math.min(Math.max(value, 1), 25);
      setAdults(String(next));
      return;
    }

    if (type === "children") {
      const next = Math.min(Math.max(value, 0), 10);

      setChildren(String(next));

      setChildrenAgeValues((current) =>
        current.slice(0, next)
      );

      return;
    }

    const next = Math.min(Math.max(value, 0), 10);

    setInfants(String(next));

    setInfantAgeValues((current) =>
      current.slice(0, next)
    );
  };

  const handleSubmit = () => {
    setSubmitAttempted(true);

    if (!isFormValid) return;

    const fullPhone = `${selectedCountry.dialCode} ${phone.trim()}`;

    const message = `
🌴 NEW LUXURY BOOKING REQUEST

🏝️ Tour: ${tourName}

⭐ Type: ${tourType}

👤 Full Name: ${name.trim()}

🌍 Nationality: ${nationality || "Not specified"}

✉️ Email: ${email.trim()}

🏨 Hotel: ${hotel || "Not specified"}

🚪 Room Number: ${roomNumber || "Not specified"}

📅 Date: ${date}

👨 Adults: ${adults}

🧒 Children: ${children}

👶 Infants: ${infants}

👥 Total Guests: ${totalGuests}

🧒 Children Ages:
${childrenAgeValues.filter(Boolean).join(", ") || "-"}

👶 Infant Ages:
${infantAgeValues.filter(Boolean).join(", ") || "-"}

💰 PRIVATE TOUR PRICE: €${totalPrice}

📱 WhatsApp: ${fullPhone}

📝 Notes:
${notes.trim() || "-"}
`;

    const whatsappUrl =
      `https://wa.me/201091920706?text=` +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  };

  return (
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
                  Private Luxury Experience
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[1.08]">
                  Reserve your private
                  <span className="block text-orange-400">
                    {tourName}
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Complete your details below and send your
                  booking request directly to our team. We will
                  confirm your private experience with you.
                </p>
              </div>

              <div className="hidden shrink-0 lg:block">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Experience
                  </div>

                  <div className="mt-1 text-lg font-bold text-white">
                    {tourType}
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
                    Guest details
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
                      Personal information
                    </h3>

                    <p className="text-xs text-slate-400">
                      Tell us who will be joining the experience
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className={labelClass}>
                      Full Name *
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <UserIcon />
                      </div>

                      <input
                        type="text"
                        placeholder="Enter full name"
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
                        "Please enter the guest's full name."
                      )}
                  </div>

                  <div className="relative">
                    <label className={labelClass}>
                      Nationality
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <GlobeIcon />
                      </div>

                      <input
                        type="text"
                        placeholder="Select nationality"
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
                      Email *
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <MailIcon />
                      </div>

                      <input
                        type="email"
                        placeholder="you@example.com"
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
                        "Please enter a valid email address."
                      )}
                  </div>

                  <div>
                    <label className={labelClass}>
                      WhatsApp Number *
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
                                placeholder="Search country or code..."
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
                          placeholder="WhatsApp number"
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
                        "Please enter a valid number (at least 6 digits)."
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
                      Hotel information
                    </h3>

                    <p className="text-xs text-slate-400">
                      Pickup details help us arrange your transfer
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className={labelClass}>
                      Hotel Name
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <HotelIcon />
                      </div>

                      <input
                        type="text"
                        placeholder="Your hotel name"
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
                      Room Number
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <DoorIcon />
                      </div>

                      <input
                        type="text"
                        placeholder="Room number"
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
                      Choose your date
                    </h3>

                    <p className="text-xs text-slate-400">
                      Select a date from tomorrow onward
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
                        Tour date
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
                          : "Select your preferred date"}
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
                            Select a date
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
                        Available from tomorrow
                      </div>
                    </div>
                  )}
                </div>

                {submitAttempted &&
                  !isDateValid &&
                  errorText(
                    "Please select a valid tour date (from tomorrow onward)."
                  )}
              </div>

              <div className="my-9 h-px bg-slate-100" />

              {/* GUESTS */}
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0b3a78]">
                      <UsersIcon />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#071a36]">
                        Guests
                      </h3>

                      <p className="text-xs text-slate-400">
                        Private experience for your group
                      </p>
                    </div>
                  </div>

                  <div className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 sm:block">
                    {totalGuests} guests
                  </div>

                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">

                  {/* ADULTS */}
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-5">

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0b3a78]">
                        <UserIcon />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          Adults
                        </p>

                        <p className="text-xs text-slate-400">
                          Age 11+
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            "adults",
                            Number(adults) - 1
                          )
                        }
                        disabled={Number(adults) <= 1}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#0b3a78] hover:text-[#0b3a78] disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <MinusIcon />
                      </button>

                      <span className="w-7 text-center text-base font-bold text-[#071a36]">
                        {adults}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            "adults",
                            Number(adults) + 1
                          )
                        }
                        disabled={
                          Number(adults) >= 25 ||
                          totalGuests >= 25
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#0b3a78] hover:text-[#0b3a78] disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <PlusIcon />
                      </button>

                    </div>
                  </div>

                  {/* CHILDREN */}
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-5">

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <UserIcon />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          Children
                        </p>

                        <p className="text-xs text-slate-400">
                          Ages 5–10
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            "children",
                            Number(children) - 1
                          )
                        }
                        disabled={Number(children) <= 0}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#0b3a78] hover:text-[#0b3a78] disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <MinusIcon />
                      </button>

                      <span className="w-7 text-center text-base font-bold text-[#071a36]">
                        {children}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            "children",
                            Number(children) + 1
                          )
                        }
                        disabled={
                          Number(children) >= 10 ||
                          totalGuests >= 25
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#0b3a78] hover:text-[#0b3a78] disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <PlusIcon />
                      </button>

                    </div>
                  </div>

                  {/* INFANTS */}
                  <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                        <UserIcon />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          Infants
                        </p>

                        <p className="text-xs text-slate-400">
                          Ages 1–4
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            "infants",
                            Number(infants) - 1
                          )
                        }
                        disabled={Number(infants) <= 0}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#0b3a78] hover:text-[#0b3a78] disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <MinusIcon />
                      </button>

                      <span className="w-7 text-center text-base font-bold text-[#071a36]">
                        {infants}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            "infants",
                            Number(infants) + 1
                          )
                        }
                        disabled={
                          Number(infants) >= 10 ||
                          totalGuests >= 25
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#0b3a78] hover:text-[#0b3a78] disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <PlusIcon />
                      </button>

                    </div>
                  </div>

                </div>

                {submitAttempted &&
                  !isGuestsValid &&
                  errorText(
                    "Private tours require a minimum of 2 guests and a maximum of 25 guests."
                  )}

                <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#071a36] px-5 py-4 text-white">

                  <div className="flex items-center gap-3">
                    <UsersIcon />

                    <span className="text-sm font-semibold text-slate-300">
                      Total guests
                    </span>
                  </div>

                  <span className="text-xl font-bold">
                    {totalGuests}
                  </span>

                </div>
              </div>

              {/* CHILD AGES */}
              {childAges.length > 0 && (
                <>
                  <div className="my-8 h-px bg-slate-100" />

                  <div>
                    <div className="mb-4">
                      <h3 className="font-bold text-[#071a36]">
                        Children ages
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Please provide the age of each child.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">

                      {childAges.map((_, index) => (
                        <div key={index}>
                          <div className="relative">

                            <select
                              value={
                                childrenAgeValues[index] || ""
                              }
                              className={`${inputClass(
                                submitAttempted &&
                                  !childrenAgeValues[index]
                              )} appearance-none pr-10`}
                              onChange={(e) => {
                                const updated = [
                                  ...childrenAgeValues,
                                ];

                                updated[index] =
                                  e.target.value;

                                setChildrenAgeValues(updated);
                              }}
                            >
                              <option value="">
                                Select Child {index + 1} age
                              </option>

                              {[5, 6, 7, 8, 9, 10].map(
                                (age) => (
                                  <option
                                    key={age}
                                    value={age}
                                  >
                                    {age} years
                                  </option>
                                )
                              )}
                            </select>

                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                              <ChevronDownIcon />
                            </div>

                          </div>

                          {submitAttempted &&
                            !childrenAgeValues[index] &&
                            errorText(
                              `Select an age for Child ${
                                index + 1
                              }.`
                            )}
                        </div>
                      ))}

                    </div>
                  </div>
                </>
              )}

              {/* INFANT AGES */}
              {infantAges.length > 0 && (
                <>
                  <div className="my-8 h-px bg-slate-100" />

                  <div>
                    <div className="mb-4">
                      <h3 className="font-bold text-[#071a36]">
                        Infant ages
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Please provide the age of each infant.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">

                      {infantAges.map((_, index) => (
                        <div key={index}>
                          <div className="relative">

                            <select
                              value={
                                infantAgeValues[index] || ""
                              }
                              className={`${inputClass(
                                submitAttempted &&
                                  !infantAgeValues[index]
                              )} appearance-none pr-10`}
                              onChange={(e) => {
                                const updated = [
                                  ...infantAgeValues,
                                ];

                                updated[index] =
                                  e.target.value;

                                setInfantAgeValues(updated);
                              }}
                            >
                              <option value="">
                                Select Infant {index + 1} age
                              </option>

                              {[1, 2, 3, 4].map((age) => (
                                <option
                                  key={age}
                                  value={age}
                                >
                                  {age}{" "}
                                  {age === 1
                                    ? "year"
                                    : "years"}
                                </option>
                              ))}
                            </select>

                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                              <ChevronDownIcon />
                            </div>

                          </div>

                          {submitAttempted &&
                            !infantAgeValues[index] &&
                            errorText(
                              `Select an age for Infant ${
                                index + 1
                              }.`
                            )}
                        </div>
                      ))}

                    </div>
                  </div>
                </>
              )}

              <div className="my-9 h-px bg-slate-100" />

              {/* NOTES */}
              <div>
                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <MessageIcon />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#071a36]">
                      Additional information
                    </h3>

                    <p className="text-xs text-slate-400">
                      Anything else we should know?
                    </p>
                  </div>

                </div>

                <label className={labelClass}>
                  Special Requests / Notes
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell us about any special requests, preferences or important details..."
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
                    Please complete the required fields
                    highlighted above before sending your
                    booking request.
                  </p>
                </div>
              )}

              {/* MOBILE PRICE */}
              <div className="mt-7 rounded-2xl border border-orange-100 bg-orange-50 p-5 lg:hidden">
                <div className="flex items-end justify-between gap-4">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">
                      Private tour
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {totalGuests} guests
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-black text-[#071a36]">
                      €{totalPrice}
                    </p>

                    <p className="text-[10px] font-semibold text-slate-400">
                      total experience
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
                  Send Booking Request
                </span>

                <span className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] font-semibold text-slate-400">
                <LockIcon />

                <span>
                  Your booking request is sent securely via
                  WhatsApp
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
                    Your reservation
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    Private Tour Summary
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-300">
                    Everything is private and arranged
                    exclusively for your group.
                  </p>

                </div>
              </div>

              <div className="p-5 sm:p-6">

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Tour
                  </p>

                  <p className="mt-2 text-sm font-bold leading-6 text-[#071a36]">
                    {tourName}
                  </p>

                  <div className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0b3a78]">
                    {tourType}
                  </div>

                </div>

                <div className="mt-3 overflow-hidden rounded-2xl border border-orange-100 bg-orange-50">

                  <div className="flex items-end justify-between p-5">

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">
                        Total price
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-500">
                        Private experience
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-3xl font-black text-[#071a36]">
                        €{totalPrice}
                      </p>
                    </div>

                  </div>

                  <div className="border-t border-orange-100 px-5 py-3 text-[10px] font-semibold text-orange-700">
                    Price updates automatically with guest
                    count
                  </div>

                </div>

                <div className="mt-3 overflow-hidden rounded-2xl border border-slate-100">

                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">

                    <div className="flex items-center gap-3">
                      <div className="text-slate-400">
                        <CalendarIcon />
                      </div>

                      <span className="text-xs font-bold text-slate-500">
                        Date
                      </span>
                    </div>

                    <span className="max-w-[150px] text-right text-xs font-bold text-[#071a36]">
                      {date
                        ? formatDateDisplay(date)
                        : "Not selected"}
                    </span>

                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">

                    <div className="flex items-center gap-3">
                      <div className="text-slate-400">
                        <UsersIcon />
                      </div>

                      <span className="text-xs font-bold text-slate-500">
                        Guests
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#071a36]">
                      {totalGuests}
                    </span>

                  </div>

                  <div className="flex items-center justify-between px-4 py-4">

                    <div className="flex items-center gap-3">
                      <div className="text-slate-400">
                        <HotelIcon />
                      </div>

                      <span className="text-xs font-bold text-slate-500">
                        Pickup
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
                        Included in your experience
                      </h4>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Included
                      </span>
                    </div>

                    <div className="space-y-3">

                      {included.map((item, index) => (
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
                        Simple & direct booking
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-slate-400">
                        Send your request and our team will
                        contact you directly to confirm the
                        details.
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
  );
}