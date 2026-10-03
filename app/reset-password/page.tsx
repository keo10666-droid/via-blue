"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY" && session) {
        setIsReady(true);
        setMessage("");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;

      if (session && window.location.hash.includes("type=recovery")) {
        setIsReady(true);
      } else if (!session) {
        setMessage("This password reset link is invalid or has expired.");
      }
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isReady) {
      setMessage("Please open the password reset link from your email again.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setMessage("Your password has been updated successfully.");

    await supabase.auth.signOut();

    setTimeout(() => {
      router.replace("/login");
      router.refresh();
    }, 1200);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc]">
      <div className="absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0b3a78]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#f28c28]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-xl overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_30px_80px_rgba(11,58,120,0.14)]">
          <div className="bg-[#082d5d] px-8 py-10 text-white sm:px-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl font-black backdrop-blur-sm">
                VB
              </div>
              <div>
                <p className="text-lg font-black tracking-tight">Via Blue</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/55">
                  Tours & Transfers
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-12">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f28c28]">
                Account Security
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0b3a78]">
                Create a new password
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Choose a new password for your Via Blue account.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={8}
                    disabled={!isReady || isLoading || isSuccess}
                    placeholder="At least 8 characters"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 pr-14 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    disabled={!isReady || isLoading || isSuccess}
                    className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1 text-gray-400 transition hover:text-[#0b3a78] disabled:opacity-40"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                    minLength={8}
                    disabled={!isReady || isLoading || isSuccess}
                    placeholder="Repeat your new password"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 pr-14 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    disabled={!isReady || isLoading || isSuccess}
                    className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1 text-gray-400 transition hover:text-[#0b3a78] disabled:opacity-40"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {message && (
                <div className={`mb-5 rounded-2xl border px-4 py-4 text-sm font-medium leading-6 ${
                  isSuccess
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-[#0b3a78]/10 bg-[#0b3a78]/5 text-[#0b3a78]"
                }`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={!isReady || isLoading || isSuccess}
                className="flex w-full items-center justify-center rounded-2xl bg-[#0b3a78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0b3a78]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#082d5d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Updating password..." : isSuccess ? "Password updated" : "Update Password"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="mt-5 w-full text-center text-xs font-semibold text-gray-400 transition hover:text-[#0b3a78]"
              >
                ← Back to login
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
