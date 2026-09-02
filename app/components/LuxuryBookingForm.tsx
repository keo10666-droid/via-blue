"use client";

import { useMemo, useState } from "react";

type LuxuryBookingFormProps = {
  tourName: string;
  tourType?: string;
  included?: string[];
};

/* =========================
   TEMPORARY PRIVATE PRICES
   ========================= */

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

  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");

  const [notes, setNotes] = useState("");

  const [childrenAgeValues, setChildrenAgeValues] = useState<
    string[]
  >([]);

  const [infantAgeValues, setInfantAgeValues] = useState<
    string[]
  >([]);

  const [submitAttempted, setSubmitAttempted] = useState(false);

  /* =========================
     GUESTS
     ========================= */

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

  /* =========================
     PRIVATE TOUR PRICE
     ========================= */

  const totalPrice =
    privatePrices[Math.min(Math.max(totalGuests, 2), 25)] ??
    privatePrices[25];

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
        c.name
          .toLowerCase()
          .includes(countrySearch.toLowerCase()) ||
        c.dialCode.includes(countrySearch)
    );
  }, [countrySearch]);

  /* =========================
     TOMORROW
     ========================= */

  const tomorrowIso = useMemo(() => {
    const d = new Date();

    d.setDate(d.getDate() + 1);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  }, []);

  /* =========================
     VALIDATION
     ========================= */

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

  /* =========================
     SUBMIT
     ========================= */

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
      `https://wa.me/201091920706?text=${encodeURIComponent(
        message
      )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-blue-900 to-blue-700 text-white shadow-xl">
          <div className="p-8 md:p-12">

            <p className="font-bold text-orange-400">
              PRIVATE LUXURY EXPERIENCE
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Book Your Tour
            </h1>

            <p className="mt-4 max-w-2xl text-blue-100">
              Reserve your private {tourName} experience
              quickly and securely through WhatsApp.
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

              <div>

                <label className={labelClass}>
                  WhatsApp Number *
                </label>

                <div className="flex gap-2">

                  <div className="relative">

                    <button
                      type="button"
                      onClick={() =>
                        setIsCountryOpen((v) => !v)
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
              Private Tour Guests
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
                    { length: 25 },
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

            {submitAttempted &&
              !isGuestsValid &&
              errorText(
                "Private tours require a minimum of 2 guests and a maximum of 25 guests."
              )}

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
                          childrenAgeValues[index] ||
                          ""
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
                          infantAgeValues[index] ||
                          ""
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

            {/* Private Price */}

            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">

              <h3 className="text-lg font-bold text-orange-600">
                💰 Private Tour Price
              </h3>

              <p className="mt-3 font-bold text-gray-700">
                {totalGuests < 2
                  ? "Minimum 2 guests required"
                  : `${totalGuests} guests — Private Tour`}
              </p>

              <div className="mt-4 border-t border-orange-200 pt-4 text-3xl font-bold text-blue-900">
                Total Price: €{totalPrice}
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Temporary price — final pricing can be
                updated later.
              </p>

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
              className="mt-8 w-full rounded-2xl bg-green-600 py-5 text-lg font-bold text-white transition hover:bg-green-700"
            >
              📱 Send Booking Request
            </button>

          </div>

          {/* SIDEBAR */}

          <div>

            <div className="sticky top-8 rounded-3xl bg-white p-8 shadow-lg">

              <h3 className="text-2xl font-bold text-blue-900">
                Private Tour Summary
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
                    Private Price
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

                {included.length > 0 && (
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
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}