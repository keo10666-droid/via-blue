"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [message, setMessage] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage(
        "Passwords do not match"
      );
      return;
    }

    setMessage("");
    setIsLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    setMessage(
      "Your password has been updated successfully"
    );

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc]">
      <div className="absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0b3a78]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#f28c28]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-lg overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_30px_80px_rgba(11,58,120,0.14)]">
          <div className="relative overflow-hidden bg-[#082d5d] px-7 py-9 text-white sm:px-10 sm:py-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f28c28]/15 blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-black backdrop-blur-sm">
                VB
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[#f28c28]">
                Account Security
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight">
                Set a new password
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/65">
                Create a new password for your Via Blue account
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-7 py-8 sm:px-10 sm:py-10"
          >
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                required
                minLength={6}
                placeholder="Enter the password again"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
              />
            </div>

            {message && (
              <div className="rounded-2xl border border-[#0b3a78]/10 bg-[#0b3a78]/5 px-4 py-4 text-sm font-medium leading-6 text-[#0b3a78]">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-2xl bg-[#0b3a78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0b3a78]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#082d5d] hover:shadow-xl hover:shadow-[#0b3a78]/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Updating..."
                : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
