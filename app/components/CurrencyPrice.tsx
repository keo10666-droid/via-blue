"use client";

import { useCurrency } from "./CurrencyProvider";

export default function CurrencyPrice({ amount, className = "" }: { amount: number; className?: string }) {
  const { formatCurrency } = useCurrency();
  return <span className={className}>{formatCurrency(amount)}</span>;
}
