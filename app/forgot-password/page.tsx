"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Step = "email" | "code" | "password" | "success";

const passwordRules = [
  { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "One number", test: (value: string) => /\d/.test(value) },
  { label: "One special character", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [isGerman, setIsGerman] = useState(false);

  useEffect(() => {
    try { setIsGerman(window.localStorage.getItem("via-blue-language") === "de"); } catch { /* English fallback */ }
    const handleLanguageChange = (event: Event) => {
      const next = (event as CustomEvent<"en" | "de">).detail;
      if (next === "en" || next === "de") setIsGerman(next === "de");
    };
    window.addEventListener("via-blue-language-change", handleLanguageChange);
    return () => window.removeEventListener("via-blue-language-change", handleLanguageChange);
  }, []);

  const text = (en: string, de: string) => isGerman ? de : en;
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const allRulesValid = passwordRules.every((rule) => rule.test(password));
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  function showError(text: string) {
    setIsError(true);
    setMessage(text);
  }

  async function handleSendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());

    if (error) {
      showError("We couldn't send the verification code. Please check your email and try again.");
    } else {
      setStep("code");
      setIsError(false);
      setMessage("A verification code has been sent to your email address.");
    }

    setIsLoading(false);
  }

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "recovery",
    });

    if (error) {
      showError("The verification code is invalid or expired. Please request a new code.");
    } else {
      setStep("password");
    }

    setIsLoading(false);
  }

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!allRulesValid) {
      showError("Please meet all password requirements.");
      return;
    }

    if (!passwordsMatch) {
      showError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("Password reset update failed.");
      showError("We couldn't update your password. Please verify your reset code is still valid and try again.");
      setIsLoading(false);
      return;
    }

    await supabase.auth.signOut();
    setStep("success");
    setIsLoading(false);
  }

  const stepNumber = step === "email" ? 1 : step === "code" ? 2 : 3;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc]">
      <div className="absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0b3a78]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#f28c28]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_30px_80px_rgba(11,58,120,0.14)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden min-h-[720px] overflow-hidden bg-[#082d5d] lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(242,140,40,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_35%)]" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -right-12 top-12 h-48 w-48 rounded-full border border-white/10" />
            <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full border border-white/10" />

            <div className="relative flex h-full flex-col justify-between p-12 text-white">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl font-black backdrop-blur-sm">VB</div>
                  <div>
                    <p className="text-lg font-black tracking-tight">Via Blue</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/55">Tours & Transfers</p>
                  </div>
                </div>

                <div className="mt-32 max-w-md">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f28c28]">{text("Account Recovery", "Kontowiederherstellung")}</p>
                  <h2 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight">
                    {text("Back to your", "Zurück zu deiner")}<br /><span className="text-white/65">{text("journey.", "Reise.")}</span>
                  </h2>
                  <p className="mt-7 max-w-sm text-base leading-7 text-white/65">
                    {text("Securely verify your email and create a new password for your Via Blue account", "Bestätige sicher deine E-Mail-Adresse und lege ein neues Passwort für dein Via-Blue-Konto fest")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/55">
                <div className="h-px w-10 bg-white/20" />
                <span>Hurghada · Egypt</span>
              </div>
            </div>
          </div>

          <div className="flex min-h-[720px] flex-col justify-center bg-white px-6 py-10 sm:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8">
                <Link href="/login" className="mb-7 inline-flex items-center gap-2 text-xs font-bold text-gray-400 transition hover:text-[#0b3a78]">
                  <ArrowLeft className="h-4 w-4" /> {text("Back to login", "Zurück zur Anmeldung")}
                </Link>

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f28c28]">
                  {step === "success" ? text("Password Updated", "Passwort geändert") : text("Account Recovery", "Kontowiederherstellung")}
                </p>

                <h1 className="mt-3 text-4xl font-black tracking-tight text-[#0b3a78]">
                  {step === "email" && text("Forgot your password?", "Passwort vergessen?")}
                  {step === "code" && text("Check your email", "Prüfe deine E-Mail")}
                  {step === "password" && text("Create a new password", "Neues Passwort erstellen")}
                  {step === "success" && text("You're all set", "Alles erledigt")}
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {step === "email" && text("Enter the email address registered to your Via Blue account.", "Gib die E-Mail-Adresse ein, die mit deinem Via-Blue-Konto verknüpft ist.")}
                  {step === "code" && text("Enter the 6-digit password reset code we sent to " + email + ".", "Gib den 6-stelligen Code ein, den wir an " + email + " gesendet haben.")}
                  {step === "password" && text("Choose a strong new password for your account.", "Wähle ein sicheres neues Passwort für dein Konto.")}
                  {step === "success" && text("Your password has been changed successfully. You can now sign in with your new password.", "Dein Passwort wurde erfolgreich geändert. Du kannst dich jetzt mit deinem neuen Passwort anmelden.")}
                </p>
              </div>

              {step !== "success" && (
                <div className="mb-8 flex items-center gap-2">
                  {[1, 2, 3].map((number) => (
                    <div key={number} className="flex flex-1 items-center gap-2">
                      <div className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black " + (number <= stepNumber ? "bg-[#0b3a78] text-white" : "bg-gray-100 text-gray-400")}>
                        {number}
                      </div>
                      {number < 3 && (
                        <div className={"h-px flex-1 " + (number < stepNumber ? "bg-[#0b3a78]" : "bg-gray-100")} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {step === "email" && (
                <form onSubmit={handleSendCode}>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">{text("Email Address", "E-Mail-Adresse")}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
                  />
                  <button type="submit" disabled={isLoading} className="mt-7 flex w-full items-center justify-center rounded-2xl bg-[#0b3a78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0b3a78]/20 transition hover:-translate-y-0.5 hover:bg-[#082d5d] disabled:cursor-not-allowed disabled:opacity-60">
                    {isLoading ? text("Sending code...", "Code wird gesendet...") : text("Send verification code", "Bestätigungscode senden")}
                  </button>
                </form>
              )}

              {step === "code" && (
                <form onSubmit={handleVerifyCode}>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">{text("Verification Code", "Bestätigungscode")}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    required
                    autoComplete="one-time-code"
                    placeholder="000000"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-center text-xl font-bold tracking-[0.4em] text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
                  />
                  <button type="submit" disabled={isLoading || code.length !== 6} className="mt-7 flex w-full items-center justify-center rounded-2xl bg-[#0b3a78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0b3a78]/20 transition hover:-translate-y-0.5 hover:bg-[#082d5d] disabled:cursor-not-allowed disabled:opacity-60">
                    {isLoading ? text("Verifying...", "Code wird überprüft...") : text("Verify code", "Code bestätigen")}
                  </button>
                  <button type="button" disabled={isLoading} onClick={() => { setStep("email"); setCode(""); setMessage(""); setIsError(false); }} className="mt-4 w-full text-center text-xs font-bold text-gray-500 transition hover:text-[#f28c28]">
                    {text("Use a different email", "Andere E-Mail-Adresse verwenden")}
                  </button>
                </form>
              )}

              {step === "password" && (
                <form onSubmit={handleUpdatePassword}>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">{text("New Password", "Neues Passwort")}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        autoComplete="new-password"
                        placeholder={text("Create a strong password", "Erstelle ein sicheres Passwort")}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 pr-14 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
                      />
                      <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1 text-gray-400 transition hover:text-[#0b3a78]" aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#0b3a78]">{text("Confirm Password", "Passwort bestätigen")}</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                        autoComplete="new-password"
                        placeholder={text("Repeat your new password", "Wiederhole dein neues Passwort")}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 pr-14 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0b3a78] focus:bg-white focus:ring-4 focus:ring-[#0b3a78]/5"
                      />
                      <button type="button" onClick={() => setShowConfirmPassword((current) => !current)} className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1 text-gray-400 transition hover:text-[#0b3a78]" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#0b3a78]">{text("Password requirements", "Passwortanforderungen")}</p>
                    <div className="space-y-2">
                      {passwordRules.map((rule) => {
                        const valid = rule.test(password);
                        return (
                          <div key={text(rule.label, ({ "At least 8 characters": "Mindestens 8 Zeichen", "One uppercase letter": "Ein Großbuchstabe", "One lowercase letter": "Ein Kleinbuchstabe", "One number": "Eine Zahl", "One special character": "Ein Sonderzeichen" } as Record<string, string>)[rule.label] || rule.label)} className={"flex items-center gap-2 text-xs font-medium " + (valid ? "text-green-600" : "text-gray-400")}>
                            <span className={"flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black " + (valid ? "bg-green-100" : "bg-gray-100")}>
                              {valid ? "✓" : "•"}
                            </span>
                            {rule.label}
                          </div>
                        );
                      })}
                      <div className={"flex items-center gap-2 text-xs font-medium " + (passwordsMatch ? "text-green-600" : "text-gray-400")}>
                        <span className={"flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black " + (passwordsMatch ? "bg-green-100" : "bg-gray-100")}>
                          {passwordsMatch ? "✓" : "•"}
                        </span>
                        {text("Passwords match", "Passwörter stimmen überein")}
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={isLoading || !allRulesValid || !passwordsMatch} className="mt-7 flex w-full items-center justify-center rounded-2xl bg-[#0b3a78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0b3a78]/20 transition hover:-translate-y-0.5 hover:bg-[#082d5d] disabled:cursor-not-allowed disabled:opacity-60">
                    {isLoading ? text("Updating password...", "Passwort wird aktualisiert...") : text("Set new password", "Neues Passwort festlegen")}
                  </button>
                </form>
              )}

              {step === "success" && (
                <button type="button" onClick={() => router.push("/login")} className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#0b3a78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0b3a78]/20 transition hover:-translate-y-0.5 hover:bg-[#082d5d]">
                  {text("Continue to login", "Weiter zur Anmeldung")}
                </button>
              )}

              {message && step !== "success" && (
                <div className={"mt-5 rounded-2xl border px-4 py-4 text-sm font-medium leading-6 " + (isError ? "border-red-200 bg-red-50 text-red-700" : "border-[#0b3a78]/10 bg-[#0b3a78]/5 text-[#0b3a78]")}>
                  {message}
                </div>
              )}

              {step !== "success" && (
                <p className="mt-6 text-center text-xs font-semibold text-gray-400">
                  {text("Remember your password?", "Du erinnerst dich an dein Passwort?")}{" "}
                  <Link href="/login" className="text-[#0b3a78] transition hover:text-[#f28c28]">{text("Log in", "Anmelden")}</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
