"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(emailFromUrl);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<"code" | "password">("code");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (emailFromUrl) setEmail(emailFromUrl);
  }, [emailFromUrl]);

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedCode = code.replace(/\D/g, "");

    if (!normalizedEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!/^\d{6}$/.test(normalizedCode)) {
      setMessage("Please enter the 6-digit code from your email.");
      return;
    }

    setMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email: normalizedEmail,
      token: normalizedCode,
      type: "recovery",
    });

    if (error) {
      setMessage("The code is invalid or has expired. Please request a new code.");
      setIsLoading(false);
      return;
    }

    setStep("password");
    setMessage("");
    setIsLoading(false);
  }

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setMessage("Your password has been updated successfully.");
    await supabase.auth.signOut();
    setIsLoading(false);
  }

  async function handleSendCode() {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: `${window.location.origin}/reset-password?email=${encodeURIComponent(normalizedEmail)}`,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setCode("");
      setMessage("A new verification code has been sent to your email.");
    }

    setIsLoading(false);
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl font-black">
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
                Account Recovery
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0b3a78]">
                {step === "code" ? "Verify your email" : "Create a new password"}
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                {step === "code"
                  ? "Enter the 6-digit verification code sent to your email address."
                  : "Choose a new password for your Via Blue account."}
              </p>
            </div>

            {step === "code" ? (
              <form onSubmit={handleVerifyCode}>
                <div className="mb-5">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
                  />
                </div>

                <div className="mb-5">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    required
                    maxLength={6}
                    placeholder="000000"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-center text-xl font-bold tracking-[0.45em] text-gray-900 outline-none transition focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
                  />
                </div>

                {message && (
                  <div className="mb-5 rounded-2xl border border-[#0b3a78]/10 bg-[#0b3a78]/5 px-4 py-4 text-sm font-medium leading-6 text-[#0b3a78]">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-2xl bg-[#0b3a78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0b3a78]/20 transition hover:-translate-y-0.5 hover:bg-[#082d5d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </button>

                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={isLoading}
                  className="mt-5 w-full text-center text-xs font-bold text-gray-500 transition hover:text-[#f28c28] disabled:opacity-60"
                >
                  Resend code
                </button>
              </form>
            ) : (
              <form onSubmit={handleUpdatePassword}>
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
                      disabled={isLoading || isSuccess}
                      placeholder="At least 8 characters"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 pr-14 text-sm text-gray-900 outline-none transition focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5 disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      disabled={isLoading || isSuccess}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0b3a78]"
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
                      disabled={isLoading || isSuccess}
                      placeholder="Repeat your new password"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 pr-14 text-sm text-gray-900 outline-none transition focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5 disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                      disabled={isLoading || isSuccess}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0b3a78]"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {message && (
                  <div className={
                    "mb-5 rounded-2xl border px-4 py-4 text-sm font-medium leading-6 " +
                    (isSuccess
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-[#0b3a78]/10 bg-[#0b3a78]/5 text-[#0b3a78]")
                  }>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="flex w-full items-center justify-center rounded-2xl bg-[#0b3a78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0b3a78]/20 transition hover:-translate-y-0.5 hover:bg-[#082d5d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Updating password..." : isSuccess ? "Password updated" : "Update Password"}
                </button>

                {isSuccess && (
                  <a
                    href="/login"
                    className="mt-5 block text-center text-xs font-bold text-[#0b3a78] hover:text-[#f28c28]"
                  >
                    Continue to login
                  </a>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}