"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGerman, setIsGerman] = useState(false);

  useEffect(() => {
    try {
      setIsGerman(window.localStorage.getItem("via-blue-language") === "de");
    } catch {
      // Keep English as the safe fallback.
    }
    const handleLanguageChange = (event: Event) => {
      const next = (event as CustomEvent<"en" | "de">).detail;
      if (next === "en" || next === "de") setIsGerman(next === "de");
    };
    window.addEventListener("via-blue-language-change", handleLanguageChange);
    return () => window.removeEventListener("via-blue-language-change", handleLanguageChange);
  }, []);

  const text = (en: string, de: string) => isGerman ? de : en;
  const translateMessage = (value: string) => {
    const messages: Record<string, string> = {
      "We couldn’t complete this request. Please check your details and try again.": "Die Anfrage konnte nicht abgeschlossen werden. Bitte überprüfe deine Angaben und versuche es erneut.",
      "Account created. Please check your email to confirm your account": "Konto erstellt. Bitte überprüfe deine E-Mail, um dein Konto zu bestätigen.",
      "Email or password is incorrect.": "E-Mail-Adresse oder Passwort ist falsch.",
      "Please enter your email address first.": "Bitte gib zuerst deine E-Mail-Adresse ein.",
      "A new confirmation email has been sent.": "Eine neue Bestätigungs-E-Mail wurde gesendet."
    };
    return isGerman ? (messages[value] || value) : value;
  };

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("mode") === "register") {
      setIsSignUp(true);
    }
  }, []);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setIsLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setMessage("We couldn’t complete this request. Please check your details and try again.");
      } else {
        setMessage(
          "Account created. Please check your email to confirm your account"
        );
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("Email or password is incorrect.");
      } else {
        router.push("/");
        router.refresh();
      }
    }

    setIsLoading(false);
  }

  async function handleResendConfirmation() {
    if (!email) {
      setMessage("Please enter your email address first.");
      return;
    }

    setMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      setMessage("We couldn’t complete this request. Please check your details and try again.");
    } else {
      setMessage("A new confirmation email has been sent.");
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
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_30px_80px_rgba(11,58,120,0.14)] lg:grid-cols-[1.05fr_0.95fr]">

          {/* Premium Visual Side */}
          <div className="relative hidden min-h-[720px] overflow-hidden bg-[#082d5d] lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(242,140,40,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_35%)]" />

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -right-12 top-12 h-48 w-48 rounded-full border border-white/10" />
            <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full border border-white/10" />

            <div className="relative flex h-full flex-col justify-between p-12 text-white">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl font-black backdrop-blur-sm">
                    VB
                  </div>

                  <div>
                    <p className="text-lg font-black tracking-tight">
                      Via Blue
                    </p>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/55">
                      Tours & Transfers
                    </p>
                  </div>
                </div>

                <div className="mt-32 max-w-md">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f28c28]">
                    {text("Your Egyptian Journey", "Deine Reise durch Ägypten")}
                  </p>

                  <h2 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight">
                    {text("Discover Egypt", "Ägypten entdecken")}
                    <br />
                    <span className="text-white/65">
                      {text("Travel beautifully", "Stilvoll reisen")}
                    </span>
                  </h2>

                  <p className="mt-7 max-w-sm text-base leading-7 text-white/65">
                    {text("Manage your bookings, keep your trips organized and enjoy a smoother travel experience with Via Blue", "Verwalte deine Buchungen, organisiere deine Ausflüge und genieße ein entspanntes Reiseerlebnis mit Via Blue")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/55">
                <div className="h-px w-10 bg-white/20" />
                <span>Hurghada · Egypt</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="flex min-h-[720px] flex-col justify-center bg-white px-6 py-10 sm:px-10 lg:px-14">
            
            {/* Mobile Logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b3a78] text-sm font-black text-white shadow-lg shadow-[#0b3a78]/20">
                VB
              </div>

              <div>
                <p className="font-black tracking-tight text-[#0b3a78]">
                  Via Blue
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400">
                  Tours & Transfers
                </p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md">
              <div className="mb-9">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f28c28]">
                  {isSignUp ? text("Join Via Blue", "Via Blue beitreten") : text("Member Access", "Mitgliederzugang")}
                </p>

                <h1 className="mt-3 text-4xl font-black tracking-tight text-[#0b3a78]">
                  {isSignUp ? text("Create your account", "Konto erstellen") : text("Welcome back", "Willkommen zurück")}
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {isSignUp
                    ? text("Create your account and manage your bookings with ease", "Erstelle dein Konto und verwalte deine Buchungen ganz einfach")
                    : text("Sign in to access your bookings and travel details.", "Melde dich an, um deine Buchungen und Reisedetails aufzurufen.")}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className="mb-5">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">
                      {text("Full Name", "Vollständiger Name")}
                    </label>

                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      required
                      placeholder={text("Your full name", "Dein vollständiger Name")}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
                    />
                  </div>
                )}

                <div className="mb-5">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">
                    {text("Email Address", "E-Mail-Adresse")}
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">
                      {text("Password", "Passwort")}
                    </label>

                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      minLength={6}
                      placeholder={text("At least 6 characters", "Mindestens 6 Zeichen")}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 pr-14 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1 text-gray-400 transition hover:text-[#0b3a78]"
                      aria-label={
                        showPassword ? text("Hide password", "Passwort verbergen") : text("Show password", "Passwort anzeigen")
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {!isSignUp && (
                  <Link
                    href="/forgot-password"
                    className="mt-4 block text-right text-xs font-bold text-gray-500 transition hover:text-[#f28c28]"
                  >
                    {text("Forgot your password?", "Passwort vergessen?")}
                  </Link>
                )}

                {message && (
                  <div className="mt-5 rounded-2xl border border-[#0b3a78]/10 bg-[#0b3a78]/5 px-4 py-4 text-sm font-medium leading-6 text-[#0b3a78]">
                    {translateMessage(message)}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-7 flex w-full items-center justify-center rounded-2xl bg-[#0b3a78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0b3a78]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#082d5d] hover:shadow-xl hover:shadow-[#0b3a78]/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? text("Please wait...", "Bitte warten...")
                    : isSignUp
                      ? text("Create Account", "Konto erstellen")
                      : text("Log In", "Anmelden")}
                </button>

                {!isSignUp && (
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    disabled={isLoading}
                    className="mt-4 w-full text-center text-xs font-bold text-gray-500 transition hover:text-[#f28c28] disabled:opacity-60"
                  >
                    {text("Resend confirmation email", "Bestätigungs-E-Mail erneut senden")}
                  </button>
                )}

                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gray-100" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                    {text("or", "oder")}
                  </span>

                  <div className="h-px flex-1 bg-gray-100" />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp((current) => !current);
                    setMessage("");
                  }}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-[#0b3a78] transition hover:border-[#f28c28]/40 hover:bg-[#f28c28]/5 hover:text-[#f28c28]"
                >
                  {isSignUp
                    ? text("Already have an account? Log in", "Du hast bereits ein Konto? Anmelden")
                    : text("New here? Create an account", "Neu hier? Konto erstellen")}
                </button>

                <Link
                  href="/"
                  className="mt-6 block text-center text-xs font-semibold text-gray-400 transition hover:text-[#0b3a78]"
                >
                  {text("← Back to home", "← Zurück zur Startseite")}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}