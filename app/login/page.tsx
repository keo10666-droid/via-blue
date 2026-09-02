"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
const router = useRouter();

const [isSignUp, setIsSignUp] = useState(false);
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [isLoading, setIsLoading] = useState(false);

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
    setMessage(error.message);
  } else {
    setMessage(
      "Account created. Please check your email to confirm your account."
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
  setMessage(error.message);
} else {
  setMessage("A new confirmation email has been sent.");
}

setIsLoading(false);

}

return (
<main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
<div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl">
<div className="bg-blue-900 px-8 py-10 text-center text-white">
<p className="font-bold uppercase tracking-[0.25em] text-orange-400">
Hurghada Tours
</p>

      <h1 className="mt-3 text-3xl font-bold">
        {isSignUp ? "Create Your Account" : "Welcome Back"}
      </h1>

      <p className="mt-3 text-blue-100">
        {isSignUp
          ? "Create an account to manage your bookings."
          : "Log in to manage your bookings."}
      </p>
    </div>

    <form onSubmit={handleSubmit} className="p-8">
      {isSignUp && (
        <div className="mb-5">
          <label className="mb-2 block font-bold text-blue-900">
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
            placeholder="Your full name"
            className="w-full rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition focus:border-blue-500"
          />
        </div>
      )}

      <div className="mb-5">
        <label className="mb-2 block font-bold text-blue-900">
          Email Address
        </label>

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-bold text-blue-900">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          placeholder="At least 6 characters"
          className="w-full rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition focus:border-blue-500"
        />
      </div>

      {message && (
        <p className="mt-5 rounded-xl bg-blue-50 p-4 text-sm font-medium text-blue-900">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full rounded-xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading
          ? "Please wait..."
          : isSignUp
            ? "Create Account"
            : "Log In"}
      </button>

      {!isSignUp && (
        <button
          type="button"
          onClick={handleResendConfirmation}
          disabled={isLoading}
          className="mt-4 w-full text-center text-sm font-bold text-blue-900 transition hover:text-orange-500 disabled:opacity-60"
        >
          Resend confirmation email
        </button>
      )}

      <button
        type="button"
        onClick={() => {
          setIsSignUp((current) => !current);
          setMessage("");
        }}
        className="mt-5 w-full text-center font-bold text-blue-900 transition hover:text-orange-500"
      >
        {isSignUp
          ? "Already have an account? Log in"
          : "New here? Create an account"}
      </button>

      <Link
        href="/"
        className="mt-5 block text-center text-sm font-medium text-gray-500 hover:text-blue-900"
      >
        ← Back to home
      </Link>
    </form>
  </div>
</main>

);
}