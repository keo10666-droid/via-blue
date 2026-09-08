"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { supabase } from "@/lib/supabase";

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

type BookingData = {
  package: PackageOption;
  adults: number;
  children: number;
  area: string;
  days: number;
  currency: "EUR" | "USD";
  budget: number;
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

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const parseDateInput = (value: string) => {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const toIsoDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};

const formatDateLabel = (value: string) => {
  if (!value) return "Select your trip start date";

  const parsedDate = parseDateInput(value);

  if (!parsedDate) return "Select your trip start date";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

export default function AITripBookingPage() {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
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
  const [childrenAgeValues, setChildrenAgeValues] = useState<string[]>([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Premium calendar state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      1,
    );
  });

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(
        "viaBlueAITripBooking",
      );

      if (!stored) {
        setBooking(null);
        return;
      }

      const parsed: BookingData = JSON.parse(stored);

      if (!parsed?.package) {
        setBooking(null);
        return;
      }

      setBooking(parsed);
    } catch (error) {
      console.error(
        "AI TRIP BOOKING LOAD ERROR:",
        error,
      );
      setBooking(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredNationalities = useMemo(() => {
    if (!nationality) {
      return [];
    }

    return nationalities
      .filter((item) =>
        item
          .toLowerCase()
          .includes(nationality.toLowerCase()),
      )
      .slice(0, 6);
  }, [nationality]);

  const filteredCountryCodes = useMemo(() => {
    if (!countrySearch) {
      return countryCodes;
    }

    return countryCodes.filter(
      (country) =>
        country.name
          .toLowerCase()
          .includes(countrySearch.toLowerCase()) ||
        country.dialCode.includes(countrySearch),
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

  // Premium calendar helpers
  const tomorrowDate = parseDateInput(tomorrowIso)!;

  const minCalendarMonth = new Date(
    tomorrowDate.getFullYear(),
    tomorrowDate.getMonth(),
    1,
  );

  const canGoPrev =
    calendarMonth.getFullYear() >
      minCalendarMonth.getFullYear() ||
    (calendarMonth.getFullYear() ===
      minCalendarMonth.getFullYear() &&
      calendarMonth.getMonth() >
        minCalendarMonth.getMonth());

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(
      year,
      month,
      1,
    ).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0,
    ).getDate();

    const previousMonthDays = new Date(
      year,
      month,
      0,
    ).getDate();

    const days: {
      date: Date;
      currentMonth: boolean;
    }[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(
          year,
          month - 1,
          previousMonthDays - i,
        ),
        currentMonth: false,
      });
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push({
        date: new Date(year, month, day),
        currentMonth: true,
      });
    }

    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        date: new Date(
          year,
          month + 1,
          nextDay++,
        ),
        currentMonth: false,
      });
    }

    return days;
  }, [calendarMonth]);

  const goToPreviousMonth = () => {
    if (!canGoPrev) return;

    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() - 1,
        1,
      ),
    );
  };

  const goToNextMonth = () => {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + 1,
        1,
      ),
    );
  };

  const handleDateSelect = (selectedDate: Date) => {
    if (selectedDate < tomorrowDate) {
      return;
    }

    setDate(toIsoDate(selectedDate));
    setIsDatePickerOpen(false);
  };

  useEffect(() => {
    if (!isDatePickerOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [isDatePickerOpen]);

  if (!booking) {
    if (loading) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />
            <p className="text-sm font-semibold text-gray-600">
              Preparing your trip...
            </p>
          </div>
        </main>
      );
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
            <span className="text-3xl">✈️</span>
          </div>

          <h1 className="text-2xl font-bold text-blue-950">
            Trip Package Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            Your selected trip package could not be
            found. Please return to the AI Trip Planner
            and create your package again.
          </p>

          <a
            href="/ai-trip-planner"
            className="mt-7 inline-flex rounded-xl bg-blue-950 px-6 py-3 font-semibold text-white transition hover:bg-blue-900"
          >
            Back to AI Trip Planner
          </a>
        </div>
      </main>
    );
  }

  const selectedPackage = booking.package;
  const adults = booking.adults;
  const children = booking.children;
  const totalGuests = adults + children;

  const childAges = Array.from(
    { length: children },
    (_, index) => index,
  );

  const isNameValid = name.trim().length >= 2;

  const isPhoneValid =
    phone.replace(/\D/g, "").length >= 6;

  const isEmailValid =
    EMAIL_REGEX.test(email.trim());

  const isDateValid =
    date.length > 0 && date >= tomorrowIso;

  const allChildAgesSet = childAges.every(
    (_, index) =>
      Boolean(childrenAgeValues[index]),
  );

  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isDateValid &&
    allChildAgesSet;

  const inputClass = (invalid: boolean) =>
    `w-full rounded-xl border bg-white p-4 text-gray-900 placeholder:text-gray-500 focus:outline-none ${
      invalid
        ? "border-red-400 focus:border-red-500"
        : "border-gray-300 focus:border-blue-500"
    }`;

  const labelClass =
    "mb-2 block font-bold text-blue-900";

  const errorText = (message: string) => (
    <p className="mt-1 text-sm font-bold text-red-600">
      {message}
    </p>
  );

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleSubmit = async () => {
    setSubmitAttempted(true);

    if (!isFormValid) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("====================================");
      console.log("AI PACKAGE BOOKING START");
      console.log("====================================");

      let {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("CURRENT USER:", user);
      console.log("USER ERROR:", userError);

      if (userError) {
        console.error(
          "SUPABASE AUTH ERROR:",
          userError,
        );

        alert(
          `Unable to verify your account.\n\n${userError.message}`,
        );

        return;
      }

      if (!user) {
        console.log(
          "NO USER FOUND — STARTING ANONYMOUS SESSION",
        );

        const {
          data: anonData,
          error: anonError,
        } = await supabase.auth.signInAnonymously();

        console.log(
          "ANONYMOUS USER:",
          anonData?.user,
        );

        console.log(
          "ANONYMOUS ERROR:",
          anonError,
        );

        if (anonError || !anonData.user) {
          console.error(
            "ANONYMOUS SIGN-IN FAILED:",
            anonError,
          );

          alert(
            `Unable to start your booking session.\n\n${
              anonError?.message ||
              "Unknown authentication error"
            }`,
          );

          return;
        }

        user = anonData.user;
      }

      const cleanPhone = phone.replace(/\D/g, "");

      const fullPhone =
        `${selectedCountry.dialCode} ${cleanPhone}`;

      const itinerary =
        selectedPackage.itinerary.map((day) => ({
          day: day.day,
          tours: day.tours.map((tour) => ({
            slug: tour.slug,
            name: tour.name,
            category: tour.category,
            duration: tour.duration,
            rating: tour.rating,
            reviews: tour.reviews,
            adult_price: tour.price,
            child_price: tour.childPrice,
            estimated_total: tour.estimatedTotal,
          })),
        }));

      const bookingData = {
        user_id: user.id,
        booking_type: "AI Trip Package",
        tour_name: selectedPackage.title,
        tour_date: date,
        guests: totalGuests,
        total_price: selectedPackage.totalCost,
        status: "pending",

        booking_details: {
          booking_source: "AI Trip Planner",
          package_id: selectedPackage.id,
          package_name: selectedPackage.title,
          package_summary: selectedPackage.summary,
          area: booking.area,
          duration_days: booking.days,
          currency: booking.currency,
          budget: booking.budget,
          remaining_budget:
            selectedPackage.remainingBudget,
          activities:
            selectedPackage.activities,
          itinerary,
          name: name.trim(),
          nationality:
            nationality.trim() || "Not specified",
          email: email.trim(),
          phone: fullPhone,
          hotel:
            hotel.trim() || "Not specified",
          room_number:
            roomNumber.trim() || "Not specified",
          adults,
          children,
          children_ages:
            childrenAgeValues.filter(Boolean),
          notes: "",
        },
      };

      console.log(
        "AI PACKAGE BOOKING DATA:",
        bookingData,
      );

      const {
        error: bookingError,
      } = await supabase
        .from("bookings")
        .insert(bookingData);

      if (bookingError) {
        console.error(
          "====================================",
        );

        console.error(
          "AI PACKAGE BOOKING INSERT FAILED",
        );

        console.error(
          "FULL ERROR:",
          bookingError,
        );

        console.error(
          "MESSAGE:",
          bookingError.message,
        );

        console.error(
          "DETAILS:",
          bookingError.details,
        );

        console.error(
          "HINT:",
          bookingError.hint,
        );

        console.error(
          "CODE:",
          bookingError.code,
        );

        console.error(
          "====================================",
        );

        alert(
          `BOOKING WAS NOT SAVED\n\n${bookingError.message}\n\nCode: ${
            bookingError.code || "Unknown"
          }`,
        );

        return;
      }

      console.log(
        "====================================",
      );

      console.log(
        "AI PACKAGE BOOKING SAVED SUCCESSFULLY",
      );

      console.log(
        "====================================",
      );

      const itineraryMessage =
        selectedPackage.itinerary
          .map((day) => {
            const tours = day.tours
              .map(
                (tour) =>
                  `• ${tour.name} (${tour.duration})`,
              )
              .join("\n");

            return `DAY ${day.day}\n${tours}`;
          })
          .join("\n\n");

      const message = `🌴 NEW AI TRIP PACKAGE BOOKING

🤖 Booking Source: AI Trip Planner

📦 Package: ${selectedPackage.title}

📝 Package Summary:

${selectedPackage.summary}

📍 Area: ${booking.area}

📅 Trip Start Date: ${date}

🗓️ Duration: ${booking.days} Days

👨 Adults: ${adults}

🧒 Children: ${children}

👥 Total Guests: ${totalGuests}

🌍 Nationality: ${
        nationality.trim() || "Not specified"
      }

👤 Full Name: ${name.trim()}

✉️ Email: ${email.trim()}

📱 WhatsApp: ${fullPhone}

🏨 Hotel: ${
        hotel.trim() || "Not specified"
      }

🚪 Room Number: ${
        roomNumber.trim() || "Not specified"
      }

💰 Budget: ${formatPrice(
        booking.budget,
      )} ${booking.currency}

💰 Package Total: ${formatPrice(
        selectedPackage.totalCost,
      )} ${booking.currency}

💰 Remaining Budget: ${formatPrice(
        selectedPackage.remainingBudget,
      )} ${booking.currency}

🎯 Experiences: ${
        selectedPackage.activities
      }

🧒 Children Ages:

${
  childrenAgeValues.filter(Boolean).join(", ") || "-"
}

🗺️ ITINERARY

${itineraryMessage}

📝 Special Requests:

-

━━━━━━━━━━━━━━━━━━

Via Blue AI Trip Planner

━━━━━━━━━━━━━━━━━━`;

      const whatsappUrl =
        `https://wa.me/201091920706?text=${encodeURIComponent(
          message,
        )}`;

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer",
      );

      alert("Booking saved successfully!");

      sessionStorage.removeItem(
        "viaBlueAITripBooking",
      );
    } catch (error) {
      console.error(
        "====================================",
      );

      console.error(
        "UNEXPECTED AI PACKAGE BOOKING ERROR",
      );

      console.error(error);

      console.error(
        "====================================",
      );

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error";

      alert(
        `Something went wrong.\n\n${errorMessage}`,
      );
    } finally {
      setIsSubmitting(false);

      console.log(
        "AI PACKAGE BOOKING END",
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 to-blue-800 text-white shadow-xl">
          <div className="p-8 md:p-12">
            <a
              href="/ai-trip-planner"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
            >
              ← Back to AI Trip Planner
            </a>

            <p className="font-bold uppercase tracking-wider text-orange-400">
              {selectedPackage.title}
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Book Your AI-Crafted Trip
            </h1>

            <p className="mt-4 max-w-3xl text-blue-100">
              Your personalized itinerary is ready.
              Complete your details below and our team
              will take care of the rest.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* FORM */}

          <div className="rounded-3xl bg-white p-8 shadow-lg lg:col-span-2">
            <h2 className="mb-2 text-2xl font-bold text-blue-900">
              Guest Information
            </h2>

            <p className="mb-8 text-sm text-gray-500">
              Tell us who is traveling so we can prepare
              your booking correctly.
            </p>

            {/* Name + Nationality */}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Full Name *
                </label>

                <input
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  className={inputClass(
                    submitAttempted &&
                      !isNameValid,
                  )}
                />

                {submitAttempted &&
                  !isNameValid &&
                  errorText(
                    "Please enter the guest's full name.",
                  )}
              </div>

              <div className="relative">
                <label className={labelClass}>
                  Nationality
                </label>

                <input
                  type="text"
                  placeholder="Nationality"
                  value={nationality}
                  onChange={(event) => {
                    setNationality(
                      event.target.value,
                    );

                    setIsNationalityOpen(true);
                  }}
                  onFocus={() =>
                    setIsNationalityOpen(true)
                  }
                  onBlur={() =>
                    setTimeout(
                      () =>
                        setIsNationalityOpen(false),
                      150,
                    )
                  }
                  className={inputClass(false)}
                />

                {isNationalityOpen &&
                  filteredNationalities.length >
                    0 && (
                    <div className="absolute z-30 mt-1 w-full rounded-xl border bg-white shadow-lg">
                      {filteredNationalities.map(
                        (item) => (
                          <button
                            key={item}
                            type="button"
                            onMouseDown={(event) =>
                              event.preventDefault()
                            }
                            onClick={() => {
                              setNationality(item);
                              setIsNationalityOpen(
                                false,
                              );
                            }}
                            className="block w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100"
                          >
                            {item}
                          </button>
                        ),
                      )}
                    </div>
                  )}
              </div>
            </div>

            {/* Email + Phone */}

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Email *
                </label>

                <input
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  className={inputClass(
                    submitAttempted &&
                      !isEmailValid,
                  )}
                />

                {submitAttempted &&
                  !isEmailValid &&
                  errorText(
                    "Please enter a valid email address.",
                  )}
              </div>

              <div>
                <label className={labelClass}>
                  WhatsApp Number *
                </label>

                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsCountryOpen(
                          (value) => !value,
                        )
                      }
                      className="flex h-full items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-4 text-gray-900"
                    >
                      <FlagIcon
                        iso={selectedCountry.iso}
                        name={selectedCountry.name}
                      />

                      <span className="font-bold">
                        {selectedCountry.dialCode}
                      </span>

                      <span className="text-xs">
                        ▾
                      </span>
                    </button>

                    {isCountryOpen && (
                      <div className="absolute left-0 top-full z-40 mt-1 w-72 rounded-xl border bg-white shadow-xl">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={(event) =>
                            setCountrySearch(
                              event.target.value,
                            )
                          }
                          className="w-full border-b border-gray-200 p-3 text-gray-900 focus:outline-none"
                          autoFocus
                        />

                        <div className="max-h-64 overflow-y-auto">
                          {filteredCountryCodes.map(
                            (country) => (
                              <button
                                key={country.name}
                                type="button"
                                onMouseDown={(
                                  event,
                                ) =>
                                  event.preventDefault()
                                }
                                onClick={() => {
                                  setSelectedCountry(
                                    country,
                                  );

                                  setIsCountryOpen(
                                    false,
                                  );

                                  setCountrySearch(
                                    "",
                                  );
                                }}
                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-900 hover:bg-gray-100"
                              >
                                <FlagIcon
                                  iso={country.iso}
                                  name={
                                    country.name
                                  }
                                />

                                <span className="flex-1">
                                  {country.name}
                                </span>

                                <span className="font-bold text-gray-500">
                                  {country.dialCode}
                                </span>
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    placeholder="Number"
                    value={phone}
                    onChange={(event) =>
                      setPhone(
                        event.target.value,
                      )
                    }
                    className={
                      inputClass(
                        submitAttempted &&
                          !isPhoneValid,
                      ) + " flex-1"
                    }
                  />
                </div>

                {submitAttempted &&
                  !isPhoneValid &&
                  errorText(
                    "Please enter a valid number (at least 6 digits).",
                  )}
              </div>
            </div>

            {/* Hotel */}

            <h2 className="mb-6 mt-10 text-2xl font-bold text-blue-900">
              Hotel Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Hotel Name
                </label>

                <input
                  type="text"
                  placeholder="Hotel Name"
                  value={hotel}
                  onChange={(event) =>
                    setHotel(
                      event.target.value,
                    )
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
                  placeholder="Room Number"
                  value={roomNumber}
                  onChange={(event) =>
                    setRoomNumber(
                      event.target.value,
                    )
                  }
                  className={inputClass(false)}
                />
              </div>
            </div>

            {/* Trip Information */}

            <h2 className="mb-6 mt-10 text-2xl font-bold text-blue-900">
              Trip Information
            </h2>

            <label className={labelClass}>
              Trip Start Date *
            </label>

            {/* PREMIUM DATE PICKER */}

            <div
              ref={datePickerRef}
              className="relative"
            >
              <div
                className={`group relative overflow-visible rounded-2xl border bg-white transition-all duration-200 ${
                  submitAttempted && !isDateValid
                    ? "border-red-400"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Calendar Icon */}

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition-all duration-200 ${
                      isDatePickerOpen
                        ? "bg-orange-500 text-white"
                        : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                      When are you traveling?
                    </p>

                    {/* Date trigger */}

                    <button
                      type="button"
                      onClick={() =>
                        setIsDatePickerOpen(
                          (value) => !value,
                        )
                      }
                      className="mt-1 flex w-full items-center justify-between border-0 bg-transparent p-0 text-left outline-none"
                    >
                      <span
                        className={`text-base font-bold ${
                          date
                            ? "text-blue-950"
                            : "text-gray-400"
                        }`}
                      >
                        {formatDateLabel(date)}
                      </span>

                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className={`mr-1 h-4 w-4 text-gray-400 transition-transform duration-200 ${
                          isDatePickerOpen
                            ? "rotate-90"
                            : ""
                        }`}
                        aria-hidden="true"
                      >
                        <path
                          d="M7 4l5 6-5 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Arrow */}

                  <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 sm:flex">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isDatePickerOpen
                          ? "rotate-90"
                          : ""
                      }`}
                      aria-hidden="true"
                    >
                      <path
                        d="M7 4l5 6-5 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* PREMIUM CALENDAR POPUP */}

                {isDatePickerOpen && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_25px_70px_rgba(4,20,47,0.18)] md:w-[390px]">
                    {/* Calendar Header */}

                    <div className="bg-blue-950 px-5 py-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">
                            Trip Date
                          </p>

                          <p className="mt-1 text-xl font-bold text-white">
                            {
                              MONTH_NAMES[
                                calendarMonth.getMonth()
                              ]
                            }{" "}
                            {calendarMonth.getFullYear()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={
                              goToPreviousMonth
                            }
                            disabled={!canGoPrev}
                            aria-label="Previous month"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-200 hover:border-orange-400/50 hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              className="h-4 w-4"
                            >
                              <path
                                d="M12 4l-6 6 6 6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={
                              goToNextMonth
                            }
                            aria-label="Next month"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-200 hover:border-orange-400/50 hover:bg-orange-500"
                          >
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              className="h-4 w-4"
                            >
                              <path
                                d="M8 4l6 6-6 6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Calendar Body */}

                    <div className="p-5">
                      {/* Week Days */}

                      <div className="mb-2 grid grid-cols-7">
                        {WEEK_DAYS.map(
                          (day) => (
                            <div
                              key={day}
                              className="py-2 text-center text-[11px] font-bold uppercase tracking-wide text-gray-400"
                            >
                              {day}
                            </div>
                          ),
                        )}
                      </div>

                      {/* Days Grid */}

                      <div className="grid grid-cols-7 gap-1.5">
                        {calendarDays.map(
                          (
                            {
                              date: day,
                              currentMonth,
                            },
                            index,
                          ) => {
                            const iso =
                              toIsoDate(day);

                            const disabled =
                              day < tomorrowDate;

                            const selected =
                              iso === date;

                            const today =
                              iso ===
                              toIsoDate(
                                new Date(),
                              );

                            return (
                              <button
                                key={`${iso}-${index}`}
                                type="button"
                                disabled={disabled}
                                onClick={() =>
                                  handleDateSelect(
                                    day,
                                  )
                                }
                                className={`
                                  relative flex h-10 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200
                                  ${
                                    selected
                                      ? "bg-orange-500 text-white shadow-[0_6px_18px_rgba(249,115,22,0.35)]"
                                      : disabled
                                        ? "cursor-not-allowed text-gray-200"
                                        : currentMonth
                                          ? "text-blue-950 hover:bg-orange-50 hover:text-orange-600"
                                          : "text-gray-300 hover:bg-gray-50"
                                  }
                                  ${
                                    today &&
                                    !selected &&
                                    !disabled
                                      ? "ring-1 ring-orange-400"
                                      : ""
                                  }
                                `}
                              >
                                {day.getDate()}

                                {today &&
                                  !selected &&
                                  !disabled && (
                                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-orange-500" />
                                  )}
                              </button>
                            );
                          },
                        )}
                      </div>
                    </div>

                    {/* Calendar Footer */}

                    <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                        Select the first day of your trip
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-2 flex items-center gap-2 text-xs text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Select the first day of your trip
            </p>

            {submitAttempted &&
              !isDateValid &&
              errorText(
                "Please select a valid trip start date from tomorrow onward.",
              )}

            {/* Travelers */}

            <h2 className="mb-6 mt-10 text-2xl font-bold text-blue-900">
              Travelers
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-blue-50 p-5">
                <p className="text-sm font-bold text-gray-500">
                  Adults
                </p>

                <p className="mt-1 text-2xl font-bold text-blue-900">
                  {adults}
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 p-5">
                <p className="text-sm font-bold text-gray-500">
                  Children
                </p>

                <p className="mt-1 text-2xl font-bold text-orange-600">
                  {children}
                </p>
              </div>
            </div>

            {/* Children Ages */}

            {childAges.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-bold text-blue-900">
                  Children Ages (5-10 years)
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
                              ],
                          )}
                          onChange={(event) => {
                            const updated = [
                              ...childrenAgeValues,
                            ];

                            updated[index] =
                              event.target.value;

                            setChildrenAgeValues(
                              updated,
                            );
                          }}
                        >
                          <option value="">
                            Select Child{" "}
                            {index + 1} Age
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
                            `Select an age for Child ${
                              index + 1
                            }.`,
                          )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Total Guests */}

            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-blue-50 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-950 shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <circle
                    cx="9"
                    cy="8"
                    r="3"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.5 20c.4-3.1 2.3-5 5.5-5s5.1 1.9 5.5 5"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11a2.5 2.5 0 1 0 0-5"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 15c2.1.1 3.6 1.7 4 4"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Total Guests
                </p>

                <p className="mt-1 text-xl font-bold text-blue-900">
                  {totalGuests}
                </p>
              </div>
            </div>

            {/* Special Requests */}

            <h2 className="mb-6 mt-10 text-2xl font-bold text-blue-900">
              Additional Information
            </h2>

            <label className={labelClass}>
              Special Requests / Notes
            </label>

            <textarea
              rows={3}
              placeholder="Special Requests / Notes"
              className={inputClass(false)}
            />

            {/* Validation */}

            {submitAttempted &&
              !isFormValid && (
                <p className="mt-4 rounded-xl bg-red-50 p-4 font-bold text-red-700">
                  Please fill in the required fields
                  highlighted above before sending
                  your request.
                </p>
              )}

            {/* Submit */}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="mt-8 w-full rounded-2xl bg-green-600 py-5 text-lg font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving Booking..."
                : " Send Booking Request"}
            </button>
          </div>

          {/* SIDEBAR */}

          <div>
            <div className="sticky top-8 overflow-hidden rounded-3xl bg-white shadow-lg">
              {/* Package Header */}

              <div className="bg-blue-950 p-7 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                  Selected Package
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {selectedPackage.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-blue-100">
                  {selectedPackage.summary}
                </p>
              </div>

              <div className="p-7">
                {/* Basic Details */}

                <div className="grid gap-3">
                  <div className="rounded-xl bg-blue-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Area
                    </p>

                    <p className="mt-1 font-bold text-blue-900">
                      {booking.area}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Duration
                    </p>

                    <p className="mt-1 font-bold text-blue-900">
                      {booking.days} Days
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Travelers
                    </p>

                    <p className="mt-1 font-bold text-blue-900">
                      {adults} Adults
                      {children > 0
                        ? ` · ${children} Children`
                        : ""}
                    </p>
                  </div>
                </div>

                {/* Itinerary */}

                <h3 className="mb-5 mt-8 text-xl font-bold text-blue-900">
                  Your Itinerary
                </h3>

                <div className="space-y-6">
                  {selectedPackage.itinerary.map(
                    (day) => (
                      <div key={day.day}>
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-sm font-bold text-orange-500">
                            {day.day}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-blue-950">
                              Day {day.day}
                            </p>

                            <p className="text-xs text-gray-500">
                              {day.tours.length} experience
                              {day.tours.length !==
                              1
                                ? "s"
                                : ""}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 pl-12">
                          {day.tours.map(
                            (tour) => (
                              <div
                                key={tour.slug}
                                className="rounded-2xl border border-gray-100 bg-slate-50 p-4"
                              >
                                <p className="font-bold text-gray-900">
                                  {tour.name}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                  <span>
                                    {tour.duration}
                                  </span>

                                  <span>
                                    ★{" "}
                                    {tour.rating.toFixed(
                                      1,
                                    )}
                                  </span>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>

                {/* Price */}

                <div className="mt-8 border-t border-gray-100 pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Package Total
                  </p>

                  <p className="mt-1 text-3xl font-bold text-orange-500">
                    {formatPrice(
                      selectedPackage.totalCost,
                    )}{" "}
                    {booking.currency}
                  </p>

                  {selectedPackage.remainingBudget >
                    0 && (
                    <p className="mt-2 text-sm font-bold text-green-600">
                      {formatPrice(
                        selectedPackage.remainingBudget,
                      )}{" "}
                      {booking.currency} under budget
                    </p>
                  )}
                </div>

                {/* Trust */}

                <div className="mt-6 rounded-2xl bg-green-50 p-4">
                  <p className="text-sm font-bold text-green-700">
                    ✓ Real Via Blue Experiences
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    Your package contains real
                    experiences selected from the Via
                    Blue tour inventory.
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