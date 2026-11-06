"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Crown, Home, Compass, CarFront, MessageCircle, UserRound, Moon, Sun } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCurrency, type CurrencyCode } from "@/app/components/CurrencyProvider";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { currency, setCurrency, rates } = useCurrency();

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "de">("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    try {
      const savedLanguage = window.localStorage.getItem("via-blue-language");
      if (savedLanguage === "de" || savedLanguage === "en") {
        setLanguage(savedLanguage);
        document.documentElement.lang = savedLanguage;
      }
    } catch {
      // Keep English as the safe default if browser storage is unavailable.
    }
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    try { window.localStorage.setItem("via-blue-theme", nextTheme); } catch { /* Current-page toggle remains available. */ }
  }

  function toggleLanguage() {
    const nextLanguage = language === "en" ? "de" : "en";
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    try {
      window.localStorage.setItem("via-blue-language", nextLanguage);
    } catch {
      // The language switch still works for the current page if storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent("via-blue-language-change", { detail: nextLanguage }));
  }

  const labels = language === "de"
    ? {
        Home: "Startseite",
        Tours: "Ausflüge",
        Transfers: "Transfers",
        "Luxury Tours": "Luxus-Ausflüge",
        "AI Trip Planner": "KI-Reiseplaner",
        "About Us": "Über uns",
        Contact: "Kontakt",
        Register: "Registrieren",
        "Log In": "Anmelden",
        "Log Out": "Abmelden",
        New: "Neu",
        Greeting: "Hallo,",
        "Toggle menu": "Menü öffnen",
        "Dark mode": "Dunkelmodus aktivieren",
        "Light mode": "Hellmodus aktivieren",
      }
    : {
        Home: "Home",
        Tours: "Tours",
        Transfers: "Transfers",
        "Luxury Tours": "Luxury Tours",
        "AI Trip Planner": "AI Trip Planner",
        "About Us": "About Us",
        Contact: "Contact",
        Register: "Register",
        "Log In": "Log In",
        "Log Out": "Log Out",
        New: "New",
        Greeting: "Hi,",
        "Toggle menu": "Toggle menu",
        "Dark mode": "Enable dark mode",
        "Light mode": "Enable light mode",
      };

  // Keep the page behind the mobile menu fixed while the menu is open.
  // The menu itself remains independently scrollable on shorter screens.
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.left = previousStyles.left;
      body.style.right = previousStyles.right;
      body.style.width = previousStyles.width;
      body.style.overflow = previousStyles.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserName(
        user?.user_metadata?.full_name ||
          user?.email ||
          null
      );
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserName(
          session?.user.user_metadata?.full_name ||
            session?.user.email ||
            null
        );
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    setUserName(null);
    setIsOpen(false);

    router.push("/");
    router.refresh();
  }

  const navItems = [
    {
      name: labels.Home,
      href: "/",
    },
    {
      name: labels.Tours,
      href: "/tours",
    },
    {
      name: labels.Transfers,
      href: "/transfers",
    },
    {
      name: labels["Luxury Tours"],
      href: "/luxury-tours",
      premium: true,
    },
    {
      name: labels["AI Trip Planner"],
      href: "/ai-trip-planner",
      special: true,
    },
    {
      name: labels["About Us"],
      href: "/about",
    },
    {
      name: labels.Contact,
      href: "/contact",
    },
  ];

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/65 shadow-[0_8px_35px_rgba(15,23,42,0.08)] backdrop-blur-2xl">

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />

      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[82px] sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="group relative flex shrink-0 items-center"
        >
          <div className="relative flex items-center">

            <div className="absolute -inset-3 rounded-2xl bg-orange-500/0 blur-xl transition-all duration-500 group-hover:bg-orange-500/10" />

            <img
              src="/logo/logo.svg"
              alt="Via Blue"
              className="relative h-[46px] w-auto object-contain transition-all duration-500 group-hover:scale-[1.035] sm:h-[58px]"
            />

            <div className="ml-1.5 hidden flex-col justify-center sm:flex">

              <div className="relative">
                <p className="bg-gradient-to-r from-[#03112a] via-[#082d62] to-[#03112a] bg-clip-text text-[21px] font-black leading-[0.95] tracking-[-0.055em] text-transparent">
                  Via Blue
                </p>

                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="h-px w-5 bg-orange-400" />

                  <p className="text-[8px] font-extrabold uppercase tracking-[0.38em] text-orange-500">
                    Tours
                  </p>
                </div>
              </div>

            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex">

          {navItems.map((item) => {
            const active = isActive(item.href);

            if (item.special) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative mx-1 flex items-center gap-2.5 overflow-hidden rounded-2xl border px-4 py-2.5 text-[13px] font-extrabold tracking-[-0.015em] transition-all duration-300 ${
                    active
                      ? "border-blue-950 bg-blue-950 text-white shadow-[0_8px_24px_rgba(3,17,42,0.22)]"
                      : "border-orange-100/80 bg-gradient-to-r from-orange-50/80 to-white text-blue-950 shadow-sm hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs transition-all duration-300 ${
                      active
                        ? "bg-white/10 text-orange-300"
                        : "bg-orange-100 text-orange-500 group-hover:rotate-12 group-hover:bg-orange-200"
                    }`}
                  >
                    ✦
                  </span>

                  <span>{item.name}</span>

                  {!active && (
                    <span className="absolute right-1 top-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-1.5 py-0.5 text-[6px] font-black uppercase tracking-[0.08em] text-white shadow-sm">
                      {labels.New}
                    </span>
                  )}
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative mx-0.5 rounded-2xl px-3.5 py-3 text-[13px] font-extrabold tracking-[-0.015em] transition-all duration-300 ${
                  active
                    ? "bg-slate-50 text-blue-950 shadow-sm"
                    : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-blue-950"
                }`}
              >
                <span className="relative inline-flex items-center gap-1.5">

                  {item.premium && (
                    <Crown
                      size={13}
                      strokeWidth={2.5}
                      className={`-mr-0.5 transition-all duration-300 ${
                        active
                          ? "text-orange-500"
                          : "text-orange-400 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg] group-hover:text-orange-500"
                      }`}
                    />
                  )}

                  <span>{item.name}</span>
                </span>

                <span
                  className={`absolute bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-300 ${
                    active
                      ? "w-6 opacity-100"
                      : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}

        </nav>

        <select
          aria-label="Select currency"
          value={currency}
          onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
          className="ml-2 hidden h-10 rounded-xl border border-slate-200 bg-white px-2 text-xs font-extrabold text-blue-950 outline-none transition hover:border-orange-300 lg:inline-flex"
        >
          <option value="EUR">EUR €</option>
          <option value="USD" disabled={rates.USD <= 0}>USD $</option>
          <option value="GBP" disabled={rates.GBP <= 0}>GBP £</option>
        </select>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? labels["Light mode"] : labels["Dark mode"]}
          aria-pressed={theme === "dark"}
          title={theme === "dark" ? labels["Light mode"] : labels["Dark mode"]}
          className="ml-2 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-950 transition hover:border-orange-300 hover:bg-orange-50 lg:inline-flex"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={language === "en" ? "Switch to German" : "Auf Englisch wechseln"}
          className="hidden shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-blue-950 transition hover:border-orange-300 hover:bg-orange-50 lg:inline-flex"
        >
          {language === "en" ? "DE" : "EN"}
        </button>

        {/* Desktop Account */}
        <div className="hidden items-center lg:flex">

          {userName ? (
            <div className="flex items-center gap-2">

              <Link
                href="/account"
                className={`group flex items-center gap-2.5 rounded-2xl border px-3 py-2 transition-all duration-300 ${
                  pathname.startsWith("/account")
                    ? "border-blue-100 bg-blue-50 text-blue-950"
                    : "border-transparent text-blue-900 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-950 to-blue-800 text-xs font-black text-white shadow-md shadow-blue-950/15 transition-transform duration-300 group-hover:scale-105">
                  {userName
                    .charAt(0)
                    .toUpperCase()}
                </span>

                <span className="max-w-[90px] truncate text-[13px] font-extrabold">
                  {labels.Greeting} {userName.split(" ")[0]}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl px-3 py-2.5 text-[13px] font-bold text-slate-500 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
              >
                {labels["Log Out"]}
              </button>

            </div>
          ) : (
            <div className="ml-3 flex items-center gap-2">
              <Link href="/login?mode=register" className="rounded-2xl border border-blue-950/15 bg-white px-4 py-3 text-[13px] font-black text-blue-950 transition-all duration-300 hover:border-blue-950 hover:bg-blue-50">
                {labels.Register}
              </Link>
              <Link href="/login" className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-[13px] font-black text-white shadow-[0_8px_25px_rgba(249,115,22,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-500 hover:shadow-[0_12px_30px_rgba(249,115,22,0.28)]">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{labels["Log In"]}</span>
                <span className="relative text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}

        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? labels["Light mode"] : labels["Dark mode"]}
          aria-pressed={theme === "dark"}
          className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-blue-950 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 lg:hidden"
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-lg font-bold shadow-sm transition-all duration-300 lg:hidden ${
            isOpen
              ? "border-blue-950 bg-blue-950 text-white shadow-blue-950/20"
              : "border-slate-200 bg-white text-blue-950 hover:border-orange-200 hover:bg-orange-50"
          }`}
          aria-label={labels["Toggle menu"]}
          aria-expanded={isOpen}
        >
          {isOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="max-h-[calc(100dvh-68px)] overflow-y-auto overscroll-contain touch-pan-y border-t border-slate-100 bg-white/95 px-4 pb-5 pt-3 shadow-[0_18px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:hidden">

          <nav className="flex flex-col gap-1.5">
            <div className="mb-2 grid grid-cols-3 gap-2" role="group" aria-label="Select currency">
              {(["EUR", "USD", "GBP"] as CurrencyCode[]).map((item) => {
                const disabled = item !== "EUR" && rates[item] <= 0;
                const active = currency === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCurrency(item)}
                    disabled={disabled}
                    aria-pressed={active}
                    className={`flex h-11 items-center justify-center rounded-xl border text-sm font-black transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                      active
                        ? "border-orange-500 bg-orange-500 text-white shadow-sm"
                        : "border-slate-200 bg-white text-blue-950 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    {item === "EUR" ? "EUR €" : item === "USD" ? "USD $" : "GBP £"}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === "dark"}
              className="mb-2 flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-blue-950 transition hover:border-orange-300 hover:bg-orange-50"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              {theme === "dark" ? labels["Light mode"] : labels["Dark mode"]}
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className="mb-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-blue-950 transition hover:border-orange-300 hover:bg-orange-50"
            >
              {language === "en" ? "Deutsch" : "English"}
            </button>

            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-sm font-extrabold transition-all duration-300 ${
                    active
                      ? "border-blue-950 bg-blue-950 text-white shadow-lg shadow-blue-950/15"
                      : item.special
                      ? "border-orange-100 bg-gradient-to-r from-orange-50 to-white text-orange-600 hover:border-orange-200 hover:bg-orange-50"
                      : "border-transparent text-slate-700 hover:border-slate-100 hover:bg-slate-50 hover:text-blue-950"
                  }`}
                >
                  <span className="flex items-center gap-3">

                    {item.special && (
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs ${
                          active
                            ? "bg-white/10 text-orange-300"
                            : "bg-orange-100 text-orange-500"
                        }`}
                      >
                        ✦
                      </span>
                    )}

                    <span className="flex items-center gap-1.5">

                      {item.premium && (
                        <Crown
                          size={14}
                          strokeWidth={2.5}
                          className={`transition-all duration-300 ${
                            active
                              ? "text-orange-300"
                              : "text-orange-500"
                          }`}
                        />
                      )}

                      {item.name}
                    </span>
                  </span>

                  {item.special && !active && (
                    <span className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-2 py-1 text-[7px] font-black uppercase tracking-[0.08em] text-white shadow-sm">
                      {labels.New}
                    </span>
                  )}

                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
                  )}
                </Link>
              );
            })}

            {/* Mobile Account */}
            <div className="mt-3 border-t border-slate-100 pt-3">

              {userName ? (
                <div className="space-y-2">

                  <Link
                    href="/account"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3.5 font-extrabold text-blue-950 transition-all duration-300 hover:bg-blue-100"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-950 text-sm font-black text-white shadow-md">
                      {userName
                        .charAt(0)
                        .toUpperCase()}
                    </span>

                    <span className="truncate">
                      {labels.Greeting} {userName.split(" ")[0]}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-center font-extrabold text-slate-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    {labels["Log Out"]}
                  </button>

                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login?mode=register" onClick={() => setIsOpen(false)} className="flex items-center justify-center rounded-2xl border border-blue-950/15 bg-white px-4 py-3.5 text-sm font-black text-blue-950 transition-all duration-300 hover:border-blue-950 hover:bg-blue-50">
                    {labels.Register}
                  </Link>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3.5 font-black text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:from-orange-600 hover:to-amber-500">
                    <span>{labels["Log In"]}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              )}

            </div>

          </nav>

        </div>
      )}

    </header>

    {!pathname.startsWith("/admin") && (
      <nav
        aria-label="Mobile quick navigation"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200/80 bg-white/95 px-1 pb-[max(env(safe-area-inset-bottom),0.35rem)] pt-2 shadow-[0_-8px_30px_rgba(3,17,42,0.10)] backdrop-blur-2xl lg:hidden"
      >
        {[
          { href: "/", label: "Home", Icon: Home },
          { href: "/tours", label: language === "de" ? "Ausflüge" : "Tours", Icon: Compass },
          { href: "/transfers", label: "Transfer", Icon: CarFront },
          { href: "/contact", label: language === "de" ? "Kontakt" : "Contact", Icon: MessageCircle },
          { href: userName ? "/account" : "/login", label: userName ? (language === "de" ? "Konto" : "Account") : "Login", Icon: UserRound },
        ].map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold transition-colors ${active ? "text-orange-600" : "text-slate-500 hover:text-blue-950"}`}
            >
              <Icon size={19} strokeWidth={active ? 2.5 : 2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    )}
    </>
  );
}