"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CurrencyCode = "EUR" | "USD" | "GBP";
type Rates = Record<CurrencyCode, number>;
type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  rates: Rates;
  ratesDate: string | null;
  formatCurrency: (amountInEur: number) => string;
  convertFromEur: (amountInEur: number) => number;
  rate: number;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);
const DEFAULT_RATES: Rates = { EUR: 1, USD: 0, GBP: 0 };
const STORAGE_KEY = "via-blue-currency";
const RATES_STORAGE_KEY = "via-blue-fx-rates";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("EUR");
  const [rates, setRates] = useState<Rates>(DEFAULT_RATES);
  const [ratesDate, setRatesDate] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedCurrency = localStorage.getItem(STORAGE_KEY);
      if (savedCurrency === "EUR" || savedCurrency === "USD" || savedCurrency === "GBP") setCurrencyState(savedCurrency);
      const savedRates = localStorage.getItem(RATES_STORAGE_KEY);
      if (savedRates) {
        const parsed = JSON.parse(savedRates) as { rates?: Rates; date?: string };
        if (parsed.rates && parsed.rates.USD > 0 && parsed.rates.GBP > 0) {
          setRates(parsed.rates);
          setRatesDate(parsed.date || null);
        }
      }
    } catch {
      // Keep the default currency and fetch fresh rates below.
    }

    let active = true;
    fetch("/api/exchange-rates")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Exchange rates unavailable")))
      .then((data: { rates?: Rates; date?: string }) => {
        if (!active || !data.rates || !(data.rates.USD > 0) || !(data.rates.GBP > 0)) return;
        setRates({ EUR: 1, USD: data.rates.USD, GBP: data.rates.GBP });
        setRatesDate(data.date || null);
        try { localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify({ rates: data.rates, date: data.date })); } catch { /* Cache is optional. */ }
      })
      .catch(() => {
        // Previously cached rates remain available if the rate service is temporarily down.
      });
    return () => { active = false; };
  }, []);

  const setCurrency = useCallback((nextCurrency: CurrencyCode) => {
    setCurrencyState(nextCurrency);
    try { localStorage.setItem(STORAGE_KEY, nextCurrency); } catch { /* Current-session selection still works. */ }
  }, []);

  const rate = rates[currency] || 0;
  const convertFromEur = useCallback((amountInEur: number) => {
    const currentRate = rates[currency];
    return currency === "EUR" ? amountInEur : currentRate > 0 ? amountInEur * currentRate : amountInEur;
  }, [currency, rates]);

  const formatCurrency = useCallback((amountInEur: number) => {
    const currentRate = rates[currency];
    const value = currency === "EUR" ? amountInEur : currentRate > 0 ? amountInEur * currentRate : amountInEur;
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency === "EUR" || currentRate > 0 ? currency : "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  }, [currency, rates]);

  const value = useMemo(() => ({ currency, setCurrency, rates, ratesDate, formatCurrency, convertFromEur, rate }), [currency, setCurrency, rates, ratesDate, formatCurrency, convertFromEur, rate]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
