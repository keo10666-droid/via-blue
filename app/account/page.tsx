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
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="font-bold text-blue-900">
          Loading your account...
        </p>
      </main>
    );
  }

  const selectedCountry =
    COUNTRY_CODES.find(
      (country) =>
        country.code === countryCode
    ) || COUNTRY_CODES[0];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="overflow-hidden rounded-3xl bg-linear-to-r from-blue-900 to-blue-700 p-8 text-white shadow-xl md:p-12">
          <p className="font-bold uppercase tracking-[0.25em] text-orange-400">
            My Account
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Welcome,{" "}
            {profile?.full_name ||
              "Traveler"}
          </h1>

          <p className="mt-4 max-w-2xl text-blue-100">
            Manage your profile, view your
            bookings and save memories from
            your Hurghada adventures.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Reward Points
            </p>

            <p className="mt-2 text-4xl font-bold text-orange-500">
              {loyalty?.points || 0}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Keep booking to unlock future gifts.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Completed Trips
            </p>

            <p className="mt-2 text-4xl font-bold text-blue-900">
              {loyalty?.completed_bookings ||
                0}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Your completed adventures with us.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Travel Memories
            </p>

            <p className="mt-2 text-4xl font-bold text-green-600">
              {memories.length}/25
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Save photos from your favorite trips.
            </p>
          </div>

        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          <section className="rounded-3xl bg-white p-7 shadow-sm lg:col-span-1">

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-900">
                Your Profile
              </h2>

              {!isEditingProfile && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingProfile(true);
                    setMessage("");
                  }}
                  className="rounded-lg p-1 text-blue-900 transition hover:bg-blue-50 hover:text-blue-700"
                  title="Edit profile"
                  aria-label="Edit profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182L7.5 19.213l-4.5 1.125 1.125-4.5L16.862 3.487Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 5.25 18.75 9"
                    />
                  </svg>
                </button>
              )}
            </div>

            <form
              onSubmit={
                handleSaveProfile
              }
              className="mt-6"
            >

              <div className="flex flex-col items-center">

                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-5xl">

                  {profile?.avatar_url ? (
                    <img
                      src={
                        profile.avatar_url
                      }
                      alt="Profile picture"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "👤"
                  )}

                </div>

                {isEditingProfile && (
                  <>
                    <label className="mt-4 cursor-pointer rounded-xl border-2 border-blue-900 px-4 py-2 text-sm font-bold text-blue-900 transition hover:bg-blue-900 hover:text-white">

                      Choose Profile Photo

                      <input
                        type="file"
                        accept="image/*"
                        onChange={
                          handleAvatarChange
                        }
                        className="hidden"
                      />

                    </label>

                    {avatarFile && (
                      <p className="mt-2 text-center text-xs text-gray-500">
                        New photo selected:{" "}
                        {
                          avatarFile.name
                        }
                      </p>
                    )}
                  </>
                )}

              </div>

              <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">
                  <label className="block font-bold text-blue-900">
                    Full Name
                  </label>

                  {!isEditingProfile && (
                    <button
                      type="button"
                      onClick={() =>
                        setIsEditingProfile(
                          true
                        )
                      }
                      className="rounded-lg p-1 text-blue-900 transition hover:bg-blue-50 hover:text-blue-700"
                      title="Edit full name"
                      aria-label="Edit full name"
                    >
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
                          d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182L7.5 19.213l-4.5 1.125 1.125-4.5L16.862 3.487Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 5.25 18.75 9"
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
                    className="w-full rounded-xl border border-gray-300 p-3 text-gray-900 outline-none focus:border-blue-500"
                  />
                ) : (
                  <div className="rounded-xl bg-slate-50 p-3 text-gray-900">
                    {fullName ||
                      "Not added yet"}
                  </div>
                )}

              </div>

              <div className="mt-5">

                <div className="mb-2 flex items-center justify-between">
                  <label className="block font-bold text-blue-900">
                    WhatsApp Number
                  </label>

                  {!isEditingProfile && (
                    <button
                      type="button"
                      onClick={() =>
                        setIsEditingProfile(
                          true
                        )
                      }
                      className="rounded-lg p-1 text-blue-900 transition hover:bg-blue-50 hover:text-blue-700"
                      title="Edit WhatsApp number"
                      aria-label="Edit WhatsApp number"
                    >
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
                          d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182L7.5 19.213l-4.5 1.125 1.125-4.5L16.862 3.487Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 5.25 18.75 9"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <div className="grid grid-cols-[130px_1fr] gap-2">

                    <div className="relative">

                      <button
                        type="button"
                        onClick={() =>
                          setIsCountryOpen(
                            (current) =>
                              !current
                          )
                        }
                        className="flex h-full w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none transition focus:border-blue-500"
                      >

                        <div className="flex items-center gap-2">

                          <img
                            src={`https://flagcdn.com/w40/${selectedCountry.flag}.png`}
                            alt={`${selectedCountry.name} flag`}
                            className="h-5 w-7 rounded object-cover"
                          />

                          <span className="font-medium">
                            {
                              selectedCountry.code
                            }
                          </span>

                        </div>

                        <span className="ml-2 text-gray-500">
                          ▾
                        </span>

                      </button>

                      {isCountryOpen && (
                        <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">

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
                                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-gray-900 transition hover:bg-slate-50"
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
                      className="w-full rounded-xl border border-gray-300 p-3 text-gray-900 outline-none focus:border-blue-500"
                    />

                  </div>
                ) : (
                  <div className="rounded-xl bg-slate-50 p-3 text-gray-900">
                    {phone ||
                      "Not added yet"}
                  </div>
                )}

              </div>

              <div className="mt-5">

                <div className="mb-2 flex items-center justify-between">
                  <label className="block font-bold text-blue-900">
                    Email
                  </label>

                  {!isEditingProfile && (
                    <button
                      type="button"
                      onClick={() =>
                        setIsEditingProfile(
                          true
                        )
                      }
                      className="rounded-lg p-1 text-blue-900 transition hover:bg-blue-50 hover:text-blue-700"
                      title="Edit email"
                      aria-label="Edit email"
                    >
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
                          d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182L7.5 19.213l-4.5 1.125 1.125-4.5L16.862 3.487Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 5.25 18.75 9"
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
                    className="w-full rounded-xl border border-gray-300 p-3 text-gray-900 outline-none focus:border-blue-500"
                  />
                ) : (
                  <div className="break-all rounded-xl bg-slate-50 p-3 text-gray-900">
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
                    className="flex-1 rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600 disabled:opacity-60"
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
                    className="rounded-xl border-2 border-gray-300 px-4 py-3 font-bold text-gray-700 transition hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                </div>
              )}

            </form>

          </section>

          <section className="rounded-3xl bg-white p-7 shadow-sm lg:col-span-2">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <p className="font-bold uppercase tracking-[0.2em] text-orange-500">
                  My Trips
                </p>

                <h2 className="mt-2 text-2xl font-bold text-blue-900">
                  Your Booking History
                </h2>

              </div>

              <Link
                href="/tours"
                className="rounded-xl bg-blue-900 px-5 py-3 text-center font-bold text-white transition hover:bg-blue-800"
              >
                Explore Tours
              </Link>

            </div>

            {bookings.length === 0 ? (

              <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center">

                <p className="text-4xl">
                  🌴
                </p>

                <h3 className="mt-4 text-xl font-bold text-blue-900">
                  No bookings yet
                </h3>

                <p className="mt-2 text-gray-600">
                  Your confirmed and upcoming
                  trips will appear here.
                </p>

              </div>

            ) : (

              <div className="mt-8 space-y-4">

                {bookings.map(
                  (booking) => (

                    <div
                      key={
                        booking.id
                      }
                      className="rounded-2xl border border-gray-200 p-5"
                    >

                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                        <div>

                          <p className="text-sm font-bold uppercase tracking-wider text-orange-500">
                            {
                              booking.booking_type
                            }
                          </p>

                          <h3 className="mt-1 text-xl font-bold text-blue-900">
                            {
                              booking.tour_name
                            }
                          </h3>

                          <p className="mt-2 text-sm text-gray-600">

                            {booking.tour_date
                              ? `Date: ${booking.tour_date}`
                              : "Date to be confirmed"}

                            {booking.guests
                              ? ` • ${booking.guests} guests`
                              : ""}

                          </p>

                        </div>

                        <div className="text-left sm:text-right">

                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-900">
                            {
                              booking.status
                            }
                          </span>

                          {booking.total_price !==
                            null && (
                            <p className="mt-3 text-xl font-bold text-orange-500">
                              €
                              {
                                booking.total_price
                              }
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

        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <p className="font-bold uppercase tracking-[0.2em] text-orange-500">
                My Travel Memories
              </p>

              <h2 className="mt-2 text-2xl font-bold text-blue-900">
                Save Your Hurghada Moments
              </h2>

              <p className="mt-2 text-gray-600">
                Add up to 25 photos from your
                trips. Only you can see them.
              </p>

            </div>

            <span className="font-bold text-blue-900">
              {memories.length} / 25 photos
            </span>

          </div>

          <form
            onSubmit={
              handleUploadMemory
            }
            className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-5 md:grid-cols-[1fr_1fr_auto]"
          >

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
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-700"
            />

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
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={
                isUploadingMemory ||
                memories.length >=
                  25 ||
                !memoryFile
              }
              className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploadingMemory
                ? "Uploading..."
                : "Add Photo"}
            </button>

          </form>

          {message && (
            <p className="mt-5 rounded-xl bg-blue-50 p-4 text-sm font-medium text-blue-900">
              {message}
            </p>
          )}

          {memories.length === 0 ? (

            <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">

              <p className="text-5xl">
                📸
              </p>

              <h3 className="mt-4 text-xl font-bold text-blue-900">
                No memories yet
              </h3>

              <p className="mt-2 text-gray-600">
                Upload your first Hurghada
                memory above.
              </p>

            </div>

          ) : (

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {memories.map(
                (memory) => (

                  <article
                    key={
                      memory.id
                    }
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                  >

                    <img
                      src={
                        memory.imageUrl
                      }
                      alt={
                        memory.caption ||
                        "Travel memory"
                      }
                      className="h-52 w-full object-cover"
                    />

                    <div className="p-4">

                      <p className="min-h-10 text-sm leading-5 text-gray-600">
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
                        className="mt-4 w-full rounded-xl border-2 border-red-500 py-2 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
                      >
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