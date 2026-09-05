"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { transfers } from "@/data/transfers";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  { name: "Sweden", dialCode: "+46", iso: "se" },
  { name: "Norway", dialCode: "+47", iso: "no" },
  { name: "Denmark", dialCode: "+45", iso: "dk" },
  { name: "Finland", dialCode: "+358", iso: "fi" },
  { name: "Romania", dialCode: "+40", iso: "ro" },
  { name: "Greece", dialCode: "+30", iso: "gr" },
  { name: "Saudi Arabia", dialCode: "+966", iso: "sa" },
  { name: "United Arab Emirates", dialCode: "+971", iso: "ae" },
  { name: "Kuwait", dialCode: "+965", iso: "kw" },
  { name: "Qatar", dialCode: "+974", iso: "qa" },
  { name: "Jordan", dialCode: "+962", iso: "jo" },
  { name: "Morocco", dialCode: "+212", iso: "ma" },
  { name: "India", dialCode: "+91", iso: "in" },
  { name: "China", dialCode: "+86", iso: "cn" },
  { name: "Japan", dialCode: "+81", iso: "jp" },
];

const vehicleImages = [
  "/vehicles/sedan.webp",
  "/vehicles/x-pander.webp",
  "/vehicles/van.webp",
  "/vehicles/luxury.webp",
  "/vehicles/coster.webp",
];

type TransferType =
  | "airport-to-hotel"
  | "hotel-to-airport"
  | "hotel-to-hotel";

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
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
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
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
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
      <path d="M16 2.5v4M8 2.5v4M3 9h18" />
      <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-3.4 3.1-5 7-5s6.3 1.6 7 5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
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
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7.5 3.5h2l1.2 4-2 1.4a15 15 0 0 0 6.4 6.4l1.4-2 4 1.2v2c0 1.1-.9 2-2 2C10.5 18.5 5.5 13.5 5.5 7.5c0-1.1.9-2 2-2Z" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="m3 11 18-6-6 18-2-8-10-4Z" />
      <path d="m13 15 5-5" />
    </svg>
  );
}

function HotelIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M4 20V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" />
      <path d="M2 20h20M7 8h3M14 8h3M7 12h3M14 12h3M7 16h10" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="m5 11 2-5h10l2 5" />
      <path d="M4 11h16a1 1 0 0 1 1 1v5H3v-5a1 1 0 0 1 1-1Z" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.5-3 2.3-4.5 5.5-4.5S14 16 14.5 19" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17 14.7c2.3.4 3.5 1.8 4 4.3" />
    </svg>
  );
}

function LuggageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="5" y="6" width="14" height="15" rx="2" />
      <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6M9 10v7M15 10v7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3 20 6v5c0 5-3.3 8.2-8 10-4.7-1.8-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.3 2.3 4.7-4.7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function FlagIcon({
  iso,
  name,
}: {
  iso: string;
  name: string;
}) {
  return (
    <img
      src={`https://flagcdn.com/24x18/${iso}.png`}
      srcSet={`https://flagcdn.com/48x36/${iso}.png 2x`}
      alt={name}
      width={24}
      height={18}
      className="rounded-sm object-cover"
    />
  );
}

function formatDateForDisplay(dateString: string) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTimeForDisplay(timeString: string) {
  if (!timeString) return "";

  const [hourString, minute] = timeString.split(":");
  const hour = Number(hourString);

  if (Number.isNaN(hour) || !minute) {
    return timeString;
  }

  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${period}`;
}

function CustomDatePicker({
  value,
  minDate,
  onChange,
  invalid,
}: {
  value: string;
  minDate: string;
  onChange: (value: string) => void;
  invalid: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const minDateObject = useMemo(
    () => new Date(`${minDate}T12:00:00`),
    [minDate]
  );

  const initialMonth = value
    ? new Date(`${value}T12:00:00`)
    : minDateObject;

  const [visibleMonth, setVisibleMonth] = useState(
    new Date(
      initialMonth.getFullYear(),
      initialMonth.getMonth(),
      1
    )
  );

  const monthName = visibleMonth.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1
  ).getDay();

  const previousMonth = () => {
    const previous = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() - 1,
      1
    );

    const minimumMonth = new Date(
      minDateObject.getFullYear(),
      minDateObject.getMonth(),
      1
    );

    if (previous >= minimumMonth) {
      setVisibleMonth(previous);
    }
  };

  const nextMonth = () => {
    setVisibleMonth(
      new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + 1,
        1
      )
    );
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      day
    );

    if (selected < minDateObject) return;

    const yyyy = selected.getFullYear();
    const mm = String(
      selected.getMonth() + 1
    ).padStart(2, "0");
    const dd = String(
      selected.getDate()
    ).padStart(2, "0");

    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const selectedDate = value
    ? new Date(`${value}T12:00:00`)
    : null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex h-[54px] w-full items-center justify-between rounded-xl border bg-white px-4 text-left shadow-sm transition focus:outline-none focus:ring-4 ${
          invalid
            ? "border-red-400 focus:border-red-500 focus:ring-red-50"
            : isOpen
            ? "border-blue-600 ring-4 ring-blue-50"
            : "border-gray-200 hover:border-blue-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={
              invalid
                ? "text-red-500"
                : "text-blue-900"
            }
          >
            <CalendarIcon />
          </span>

          <span
            className={
              value
                ? "text-sm font-semibold text-gray-900"
                : "text-sm text-gray-400"
            }
          >
            {value
              ? formatDateForDisplay(value)
              : "Select transfer date"}
          </span>
        </div>

        <span className="text-gray-400">
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[310px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <button
              type="button"
              onClick={previousMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-blue-50 hover:text-blue-900"
              aria-label="Previous month"
            >
              <ChevronLeftIcon />
            </button>

            <div className="text-sm font-bold text-blue-950">
              {monthName}
            </div>

            <button
              type="button"
              onClick={nextMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-blue-50 hover:text-blue-900"
              aria-label="Next month"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1">
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
                className="py-2 text-center text-[10px] font-bold uppercase tracking-wide text-gray-400"
              >
                {day}
              </div>
            ))}

            {Array.from({
              length: firstDay,
            }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {Array.from({
              length: daysInMonth,
            }).map((_, index) => {
              const day = index + 1;

              const currentDate = new Date(
                visibleMonth.getFullYear(),
                visibleMonth.getMonth(),
                day
              );

              const isDisabled =
                currentDate < minDateObject;

              const isSelected =
                selectedDate &&
                currentDate.getFullYear() ===
                  selectedDate.getFullYear() &&
                currentDate.getMonth() ===
                  selectedDate.getMonth() &&
                currentDate.getDate() ===
                  selectedDate.getDate();

              const isToday =
                currentDate.toDateString() ===
                new Date().toDateString();

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled}
                  onClick={() =>
                    handleDateSelect(day)
                  }
                  className={`relative flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
                    isDisabled
                      ? "cursor-not-allowed text-gray-200"
                      : isSelected
                      ? "bg-blue-950 text-white shadow-md"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {day}

                  {isToday && !isSelected && (
                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-orange-500" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 border-t border-gray-100 pt-3 text-center text-[11px] font-medium text-gray-400">
            Select a date from tomorrow onwards
          </div>
        </div>
      )}
    </div>
  );
}

function CustomTimePicker({
  value,
  onChange,
  invalid,
}: {
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const getInitialTime = () => {
    if (!value) {
      return {
        hour: 12,
        minute: "00",
        period: "AM",
      };
    }

    const [hourString, minuteString] =
      value.split(":");

    const parsedHour = Number(hourString);
    const parsedMinute = minuteString || "00";

    if (
      Number.isNaN(parsedHour) ||
      parsedHour < 0 ||
      parsedHour > 23
    ) {
      return {
        hour: 12,
        minute: "00",
        period: "AM",
      };
    }

    return {
      hour: parsedHour % 12 || 12,
      minute: parsedMinute,
      period: parsedHour >= 12 ? "PM" : "AM",
    };
  };

  const initialTime = getInitialTime();

  const [selectedHour, setSelectedHour] =
    useState(initialTime.hour);

  const [selectedMinute, setSelectedMinute] =
    useState(initialTime.minute);

  const [selectedPeriod, setSelectedPeriod] =
    useState<"AM" | "PM">(initialTime.period as "AM" | "PM");

  const openPicker = () => {
    const current = getInitialTime();

    setSelectedHour(current.hour);
    setSelectedMinute(current.minute);
    setSelectedPeriod(
      current.period as "AM" | "PM"
    );
    setIsOpen(true);
  };

  const handleApply = () => {
    let hour24 = selectedHour % 12;

    if (selectedPeriod === "PM") {
      hour24 += 12;
    }

    const formattedTime = `${String(
      hour24
    ).padStart(2, "0")}:${selectedMinute}`;

    onChange(formattedTime);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            openPicker();
          }
        }}
        className={`flex h-[54px] w-full items-center justify-between rounded-xl border bg-white px-4 text-left shadow-sm transition focus:outline-none focus:ring-4 ${
          invalid
            ? "border-red-400 focus:border-red-500 focus:ring-red-50"
            : isOpen
            ? "border-blue-600 ring-4 ring-blue-50"
            : "border-gray-200 hover:border-blue-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={
              invalid
                ? "text-red-500"
                : "text-blue-900"
            }
          >
            <ClockIcon />
          </span>

          <span
            className={
              value
                ? "text-sm font-semibold text-gray-900"
                : "text-sm text-gray-400"
            }
          >
            {value
              ? formatTimeForDisplay(value)
              : "Select pickup time"}
          </span>
        </div>

        <span
          className={`text-gray-400 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
              <ClockIcon />
            </div>

            <div>
              <p className="text-sm font-bold text-blue-950">
                Select Pickup Time
              </p>

              <p className="mt-0.5 text-[11px] text-gray-400">
                Choose your preferred pickup time
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Hour
              </p>

              <select
                value={selectedHour}
                onChange={(e) =>
                  setSelectedHour(
                    Number(e.target.value)
                  )
                }
                className="h-12 w-full rounded-xl border border-gray-200 bg-slate-50 px-3 text-center text-base font-bold text-blue-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
              >
                {Array.from(
                  { length: 12 },
                  (_, index) => index + 1
                ).map((hour) => (
                  <option
                    key={hour}
                    value={hour}
                  >
                    {String(hour).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Minute
              </p>

              <select
                value={selectedMinute}
                onChange={(e) =>
                  setSelectedMinute(
                    e.target.value
                  )
                }
                className="h-12 w-full rounded-xl border border-gray-200 bg-slate-50 px-3 text-center text-base font-bold text-blue-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
              >
                {[
                  "00",
                  "05",
                  "10",
                  "15",
                  "20",
                  "25",
                  "30",
                  "35",
                  "40",
                  "45",
                  "50",
                  "55",
                ].map((minute) => (
                  <option
                    key={minute}
                    value={minute}
                  >
                    {minute}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Period
              </p>

              <select
                value={selectedPeriod}
                onChange={(e) =>
                  setSelectedPeriod(
                    e.target.value as
                      | "AM"
                      | "PM"
                  )
                }
                className="h-12 w-full rounded-xl border border-gray-200 bg-slate-50 px-3 text-center text-base font-bold text-blue-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
              >
                <option value="AM">
                  AM
                </option>

                <option value="PM">
                  PM
                </option>
              </select>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
              Selected Time
            </p>

            <p className="mt-1 text-xl font-bold text-blue-950">
              {selectedHour}:
              {selectedMinute}{" "}
              {selectedPeriod}
            </p>
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="mt-4 w-full rounded-xl bg-blue-950 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-900"
          >
            Set Pickup Time
          </button>
        </div>
      )}
    </div>
  );
}

export default function TransferBookingPage() {
  const params = useParams();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const transfer =
    transfers[slug as keyof typeof transfers];

  const [transferType, setTransferType] =
    useState<TransferType>("airport-to-hotel");

  const [selectedVehicle, setSelectedVehicle] =
    useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [selectedCountry, setSelectedCountry] =
    useState(countryCodes[0]);

  const [isCountryOpen, setIsCountryOpen] =
    useState(false);

  const [phone, setPhone] = useState("");

  const [fromHotel, setFromHotel] = useState("");
  const [toHotel, setToHotel] = useState("");

  const [hotel, setHotel] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");

  const [passengers, setPassengers] =
    useState("1");

  const [luggage, setLuggage] =
    useState("1");

  const [notes, setNotes] = useState("");

  const [submitAttempted, setSubmitAttempted] =
    useState(false);

  const tomorrowIso = useMemo(() => {
    const d = new Date();

    d.setDate(d.getDate() + 1);

    const yyyy = d.getFullYear();
    const mm = String(
      d.getMonth() + 1
    ).padStart(2, "0");
    const dd = String(
      d.getDate()
    ).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  }, []);

  if (!transfer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-600">
            !
          </div>

          <h1 className="mt-4 text-2xl font-bold text-red-600">
            Transfer Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The transfer you are looking for is not
            available.
          </p>
        </div>
      </main>
    );
  }

  const vehicle =
    transfer.vehicles[selectedVehicle];

  const isNameValid =
    name.trim().length >= 2;

  const isEmailValid =
    EMAIL_REGEX.test(email.trim());

  const isPhoneValid =
    phone.replace(/\D/g, "").length >= 6;

  const isDateValid =
    date.length > 0 &&
    date >= tomorrowIso;

  const isTimeValid =
    time.length > 0;

  const isLocationValid =
    transferType === "hotel-to-hotel"
      ? fromHotel.trim().length >= 2 &&
        toHotel.trim().length >= 2
      : hotel.trim().length >= 2;

  const inputClass = (invalid: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:outline-none focus:ring-4 ${
      invalid
        ? "border-red-400 focus:border-red-500 focus:ring-red-50"
        : "border-gray-200 focus:border-blue-600 focus:ring-blue-50"
    }`;

  const labelClass =
    "mb-2 block text-sm font-bold text-blue-950";

  const errorText = (message: string) => (
    <p className="mt-1.5 text-xs font-semibold text-red-600">
      {message}
    </p>
  );

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isDateValid &&
    isTimeValid &&
    isLocationValid;

  const getRoute = () => {
    if (transferType === "airport-to-hotel") {
      return {
        from: "Hurghada International Airport",
        to: transfer.to,
      };
    }

    if (transferType === "hotel-to-airport") {
      return {
        from: transfer.to,
        to: "Hurghada International Airport",
      };
    }

    return {
      from: fromHotel || "Hotel",
      to: toHotel || "Hotel",
    };
  };

  const route = getRoute();

  const handleTransferTypeChange = (
    type: TransferType
  ) => {
    setTransferType(type);

    setHotel("");
    setFromHotel("");
    setToHotel("");
    setRoomNumber("");
    setFlightNumber("");
  };

  const handleVehicleChange = (
    index: number
  ) => {
    const newVehicle =
      transfer.vehicles[index];

    setSelectedVehicle(index);

    const currentPassengers =
      Number(passengers);

    const currentLuggage =
      Number(luggage);

    if (
      currentPassengers >
      newVehicle.passengers
    ) {
      setPassengers(
        String(newVehicle.passengers)
      );
    }

    if (
      currentLuggage >
      newVehicle.luggage
    ) {
      setLuggage(
        String(newVehicle.luggage)
      );
    }
  };

  const handleSubmit = () => {
    setSubmitAttempted(true);

    if (!isFormValid) return;

    const fullPhone =
      `${selectedCountry.dialCode} ${phone.trim()}`;

    const message = `
NEW TRANSFER BOOKING

Transfer Type: ${
      transferType === "airport-to-hotel"
        ? "Airport -> Hotel"
        : transferType === "hotel-to-airport"
        ? "Hotel -> Airport"
        : "Hotel -> Hotel"
    }

From: ${route.from}
To: ${route.to}

Vehicle: ${vehicle.type}
Price: EUR ${vehicle.price}

Full Name: ${name.trim()}
Email: ${email.trim()}
WhatsApp: ${fullPhone}

Hotel: ${hotel || "Not specified"}
From Hotel: ${fromHotel || "Not specified"}
To Hotel: ${toHotel || "Not specified"}

Room Number: ${
      roomNumber || "Not specified"
    }

Transfer Date: ${date}
Pickup Time: ${formatTimeForDisplay(time)}
${
  transferType !== "hotel-to-hotel"
    ? `
Flight Number: ${
        flightNumber || "Not specified"
      }
`
    : ""
}
Passengers: ${passengers}
Luggage: ${luggage}

Notes:
${notes.trim() || "-"}
`;

    const whatsappUrl =
      `https://wa.me/201091920706?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappUrl,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-blue-950 px-5 py-10 text-white md:px-8 md:py-14">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-700/30 blur-3xl" />

        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-orange-400" />

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
              Secure Booking
            </p>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Book Your Transfer
          </h1>

          <p className="mt-3 text-sm text-blue-100 md:text-base">
            Choose your transfer type and complete
            your booking details.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
              <span className="text-green-400">
                <CheckIcon />
              </span>
              Instant WhatsApp Confirmation
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
              <span className="text-green-400">
                <CheckIcon />
              </span>
              Fixed Price
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
              <span className="text-green-400">
                <CheckIcon />
              </span>
              Professional Driver
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            {/* TRANSFER TYPE */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Step 1
                </p>

                <h2 className="mt-1 text-xl font-bold text-blue-950">
                  Choose Transfer Type
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Select the type of transfer you need.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() =>
                    handleTransferTypeChange(
                      "airport-to-hotel"
                    )
                  }
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    transferType ===
                    "airport-to-hotel"
                      ? "border-orange-500 bg-orange-50 shadow-md"
                      : "border-gray-100 hover:border-blue-200"
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <PlaneIcon />
                  </div>

                  <h3 className="mt-3 font-bold text-blue-950">
                    Airport → Hotel
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Pick up from Hurghada Airport
                    and take you directly to your
                    hotel.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleTransferTypeChange(
                      "hotel-to-airport"
                    )
                  }
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    transferType ===
                    "hotel-to-airport"
                      ? "border-orange-500 bg-orange-50 shadow-md"
                      : "border-gray-100 hover:border-blue-200"
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <HotelIcon />
                  </div>

                  <h3 className="mt-3 font-bold text-blue-950">
                    Hotel → Airport
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Pick up from your hotel and
                    take you to Hurghada Airport.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleTransferTypeChange(
                      "hotel-to-hotel"
                    )
                  }
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    transferType ===
                    "hotel-to-hotel"
                      ? "border-orange-500 bg-orange-50 shadow-md"
                      : "border-gray-100 hover:border-blue-200"
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <CarIcon />
                  </div>

                  <h3 className="mt-3 font-bold text-blue-950">
                    Hotel → Hotel
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Travel comfortably between
                    two hotels.
                  </p>
                </button>
              </div>
            </section>

            {/* VEHICLE */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                    Step 2
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-blue-950">
                    Select Your Vehicle
                  </h2>
                </div>

                <span className="hidden rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800 sm:block">
                  {transfer.vehicles.length} Options
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {transfer.vehicles.map(
                  (item, index) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() =>
                        handleVehicleChange(index)
                      }
                      className={`group relative overflow-hidden rounded-xl border-2 text-left transition ${
                        selectedVehicle === index
                          ? "border-orange-500 bg-orange-50 shadow-md"
                          : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm"
                      }`}
                    >
                      <div className="relative h-28 overflow-hidden bg-slate-50">
                        <img
                          src={
                            vehicleImages[index] ||
                            "/vehicles/sedan.webp"
                          }
                          alt={item.type}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        {selectedVehicle ===
                          index && (
                          <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white shadow">
                            <CheckIcon />
                          </div>
                        )}
                      </div>

                      <div className="p-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-base font-bold text-blue-950">
                              {item.type}
                            </h3>

                            <p className="mt-1 text-[11px] text-gray-500">
                              Up to{" "}
                              {item.passengers}{" "}
                              passengers
                            </p>
                          </div>

                          <p className="text-lg font-bold text-orange-500">
                            €{item.price}
                          </p>
                        </div>

                        <div className="mt-3 flex gap-4 text-[11px] font-semibold text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <UsersIcon />
                            {item.passengers}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <LuggageIcon />
                            {item.luggage}
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                )}
              </div>
            </section>

            {/* GUEST INFORMATION */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Step 3
                </p>

                <h2 className="mt-1 text-xl font-bold text-blue-950">
                  Guest Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Tell us who will be travelling.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Full Name *
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <UserIcon />
                    </span>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      className={`${inputClass(
                        submitAttempted &&
                          !isNameValid
                      )} pl-12`}
                    />
                  </div>

                  {submitAttempted &&
                    !isNameValid &&
                    errorText(
                      "Please enter your full name."
                    )}
                </div>

                <div>
                  <label className={labelClass}>
                    Email Address *
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <MailIcon />
                    </span>

                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className={`${inputClass(
                        submitAttempted &&
                          !isEmailValid
                      )} pl-12`}
                    />
                  </div>

                  {submitAttempted &&
                    !isEmailValid &&
                    errorText(
                      "Please enter a valid email."
                    )}
                </div>
              </div>

              <div className="mt-4">
                <label className={labelClass}>
                  WhatsApp Number *
                </label>

                <div className="flex gap-2">
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setIsCountryOpen(
                          (value) => !value
                        )
                      }
                      className="flex h-[52px] min-w-[105px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-gray-900 shadow-sm transition hover:border-blue-500 focus:outline-none"
                    >
                      <FlagIcon
                        iso={
                          selectedCountry.iso
                        }
                        name={
                          selectedCountry.name
                        }
                      />

                      <span className="text-sm font-bold">
                        {
                          selectedCountry.dialCode
                        }
                      </span>

                      <ChevronDownIcon />
                    </button>

                    {isCountryOpen && (
                      <div className="absolute left-0 top-full z-50 mt-2 max-h-72 w-72 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl">
                        {countryCodes.map(
                          (country) => (
                            <button
                              key={country.iso}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(
                                  country
                                );

                                setIsCountryOpen(
                                  false
                                );
                              }}
                              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-blue-50 ${
                                selectedCountry.iso ===
                                country.iso
                                  ? "bg-blue-50"
                                  : ""
                              }`}
                            >
                              <FlagIcon
                                iso={
                                  country.iso
                                }
                                name={
                                  country.name
                                }
                              />

                              <span className="font-bold text-gray-900">
                                {
                                  country.dialCode
                                }
                              </span>

                              <span className="text-gray-500">
                                {
                                  country.name
                                }
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative flex-1">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <PhoneIcon />
                    </span>

                    <input
                      type="tel"
                      placeholder="WhatsApp Number"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      className={
                        inputClass(
                          submitAttempted &&
                            !isPhoneValid
                        ) + " pl-12"
                      }
                    />
                  </div>
                </div>

                {submitAttempted &&
                  !isPhoneValid &&
                  errorText(
                    "Please enter a valid WhatsApp number."
                  )}
              </div>
            </section>

            {/* PICKUP INFORMATION */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Step 4
                </p>

                <h2 className="mt-1 text-xl font-bold text-blue-950">
                  Transfer Information
                </h2>
              </div>

              {transferType ===
              "hotel-to-hotel" ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      From Hotel *
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <HotelIcon />
                      </span>

                      <input
                        type="text"
                        placeholder="Pickup hotel name"
                        value={fromHotel}
                        onChange={(e) =>
                          setFromHotel(
                            e.target.value
                          )
                        }
                        className={`${inputClass(
                          submitAttempted &&
                            !isLocationValid
                        )} pl-12`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      To Hotel *
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <HotelIcon />
                      </span>

                      <input
                        type="text"
                        placeholder="Destination hotel name"
                        value={toHotel}
                        onChange={(e) =>
                          setToHotel(
                            e.target.value
                          )
                        }
                        className={`${inputClass(
                          submitAttempted &&
                            !isLocationValid
                        )} pl-12`}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className={labelClass}>
                    Hotel Name *
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <HotelIcon />
                    </span>

                    <input
                      type="text"
                      placeholder="Your hotel name"
                      value={hotel}
                      onChange={(e) =>
                        setHotel(e.target.value)
                      }
                      className={`${inputClass(
                        submitAttempted &&
                          !isLocationValid
                      )} pl-12`}
                    />
                  </div>

                  {submitAttempted &&
                    !isLocationValid &&
                    errorText(
                      "Please enter your hotel name."
                    )}
                </div>
              )}

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Room Number
                  </label>

                  <input
                    type="text"
                    placeholder="Room number"
                    value={roomNumber}
                    onChange={(e) =>
                      setRoomNumber(
                        e.target.value
                      )
                    }
                    className={inputClass(false)}
                  />
                </div>

                {transferType !==
                  "hotel-to-hotel" && (
                  <div>
                    <label className={labelClass}>
                      Flight Number
                    </label>

                    <input
                      type="text"
                      placeholder="Example: MS042"
                      value={flightNumber}
                      onChange={(e) =>
                        setFlightNumber(
                          e.target.value
                        )
                      }
                      className={inputClass(false)}
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Transfer Date *
                  </label>

                  <CustomDatePicker
                    value={date}
                    minDate={tomorrowIso}
                    onChange={setDate}
                    invalid={
                      submitAttempted &&
                      !isDateValid
                    }
                  />

                  {submitAttempted &&
                    !isDateValid &&
                    errorText(
                      "Please select a valid transfer date."
                    )}
                </div>

                <div>
                  <label className={labelClass}>
                    Pickup Time *
                  </label>

                  <CustomTimePicker
                    value={time}
                    onChange={setTime}
                    invalid={
                      submitAttempted &&
                      !isTimeValid
                    }
                  />

                  {submitAttempted &&
                    !isTimeValid &&
                    errorText(
                      "Please select the pickup time."
                    )}
                </div>
              </div>
            </section>

            {/* TRANSFER DETAILS */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Step 5
                </p>

                <h2 className="mt-1 text-xl font-bold text-blue-950">
                  Transfer Details
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Passengers
                  </label>

                  <select
                    value={passengers}
                    onChange={(e) =>
                      setPassengers(
                        e.target.value
                      )
                    }
                    className={inputClass(false)}
                  >
                    {Array.from(
                      {
                        length:
                          vehicle.passengers,
                      },
                      (_, i) => (
                        <option
                          key={i + 1}
                          value={i + 1}
                        >
                          {i + 1}{" "}
                          {i + 1 === 1
                            ? "Passenger"
                            : "Passengers"}
                        </option>
                      )
                    )}
                  </select>

                  <p className="mt-1.5 text-xs text-gray-400">
                    Maximum:{" "}
                    {vehicle.passengers} passengers
                  </p>
                </div>

                <div>
                  <label className={labelClass}>
                    Luggage
                  </label>

                  <select
                    value={luggage}
                    onChange={(e) =>
                      setLuggage(
                        e.target.value
                      )
                    }
                    className={inputClass(false)}
                  >
                    {Array.from(
                      {
                        length:
                          vehicle.luggage,
                      },
                      (_, i) => (
                        <option
                          key={i + 1}
                          value={i + 1}
                        >
                          {i + 1}{" "}
                          {i + 1 === 1
                            ? "Bag"
                            : "Bags"}
                        </option>
                      )
                    )}
                  </select>

                  <p className="mt-1.5 text-xs text-gray-400">
                    Maximum:{" "}
                    {vehicle.luggage} luggage
                  </p>
                </div>
              </div>
            </section>

            {/* ADDITIONAL */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Optional
                </p>

                <h2 className="mt-1 text-xl font-bold text-blue-950">
                  Additional Information
                </h2>
              </div>

              <textarea
                rows={4}
                placeholder="Special requests, child seats, extra luggage or anything else..."
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                className={inputClass(false)}
              />
            </section>

            {submitAttempted &&
              !isFormValid && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  Please fill in all required
                  fields highlighted above.
                </div>
              )}

            {/* BOOK NOW */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-2xl bg-green-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-green-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl"
            >
              Book Transfer
            </button>

            <div className="flex items-center justify-center gap-2 text-center text-xs text-gray-500">
              <span className="text-green-600">
                <ShieldIcon />
              </span>

              Your information is used only to
              process your transfer booking.
            </div>
          </div>

          {/* SUMMARY */}
          <aside>
            <div className="sticky top-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
              <div className="bg-blue-950 px-6 py-5 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                  Booking Summary
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Your Transfer
                </h2>
              </div>

              <div className="p-5">
                {/* TYPE */}
                <div className="rounded-xl bg-orange-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                    Transfer Type
                  </p>

                  <p className="mt-1 text-sm font-bold text-blue-950">
                    {transferType ===
                    "airport-to-hotel"
                      ? "Airport → Hotel"
                      : transferType ===
                        "hotel-to-airport"
                      ? "Hotel → Airport"
                      : "Hotel → Hotel"}
                  </p>
                </div>

                {/* ROUTE */}
                <div className="relative mt-4 rounded-xl bg-slate-50 p-4">
                  <div className="absolute left-[21px] top-[42px] h-7 border-l border-dashed border-blue-300" />

                  <div className="flex gap-3">
                    <div className="relative z-10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-900 text-[9px] font-bold text-white">
                      A
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        From
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-blue-950">
                        {route.from}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <div className="relative z-10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                      B
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        To
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-blue-950">
                        {route.to}
                      </p>
                    </div>
                  </div>
                </div>

                {/* VEHICLE */}
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-100 p-3">
                  <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                    <img
                      src={
                        vehicleImages[
                          selectedVehicle
                        ] ||
                        "/vehicles/sedan.webp"
                      }
                      alt={vehicle.type}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Vehicle
                    </p>

                    <p className="truncate text-sm font-bold text-blue-950">
                      {vehicle.type}
                    </p>

                    <p className="text-xs text-gray-500">
                      {vehicle.passengers}{" "}
                      passengers ·{" "}
                      {vehicle.luggage} bags
                    </p>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-blue-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Guests
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-blue-950">
                      <UsersIcon />
                      {passengers}
                    </p>
                  </div>

                  <div className="rounded-xl bg-orange-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Luggage
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-orange-700">
                      <LuggageIcon />
                      {luggage}
                    </p>
                  </div>
                </div>

                {/* DATE */}
                {(date || time) && (
                  <div className="mt-4 rounded-xl border border-gray-100 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Date
                        </p>

                        <p className="mt-1 text-sm font-bold text-blue-950">
                          {date
                            ? formatDateForDisplay(
                                date
                              )
                            : "Not selected"}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Time
                        </p>

                        <p className="mt-1 text-sm font-bold text-blue-950">
                          {time
                            ? formatTimeForDisplay(
                                time
                              )
                            : "Not selected"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRICE */}
                <div className="mt-5 border-t border-gray-100 pt-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-500">
                        Total Transfer Price
                      </p>

                      <p className="mt-1 text-[11px] text-gray-400">
                        Private vehicle · Fixed
                        price
                      </p>
                    </div>

                    <p className="text-3xl font-bold text-orange-500">
                      €{vehicle.price}
                    </p>
                  </div>
                </div>

                {/* TRUST */}
                <div className="mt-5 rounded-xl bg-green-50 p-3.5">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <ShieldIcon />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-green-800">
                        Safe & Reliable Transfer
                      </p>

                      <p className="mt-0.5 text-xs leading-5 text-green-700">
                        Professional driver,
                        private vehicle and fixed
                        price.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-center text-[11px] leading-5 text-gray-400">
                  By sending your request, our
                  team will contact you on WhatsApp
                  to confirm your booking.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}