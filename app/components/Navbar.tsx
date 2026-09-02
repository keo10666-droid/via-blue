"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

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
      name: "Home",
      href: "/",
    },
    {
      name: "Tours",
      href: "/tours",
    },
    {
      name: "Transfers",
      href: "/transfers",
    },
    {
      name: "Luxury Tours",
      href: "/luxury-tours",
    },
    {
      name: "AI Trip Planner",
      href: "/ai-trip-planner",
      special: true,
    },
    {
      name: "About Us",
      href: "/about",
    },
    {
      name: "Contact",
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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="group flex shrink-0 items-center"
        >
          <img
            src="/logo/logo.svg"
            alt="Via Blue"
            className="h-[62px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />

          <div className="ml-1 flex flex-col">
            <p className="text-[19px] font-extrabold leading-none tracking-[-0.03em] text-blue-950">
              Via Blue
            </p>

            <p className="ml-6 mt-1 text-[8px] font-bold tracking-[0.34em] text-orange-500">
              TOURS
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">

          {navItems.map((item) => {
            const active = isActive(item.href);

            if (item.special) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative mx-1 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                    active
                      ? "bg-blue-950 text-white shadow-md shadow-blue-950/20"
                      : "text-blue-900 hover:bg-blue-50"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs ${
                      active
                        ? "bg-white/15 text-orange-300"
                        : "bg-orange-50 text-orange-500 group-hover:bg-orange-100"
                    }`}
                  >
                    ✦
                  </span>

                  <span>{item.name}</span>

                  {!active && (
                    <span className="absolute -right-1 -top-1 rounded-full bg-orange-500 px-1.5 py-0.5 text-[7px] font-extrabold uppercase tracking-wide text-white shadow-sm">
                      New
                    </span>
                  )}
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all duration-200 ${
                  active
                    ? "text-blue-950"
                    : "text-slate-600 hover:text-blue-950"
                }`}
              >
                {item.name}

                <span
                  className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 ${
                    active
                      ? "w-5"
                      : "w-0 group-hover:w-5"
                  }`}
                />
              </Link>
            );
          })}

        </nav>

        {/* Desktop Account */}
        <div className="hidden lg:flex items-center">

          {userName ? (
            <div className="flex items-center gap-2">

              <Link
                href="/account"
                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                  pathname.startsWith("/account")
                    ? "bg-blue-50 text-blue-950"
                    : "text-blue-900 hover:bg-blue-50"
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 text-xs font-bold text-white">
                  {userName
                    .charAt(0)
                    .toUpperCase()}
                </span>

                <span className="max-w-[90px] truncate">
                  Hi, {userName.split(" ")[0]}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl px-3 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              >
                Log Out
              </button>

            </div>
          ) : (
            <Link
              href="/login"
              className="group relative ml-3 flex items-center gap-2 overflow-hidden rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/25"
            >
              <span>Log In</span>

              <span className="text-base transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          )}

        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl font-bold text-blue-950 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden">

          <nav className="flex flex-col gap-1">

            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold transition ${
                    active
                      ? "bg-blue-950 text-white shadow-md"
                      : item.special
                      ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-950"
                  }`}
                >
                  <span className="flex items-center gap-3">

                    {item.special && (
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs ${
                          active
                            ? "bg-white/15 text-orange-300"
                            : "bg-white text-orange-500"
                        }`}
                      >
                        ✦
                      </span>
                    )}

                    {item.name}
                  </span>

                  {item.special && !active && (
                    <span className="rounded-full bg-orange-500 px-2 py-1 text-[8px] font-extrabold uppercase tracking-wide text-white">
                      New
                    </span>
                  )}

                  {active && (
                    <span className="text-orange-300">
                      ●
                    </span>
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
                    className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3.5 font-bold text-blue-950 transition hover:bg-blue-100"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">
                      {userName
                        .charAt(0)
                        .toUpperCase()}
                    </span>

                    <span className="truncate">
                      Hi, {userName.split(" ")[0]}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-center font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    Log Out
                  </button>

                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                >
                  <span>Log In</span>
                  <span>→</span>
                </Link>
              )}

            </div>

          </nav>

        </div>
      )}

    </header>
  );
}