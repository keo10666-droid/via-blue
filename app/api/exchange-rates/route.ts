import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
  try {
    const response = await fetch("https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD,GBP", {
      next: { revalidate: 86400 },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Exchange-rate provider returned an error");
    const data = await response.json();
    const usd = Number(data?.rates?.USD);
    const gbp = Number(data?.rates?.GBP);
    if (!Number.isFinite(usd) || usd <= 0 || !Number.isFinite(gbp) || gbp <= 0) {
      throw new Error("Exchange-rate response was invalid");
    }
    return NextResponse.json(
      { base: "EUR", rates: { EUR: 1, USD: usd, GBP: gbp }, date: data.date },
      { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" } },
    );
  } catch (error) {
    console.error("Exchange rates could not be refreshed:", error);
    return NextResponse.json({ error: "Exchange rates are temporarily unavailable." }, { status: 503 });
  }
}
