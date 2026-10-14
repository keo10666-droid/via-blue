"use client";

import { supabase } from "@/lib/supabase";

import { useEffect, useMemo, useState } from "react";

import { useParams, notFound } from "next/navigation";

import { tours } from "@/data/tours";
import BookingSuccessModal from "@/app/components/BookingSuccessModal";
import HomeText from "@/app/components/HomeText";
import { germanTourCopy } from "@/lib/germanTourCopy";

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

const EMAIL_REGEX = /^(?!.*\.\.)[a-zA-Z0-9](?:[a-zA-Z0-9.]{4,28}[a-zA-Z0-9])@gmail\.com$/i;

export default function BookingPage() {
  const [isGerman, setIsGerman] = useState(false);

  useEffect(() => {
    const syncLanguage = () => setIsGerman(window.localStorage.getItem("via-blue-language") === "de");
    syncLanguage();
    window.addEventListener("via-blue-language-change", syncLanguage);
    return () => window.removeEventListener("via-blue-language-change", syncLanguage);
  }, []);
  const params = useParams();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const baseTour = tours[slug as keyof typeof tours];
  const [catalogLoaded, setCatalogLoaded] = useState(false);
  const [tourOverride, setTourOverride] = useState<{
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    childPrice?: number;
    infantPrice?: number;
    available?: boolean;
    category?: string;
    pricingOptions?: {
      vehicleOptions?: NonNullable<(typeof tours)[keyof typeof tours]["vehicleOptions"]>;
      cairoOptions?: NonNullable<(typeof tours)[keyof typeof tours]["cairoOptions"]>;
    };
  }>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/tour-catalog", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (!cancelled && slug && payload?.overrides?.[slug]) {
          setTourOverride(payload.overrides[slug]);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setCatalogLoaded(true);
      });
    return () => { cancelled = true; };
  }, [slug]);

  const tour = baseTour
    ? { ...baseTour, ...tourOverride, ...(tourOverride.pricingOptions?.vehicleOptions ? { vehicleOptions: tourOverride.pricingOptions.vehicleOptions } : {}), ...(tourOverride.pricingOptions?.cairoOptions ? { cairoOptions: tourOverride.pricingOptions.cairoOptions } : {}) }
    : !baseTour
      ? {
          slug: String(slug),
          name: tourOverride.name || String(slug),
          destination: "hurghada" as const,
          category: "islands-boat-trips" as const,
          image: tourOverride.image || "/images/via-blue-hero.webp",
          gallery: [tourOverride.image || "/images/via-blue-hero.webp"],
          description: tourOverride.description || "",
          overview: tourOverride.description || "",
          duration: "To be confirmed",
          pickup: "Hotel pickup",
          schedule: "To be confirmed",
          program: [],
          highlights: [],
          included: [],
          excluded: [],
          notes: [],
          vehicleOptions: undefined,
          cairoOptions: undefined,
          price: tourOverride.price ?? 0,
          childPrice: tourOverride.childPrice ?? 0,
          infantPrice: tourOverride.infantPrice ?? 0,
          rating: 0,
          reviews: 0,
          badge: "New Experience",
          available: tourOverride.available ?? true,
          type: tourOverride.category,
          seo: { title: tourOverride.name || String(slug), description: tourOverride.description || "", keywords: [] },
        }
      : undefined;

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
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [hotel, setHotel] = useState("");
  const [hotelArea, setHotelArea] = useState("hurghada");
  const [roomNumber, setRoomNumber] = useState("");
  const [date, setDate] = useState("");

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);

    return new Date(
      d.getFullYear(),
      d.getMonth(),
      1
    );
  });

  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");

  const [selectedVehicle, setSelectedVehicle] =
  useState<"bus" | "van">("bus");

const [selectedMuseum, setSelectedMuseum] =
  useState<"oldMuseum" | "newMuseum">("oldMuseum");

  const [notes, setNotes] = useState("");

  const [childrenAgeValues, setChildrenAgeValues] =
    useState<string[]>([]);

  const [infantAgeValues, setInfantAgeValues] =
    useState<string[]>([]);

  const [submitAttempted, setSubmitAttempted] =
    useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmationEmailSent, setConfirmationEmailSent] =
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

  const chargeableGuests =
    Number(adults || 0) +
    Number(children || 0);

  const selectedVehicleOption =
    (slug === "luxor-over-day" || slug === "luxor-over-night") && tour.vehicleOptions
      ? (tour.vehicleOptions as Record<"bus" | "van", { name: string; adultPrice: number; childPrice: number; infantPrice: number }>)[selectedVehicle]
      : null;

  const selectedCairoOption =
    (slug === "cairo-over-day" || slug === "cairo-over-night") && tour.cairoOptions
      ? (tour.cairoOptions as Record<"oldMuseum" | "newMuseum", { name: string; bus: { adultPrice: number; childPrice: number; infantPrice: number }; van: { adultPrice: number; childPrice: number; infantPrice: number } }>)[selectedMuseum]
      : null;

const selectedCairoVehicleOption =
  selectedCairoOption
    ? selectedCairoOption[selectedVehicle]
    : null;

  const baseTotalPrice =
  slug === "speed-boat"
    ? tour.price +
      Math.max(chargeableGuests - 4, 0) * 15
    : (slug === "luxor-over-day" ||
   slug === "luxor-over-night") &&
  selectedVehicleOption
    ? Number(adults || 0) *
        selectedVehicleOption.adultPrice +
      Number(children || 0) *
        selectedVehicleOption.childPrice +
      Number(infants || 0) *
        selectedVehicleOption.infantPrice
    : (slug === "cairo-over-day" ||
   slug === "cairo-over-night") &&
  selectedCairoVehicleOption
    ? Number(adults || 0) *
        selectedCairoVehicleOption.adultPrice +
      Number(children || 0) *
        selectedCairoVehicleOption.childPrice +
      Number(infants || 0) *
        selectedCairoVehicleOption.infantPrice
    : Number(adults || 0) * tour.price +
      Number(children || 0) * tour.childPrice +
      Number(infants || 0) * tour.infantPrice;

  const hotelAreaSurchargePerPerson =
    hotelArea === "makadi-bay" || hotelArea === "sahl-hasheesh"
      ? 5
      : hotelArea === "el-gouna" || hotelArea === "safaga" || hotelArea === "soma-bay"
        ? 10
        : 0;

  const hotelAreaSurcharge =
    (Number(adults || 0) + Number(children || 0)) * hotelAreaSurchargePerPerson;

  const totalPrice = baseTotalPrice + hotelAreaSurcharge;

  const filteredNationalities = useMemo(() => {
    if (!nationality) return [];

    return nationalities
      .filter((n) =>
        n
          .toLowerCase()
          .includes(nationality.toLowerCase())
      )
      .slice(0, 6);
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

  const tomorrowIso = useMemo(() => {
    const d = new Date();

    d.setDate(d.getDate() + 1);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(
      2,
      "0"
    );
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
    const lastDay = new Date(
      year,
      month + 1,
      0
    );

    const startDay = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= lastDay.getDate();
      day++
    ) {
      days.push(
        new Date(year, month, day)
      );
    }

    return days;
  }, [calendarMonth]);

  const monthTitle =
    calendarMonth.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

  const isSameDate = (
    a: Date,
    b: Date
  ) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatSelectedDate = (
    value: string
  ) => {
    if (!value) return "";

    const [year, month, day] = value
      .split("-")
      .map(Number);

    const d = new Date(
      year,
      month - 1,
      day
    );

    return d.toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const handleDateSelect = (
    selectedDate: Date
  ) => {
    if (selectedDate < tomorrowDate) return;

    const yyyy =
      selectedDate.getFullYear();

    const mm = String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0");

    const dd = String(
      selectedDate.getDate()
    ).padStart(2, "0");

    setDate(
      `${yyyy}-${mm}-${dd}`
    );

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

    if (previous < currentMonthStart)
      return;

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

  const phoneDigits = phone.replace(/\D/g, "");
  const fullPhoneDigits = `${selectedCountry.dialCode}${phone}`.replace(/\D/g, "");
  const isPhoneValid =
    phoneDigits.length >= 6 &&
    fullPhoneDigits.length >= 8 &&
    fullPhoneDigits.length <= 15 &&
    !/^([0-9])\1+$/.test(fullPhoneDigits);

  const isEmailValid =
    EMAIL_REGEX.test(email.trim());

  const isNameValid =
    name.trim().length >= 2;

  const isDateValid =
    date.length > 0 &&
    date >= tomorrowIso;

  const allChildAgesSet =
    childAges.every(
      (_, i) =>
        Boolean(childrenAgeValues[i])
    );

  const allInfantAgesSet =
    infantAges.every(
      (_, i) =>
        Boolean(infantAgeValues[i])
    );

  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isDateValid &&
    allChildAgesSet &&
    allInfantAgesSet;

  const inputClass = (
    invalid: boolean
  ) =>
    `w-full rounded-2xl border bg-white px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:border-slate-300 focus:outline-none focus:ring-4 ${
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

  const handleSubmit = async () => {
  setSubmitAttempted(true);

  if (!isFormValid) return;

  const fullPhone =
    `${selectedCountry.dialCode} ${phone.trim()}`;

  const message = `
NEW BOOKING REQUEST

Tour: ${tour.name}

Museum: ${
    (slug === "cairo-over-day" ||
  slug === "cairo-over-night") &&
selectedCairoOption
      ? selectedCairoOption.name
      : "Not specified"
  }

Vehicle: ${
    (slug === "luxor-over-day" ||
  slug === "luxor-over-night") &&
selectedVehicleOption
      ? selectedVehicleOption.name
      : (slug === "cairo-over-day" ||
   slug === "cairo-over-night") &&
  selectedCairoVehicleOption
      ? selectedVehicle === "bus"
        ? "Bus"
        : "Van"
      : "Not specified"
  }

Full Name: ${name.trim()}

Nationality: ${nationality || "Not specified"}

Email: ${email.trim()}

Hotel: ${hotel || "Not specified"}

Hotel Area: ${hotelArea}

Hotel Area Surcharge: €${hotelAreaSurcharge}

Room Number: ${roomNumber || "Not specified"}

Tour Date: ${date}

Adults: ${adults}

Children: ${children}

Infants: ${infants}

Total Guests: ${totalGuests}

Children Ages: ${
    childrenAgeValues
      .filter(Boolean)
      .join(", ") || "-"
  }

Infant Ages: ${
    infantAgeValues
      .filter(Boolean)
      .join(", ") || "-"
  }

Total Price: €${totalPrice}

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
          subject: `New Tour Booking - ${tour.name}`,
          tourSlug: slug,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
              <h2 style="color: #0f172a;">New Tour Booking Request</h2>
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
    "Booking submission error:",
    error
  );

  alert(
    error instanceof Error
      ? error.message
      : isGerman
        ? "Beim Absenden Ihrer Buchung ist ein Fehler aufgetreten."
        : "Something went wrong while submitting your booking"
  );
}
};

  if (!baseTour && !tourOverride.category && catalogLoaded) notFound();
  if (!baseTour && !tourOverride.category) return <main className="min-h-screen p-8 text-center text-blue-950">{isGerman ? "Ausflugsdetails werden geladen…" : "Loading tour details…"}</main>;
  if (tour.available === false) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:py-12">
      <BookingSuccessModal
        open={showSuccess}
        guestName={name.trim()}
        bookingName={isGerman ? germanTourCopy(tour.slug, "name", tour.name) : tour.name}
        email={email.trim()}
        emailSent={confirmationEmailSent}
        backHref="/tours"
        backLabel="Back to Tours"
        onClose={() => setShowSuccess(false)}
      />
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="relative mb-8 overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white shadow-[0_25px_70px_-30px_rgba(15,23,42,0.65)]">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-2xl" />

          <div className="absolute -bottom-28 left-16 h-64 w-64 rounded-full bg-blue-400/10 blur-2xl" />

          <div className="absolute right-1/3 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/5 blur-xl" />

          <div className="relative p-7 md:p-10 lg:p-12">

            <div className="relative">

              <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100 backdrop-blur-md">
                <HomeText en="Secure Booking" de="Sichere Buchung" />
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.14em] text-orange-400">
                {tour.name}
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                <HomeText en="Book Your Tour" de="Buchen Sie Ihre Tour" />
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">
                <HomeText en="Complete your booking details below and our team will confirm your reservation shortly" de="Vervollständigen Sie Ihre Buchungsdaten. Unser Team bestätigt Ihre Reservierung in Kürze." />
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold text-blue-100">

                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <HomeText en="Secure Booking" de="Sichere Buchung" />
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <HomeText en="Quick Confirmation" de="Schnelle Bestätigung" />
                </span>

                <span className="rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-orange-100 backdrop-blur-md">
                  <HomeText en="Professional Service" de="Professioneller Service" />
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Form */}

          <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.35)] md:p-8 lg:col-span-2">

            {/* Guest Information */}

            <div className="mb-8">

              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-950 to-blue-800 text-white shadow-md shadow-blue-900/15">
                  <span className="text-sm font-bold">
                    01
                  </span>
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    <HomeText en="Guest Information" de="Gästeinformationen" />
                  </h2>

                  <p className="text-sm text-slate-500">
                    <HomeText en="Tell us who will be joining the tour" de="Teilen Sie uns mit, wer an der Tour teilnimmt" />
                  </p>

                </div>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* Name */}

                <div>

                  <label className={labelClass}>
                    Full Name{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder={isGerman ? "Vollständiger Name" : "Enter your full name"}
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className={inputClass(
                      submitAttempted &&
                        !isNameValid
                    )}
                  />

                  {submitAttempted &&
                    !isNameValid &&
                    errorText(
                      "Please enter the guest's full name"
                    )}

                </div>

                {/* Nationality */}

                <div className="relative">

                  <label className={labelClass}>
                    <HomeText en="Nationality" de="Nationalität" />
                  </label>

                  <input
                    type="text"
                    placeholder={isGerman ? "Nationalität auswählen" : "Select your nationality"}
                    value={nationality}
                    onChange={(e) => {
                      setNationality(
                        e.target.value
                      );
                      setIsNationalityOpen(
                        true
                      );
                    }}
                    onFocus={() =>
                      setIsNationalityOpen(
                        true
                      )
                    }
                    onBlur={() =>
                      setTimeout(
                        () =>
                          setIsNationalityOpen(
                            false
                          ),
                        150
                      )
                    }
                    className={inputClass(false)}
                  />

                  {isNationalityOpen &&
                    filteredNationalities.length >
                      0 && (
                      <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                        {filteredNationalities.map(
                          (item) => (
                            <button
                              key={item}
                              type="button"
                              onMouseDown={(e) =>
                                e.preventDefault()
                              }
                              onClick={() => {
                                setNationality(
                                  item
                                );
                                setIsNationalityOpen(
                                  false
                                );
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
                    {isGerman ? "E-Mail-Adresse (nur Gmail)" : "Email Address (Gmail only)"}{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    onBlur={() => setEmailTouched(true)}
                    aria-invalid={(emailTouched || submitAttempted) && !isEmailValid}
                    className={inputClass(
                      (emailTouched || submitAttempted) &&
                        !isEmailValid
                    )}
                  />

                  <p className="mt-1.5 text-xs text-slate-500">{isGerman ? "Verwenden Sie eine Gmail-Adresse mit der Endung @gmail.com" : "Use a Gmail address ending in @gmail.com"}</p>

                  {(emailTouched || submitAttempted) &&
                    !isEmailValid &&
                    errorText(
                      "Enter a valid Gmail address (example@gmail.com)"
                    )}

                </div>

                {/* Phone */}

                <div>

                  <label className={labelClass}>
                    WhatsApp Number{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <div className="flex gap-2">

                    <div className="relative">

                      <button
                        type="button"
                        onClick={() =>
                          setIsCountryOpen(
                            (v) => !v
                          )
                        }
                        className="flex h-full min-w-[105px] items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 text-gray-900 shadow-sm transition hover:border-blue-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >

                        <FlagIcon
                          iso={
                            selectedCountry.iso
                          }
                          name={
                            selectedCountry.name
                          }
                        />

                        <span className="text-sm font-semibold">
                          {
                            selectedCountry.dialCode
                          }
                        </span>

                        <span className="text-xs text-gray-400">
                          ▼
                        </span>

                      </button>

                      {isCountryOpen && (
                        <div className="absolute left-0 top-full z-40 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                          <div className="border-b border-slate-100 bg-slate-50/80 p-3">

                            <input
                              type="text"
                              placeholder={isGerman ? "Land suchen..." : "Search country..."}
                              value={countrySearch}
                              onChange={(e) =>
                                setCountrySearch(
                                  e.target.value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                                    setSelectedCountry(
                                      c
                                    );
                                    setIsCountryOpen(
                                      false
                                    );
                                    setCountrySearch(
                                      ""
                                    );
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
                      placeholder={isGerman ? "Telefonnummer" : "Phone number"}
                      value={phone}
                      onChange={(e) =>
                        setPhone(
                          e.target.value
                        )
                      }
                      onBlur={() => setPhoneTouched(true)}
                      aria-invalid={(phoneTouched || submitAttempted) && !isPhoneValid}
                      className={
                        inputClass(
                          (phoneTouched || submitAttempted) &&
                            !isPhoneValid
                        ) +
                        " flex-1"
                      }
                    />

                  </div>

                  {(phoneTouched || submitAttempted) &&
                    !isPhoneValid &&
                    errorText(
                      "Enter a valid WhatsApp number with 6+ local digits (7–15 digits including country code)"
                    )}

                </div>

              </div>

            </div>

            {/* Hotel Information */}

            <div className="mb-8">

              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-950 to-blue-800 text-white shadow-md shadow-blue-900/15">
                  <span className="text-sm font-bold">
                    02
                  </span>
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    <HomeText en="Hotel Information" de="Hotelinformationen" />
                  </h2>

                  <p className="text-sm text-slate-500">
                    <HomeText en="Where should we pick you up" de="Wo sollen wir Sie abholen?" />
                  </p>

                </div>

              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="min-w-0">
                  <label className={labelClass}>
                    <HomeText en="Hotel Name" de="Hotelname" />
                  </label>
                  <input
                    type="text"
                    placeholder={isGerman ? "Name Ihres Hotels" : "Your hotel name"}
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                    className={inputClass(false)}
                  />
                </div>

                <div className="min-w-0">
                  <label className={labelClass}>
                    <HomeText en="Hotel Area" de="Hotelregion" />
                  </label>
                  <select
                    value={hotelArea}
                    onChange={(e) => setHotelArea(e.target.value)}
                    className={inputClass(false)}
                  >
                    <option value="hurghada">Hurghada — {isGerman ? "Inklusive" : "Included"}</option>
                    <option value="makadi-bay">Makadi Bay — +€5 {isGerman ? "pro Person" : "per person"}</option>
                    <option value="sahl-hasheesh">Sahl Hasheesh — +€5 {isGerman ? "pro Person" : "per person"}</option>
                    <option value="el-gouna">El Gouna — +€10 {isGerman ? "pro Person" : "per person"}</option>
                    <option value="safaga">Safaga — +€10 {isGerman ? "pro Person" : "per person"}</option>
                    <option value="soma-bay">Soma Bay — +€10 {isGerman ? "pro Person" : "per person"}</option>
                  </select>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    {hotelAreaSurchargePerPerson === 0
                      ? <HomeText en="Hotel pickup in Hurghada is included." de="Hotelabholung in Hurghada ist inklusive." />
                      : <HomeText en={`€${hotelAreaSurchargePerPerson} per adult or child for this area.`} de={`${hotelAreaSurchargePerPerson} € pro Erwachsenem oder Kind für diese Region.`} />}
                  </p>
                </div>

                <div className="min-w-0">
                  <label className={labelClass}>
                    <HomeText en="Room Number" de="Zimmernummer" />
                  </label>
                  <input
                    type="text"
                    placeholder={isGerman ? "Zimmernummer" : "Room number"}
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className={inputClass(false)}
                  />
                </div>
              </div>

            </div>

            {/* Tour Information */}

            <div className="mb-8">

              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-950 to-blue-800 text-white shadow-md shadow-blue-900/15">
                  <span className="text-sm font-bold">
                    03
                  </span>
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    <HomeText en="Tour Information" de="Tourinformationen" />
                  </h2>

                  <p className="text-sm text-slate-500">
                    <HomeText en="Select your preferred tour date" de="Wählen Sie Ihr gewünschtes Tourdatum" />
                  </p>

                </div>

              </div>

              <label className={labelClass}>
                Tour Date{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              {/* Professional Custom Date Picker */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setIsDatePickerOpen(
                      (v) => !v
                    )
                  }
                  className={`flex min-h-[62px] w-full items-center justify-between rounded-2xl border bg-white px-4 text-left shadow-sm transition-all focus:outline-none focus:ring-4 ${
                    submitAttempted &&
                    !isDateValid
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : isDatePickerOpen
                      ? "border-blue-600 ring-4 ring-blue-100"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-950 text-orange-400">

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
                          ? formatSelectedDate(
                              date
                            )
                          : "Select your tour date"}
                      </p>

                      <p className="text-xs text-slate-400">
                        <HomeText en="Available from tomorrow" de="Ab morgen verfügbar" />
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

                  <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl md:w-[390px]">

                    {/* Calendar Header */}

                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 p-5 text-white">

                      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/10 blur-xl" />

                      <div className="relative">

                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-200">
                          <HomeText en="Select Tour Date" de="Tourdatum auswählen" />
                        </p>

                        <p className="mt-1 text-xl font-bold">
                          {date
                            ? formatSelectedDate(
                                date
                              )
                            : "Choose a date"}
                        </p>

                      </div>

                    </div>

                    {/* Calendar */}

                    <div className="p-5">

                      {/* Month Navigation */}

                      <div className="mb-5 flex items-center justify-between">

                        <button
                          type="button"
                          onClick={
                            goToPreviousMonth
                          }
                          disabled={
                            calendarMonth.getFullYear() ===
                              tomorrowDate.getFullYear() &&
                            calendarMonth.getMonth() ===
                              tomorrowDate.getMonth()
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          ‹
                        </button>

                        <h3 className="text-base font-bold text-slate-900">
                          {monthTitle}
                        </h3>

                        <button
                          type="button"
                          onClick={
                            goToNextMonth
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50"
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
                                    date.split(
                                      "-"
                                    )[0]
                                  ),
                                  Number(
                                    date.split(
                                      "-"
                                    )[1]
                                  ) - 1,
                                  Number(
                                    date.split(
                                      "-"
                                    )[2]
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
                                  handleDateSelect(
                                    day
                                  )
                                }
                                className={`relative flex h-10 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                                  disabled
                                    ? "cursor-not-allowed text-slate-200"
                                    : selected
                                    ? "bg-blue-950 text-white shadow-md shadow-blue-900/20"
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

                          <HomeText en="Today" de="Heute" />

                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                          <HomeText en="Dates before tomorrow are unavailable" de="Daten vor morgen sind nicht verfügbar" />
                        </p>

                      </div>

                    </div>

                  </div>

                )}

              </div>

              <p className="mt-2 text-xs text-slate-400">
                <HomeText en="Please select a date from tomorrow onward" de="Bitte wählen Sie ein Datum ab morgen" />
              </p>

              {submitAttempted &&
                !isDateValid &&
                errorText(
                  "Please select a valid tour date"
                )}

            </div>

            {/* Guests */}

            <div className="mb-8">

              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-950 to-blue-800 text-white shadow-md shadow-blue-900/15">
                  <span className="text-sm font-bold">
                    04
                  </span>
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    <HomeText en="Guests" de="Gäste" />
                  </h2>

                  <p className="text-sm text-slate-500">
                    <HomeText en="Tell us how many guests are travelling" de="Wie viele Gäste reisen mit?" />
                  </p>

                </div>

              </div>

              <div className="grid gap-5 md:grid-cols-3">

                {(slug === "cairo-over-day" ||
  slug === "cairo-over-night") &&
  tour.cairoOptions && (
  <div className="mb-5 md:col-span-3">
    <label className={labelClass}>
      <HomeText en="Museum Experience" de="Museumserlebnis" />
    </label>
    <p className="mb-3 mt-1 text-sm text-slate-500">
      <HomeText en="Choose which museum you would like to visit" de="Wählen Sie das Museum, das Sie besuchen möchten" />
    </p>
    <div className="grid gap-3 sm:grid-cols-2">
      {([
        { value: "oldMuseum", title: "Old Museum", deTitle: "Altes Museum", detail: "Egyptian Museum in Tahrir", deDetail: "Ägyptisches Museum am Tahrir-Platz" },
        { value: "newMuseum", title: "New Museum", deTitle: "Neues Museum", detail: "Grand Egyptian Museum (GEM)", deDetail: "Grand Egyptian Museum (GEM)" },
      ] as const).map((museum) => {
        const selected = selectedMuseum === museum.value;
        return (
          <button
            key={museum.value}
            type="button"
            onClick={() => setSelectedMuseum(museum.value)}
            aria-pressed={selected}
            className={`flex min-h-[92px] items-center gap-3 rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
              selected ? "border-blue-700 bg-blue-50 shadow-sm ring-1 ring-blue-700/10" : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-blue-800 text-white" : "bg-slate-100 text-slate-600"}`} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-5 9 5M5 10v8m4-8v8m6-8v8m4-8v8M3 20h18M2 22h20" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block text-sm font-bold ${selected ? "text-blue-950" : "text-slate-800"}`}>
                <HomeText en={museum.title} de={museum.deTitle} />
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                <HomeText en={museum.detail} de={museum.deDetail} />
              </span>
            </span>
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-blue-700 bg-blue-700 text-white" : "border-slate-300 bg-white text-transparent"}`} aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4 10 4 4 8-8" />
              </svg>
            </span>
          </button>
        );
      })}
    </div>
  </div>
)}

{(((slug === "luxor-over-day" ||
   slug === "luxor-over-night") &&
  tour.vehicleOptions) ||
  ((slug === "cairo-over-day" ||
  slug === "cairo-over-night") &&
  tour.cairoOptions)) && (
  <div className="mb-5 md:col-span-3">
    <label className={labelClass}>
      <HomeText en="Choose Your Vehicle" de="Wählen Sie Ihr Fahrzeug" />
    </label>
    <p className="mb-3 mt-1 text-sm text-slate-500">
      <HomeText en="Select your preferred transport option" de="Wählen Sie Ihre bevorzugte Transportoption" />
    </p>
    <div className="grid gap-3 sm:grid-cols-2">
      {([
        { value: "bus", title: "Bus", deTitle: "Bus", detail: "Comfortable group transport", deDetail: "Komfortabler Gruppentransport" },
        { value: "van", title: "Van", deTitle: "Van", detail: "Smaller group, more flexible", deDetail: "Kleinere Gruppe, flexibler unterwegs" },
      ] as const).map((vehicle) => {
        const selected = selectedVehicle === vehicle.value;
        return (
          <button
            key={vehicle.value}
            type="button"
            onClick={() => setSelectedVehicle(vehicle.value)}
            aria-pressed={selected}
            className={`flex min-h-[86px] items-center gap-3 rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
              selected ? "border-blue-700 bg-blue-50 shadow-sm ring-1 ring-blue-700/10" : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-blue-800 text-white" : "bg-slate-100 text-slate-600"}`} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7">
                {vehicle.value === "bus" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 16V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10M5 11h14M7 16v2m10-2v2M4 18h16M7 20h.01M17 20h.01" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 15V9a2 2 0 0 1 2-2h9l4 4v4M3 15h18M7 18h.01M17 18h.01M6 18a2 2 0 1 0 0 .01M18 18a2 2 0 1 0 0 .01" />
                )}
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block text-sm font-bold ${selected ? "text-blue-950" : "text-slate-800"}`}>
                <HomeText en={vehicle.title} de={vehicle.deTitle} />
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                <HomeText en={vehicle.detail} de={vehicle.deDetail} />
              </span>
            </span>
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-blue-700 bg-blue-700 text-white" : "border-slate-300 bg-white text-transparent"}`} aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4 10 4 4 8-8" />
              </svg>
            </span>
          </button>
        );
      })}
    </div>
  </div>
                )}

                <div>

                  <label className={labelClass}>
                    <HomeText en="Adults" de="Erwachsene" />
                  </label>

                  <select
                    value={adults}
                    onChange={(e) =>
                      setAdults(
                        e.target.value
                      )
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

                      const value =
                        e.target.value;

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

                      const value =
                        e.target.value;

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

              <div className="mb-8 rounded-[22px] border border-blue-100 bg-gradient-to-br from-slate-50 to-blue-50/40 p-5 shadow-sm">

                <h3 className="mb-4 text-base font-bold text-slate-900">
                  <HomeText en="Children Ages" de="Alter der Kinder" />
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
                            }`
                          )}

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

            {/* Infant Ages */}

            {infantAges.length > 0 && (

              <div className="mb-8 rounded-[22px] border border-orange-100 bg-gradient-to-br from-slate-50 to-orange-50/30 p-5 shadow-sm">

                <h3 className="mb-4 text-base font-bold text-slate-900">
                  <HomeText en="Infant Ages" de="Alter der Kleinkinder" />
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
                            }`
                          )}

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

            {/* Total Guests */}

            <div className="mb-6 flex items-center justify-between rounded-[22px] border border-blue-100 bg-gradient-to-r from-blue-50 to-orange-50/30 px-5 py-4 shadow-sm">

              <span className="text-sm font-semibold text-slate-600">
                <HomeText en="Total Guests" de="Gäste insgesamt" />
              </span>

              <span className="text-xl font-bold text-blue-950">
                {totalGuests}
              </span>

            </div>

            {/* Booking Summary */}

            <div className="mb-8 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/40 px-5 py-4">

                <h3 className="text-lg font-bold text-slate-900">
                  <HomeText en="Booking Summary" de="Buchungsübersicht" />
                </h3>

              </div>

              <div className="space-y-3 p-5 text-sm">

                {slug === "speed-boat" ? (

                  <div className="flex items-center justify-between">

                    <span className="text-slate-500">
                      <HomeText en={`Speedboat: ${chargeableGuests} chargeable guests`} de={`Schnellboot: ${chargeableGuests} zahlende Gäste`} />
</span>

                    <span className="font-semibold text-slate-800">
                      €{baseTotalPrice}
                    </span>

                  </div>

                                ) : (slug === "luxor-over-day" ||
     slug === "luxor-over-night") &&
     selectedVehicleOption ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">
                        <HomeText en="Vehicle" de="Fahrzeug" />
                      </span>
                      <span className="font-semibold text-slate-800">
                        {selectedVehicleOption.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">
                        <HomeText en={`Adults × €${selectedVehicleOption.adultPrice}`} de={`Erwachsene × €${selectedVehicleOption.adultPrice}`} />
                      </span>
                      <span className="font-semibold text-slate-800">
                        €{Number(adults || 0) * selectedVehicleOption.adultPrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">
                        <HomeText en={`Children × €${selectedVehicleOption.childPrice}`} de={`Kinder × €${selectedVehicleOption.childPrice}`} />
                      </span>
                      <span className="font-semibold text-slate-800">
                        €{Number(children || 0) * selectedVehicleOption.childPrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">
                        <HomeText en={`Infants × €${selectedVehicleOption.infantPrice}`} de={`Kleinkinder × €${selectedVehicleOption.infantPrice}`} />
                      </span>
                      <span className="font-semibold text-slate-800">
                        €{Number(infants || 0) * selectedVehicleOption.infantPrice}
                      </span>
                    </div>
                  </>
                                ) : (slug === "cairo-over-day" ||
     slug === "cairo-over-night") &&
     selectedCairoVehicleOption ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">
                        <HomeText en="Museum" de="Museum" />
                      </span>
                      <span className="font-semibold text-slate-800">
                        {selectedCairoOption?.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">
                        <HomeText en="Vehicle" de="Fahrzeug" />
                      </span>
                      <span className="font-semibold text-slate-800">
                        {selectedVehicle === "bus" ? <HomeText en="Bus" de="Bus" /> : <HomeText en="Van" de="Kleinbus" />}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">
                        <HomeText en={`Adults × €${selectedCairoVehicleOption.adultPrice}`} de={`Erwachsene × €${selectedCairoVehicleOption.adultPrice}`} />
                      </span>
                      <span className="font-semibold text-slate-800">
                        €{Number(adults || 0) * selectedCairoVehicleOption.adultPrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">
                        <HomeText en={`Children × €${selectedCairoVehicleOption.childPrice}`} de={`Kinder × €${selectedCairoVehicleOption.childPrice}`} />
                      </span>
                      <span className="font-semibold text-slate-800">
                        €{Number(children || 0) * selectedCairoVehicleOption.childPrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">
                        <HomeText en={`Infants × €${selectedCairoVehicleOption.infantPrice}`} de={`Kleinkinder × €${selectedCairoVehicleOption.infantPrice}`} />
                      </span>
                      <span className="font-semibold text-slate-800">
                        €{Number(infants || 0) * selectedCairoVehicleOption.infantPrice}
                      </span>
                    </div>
                  </>
                ) : (

                  <>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                      <span className="text-slate-500">
                        Adults × €{tour.price}
                      </span>

                      <span className="font-semibold text-slate-800">
                        €
                        {Number(adults || 0) *
                          tour.price}
                      </span>

                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                      <span className="text-slate-500">
                        Children × €{tour.childPrice}
                      </span>

                      <span className="font-semibold text-slate-800">
                        €
                        {Number(children || 0) *
                          tour.childPrice}
                      </span>

                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                      <span className="text-slate-500">
                        Infants × €{tour.infantPrice}
                      </span>

                      <span className="font-semibold text-slate-800">
                        €
                        {Number(infants || 0) *
                          tour.infantPrice}
                      </span>

                    </div>

                  </>

                )}

                <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-white p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-blue-950">
                        <HomeText en="Hotel-area transfer" de="Transferzuschlag für die Hotelregion" />
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {hotelAreaSurchargePerPerson === 0
                          ? <HomeText en="Hurghada pickup included" de="Abholung in Hurghada inklusive" />
                          : <HomeText en={`${chargeableGuests} guests × €${hotelAreaSurchargePerPerson} per adult/child`} de={`${chargeableGuests} Gäste × ${hotelAreaSurchargePerPerson} € pro Erwachsenem/Kind`} />}
                      </p>
                    </div>
                    <span className="shrink-0 text-base font-extrabold tabular-nums text-blue-950">
                      {hotelAreaSurcharge === 0 ? <HomeText en="Included" de="Inklusive" /> : `€${hotelAreaSurcharge}`}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">

                  <span className="text-base font-bold text-slate-900">
                    <HomeText en="Total Price" de="Gesamtpreis" />
                  </span>

                  <span className="text-2xl font-bold text-orange-500">
                    €{totalPrice}
                  </span>

                </div>

              </div>

            </div>

            {/* Additional Information */}

            <div className="mb-8">

              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-950 to-blue-800 text-white shadow-md shadow-blue-900/15">

                  <span className="text-sm font-bold">
                    05
                  </span>

                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    <HomeText en="Additional Information" de="Zusätzliche Informationen" />
                  </h2>

                  <p className="text-sm text-slate-500">
                    <HomeText en="Anything else we should know" de="Gibt es noch etwas, das wir wissen sollten?" />
                  </p>

                </div>

              </div>

              <label className={labelClass}>
                <HomeText en="Special Requests / Notes" de="Besondere Wünsche / Hinweise" />
              </label>

              <textarea
                rows={5}
                placeholder={isGerman ? "Haben Sie besondere Wünsche?" : "Let us know if you have any special requests..."}
                value={notes}
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
                className={inputClass(false)}
              />

            </div>

            {submitAttempted &&
              !isFormValid && (

                <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">

                  <HomeText en="Please complete the required fields highlighted above before sending your booking request" de="Bitte füllen Sie die oben markierten Pflichtfelder aus, bevor Sie Ihre Buchungsanfrage senden." />

                </div>

              )}

            {/* Submit Button */}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={(tour.available as boolean | undefined) === false}
              className="group relative mt-2 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-orange-500 px-6 py-4.5 text-base font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-400"
            >

              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              <span className="relative">
                {(tour.available as boolean | undefined) === false ? <HomeText en="This tour is currently unavailable" de="Diese Tour ist derzeit nicht verfügbar" /> : <HomeText en="Confirm Booking Request" de="Buchungsanfrage bestätigen" />}
              </span>

              <span className="relative text-lg transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>

            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              <HomeText en="Your booking request will be sent securely to our reservations team for confirmation" de="Ihre Buchungsanfrage wird sicher an unser Reservierungsteam zur Bestätigung übermittelt." />
            </p>

          </div>

          {/* Summary */}

          <div>

            <div className="sticky top-8 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_25px_70px_-35px_rgba(15,23,42,0.4)]">

              <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 p-6 text-white">

                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/10 blur-xl" />

                <div className="absolute -bottom-12 left-10 h-24 w-24 rounded-full bg-white/5 blur-xl" />

                <div className="relative">

                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-200">
                    <HomeText en="Your Reservation" de="Ihre Reservierung" />
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    <HomeText en="Tour Summary" de="Tourübersicht" />
                  </h3>

                </div>

              </div>

              <div className="space-y-4 p-6">

                <div className="rounded-[20px] border border-slate-100 bg-slate-50 p-4">

                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <HomeText en="Tour" de="Ausflug" />
                  </p>

                  <p className="font-bold leading-6 text-slate-900">
                    {tour.name}
                  </p>

                </div>

                <div className="relative overflow-hidden rounded-[20px] border border-orange-200/70 bg-gradient-to-br from-orange-50 to-blue-50/60 p-4">

                  <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-orange-400/10 blur-xl" />

                  <div className="relative">

                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
                      <HomeText en="Total Price" de="Gesamtpreis" />
                    </p>

                    <p className="text-3xl font-bold text-blue-950">
                      €{totalPrice}
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3">

                  <div className="rounded-[20px] border border-slate-100 bg-slate-50 p-4">

                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <HomeText en="Guests" de="Gäste" />
                    </p>

                    <p className="text-xl font-bold text-slate-900">
                      {totalGuests}
                    </p>

                  </div>

                  <div className="rounded-[20px] border border-slate-100 bg-slate-50 p-4">

                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <HomeText en="Type" de="Art" />
                    </p>

                    <p className="font-bold text-slate-900">
                      {tour.type}
                    </p>

                  </div>

                </div>

                <div className="rounded-[20px] border border-slate-200 p-5">

                  <p className="mb-4 text-sm font-bold text-slate-900">
                    <HomeText en="What's Included" de="Was ist inklusive?" />
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

                <div className="rounded-[20px] border border-blue-100 bg-gradient-to-br from-blue-50 to-orange-50/30 p-4">

                  <p className="text-sm font-semibold leading-6 text-blue-950">
                    <HomeText en="Your request will be reviewed by our team and confirmed with you shortly" de="Unser Team prüft Ihre Anfrage und bestätigt sie Ihnen in Kürze." />
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