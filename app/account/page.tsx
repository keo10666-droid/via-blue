"use client";

import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Profile = {
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
};

type LoyaltyAccount = {
  points: number;
  completed_bookings: number;
};

type Booking = {
  id: string;
  booking_type: string;
  tour_name: string;
  tour_date: string | null;
  guests: number | null;
  total_price: number | null;
  status: string;
  created_at: string;
};

type Memory = {
  id: string;
  image_path: string;
  caption: string | null;
  created_at: string;
  imageUrl: string;
};

const COUNTRY_CODES = [
  { name: "Egypt", flag: "eg", code: "+20" },
  { name: "Germany", flag: "de", code: "+49" },
  { name: "Netherlands", flag: "nl", code: "+31" },
  { name: "United Kingdom", flag: "gb", code: "+44" },
  { name: "United States", flag: "us", code: "+1" },
  { name: "France", flag: "fr", code: "+33" },
  { name: "Italy", flag: "it", code: "+39" },
  { name: "Spain", flag: "es", code: "+34" },
  { name: "Belgium", flag: "be", code: "+32" },
  { name: "Switzerland", flag: "ch", code: "+41" },
  { name: "Austria", flag: "at", code: "+43" },
  { name: "Poland", flag: "pl", code: "+48" },
  { name: "Czech Republic", flag: "cz", code: "+420" },
  { name: "Sweden", flag: "se", code: "+46" },
  { name: "Norway", flag: "no", code: "+47" },
  { name: "Denmark", flag: "dk", code: "+45" },
  { name: "Finland", flag: "fi", code: "+358" },
  { name: "Russia", flag: "ru", code: "+7" },
  { name: "Ukraine", flag: "ua", code: "+380" },
  { name: "Greece", flag: "gr", code: "+30" },
  { name: "Portugal", flag: "pt", code: "+351" },
  { name: "Ireland", flag: "ie", code: "+353" },
  { name: "Canada", flag: "ca", code: "+1" },
  { name: "Australia", flag: "au", code: "+61" },
  { name: "India", flag: "in", code: "+91" },
  { name: "Turkey", flag: "tr", code: "+90" },
  { name: "Saudi Arabia", flag: "sa", code: "+966" },
  { name: "United Arab Emirates", flag: "ae", code: "+971" },
  { name: "Qatar", flag: "qa", code: "+974" },
  { name: "Kuwait", flag: "kw", code: "+965" },
];

export default function AccountPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loyalty, setLoyalty] =
    useState<LoyaltyAccount | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [countryCode, setCountryCode] = useState("+20");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const [isEditingProfile, setIsEditingProfile] =
    useState(false);

  const [avatarFile, setAvatarFile] =
    useState<File | null>(null);

  const [memoryFile, setMemoryFile] =
    useState<File | null>(null);

  const [memoryCaption, setMemoryCaption] =
    useState("");

  const [memoryInputKey, setMemoryInputKey] =
    useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingMemory, setIsUploadingMemory] =
    useState(false);

  const [message, setMessage] = useState("");

  function splitPhoneNumber(
    savedPhone: string | null
  ) {
    if (!savedPhone) {
      setCountryCode("+20");
      setPhoneNumber("");
      return;
    }

    const sortedCountries = [...COUNTRY_CODES].sort(
      (a, b) => b.code.length - a.code.length
    );

    const matchedCountry = sortedCountries.find(
      (country) =>
        savedPhone.startsWith(country.code)
    );

    if (matchedCountry) {
      setCountryCode(matchedCountry.code);

      setPhoneNumber(
        savedPhone
          .slice(matchedCountry.code.length)
          .replace(/\D/g, "")
      );

      return;
    }

    setCountryCode("+20");

    setPhoneNumber(
      savedPhone.replace(/\D/g, "")
    );
  }

  async function loadMemories(userId: string) {
    const { data, error } = await supabase
      .from("travel_memories")
      .select(
        "id, image_path, caption, created_at"
      )
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      setMemories([]);
      return;
    }

    if (!data || data.length === 0) {
      setMemories([]);
      return;
    }

    const memoriesWithUrls =
      await Promise.all(
        data.map(async (memory) => {
          const {
            data: signedUrlData,
          } = await supabase.storage
            .from("travel-memories")
            .createSignedUrl(
              memory.image_path,
              60 * 60
            );

          return {
            ...memory,
            imageUrl:
              signedUrlData?.signedUrl || "",
          };
        })
      );

    setMemories(
      memoriesWithUrls.filter(
        (memory) => memory.imageUrl
      ) as Memory[]
    );
  }

  useEffect(() => {
    async function loadAccount() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const [
        profileResult,
        loyaltyResult,
        bookingsResult,
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select(
            "full_name, phone, avatar_url"
          )
          .eq("id", user.id)
          .maybeSingle(),

        supabase
          .from("loyalty_accounts")
          .select(
            "points, completed_bookings"
          )
          .eq("user_id", user.id)
          .maybeSingle(),

        supabase
          .from("bookings")
          .select(
            "id, booking_type, tour_name, tour_date, guests, total_price, status, created_at"
          )
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          }),
      ]);

      const loadedProfile =
        profileResult.data;

      if (profileResult.error) {
        setProfile(null);
      } else {
        setProfile(loadedProfile);
      }

      if (loyaltyResult.error) {
        setLoyalty(null);
      } else {
        setLoyalty(
          loyaltyResult.data
        );
      }

      if (bookingsResult.error) {
        setBookings([]);
      } else {
        setBookings(
          (bookingsResult.data ||
            []) as Booking[]
        );
      }

      setFullName(
        loadedProfile?.full_name ||
          user.user_metadata?.full_name ||
          ""
      );

      setPhone(
        loadedProfile?.phone || ""
      );

      setEmail(
        user.email || ""
      );

      splitPhoneNumber(
        loadedProfile?.phone || null
      );

      await loadMemories(user.id);

      setIsLoading(false);
    }

    loadAccount();
  }, [router]);

  function handleAvatarChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage(
        "Please select an image file."
      );
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setMessage(
        "Image size must be 5 MB or smaller."
      );
      return;
    }

    setAvatarFile(file);
    setMessage("");
  }

  async function handleSaveProfile(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      let avatarUrl =
        profile?.avatar_url || null;

      if (avatarFile) {
        const fileExtension =
          avatarFile.name
            .split(".")
            .pop() || "jpg";

        const filePath =
          `${user.id}/avatar.${fileExtension}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("avatars")
          .upload(
            filePath,
            avatarFile,
            {
              upsert: true,
              contentType:
                avatarFile.type,
            }
          );

        if (uploadError) {
          setMessage(
            uploadError.message
          );
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("avatars")
          .getPublicUrl(
            filePath
          );

        avatarUrl =
          `${publicUrl}?updated=${Date.now()}`;
      }

      const cleanPhone =
        phoneNumber.replace(
          /\D/g,
          ""
        );

      const completePhone =
        cleanPhone
          ? `${countryCode}${cleanPhone}`
          : "";

      const {
        error: profileError,
      } = await supabase
        .from("profiles")
        .update({
          full_name:
            fullName.trim(),
          phone:
            completePhone || null,
          avatar_url:
            avatarUrl,
        })
        .eq("id", user.id);

      if (profileError) {
        setMessage(
          profileError.message
        );
        return;
      }

      let emailMessage = "";

      if (
        email.trim() &&
        email.trim() !==
          (user.email || "")
      ) {
        const {
          error: emailError,
        } = await supabase.auth.updateUser({
          email: email.trim(),
        });

        if (emailError) {
          setMessage(
            emailError.message
          );
          return;
        }

        emailMessage =
          " Please check your email to confirm the new address.";
      }

      setPhone(
        completePhone
      );

      setProfile({
        full_name:
          fullName.trim(),
        phone:
          completePhone || null,
        avatar_url:
          avatarUrl,
      });

      setAvatarFile(null);
      setIsEditingProfile(false);
      setIsCountryOpen(false);

      setMessage(
        `Your profile has been saved.${emailMessage}`
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleMemoryFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith("image/")
    ) {
      setMessage(
        "Please select an image file."
      );
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setMessage(
        "Each memory image must be 5 MB or smaller."
      );
      return;
    }

    setMemoryFile(file);
    setMessage("");
  }

  async function handleUploadMemory(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!memoryFile) {
      setMessage(
        "Please choose a photo first."
      );
      return;
    }

    if (memories.length >= 25) {
      setMessage(
        "You have reached the maximum of 25 travel memories."
      );
      return;
    }

    setIsUploadingMemory(true);
    setMessage("");

    try {
      const fileExtension =
        memoryFile.name
          .split(".")
          .pop() || "jpg";

      const filePath =
        `${user.id}/${crypto.randomUUID()}.${fileExtension}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("travel-memories")
        .upload(
          filePath,
          memoryFile,
          {
            contentType:
              memoryFile.type,
            upsert: false,
          }
        );

      if (uploadError) {
        setMessage(
          uploadError.message
        );
        return;
      }

      const {
        data: memoryData,
        error: memoryError,
      } = await supabase
        .from("travel_memories")
        .insert({
          user_id: user.id,
          image_path: filePath,
          caption:
            memoryCaption.trim() ||
            null,
        })
        .select(
          "id, image_path, caption, created_at"
        )
        .single();

      if (
        memoryError ||
        !memoryData
      ) {
        await supabase.storage
          .from("travel-memories")
          .remove([
            filePath,
          ]);

        setMessage(
          memoryError?.message ||
            "Could not save this memory."
        );

        return;
      }

      const {
        data: signedUrlData,
      } = await supabase.storage
        .from("travel-memories")
        .createSignedUrl(
          filePath,
          60 * 60
        );

      if (
        signedUrlData?.signedUrl
      ) {
        setMemories(
          (current) => [
            {
              ...memoryData,
              imageUrl:
                signedUrlData.signedUrl,
            },
            ...current,
          ]
        );
      } else {
        await loadMemories(
          user.id
        );
      }

      setMemoryFile(null);
      setMemoryCaption("");

      setMemoryInputKey(
        (current) =>
          current + 1
      );

      setMessage(
        "Your travel memory has been added."
      );
    } finally {
      setIsUploadingMemory(
        false
      );
    }
  }

  async function handleDeleteMemory(
    memory: Memory
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this travel memory?"
      );

    if (!confirmed) return;

    setMessage("");

    try {
      const {
        error: databaseError,
      } = await supabase
        .from("travel_memories")
        .delete()
        .eq(
          "id",
          memory.id
        );

      if (databaseError) {
        setMessage(
          databaseError.message
        );
        return;
      }

      await supabase.storage
        .from("travel-memories")
        .remove([
          memory.image_path,
        ]);

      setMemories(
        (current) =>
          current.filter(
            (item) =>
              item.id !==
              memory.id
          )
      );

      setMessage(
        "Travel memory deleted."
      );
    } catch {
      setMessage(
        "Could not delete this memory."
      );
    }
  }

  if (isLoading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
        <div className="relative flex h-48 w-80 items-center justify-center">
          <div className="absolute left-1/2 top-1/2 h-1 w-44 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
            <div className="logo-trail absolute h-full w-20 rounded-full bg-linear-to-r from-transparent via-orange-400 to-blue-900" />
          </div>

          <div className="logo-arrow absolute left-1/2 top-1/2 z-20 -translate-y-1/2 text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 32"
              fill="none"
              className="h-10 w-20"
            >
              <path
                d="M3 16H51"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M40 5L55 16L40 27"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <img
            src="/logo/logo.svg"
            alt="Via Blue"
            className="logo-loading relative z-10 h-20 w-auto"
          />
        </div>

        <style jsx>{`
          .logo-loading {
            animation: logoReveal 2.2s
              cubic-bezier(0.22, 1, 0.36, 1)
              infinite;
          }

          .logo-arrow {
            animation: arrowFly 2.2s
              cubic-bezier(0.22, 1, 0.36, 1)
              infinite;
          }

          .logo-trail {
            animation: trailMove 2.2s
              cubic-bezier(0.22, 1, 0.36, 1)
              infinite;
          }

          @keyframes logoReveal {
            0% {
              opacity: 0;
              transform: translateX(-35px) scale(0.92);
              clip-path: inset(0 100% 0 0);
            }

            35% {
              opacity: 1;
              transform: translateX(0) scale(1);
              clip-path: inset(0 0 0 0);
            }

            75% {
              opacity: 1;
              transform: translateX(0) scale(1);
              clip-path: inset(0 0 0 0);
            }

            100% {
              opacity: 0;
              transform: translateX(15px) scale(1.02);
              clip-path: inset(0 0 0 0);
            }
          }

          @keyframes arrowFly {
            0% {
              opacity: 0;
              transform: translate(-150px, -50%) scale(0.7);
            }

            15% {
              opacity: 1;
            }

            45% {
              opacity: 1;
              transform: translate(20px, -50%) scale(1);
            }

            70% {
              opacity: 0.8;
              transform: translate(105px, -50%) scale(0.85);
            }

            100% {
              opacity: 0;
              transform: translate(180px, -50%) scale(0.6);
            }
          }

          @keyframes trailMove {
            0% {
              opacity: 0;
              transform: translateX(-100px);
            }

            15% {
              opacity: 0.4;
            }

            45% {
              opacity: 1;
              transform: translateX(0);
            }

            70% {
              opacity: 0.6;
              transform: translateX(65px);
            }

            100% {
              opacity: 0;
              transform: translateX(130px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .logo-loading,
            .logo-arrow,
            .logo-trail {
              animation: none;
            }

            .logo-loading {
              opacity: 1;
            }

            .logo-arrow,
            .logo-trail {
              display: none;
            }
          }
        `}</style>
      </main>
    );
  }

  const selectedCountry =
    COUNTRY_CODES.find(
      (country) =>
        country.code === countryCode
    ) || COUNTRY_CODES[0];

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="relative overflow-hidden rounded-[32px] bg-[#071d49] px-7 py-9 text-white shadow-[0_20px_60px_rgba(7,29,73,0.16)] sm:px-10 sm:py-11 lg:px-12">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-orange-400" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-400">
                My Account
              </p>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Welcome,{" "}
              <span className="text-orange-400">
                {profile?.full_name ||
                  "Traveler"}
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Manage your profile, view your bookings and keep your favorite Hurghada memories in one place.
            </p>
          </div>
        </section>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <div className="group rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Reward Points
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#071d49]">
                  {loyalty?.points || 0}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3.5l2.3 4.66 5.14.75-3.72 3.63.88 5.12L12 15.24l-4.6 2.42.88-5.12-3.72-3.63 5.14-.75L12 3.5Z"
                  />
                </svg>
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Keep booking to unlock future gifts.
            </p>
          </div>

          <div className="group rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Completed Trips
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#071d49]">
                  {loyalty?.completed_bookings ||
                    0}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#071d49]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.5 7.5h17M5.5 4.5h13a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8 13 2.2 2.2L16.5 9"
                  />
                </svg>
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Your completed adventures with us.
            </p>
          </div>

          <div className="group rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Travel Memories
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#071d49]">
                  {memories.length}
                  <span className="ml-1 text-base font-medium text-slate-400">
                    /25
                  </span>
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <rect
                    x="3.5"
                    y="4.5"
                    width="17"
                    height="15"
                    rx="2.5"
                  />
                  <circle
                    cx="8.5"
                    cy="9"
                    r="1.4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.5 16 4.2-4.2 3.2 3.2 2.1-2.1 3.5 3.5"
                  />
                </svg>
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Save photos from your favorite trips.
            </p>
          </div>

        </div>

        {/* Main Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Profile */}
          <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:p-7 lg:col-span-1">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
                  Personal Details
                </p>

                <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#071d49]">
                  Your Profile
                </h2>
              </div>

              {!isEditingProfile && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingProfile(true);
                    setMessage("");
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-[#071d49] transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                  title="Edit profile"
                  aria-label="Edit profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4.5 w-4.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6.5 17.5 10.5M4 20l3.8-.9L19.2 7.7a2.8 2.8 0 0 0-4-4L3.8 15.1 3 19.5 4 20Z"
                    />
                  </svg>
                </button>
              )}
            </div>

            <form
              onSubmit={
                handleSaveProfile
              }
              className="mt-7"
            >

              <div className="flex flex-col items-center">

                <div className="relative">
                  <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-[0_10px_30px_rgba(7,29,73,0.12)] ring-1 ring-slate-200">
                    {profile?.avatar_url ? (
                      <img
                        src={
                          profile.avatar_url
                        }
                        alt="Profile picture"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#071d49] text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          className="h-12 w-12"
                        >
                          <circle
                            cx="12"
                            cy="8"
                            r="3.5"
                          />
                          <path
                            strokeLinecap="round"
                            d="M5 20c.8-3.4 3.3-5.5 7-5.5s6.2 2.1 7 5.5"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {isEditingProfile && (
                    <label className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-orange-500 text-white shadow-lg transition hover:bg-orange-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 7.5h3l1.2-2h7.6l1.2 2h3v11H4v-11Z"
                        />
                        <circle
                          cx="12"
                          cy="13"
                          r="3.2"
                        />
                      </svg>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={
                          handleAvatarChange
                        }
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {avatarFile && (
                  <p className="mt-3 max-w-full truncate text-center text-xs text-slate-400">
                    {avatarFile.name}
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div className="mt-7">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Full Name
                  </label>

                  {!isEditingProfile && (
                    <button
                      type="button"
                      onClick={() =>
                        setIsEditingProfile(true)
                      }
                      className="text-slate-400 transition hover:text-orange-500"
                      title="Edit full name"
                      aria-label="Edit full name"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6.5 17.5 10.5M4 20l3.8-.9L19.2 7.7a2.8 2.8 0 0 0-4-4L3.8 15.1 3 19.5 4 20Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <input
                    type="text"
                    value={fullName}
                    onChange={(
                      event
                    ) =>
                      setFullName(
                        event.target
                          .value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                  />
                ) : (
                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800">
                    {fullName ||
                      "Not added yet"}
                  </div>
                )}
              </div>

              {/* WhatsApp */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    WhatsApp Number
                  </label>

                  {!isEditingProfile && (
                    <button
                      type="button"
                      onClick={() =>
                        setIsEditingProfile(true)
                      }
                      className="text-slate-400 transition hover:text-orange-500"
                      title="Edit WhatsApp number"
                      aria-label="Edit WhatsApp number"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6.5 17.5 10.5M4 20l3.8-.9L19.2 7.7a2.8 2.8 0 0 0-4-4L3.8 15.1 3 19.5 4 20Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setIsCountryOpen(
                            (current) =>
                              !current
                          )
                        }
                        className="flex h-full w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://flagcdn.com/w40/${selectedCountry.flag}.png`}
                            alt={`${selectedCountry.name} flag`}
                            className="h-5 w-7 rounded object-cover"
                          />

                          <span className="font-semibold">
                            {
                              selectedCountry.code
                            }
                          </span>
                        </div>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`h-4 w-4 text-slate-400 transition ${
                            isCountryOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m6 9 6 6 6-6"
                          />
                        </svg>
                      </button>

                      {isCountryOpen && (
                        <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-2xl">
                          {COUNTRY_CODES.map(
                            (country) => (
                              <button
                                key={`${country.name}-${country.code}`}
                                type="button"
                                onClick={() => {
                                  setCountryCode(
                                    country.code
                                  );

                                  setIsCountryOpen(
                                    false
                                  );
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-800 transition hover:bg-slate-50"
                              >
                                <img
                                  src={`https://flagcdn.com/w40/${country.flag}.png`}
                                  alt={`${country.name} flag`}
                                  className="h-5 w-7 rounded object-cover"
                                />

                                <span className="font-medium">
                                  {
                                    country.code
                                  }
                                </span>
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    <input
                      type="tel"
                      value={
                        phoneNumber
                      }
                      onChange={(
                        event
                      ) =>
                        setPhoneNumber(
                          event.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                      placeholder="1001234567"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800">
                    {phone ||
                      "Not added yet"}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email
                  </label>

                  {!isEditingProfile && (
                    <button
                      type="button"
                      onClick={() =>
                        setIsEditingProfile(true)
                      }
                      className="text-slate-400 transition hover:text-orange-500"
                      title="Edit email"
                      aria-label="Edit email"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6.5 17.5 10.5M4 20l3.8-.9L19.2 7.7a2.8 2.8 0 0 0-4-4L3.8 15.1 3 19.5 4 20Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(
                      event
                    ) =>
                      setEmail(
                        event.target
                          .value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                  />
                ) : (
                  <div className="break-all rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800">
                    {email ||
                      "Not added yet"}
                  </div>
                )}
              </div>

              {isEditingProfile && (
                <div className="mt-6 flex gap-3">
                  <button
                    type="submit"
                    disabled={
                      isSaving
                    }
                    className="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md disabled:opacity-60"
                  >
                    {isSaving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    disabled={
                      isSaving
                    }
                    onClick={() => {
                      setIsEditingProfile(
                        false
                      );

                      setFullName(
                        profile?.full_name ||
                          ""
                      );

                      setEmail(
                        email
                      );

                      splitPhoneNumber(
                        profile?.phone ||
                          null
                      );

                      setAvatarFile(
                        null
                      );

                      setIsCountryOpen(
                        false
                      );

                      setMessage("");
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              )}

            </form>
          </section>

          {/* Bookings */}
          <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:p-7 lg:col-span-2">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
                  My Trips
                </p>

                <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#071d49]">
                  Booking History
                </h2>
              </div>

              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#071d49] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Explore Tours

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h13M13 6l6 6-6 6"
                  />
                </svg>
              </Link>
            </div>

            {bookings.length === 0 ? (
              <div className="mt-7 rounded-[22px] border border-dashed border-slate-200 bg-slate-50/70 px-6 py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#071d49] shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7.5h16M6 4.5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 11.5h3M8 15h6"
                    />
                  </svg>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-[#071d49]">
                  No bookings yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Your confirmed and upcoming trips will appear here.
                </p>
              </div>
            ) : (
              <div className="mt-7 space-y-3">
                {bookings.map(
                  (booking) => (
                    <div
                      key={
                        booking.id
                      }
                      className="group rounded-[20px] border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-[0_8px_25px_rgba(15,23,42,0.05)]"
                    >
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
                              {
                                booking.booking_type
                              }
                            </p>
                          </div>

                          <h3 className="mt-2 truncate text-base font-semibold text-[#071d49] sm:text-lg">
                            {
                              booking.tour_name
                            }
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                className="h-3.5 w-3.5"
                              >
                                <rect
                                  x="3.5"
                                  y="5"
                                  width="17"
                                  height="15"
                                  rx="2"
                                />
                                <path
                                  strokeLinecap="round"
                                  d="M7.5 3.5v3M16.5 3.5v3M3.5 9h17"
                                />
                              </svg>

                              {booking.tour_date
                                ? booking.tour_date
                                : "Date to be confirmed"}
                            </span>

                            {booking.guests && (
                              <span className="flex items-center gap-1.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.7"
                                  className="h-3.5 w-3.5"
                                >
                                  <circle
                                    cx="9"
                                    cy="8"
                                    r="3"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    d="M3.5 20c.6-3.2 2.4-5 5.5-5s4.9 1.8 5.5 5M16 11a2.5 2.5 0 1 0 0-5M16.5 15c2.2.2 3.6 1.8 4 5"
                                  />
                                </svg>

                                {booking.guests} guests
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#071d49]">
                            {
                              booking.status
                            }
                          </span>

                          {booking.total_price !==
                            null && (
                            <p className="text-xl font-semibold text-orange-500">
                              €{booking.total_price}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </section>
        </div>

        {/* Memories */}
        <section className="mt-6 rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:p-7">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                  >
                    <rect
                      x="3.5"
                      y="4.5"
                      width="17"
                      height="15"
                      rx="2.5"
                    />
                    <circle
                      cx="8.5"
                      cy="9"
                      r="1.4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5.5 16 4.2-4.2 3.2 3.2 2.1-2.1 3.5 3.5"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                    My Travel Memories
                  </p>

                  <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#071d49]">
                    Save Your Hurghada Moments
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Add up to 25 photos from your trips. Only you can see them.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-[#071d49]">
              {memories.length} / 25 photos
            </div>
          </div>

          <form
            onSubmit={
              handleUploadMemory
            }
            className="mt-7 grid gap-3 rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 md:grid-cols-[1fr_1fr_auto]"
          >
            <label className="flex min-w-0 cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 transition hover:border-orange-300 hover:bg-orange-50/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5 shrink-0 text-orange-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V5m0 0L8 9m4-4 4 4M5 15.5v2A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-2"
                />
              </svg>

              <span className="truncate">
                {memoryFile
                  ? memoryFile.name
                  : "Choose a travel photo"}
              </span>

              <input
                key={
                  memoryInputKey
                }
                type="file"
                accept="image/*"
                onChange={
                  handleMemoryFileChange
                }
                disabled={
                  memories.length >=
                  25
                }
                className="hidden"
              />
            </label>

            <input
              type="text"
              value={
                memoryCaption
              }
              onChange={(
                event
              ) =>
                setMemoryCaption(
                  event.target
                    .value
                )
              }
              maxLength={120}
              placeholder="Add a caption (optional)"
              disabled={
                memories.length >=
                25
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
            />

            <button
              type="submit"
              disabled={
                isUploadingMemory ||
                memories.length >=
                  25 ||
                !memoryFile
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploadingMemory ? (
                "Uploading..."
              ) : (
                <>
                  Add Photo

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14M5 12h14"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          {message && (
            <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-[#071d49]">
              {message}
            </p>
          )}

          {memories.length === 0 ? (
            <div className="mt-7 rounded-[22px] border border-dashed border-slate-200 bg-slate-50/60 px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-7 w-7"
                >
                  <rect
                    x="3.5"
                    y="4.5"
                    width="17"
                    height="15"
                    rx="2.5"
                  />
                  <circle
                    cx="8.5"
                    cy="9"
                    r="1.4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.5 16 4.2-4.2 3.2 3.2 2.1-2.1 3.5 3.5"
                  />
                </svg>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[#071d49]">
                No memories yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Upload your first Hurghada memory above.
              </p>
            </div>
          ) : (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {memories.map(
                (memory) => (
                  <article
                    key={
                      memory.id
                    }
                    className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(15,23,42,0.08)]"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          memory.imageUrl
                        }
                        alt={
                          memory.caption ||
                          "Travel memory"
                        }
                        className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/40 to-transparent opacity-70" />
                    </div>

                    <div className="p-4">
                      <p className="min-h-10 text-sm leading-5 text-slate-600">
                        {
                          memory.caption ||
                          "A beautiful Hurghada memory"
                        }
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteMemory(
                            memory
                          )
                        }
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 py-2.5 text-xs font-bold text-red-600 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 7h15M9 7V4.5h6V7M7 7l.7 12h8.6L17 7M10 11v5M14 11v5"
                          />
                        </svg>

                        Delete Photo
                      </button>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}