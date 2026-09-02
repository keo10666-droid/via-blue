"use client";

import { useMemo, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { tours } from "@/data/tours";

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

export default function BookingPage() {
  const params = useParams();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const tour = tours[slug as keyof typeof tours];

  if (!tour) {
    notFound();
  }

  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [isNationalityOpen, setIsNationalityOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [hotel, setHotel] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [date, setDate] = useState("");

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");

  const [notes, setNotes] = useState("");

  const [childrenAgeValues, setChildrenAgeValues] = useState<string[]>(
    []
  );

  const [infantAgeValues, setInfantAgeValues] = useState<string[]>([]);

  const [submitAttempted, setSubmitAttempted] = useState(false);

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
    Number(adults || 0) * tour.price +
    Number(children || 0) * tour.childPrice +
    Number(infants || 0) * tour.infantPrice;

  const filteredNationalities = useMemo(() => {
    if (!nationality) return [];

    return nationalities
      .filter((n) =>
        n.toLowerCase().includes(nationality.toLowerCase())
      )
      .slice(0, 6);
  }, [nationality]);

  const filteredCountryCodes = useMemo(() => {
    if (!countrySearch) return countryCodes;

    return countryCodes.filter(
      (c) =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        c.dialCode.includes(countrySearch)
    );
  }, [countrySearch]);

  const tomorrowIso = useMemo(() => {
    const d = new Date();

    d.setDate(d.getDate() + 1);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const tomorrowDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1);
    return d;
  }, []);

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [calendarMonth]);

  const monthTitle = calendarMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatSelectedDate = (value: string) => {
    if (!value) return "";

    const [year, month, day] = value.split("-").map(Number);

    const d = new Date(year, month - 1, day);

    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDateSelect = (selectedDate: Date) => {
    if (selectedDate < tomorrowDate) return;

    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(selectedDate.getDate()).padStart(2, "0");

    setDate(`${yyyy}-${mm}-${dd}`);
    setIsDatePickerOpen(false);
  };

  const goToPreviousMonth = () => {
    const previous = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() - 1,
      1
    );

    const currentMonthStart = new Date(
      tomorrowDate.getFullYear(),
      tomorrowDate.getMonth(),
      1
    );

    if (previous < currentMonthStart) return;

    setCalendarMonth(previous);
  };

  const goToNextMonth = () => {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + 1,
        1
      )
    );
  };

  const isPhoneValid =
    phone.replace(/\D/g, "").length >= 6;

  const isEmailValid =
    EMAIL_REGEX.test(email.trim());

  const isNameValid =
    name.trim().length >= 2;

  const isDateValid =
    date.length > 0 && date >= tomorrowIso;

  const allChildAgesSet = childAges.every(
    (_, i) => Boolean(childrenAgeValues[i])
  );

  const allInfantAgesSet = infantAges.every(
    (_, i) => Boolean(infantAgeValues[i])
  );

  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isDateValid &&
    allChildAgesSet &&
    allInfantAgesSet;

  const inputClass = (invalid: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-4 ${
      invalid
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-gray-200 focus:border-blue-600 focus:ring-blue-100"
    }`;

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-800";

  const errorText = (msg: string) => (
    <p className="mt-1.5 text-xs font-semibold text-red-600">
      {msg}
    </p>
  );

  const handleSubmit = () => {
    setSubmitAttempted(true);

    if (!isFormValid) return;

    const fullPhone =
      `${selectedCountry.dialCode} ${phone.trim()}`;

    const message = `
NEW BOOKING REQUEST

Tour: ${tour.name}

Full Name: ${name.trim()}
Nationality: ${nationality || "Not specified"}
Email: ${email.trim()}

Hotel: ${hotel || "Not specified"}
Room Number: ${roomNumber || "Not specified"}

Tour Date: ${date}

Adults: ${adults}
Children: ${children}
Infants: ${infants}

Total Guests: ${totalGuests}

Children Ages: ${
      childrenAgeValues.filter(Boolean).join(", ") || "-"
    }

Infant Ages: ${
      infantAgeValues.filter(Boolean).join(", ") || "-"
    }

Total Price: €${totalPrice}

WhatsApp: ${fullPhone}

Notes:
${notes.trim() || "-"}
`;

    const whatsappUrl =
      `https://wa.me/201091920706?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white shadow-xl">
          <div className="relative p-7 md:p-10 lg:p-12">

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/5" />
            <div className="absolute -bottom-24 left-20 h-48 w-48 rounded-full bg-white/5" />

            <div className="relative">
              <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-100">
                Secure Booking
              </div>

              <p className="text-sm font-bold uppercase tracking-wide text-orange-400">
                {tour.name}
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                Book Your Tour
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">
                Complete your booking details below and our team
                will confirm your reservation shortly.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-blue-100">
                <span className="rounded-full bg-white/10 px-4 py-2">
                  Secure Booking
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2">
                  Quick Confirmation
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2">
                  Professional Service
                </span>
              </div>
            </div>

          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-2">

            {/* Guest Information */}
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <span className="text-lg font-bold">01</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Guest Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Tell us who will be joining the tour.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* Name */}
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className={inputClass(
                      submitAttempted && !isNameValid
                    )}
                  />

                  {submitAttempted &&
                    !isNameValid &&
                    errorText(
                      "Please enter the guest's full name."
                    )}
                </div>

                {/* Nationality */}
                <div className="relative">
                  <label className={labelClass}>
                    Nationality
                  </label>

                  <input
                    type="text"
                    placeholder="Select your nationality"
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
                    className={inputClass(false)}
                  />

                  {isNationalityOpen &&
                    filteredNationalities.length > 0 && (
                      <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                        {filteredNationalities.map(
                          (item) => (
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
                              className="block w-full border-b border-slate-100 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 last:border-b-0"
                            >
                              {item}
                            </button>
                          )
                        )}
                      </div>
                    )}
                </div>

              </div>

              {/* Contact */}
              <div className="mt-5 grid gap-5 md:grid-cols-2">

                {/* Email */}
                <div>
                  <label className={labelClass}>
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className={inputClass(
                      submitAttempted && !isEmailValid
                    )}
                  />

                  {submitAttempted &&
                    !isEmailValid &&
                    errorText(
                      "Please enter a valid email address."
                    )}
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass}>
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>

                  <div className="flex gap-2">

                    <div className="relative">

                      <button
                        type="button"
                        onClick={() =>
                          setIsCountryOpen((v) => !v)
                        }
                        className="flex h-full min-w-[105px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-gray-900 shadow-sm transition hover:border-blue-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        <FlagIcon
                          iso={selectedCountry.iso}
                          name={selectedCountry.name}
                        />

                        <span className="text-sm font-semibold">
                          {selectedCountry.dialCode}
                        </span>

                        <span className="text-xs text-gray-400">
                          ▼
                        </span>
                      </button>

                      {isCountryOpen && (
                        <div className="absolute left-0 top-full z-40 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                          <div className="border-b border-slate-100 p-3">
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={countrySearch}
                              onChange={(e) =>
                                setCountrySearch(
                                  e.target.value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                              autoFocus
                            />
                          </div>

                          <div className="max-h-64 overflow-y-auto">

                            {filteredCountryCodes.map(
                              (c) => (
                                <button
                                  key={c.name}
                                  type="button"
                                  onMouseDown={(e) =>
                                    e.preventDefault()
                                  }
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setIsCountryOpen(false);
                                    setCountrySearch("");
                                  }}
                                  className="flex w-full items-center gap-3 border-b border-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-blue-50"
                                >
                                  <FlagIcon
                                    iso={c.iso}
                                    name={c.name}
                                  />

                                  <span className="flex-1">
                                    {c.name}
                                  </span>

                                  <span className="font-semibold text-slate-400">
                                    {c.dialCode}
                                  </span>
                                </button>
                              )
                            )}

                          </div>
                        </div>
                      )}

                    </div>

                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      className={
                        inputClass(
                          submitAttempted &&
                            !isPhoneValid
                        ) + " flex-1"
                      }
                    />

                  </div>

                  {submitAttempted &&
                    !isPhoneValid &&
                    errorText(
                      "Please enter a valid WhatsApp number."
                    )}
                </div>

              </div>
            </div>

            {/* Hotel Information */}
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <span className="text-lg font-bold">02</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Hotel Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Where should we pick you up?
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className={labelClass}>
                    Hotel Name
                  </label>

                  <input
                    type="text"
                    placeholder="Your hotel name"
                    value={hotel}
                    onChange={(e) =>
                      setHotel(e.target.value)
                    }
                    className={inputClass(false)}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Room Number
                  </label>

                  <input
                    type="text"
                    placeholder="Room number"
                    value={roomNumber}
                    onChange={(e) =>
                      setRoomNumber(e.target.value)
                    }
                    className={inputClass(false)}
                  />
                </div>

              </div>
            </div>

            {/* Tour Information */}
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <span className="text-lg font-bold">03</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Tour Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Select your preferred tour date.
                  </p>
                </div>
              </div>

              <label className={labelClass}>
                Tour Date <span className="text-red-500">*</span>
              </label>

              {/* Professional Custom Date Picker */}
              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setIsDatePickerOpen((v) => !v)
                  }
                  className={`flex min-h-[58px] w-full items-center justify-between rounded-xl border bg-white px-4 text-left shadow-sm transition-all focus:outline-none focus:ring-4 ${
                    submitAttempted && !isDateValid
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : isDatePickerOpen
                      ? "border-blue-600 ring-4 ring-blue-100"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.8"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 9.75h18M4.5 5.25h15A1.5 1.5 0 0 1 21 6.75v12A1.5 1.5 0 0 1 19.5 20.25h-15A1.5 1.5 0 0 1 3 18.75v-12A1.5 1.5 0 0 1 4.5 5.25Z"
                        />
                      </svg>
                    </div>

                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          date
                            ? "text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        {date
                          ? formatSelectedDate(date)
                          : "Select your tour date"}
                      </p>

                      <p className="text-xs text-slate-400">
                        Available from tomorrow
                      </p>
                    </div>

                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className={`h-5 w-5 text-slate-400 transition-transform ${
                      isDatePickerOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {isDatePickerOpen && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl md:w-[390px]">

                    {/* Calendar Header */}
                    <div className="bg-gradient-to-br from-blue-950 to-blue-800 p-5 text-white">

                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                        Select Tour Date
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {date
                          ? formatSelectedDate(date)
                          : "Choose a date"}
                      </p>

                    </div>

                    {/* Calendar */}
                    <div className="p-5">

                      {/* Month Navigation */}
                      <div className="mb-5 flex items-center justify-between">

                        <button
                          type="button"
                          onClick={goToPreviousMonth}
                          disabled={
                            calendarMonth.getFullYear() ===
                              tomorrowDate.getFullYear() &&
                            calendarMonth.getMonth() ===
                              tomorrowDate.getMonth()
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          ‹
                        </button>

                        <h3 className="text-base font-bold text-slate-900">
                          {monthTitle}
                        </h3>

                        <button
                          type="button"
                          onClick={goToNextMonth}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                        >
                          ›
                        </button>

                      </div>

                      {/* Week Days */}
                      <div className="mb-2 grid grid-cols-7">
                        {[
                          "Sun",
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat",
                        ].map((day) => (
                          <div
                            key={day}
                            className="py-2 text-center text-xs font-bold text-slate-400"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Days */}
                      <div className="grid grid-cols-7 gap-1">

                        {calendarDays.map(
                          (day, index) => {

                            if (!day) {
                              return (
                                <div
                                  key={`empty-${index}`}
                                  className="h-10"
                                />
                              );
                            }

                            const disabled =
                              day < tomorrowDate;

                            const selected =
                              date &&
                              isSameDate(
                                day,
                                new Date(
                                  Number(
                                    date.split("-")[0]
                                  ),
                                  Number(
                                    date.split("-")[1]
                                  ) - 1,
                                  Number(
                                    date.split("-")[2]
                                  )
                                )
                              );

                            const today =
                              isSameDate(
                                day,
                                new Date()
                              );

                            return (
                              <button
                                key={day.toISOString()}
                                type="button"
                                disabled={disabled}
                                onClick={() =>
                                  handleDateSelect(day)
                                }
                                className={`relative flex h-10 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                                  disabled
                                    ? "cursor-not-allowed text-slate-200"
                                    : selected
                                    ? "bg-blue-900 text-white shadow-md"
                                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-800"
                                }`}
                              >
                                {day.getDate()}

                                {today &&
                                  !selected &&
                                  !disabled && (
                                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-orange-500" />
                                  )}
                              </button>
                            );
                          }
                        )}

                      </div>

                      {/* Calendar Footer */}
                      <div className="mt-5 border-t border-slate-100 pt-4">

                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="h-2 w-2 rounded-full bg-orange-500" />
                          Today
                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                          Dates before tomorrow are unavailable.
                        </p>

                      </div>

                    </div>
                  </div>
                )}

              </div>

              <p className="mt-2 text-xs text-slate-400">
                Please select a date from tomorrow onward.
              </p>

              {submitAttempted &&
                !isDateValid &&
                errorText(
                  "Please select a valid tour date."
                )}
            </div>

            {/* Guests */}
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <span className="text-lg font-bold">04</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Guests
                  </h2>

                  <p className="text-sm text-slate-500">
                    Tell us how many guests are travelling.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">

                <div>
                  <label className={labelClass}>
                    Adults
                  </label>

                  <select
                    value={adults}
                    onChange={(e) =>
                      setAdults(e.target.value)
                    }
                    className={inputClass(false)}
                  >
                    {Array.from(
                      { length: 20 },
                      (_, i) => (
                        <option
                          key={i + 1}
                          value={i + 1}
                        >
                          {i + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Children{" "}
                    <span className="font-normal text-slate-400">
                      (5–10)
                    </span>
                  </label>

                  <select
                    value={children}
                    onChange={(e) => {
                      const value = e.target.value;

                      setChildren(value);

                      setChildrenAgeValues(
                        (current) =>
                          current.slice(
                            0,
                            Number(value)
                          )
                      );
                    }}
                    className={inputClass(false)}
                  >
                    {Array.from(
                      { length: 11 },
                      (_, i) => (
                        <option
                          key={i}
                          value={i}
                        >
                          {i}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Infants{" "}
                    <span className="font-normal text-slate-400">
                      (1–4)
                    </span>
                  </label>

                  <select
                    value={infants}
                    onChange={(e) => {
                      const value = e.target.value;

                      setInfants(value);

                      setInfantAgeValues(
                        (current) =>
                          current.slice(
                            0,
                            Number(value)
                          )
                      );
                    }}
                    className={inputClass(false)}
                  >
                    {Array.from(
                      { length: 11 },
                      (_, i) => (
                        <option
                          key={i}
                          value={i}
                        >
                          {i}
                        </option>
                      )
                    )}
                  </select>
                </div>

              </div>
            </div>

            {/* Children Ages */}
            {childAges.length > 0 && (
              <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <h3 className="mb-4 text-base font-bold text-slate-900">
                  Children Ages
                </h3>

                <div className="grid gap-4 md:grid-cols-2">

                  {childAges.map(
                    (_, index) => (
                      <div key={index}>

                        <select
                          value={
                            childrenAgeValues[
                              index
                            ] || ""
                          }
                          className={inputClass(
                            submitAttempted &&
                              !childrenAgeValues[
                                index
                              ]
                          )}
                          onChange={(e) => {
                            const updated = [
                              ...childrenAgeValues,
                            ];

                            updated[index] =
                              e.target.value;

                            setChildrenAgeValues(
                              updated
                            );
                          }}
                        >
                          <option value="">
                            Select Child {index + 1} Age
                          </option>

                          <option value="5">
                            5 years
                          </option>

                          <option value="6">
                            6 years
                          </option>

                          <option value="7">
                            7 years
                          </option>

                          <option value="8">
                            8 years
                          </option>

                          <option value="9">
                            9 years
                          </option>

                          <option value="10">
                            10 years
                          </option>
                        </select>

                        {submitAttempted &&
                          !childrenAgeValues[
                            index
                          ] &&
                          errorText(
                            `Please select an age for Child ${
                              index + 1
                            }.`
                          )}

                      </div>
                    )
                  )}

                </div>
              </div>
            )}

            {/* Infant Ages */}
            {infantAges.length > 0 && (
              <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <h3 className="mb-4 text-base font-bold text-slate-900">
                  Infant Ages
                </h3>

                <div className="grid gap-4 md:grid-cols-2">

                  {infantAges.map(
                    (_, index) => (
                      <div key={index}>

                        <select
                          value={
                            infantAgeValues[
                              index
                            ] || ""
                          }
                          className={inputClass(
                            submitAttempted &&
                              !infantAgeValues[
                                index
                              ]
                          )}
                          onChange={(e) => {
                            const updated = [
                              ...infantAgeValues,
                            ];

                            updated[index] =
                              e.target.value;

                            setInfantAgeValues(
                              updated
                            );
                          }}
                        >
                          <option value="">
                            Select Infant {index + 1} Age
                          </option>

                          <option value="1">
                            1 year
                          </option>

                          <option value="2">
                            2 years
                          </option>

                          <option value="3">
                            3 years
                          </option>

                          <option value="4">
                            4 years
                          </option>
                        </select>

                        {submitAttempted &&
                          !infantAgeValues[
                            index
                          ] &&
                          errorText(
                            `Please select an age for Infant ${
                              index + 1
                            }.`
                          )}

                      </div>
                    )
                  )}

                </div>
              </div>
            )}

            {/* Total Guests */}
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">

              <span className="text-sm font-semibold text-slate-600">
                Total Guests
              </span>

              <span className="text-xl font-bold text-blue-900">
                {totalGuests}
              </span>

            </div>

            {/* Booking Summary */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">

              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Booking Summary
                </h3>
              </div>

              <div className="space-y-3 p-5 text-sm">

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">
                    Adults × €{tour.price}
                  </span>

                  <span className="font-semibold text-slate-800">
                    €{Number(adults || 0) * tour.price}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">
                    Children × €{tour.childPrice}
                  </span>

                  <span className="font-semibold text-slate-800">
                    €{Number(children || 0) * tour.childPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">
                    Infants × €{tour.infantPrice}
                  </span>

                  <span className="font-semibold text-slate-800">
                    €{Number(infants || 0) * tour.infantPrice}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-base font-bold text-slate-900">
                    Total Price
                  </span>

                  <span className="text-2xl font-bold text-blue-900">
                    €{totalPrice}
                  </span>
                </div>

              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <span className="text-lg font-bold">05</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Additional Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Anything else we should know?
                  </p>
                </div>
              </div>

              <label className={labelClass}>
                Special Requests / Notes
              </label>

              <textarea
                rows={5}
                placeholder="Let us know if you have any special requests..."
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                className={inputClass(false)}
              />
            </div>

            {submitAttempted &&
              !isFormValid && (
                <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  Please complete the required fields
                  highlighted above before sending your booking
                  request.
                </div>
              )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="group mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-900 px-6 py-4.5 text-base font-bold text-white shadow-lg shadow-blue-900/20 transition-all duration-200 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-900/25 active:scale-[0.99]"
            >
              <span>
                Confirm Booking Request
              </span>

              <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              Your booking request will be sent securely to our
              reservations team for confirmation.
            </p>

          </div>

          {/* Summary */}
          <div>
            <div className="sticky top-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="bg-gradient-to-br from-blue-950 to-blue-800 p-6 text-white">

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Your Reservation
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Tour Summary
                </h3>

              </div>

              <div className="space-y-4 p-6">

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Tour
                  </p>

                  <p className="font-bold leading-6 text-slate-900">
                    {tour.name}
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-500">
                    Total Price
                  </p>

                  <p className="text-3xl font-bold text-blue-900">
                    €{totalPrice}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Guests
                    </p>

                    <p className="text-xl font-bold text-slate-900">
                      {totalGuests}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Type
                    </p>

                    <p className="font-bold text-slate-900">
                      {tour.type}
                    </p>
                  </div>

                </div>

                <div className="rounded-2xl border border-slate-200 p-5">

                  <p className="mb-4 text-sm font-bold text-slate-900">
                    What's Included
                  </p>

                  <ul className="space-y-3">

                    {tour.included.map(
                      (item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-slate-600"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                            ✓
                          </span>

                          <span>
                            {item}
                          </span>
                        </li>
                      )
                    )}

                  </ul>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                  <p className="text-sm font-semibold leading-6 text-blue-900">
                    Your request will be reviewed by our team
                    and confirmed with you shortly.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}