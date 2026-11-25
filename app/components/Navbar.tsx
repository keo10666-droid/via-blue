"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Crown, Home, Compass, CarFront, MessageCircle, UserRound, Moon, Sun, ChevronDown, Check } from "lucide-react";
import { useCurrency, type CurrencyCode } from "@/app/components/CurrencyProvider";
import { useSiteLocale } from "./LocaleProvider";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { currency, setCurrency, rates } = useCurrency();
  const { locale: siteLocale, setLocale } = useSiteLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "de" | "fr" | "ro" | "ru">(siteLocale);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setLanguage(siteLocale);
    document.documentElement.lang = siteLocale;
  }, [siteLocale]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    try { window.localStorage.setItem("via-blue-theme", nextTheme); } catch { /* Current-page toggle remains available. */ }
  }

  function changeLanguage(nextLanguage: "en" | "de" | "fr" | "ro" | "ru") {
    setLocale(nextLanguage);
    setLanguage(nextLanguage);
    setLanguageMenuOpen(false);
    const cleanPath = pathname.replace(/^\/(de|fr|ro|ru)(?=\/|$)/, "") || "/";
    const nextPath = nextLanguage === "en" ? cleanPath : `/${nextLanguage}${cleanPath === "/" ? "" : cleanPath}`;
    router.push(nextPath);
  }

  function localizedHref(href: string) {
    return language === "en" ? href : `/${language}${href === "/" ? "" : href}`;
  }

  const languageOptions = [
    { value: "en" as const, label: "English", flag: "🇬🇧" },
    { value: "de" as const, label: "Deutsch", flag: "🇩🇪" },
    { value: "fr" as const, label: "Français", flag: "🇫🇷" },
    { value: "ro" as const, label: "Română", flag: "🇷🇴" },
    { value: "ru" as const, label: "Русский", flag: "🇷🇺" },
  ];

  const labels = language === "ru"
    ? { Home: "Главная", Tours: "Экскурсии", Transfers: "Трансферы", "Luxury Tours": "VIP-туры", "AI Trip Planner": "AI-планировщик", "About Us": "О нас", Contact: "Контакты", Register: "Регистрация", "Log In": "Войти", "Log Out": "Выйти", New: "Новинка", Greeting: "Здравствуйте,", "Toggle menu": "Открыть меню", "Dark mode": "Включить тёмную тему", "Light mode": "Включить светлую тему" }
    : language === "ro"
    ? { Home: "Acasă", Tours: "Excursii", Transfers: "Transferuri", "Luxury Tours": "VIP", "AI Trip Planner": "Planificator AI", "About Us": "Despre noi", Contact: "Contact", Register: "Înregistrare", "Log In": "Autentificare", "Log Out": "Deconectare", New: "Nou", Greeting: "Salut,", "Toggle menu": "Deschide meniul", "Dark mode": "Activează modul întunecat", "Light mode": "Activează modul luminos" }
    : language === "fr"
    ? {
        Home: "Accueil",
        Tours: "Excursions",
        Transfers: "Transferts",
        "Luxury Tours": "VIP",
        "AI Trip Planner": "Planifier",
        "About Us": "À propos",
        Contact: "Contact",
        Register: "Inscription",
        "Log In": "Connexion",
        "Log Out": "Déconnexion",
        New: "Nouveau",
        Greeting: "Bonjour,",
        "Toggle menu": "Ouvrir le menu",
        "Dark mode": "Activer le mode sombre",
        "Light mode": "Activer le mode clair",
      }
    : language === "de"
    ? {
        Home: "Start",
        Tours: "Ausflüge",
        Transfers: "Transfers",
        "Luxury Tours": "Luxus",
        "AI Trip Planner": "Reiseplaner",
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
    const syncUserFromStorage = () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl) {
          setUserName(null);
          return;
        }

        const projectRef = new URL(supabaseUrl).hostname.split(".")[0];
        const storedSession = window.localStorage.getItem(`sb-${projectRef}-auth-token`);
        const session = storedSession ? JSON.parse(storedSession) : null;
        const user = session?.user;

        setUserName(
          user?.user_metadata?.full_name ||
            user?.email ||
            null
        );
      } catch {
        setUserName(null);
      }
    };

    syncUserFromStorage();
    window.addEventListener("storage", syncUserFromStorage);
    window.addEventListener("focus", syncUserFromStorage);

    return () => {
      window.removeEventListener("storage", syncUserFromStorage);
      window.removeEventListener("focus", syncUserFromStorage);
    };
  }, [pathname]);

  async function handleLogout() {
    const { supabase } = await import("@/lib/supabase");
    await supabase.auth.signOut();

    setUserName(null);
    setIsOpen(false);

    router.push("/");
    router.refresh();
  }

  const navItems = [
    {
      name: labels.Home,
      href: localizedHref("/"),
    },
    {
      name: labels.Tours,
      href: localizedHref("/tours"),
    },
    {
      name: labels.Transfers,
      href: localizedHref("/transfers"),
    },
    {
      name: labels["Luxury Tours"],
      href: localizedHref("/luxury-tours"),
      premium: true,
    },
    {
      name: labels["AI Trip Planner"],
      href: localizedHref("/ai-trip-planner"),
      special: true,
    },
    {
      name: labels["About Us"],
      href: localizedHref("/about"),
    },
    {
      name: labels.Contact,
      href: localizedHref("/contact"),
    },
  ];

  function isActive(href: string) {
    const cleanPath = pathname.replace(/^\/(de|fr|ro|ru)(?=\/|$)/, "") || "/";
    const cleanHref = href.replace(/^\/(de|fr|ro|ru)(?=\/|$)/, "") || "/";
    return cleanPath === cleanHref || cleanPath.startsWith(`${cleanHref}/`);
  }

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/65 shadow-[0_8px_35px_rgba(15,23,42,0.08)] backdrop-blur-2xl">

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />

      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[82px] sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href={localizedHref("/")}
          onClick={() => setIsOpen(false)}
          className="group relative flex shrink-0 items-center"
        >
          <div className="relative flex items-center">

            <div className="absolute -inset-3 rounded-2xl bg-orange-500/0 blur-xl transition-all duration-500 group-hover:bg-orange-500/10" />

            <img
              src="/logo/logo.svg"
              alt="Via Blue"
              width={58}
              height={58}
              className="relative h-[46px] w-auto object-contain transition-all duration-500 group-hover:scale-[1.035] sm:h-[58px]"
            />

            <div className="ml-1.5 hidden flex-col justify-center xl:flex">

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
        <nav className="hidden min-w-0 items-center gap-0 lg:flex">

          {navItems.map((item) => {
            const active = isActive(item.href);

            if (item.special) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative mx-0.5 flex shrink-0 items-center gap-1.5 whitespace-nowrap overflow-hidden rounded-xl border px-2.5 py-2 text-[11px] font-bold tracking-[-0.01em] transition-all duration-300 xl:gap-2 xl:px-3 xl:text-xs ${
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
                className={`group relative mx-0.5 shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2.5 text-[11px] font-bold tracking-[-0.01em] transition-all duration-300 xl:px-3 xl:text-xs ${
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
          aria-label={language === "de" ? "Währung auswählen" : language === "fr" ? "Choisir la devise" : language === "ro" ? "Alege moneda" : language === "ru" ? "Выберите валюту" : "Select currency"}
          value={currency}
          onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
          className="ml-1.5 hidden h-9 shrink-0 rounded-lg border border-slate-200 bg-white px-1.5 text-[10px] font-bold text-blue-950 outline-none transition hover:border-orange-300 lg:inline-flex xl:ml-2 xl:px-2 xl:text-xs"
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
          className="ml-1.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-950 transition hover:border-orange-300 hover:bg-orange-50 lg:inline-flex xl:ml-2"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative ml-1.5 hidden shrink-0 lg:block xl:ml-2" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setLanguageMenuOpen(false); }}>
          <button
            type="button"
            onClick={() => setLanguageMenuOpen((open) => !open)}
            aria-label={language === "de" ? "Sprache auswählen" : language === "fr" ? "Choisir la langue" : language === "ro" ? "Alege limba" : language === "ru" ? "Выберите язык" : "Choose language"}
            aria-haspopup="menu"
            aria-expanded={languageMenuOpen}
            className={`group inline-flex h-10 items-center gap-2 rounded-full border px-3 text-[11px] font-bold transition-all duration-200 ${languageMenuOpen ? "border-blue-950 bg-blue-950 text-white shadow-lg shadow-blue-950/15" : "border-slate-200/90 bg-white/90 text-slate-700 hover:border-blue-200 hover:bg-blue-50/70"}`}
          >
            <span className="text-base leading-none" aria-hidden="true">{languageOptions.find((option) => option.value === language)?.flag}</span>
            <span>{language.toUpperCase()}</span>
            <ChevronDown size={13} className={`transition-transform duration-200 ${languageMenuOpen ? "rotate-180" : ""}`} />
          </button>
          {languageMenuOpen && (
            <div role="menu" aria-label="Choose language" className="absolute right-0 top-full z-[100] mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_18px_55px_rgba(3,17,42,0.18)] ring-1 ring-black/[0.03]">
              <div className="px-3 pb-2 pt-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{language === "ro" ? "Limba site-ului" : language === "fr" ? "Langue du site" : language === "ru" ? "Язык сайта" : "Website language"}</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-700">{language === "ro" ? "Alege limba preferată" : language === "fr" ? "Choisissez votre langue préférée" : "Choose your preferred language"}</p>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="mt-1 space-y-1">
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="menuitem"
                    onClick={() => changeLanguage(option.value)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${language === option.value ? "bg-blue-50 text-blue-950" : "text-slate-600 hover:bg-slate-50 hover:text-blue-950"}`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-lg leading-none" aria-hidden="true">{option.flag}</span>
                    <span className="flex-1 text-sm font-semibold">{option.label}</span>
                    {language === option.value && <Check size={16} className="text-orange-500" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Account */}
        <div className="ml-1.5 hidden shrink-0 items-center lg:flex xl:ml-2">

          {userName ? (
            <div className="flex items-center gap-2">

              <Link
                href="/account"
                className={`group flex items-center gap-2 rounded-xl border px-2 py-1.5 transition-all duration-300 ${
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
              <Link href="/login?mode=register" className="whitespace-nowrap rounded-xl border border-blue-950/15 bg-white px-2.5 py-2 text-[11px] font-bold text-blue-950 transition-all duration-300 hover:border-blue-950 hover:bg-blue-50 xl:px-3 xl:text-xs">
                {labels.Register}
              </Link>
              <Link href="/login" className="group relative flex items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-2 text-[11px] font-bold text-white shadow-[0_8px_25px_rgba(249,115,22,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-500 hover:shadow-[0_12px_30px_rgba(249,115,22,0.28)] xl:px-3.5 xl:text-xs">
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

            <div className="relative mb-2 self-start" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setLanguageMenuOpen(false); }}>
              <button
                type="button"
                onClick={() => setLanguageMenuOpen((open) => !open)}
                aria-label="Choose language"
                aria-haspopup="menu"
                aria-expanded={languageMenuOpen}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${languageMenuOpen ? "border-blue-950 bg-blue-950 text-white" : "border-slate-200 bg-white text-blue-950 hover:border-blue-200"}`}
              >
                <span className="text-lg leading-none" aria-hidden="true">{languageOptions.find((option) => option.value === language)?.flag}</span>
                <span>{languageOptions.find((option) => option.value === language)?.label}</span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${languageMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {languageMenuOpen && (
                <div role="menu" aria-label="Choose language" className="absolute left-0 top-full z-[100] mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_18px_45px_rgba(3,17,42,0.16)]">
                  <p className="px-3 pb-2 pt-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{language === "ro" ? "Selectează limba" : language === "fr" ? "Choisir la langue" : "Select language"}</p>
                  {languageOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="menuitem"
                      onClick={() => changeLanguage(option.value)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${language === option.value ? "bg-blue-50 text-blue-950" : "text-slate-600 hover:bg-slate-50 hover:text-blue-950"}`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-lg leading-none" aria-hidden="true">{option.flag}</span>
                      <span className="flex-1 text-sm font-semibold">{option.label}</span>
                      {language === option.value && <Check size={16} className="text-orange-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
        aria-label={language === "de" ? "Mobile Schnellnavigation" : language === "fr" ? "Navigation rapide mobile" : language === "ro" ? "Navigare rapidă pe mobil" : language === "ru" ? "Быстрая навигация" : "Mobile quick navigation"}
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200/80 bg-white/95 px-1 pb-[max(env(safe-area-inset-bottom),0.35rem)] pt-2 shadow-[0_-8px_30px_rgba(3,17,42,0.10)] backdrop-blur-2xl lg:hidden"
      >
        {[
          { href: "/", label: language === "ro" ? "Acasă" : language === "fr" ? "Accueil" : language === "de" ? "Startseite" : language === "ru" ? "Главная" : "Home", Icon: Home },
          { href: "/tours", label: language === "ro" ? "Excursii" : language === "fr" ? "Excursions" : language === "de" ? "Ausflüge" : language === "ru" ? "Экскурсии" : "Tours", Icon: Compass },
          { href: "/transfers", label: language === "ro" ? "Transferuri" : language === "fr" ? "Transferts" : language === "de" ? "Transfer" : language === "ru" ? "Трансфер" : "Transfer", Icon: CarFront },
          { href: "/contact", label: language === "ro" ? "Contact" : language === "fr" ? "Contact" : language === "de" ? "Kontakt" : language === "ru" ? "Контакты" : "Contact", Icon: MessageCircle },
          { href: userName ? "/account" : "/login", label: userName ? (language === "ro" ? "Cont" : language === "fr" ? "Compte" : language === "de" ? "Konto" : language === "ru" ? "Аккаунт" : "Account") : (language === "ro" ? "Autentificare" : language === "fr" ? "Connexion" : language === "ru" ? "Войти" : "Login"), Icon: UserRound },
        ].map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href === "/account" || href === "/login" ? href : localizedHref(href)}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold transition-colors ${active ? "text-orange-700" : "text-slate-600 hover:text-blue-950"}`}
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