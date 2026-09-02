"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type BookingFormProps = {
  tourName: string;
  adultPrice: number;
  infantPrice?: number;
  tourType: string;
  included: string[];
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

export default function BookingForm({
  tourName,
  adultPrice,
  infantPrice = 0,
  tourType,
  included,
}: BookingFormProps) {
  const childPrice = adultPrice / 2;

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

  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");

  const [notes, setNotes] = useState("");

  const [childrenAgeValues, setChildrenAgeValues] = useState<string[]>(
    []
  );

  const [infantAgeValues, setInfantAgeValues] = useState<string[]>([]);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    Number(adults || 0) * adultPrice +
    Number(children || 0) * childPrice +
    Number(infants || 0) * infantPrice;

  const filteredNationalities = useMemo(() => {
    if (!nationality) {
      return [];
    }

    return nationalities
      .filter((n) =>
        n.toLowerCase().includes(nationality.toLowerCase())
      )
      .slice(0, 6);
  }, [nationality]);

  const filteredCountryCodes = useMemo(() => {
    if (!countrySearch) {
      return countryCodes;
    }

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
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const isPhoneValid =
    phone.replace(/\D/g, "").length >= 6;

  const isEmailValid =
    EMAIL_REGEX.test(email.trim());

  const isNameValid =
    name.trim().length >= 2;

  const isDateValid =
    date.length > 0 && date >= tomorrowIso;

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
    allChildAgesSet &&
    allInfantAgesSet;

  const inputClass = (invalid: boolean) =>
    `w-full rounded-xl border bg-white p-4 text-gray-900 placeholder:text-gray-500 focus:outline-none ${
      invalid
        ? "border-red-400 focus:border-red-500"
        : "border-gray-300 focus:border-blue-500"
    }`;

  const labelClass =
    "mb-2 block font-bold text-blue-900";

  const errorText = (msg: string) => (
    <p className="mt-1 text-sm font-bold text-red-600">
      {msg}
    </p>
  );

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
      console.log("BOOKING START");
      console.log("====================================");

      /*
       * 1. Get current user or create anonymous session
       */
      let {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("CURRENT USER:", user);
      console.log("USER ERROR:", userError);

      if (userError) {
        console.error(
          "SUPABASE AUTH ERROR:",
          userError
        );

        alert(
          `Unable to verify your account.\n\n${userError.message}`
        );

        return;
      }

      if (!user) {
        console.log(
          "NO USER FOUND — STARTING ANONYMOUS SESSION"
        );

        const {
          data: anonData,
          error: anonError,
        } = await supabase.auth.signInAnonymously();

        console.log(
          "ANONYMOUS USER:",
          anonData?.user
        );

        console.log(
          "ANONYMOUS ERROR:",
          anonError
        );

        if (anonError || !anonData.user) {
          console.error(
            "ANONYMOUS SIGN-IN FAILED:",
            anonError
          );

          alert(
            `Unable to start your booking session.\n\n${
              anonError?.message ||
              "Unknown authentication error"
            }`
          );

          return;
        }

        user = anonData.user;
      }

      /*
       * 2. Prepare phone
       */
      const cleanPhone = phone.replace(/\D/g, "");

      const fullPhone =
        `${selectedCountry.dialCode} ${cleanPhone}`;

      /*
       * 3. Prepare booking data
       */
      const bookingData = {
        user_id: user.id,
        booking_type: tourType,
        tour_name: tourName,
        tour_date: date,
        guests: totalGuests,
        total_price: totalPrice,
        status: "pending",

        booking_details: {
          name: name.trim(),
          nationality:
            nationality.trim() || "Not specified",

          email: email.trim(),

          phone: fullPhone,

          hotel:
            hotel.trim() || "Not specified",

          room_number:
            roomNumber.trim() || "Not specified",

          adults: Number(adults),
          children: Number(children),
          infants: Number(infants),

          children_ages:
            childrenAgeValues.filter(Boolean),

          infant_ages:
            infantAgeValues.filter(Boolean),

          adult_price: adultPrice,
          child_price: childPrice,
          infant_price: infantPrice,

          notes: notes.trim(),
        },
      };

      console.log(
        "BOOKING DATA:",
        bookingData
      );

      /*
       * 4. Insert booking
       */
      const {
        error: bookingError,
      } = await supabase
        .from("bookings")
        .insert(bookingData);

      /*
       * 5. Stop completely if Supabase rejected
       */
      if (bookingError) {
        console.error(
          "===================================="
        );

        console.error(
          "BOOKING INSERT FAILED"
        );

        console.error(
          "FULL ERROR:",
          bookingError
        );

        console.error(
          "MESSAGE:",
          bookingError.message
        );

        console.error(
          "DETAILS:",
          bookingError.details
        );

        console.error(
          "HINT:",
          bookingError.hint
        );

        console.error(
          "CODE:",
          bookingError.code
        );

        console.error(
          "===================================="
        );

        alert(
          `BOOKING WAS NOT SAVED\n\n${bookingError.message}\n\nCode: ${
            bookingError.code || "Unknown"
          }`
        );

        return;
      }

      /*
       * 6. If we reached this point,
       * Supabase accepted the INSERT.
       */
      console.log(
        "===================================="
      );

      console.log(
        "BOOKING SAVED SUCCESSFULLY"
      );

      console.log(
        "===================================="
      );

      /*
       * 7. WhatsApp message
       */
      const message = `🌴 NEW BOOKING REQUEST

🏝️ Tour: ${tourName}

👤 Full Name: ${name.trim()}
🌍 Nationality: ${nationality.trim() || "Not specified"}
✉️ Email: ${email.trim()}

🏨 Hotel: ${hotel.trim() || "Not specified"}
🚪 Room Number: ${roomNumber.trim() || "Not specified"}

📅 Date: ${date}

👨 Adults: ${adults}
🧒 Children: ${children}
👶 Infants: ${infants}

👥 Total Guests: ${totalGuests}

🧒 Children Ages: ${
        childrenAgeValues.filter(Boolean).join(", ") || "-"
      }

👶 Infant Ages: ${
        infantAgeValues.filter(Boolean).join(", ") || "-"
      }

💰 Adult Price: €${adultPrice}
💰 Child Price: €${childPrice}
💰 Infant Price: €${infantPrice}

💰 Total Price: €${totalPrice}

📱 WhatsApp: ${fullPhone}

📝 Notes:
${notes.trim() || "-"}`;

      /*
       * 8. WhatsApp URL
       */
      const whatsappUrl =
        `https://wa.me/201091920706?text=${encodeURIComponent(
          message
        )}`;

      /*
       * 9. Open WhatsApp ONLY after
       * successful database INSERT.
       */
      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );

      /*
       * 10. Success
       */
      alert(
        "Booking saved successfully!"
      );
    } catch (error) {
      console.error(
        "===================================="
      );

      console.error(
        "UNEXPECTED BOOKING ERROR"
      );

      console.error(
        error
      );

      console.error(
        "===================================="
      );

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error";

      alert(
        `Something went wrong.\n\n${errorMessage}`
      );
    } finally {
      setIsSubmitting(false);

      console.log(
        "BOOKING END"
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-xl">
          <div className="p-8 md:p-12">

            <p className="font-bold text-orange-400">
              {tourName.toUpperCase()}
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Book Your Tour
            </h1>

            <p className="mt-4 max-w-2xl text-blue-100">
              Reserve your {tourName} experience quickly and securely
              through WhatsApp.
            </p>

          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* FORM */}
          <div className="rounded-3xl bg-white p-8 shadow-lg lg:col-span-2">

            <h2 className="mb-6 text-2xl font-bold text-blue-900">
              Guest Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              {/* Name */}
              <div>
                <label className={labelClass}>
                  Full Name *
                </label>

                <input
                  type="text"
                  placeholder="Full Name *"
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
                  placeholder="Nationality"
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
                    <div className="absolute z-20 mt-1 w-full rounded-xl border bg-white shadow-lg">

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
                            className="block w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100"
                          >
                            {item}
                          </button>
                        )
                      )}

                    </div>
                  )}

              </div>

            </div>

            {/* Email + Phone */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">

              {/* Email */}
              <div>

                <label className={labelClass}>
                  Email *
                </label>

                <input
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className={inputClass(
                    submitAttempted &&
                    !isEmailValid
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
                  WhatsApp Number *
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
                      <div className="absolute z-30 mt-1 w-72 rounded-xl border bg-white shadow-lg">

                        <input
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={(e) =>
                            setCountrySearch(
                              e.target.value
                            )
                          }
                          className="w-full border-b border-gray-200 p-3 text-gray-900 focus:outline-none"
                          autoFocus
                        />

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
                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-900 hover:bg-gray-100"
                              >

                                <FlagIcon
                                  iso={c.iso}
                                  name={c.name}
                                />

                                <span className="flex-1">
                                  {c.name}
                                </span>

                                <span className="font-bold text-gray-500">
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
                    placeholder="Number"
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
                    "Please enter a valid number (at least 6 digits)."
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
                  placeholder="Room Number"
                  value={roomNumber}
                  onChange={(e) =>
                    setRoomNumber(e.target.value)
                  }
                  className={inputClass(false)}
                />

              </div>

            </div>

            {/* Tour Date */}
            <h2 className="mb-6 mt-10 text-2xl font-bold text-blue-900">
              Tour Information
            </h2>

            <label className={labelClass}>
              Tour Date *
            </label>

            <input
              type="date"
              value={date}
              min={tomorrowIso}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className={inputClass(
                submitAttempted && !isDateValid
              )}
            />

            {submitAttempted &&
              !isDateValid &&
              errorText(
                "Please select a valid tour date (from tomorrow onward)."
              )}

            {/* Guests */}
            <h2 className="mb-6 mt-10 text-2xl font-bold text-blue-900">
              Guests
            </h2>

            <div className="grid gap-4 md:grid-cols-3">

              {/* Adults */}
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

              {/* Children */}
              <div>

                <label className={labelClass}>
                  Children (5-10)
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

              {/* Infants */}
              <div>

                <label className={labelClass}>
                  Infants (1-4)
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

            {/* Children Ages */}
            {childAges.length > 0 && (
              <div className="mt-6">

                <h3 className="mb-4 text-lg font-bold text-blue-900">
                  Children Ages (5-10 years)
                </h3>

                <div className="grid gap-4 md:grid-cols-2">

                  {childAges.map((_, index) => (
                    <div key={index}>

                      <select
                        value={
                          childrenAgeValues[index] || ""
                        }
                        className={inputClass(
                          submitAttempted &&
                          !childrenAgeValues[index]
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
            )}

            {/* Infant Ages */}
            {infantAges.length > 0 && (
              <div className="mt-6">

                <h3 className="mb-4 text-lg font-bold text-blue-900">
                  Infant Ages (1-4 years)
                </h3>

                <div className="grid gap-4 md:grid-cols-2">

                  {infantAges.map((_, index) => (
                    <div key={index}>

                      <select
                        value={
                          infantAgeValues[index] || ""
                        }
                        className={inputClass(
                          submitAttempted &&
                          !infantAgeValues[index]
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
            )}

            {/* Total Guests */}
            <div className="mt-6 rounded-2xl bg-blue-50 p-5">

              <p className="text-lg font-bold text-blue-900">
                👥 Total Guests: {totalGuests}
              </p>

            </div>

            {/* Booking Summary */}
            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">

              <h3 className="text-lg font-bold text-orange-600">
                💰 Booking Summary
              </h3>

              <div className="mt-3 space-y-2 text-gray-700">

                <p className="font-bold">
                  Adults: {adults} × €{adultPrice} = €
                  {Number(adults) * adultPrice}
                </p>

                <p className="font-bold">
                  Children: {children} × €{childPrice} = €
                  {Number(children) * childPrice}
                </p>

                <p className="font-bold">
                  Infants: {infants} × €{infantPrice} = €
                  {Number(infants) * infantPrice}
                </p>

              </div>

              <div className="mt-4 border-t pt-4 text-2xl font-bold text-blue-900">
                Total Price: €{totalPrice}
              </div>

            </div>

            {/* Notes */}
            <h2 className="mb-6 mt-10 text-2xl font-bold text-blue-900">
              Additional Information
            </h2>

            <label className={labelClass}>
              Special Requests / Notes
            </label>

            <textarea
              rows={5}
              placeholder="Special Requests / Notes"
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              className={inputClass(false)}
            />

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
                : "📱 Send Booking Request"}
            </button>

          </div>

          {/* SIDEBAR */}
          <div>

            <div className="sticky top-8 rounded-3xl bg-white p-8 shadow-lg">

              <h3 className="text-2xl font-bold text-blue-900">
                Tour Summary
              </h3>

              <div className="mt-6 space-y-4">

                <div className="rounded-xl bg-blue-50 p-4">

                  <p className="text-sm font-bold text-gray-500">
                    Tour
                  </p>

                  <p className="font-bold text-blue-900">
                    {tourName}
                  </p>

                </div>

                <div className="rounded-xl bg-orange-50 p-4">

                  <p className="text-sm font-bold text-gray-500">
                    Price
                  </p>

                  <p className="text-2xl font-bold text-orange-500">
                    €{totalPrice}
                  </p>

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="text-sm font-bold text-gray-500">
                    Total Guests
                  </p>

                  <p className="text-2xl font-bold text-blue-900">
                    {totalGuests}
                  </p>

                </div>

                <div className="rounded-xl bg-green-50 p-4">

                  <p className="text-sm font-bold text-gray-500">
                    Tour Type
                  </p>

                  <p className="font-bold text-green-700">
                    {tourType}
                  </p>

                </div>

                <div className="rounded-xl border p-4">

                  <ul className="space-y-2 font-bold text-gray-700">

                    {included.map(
                      (item, index) => (
                        <li key={index}>
                          ✅ {item}
                        </li>
                      )
                    )}

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}