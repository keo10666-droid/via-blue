import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isRateLimited } from "@/lib/apiRateLimit";
import { getTourBySlug } from "@/data/tours";

export async function POST(request: Request) {
  try {
    if (await isRateLimited(request, "review-submit", 5, 3600)) {
      return NextResponse.json(
        { error: "Too many review attempts. Please try again later." },
        { status: 429 },
      );
    }
    const contentType = request.headers.get("content-type") || "";
    if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
      return NextResponse.json(
        { error: "Invalid review request format." },
        { status: 415 },
      );
    }

    const maxBodyBytes = 12 * 1024;
    const contentLength = Number(
      request.headers.get("content-length") || 0,
    );

    if (contentLength > maxBodyBytes) {
      return NextResponse.json(
        { error: "Review request is too large." },
        { status: 413 },
      );
    }

    if (!request.body) {
      return NextResponse.json(
        { error: "Invalid review request." },
        { status: 400 },
      );
    }

    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxBodyBytes) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Review request is too large." },
          { status: 413 },
        );
      }

      chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    let body: Record<string, unknown>;
    try {
      const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return NextResponse.json(
          { error: "Invalid review request." },
          { status: 400 },
        );
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request." },
        { status: 400 },
      );
    }

    const tourSlug =
      typeof body.tourSlug === "string" ? body.tourSlug.trim() : "";
    const guestName =
      typeof body.guestName === "string" ? body.guestName.trim() : "";
    const comment =
      typeof body.comment === "string" ? body.comment.trim() : "";
    const rating = typeof body.rating === "number" ? body.rating : Number.NaN;
    const tour = getTourBySlug(tourSlug);

    if (!tour || !guestName || !comment) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 }
      );
    }

    if (
      tourSlug.length > 120 ||
      guestName.length > 80 ||
      comment.length > 2000
    ) {
      return NextResponse.json(
        { error: "Please shorten your review and try again." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("reviews")
      .insert({
        tour_slug: tourSlug,
        tour_name: tour.name,
        guest_name: guestName,
        rating,
        comment,
        is_visible: false,
      });

    if (error) {
      console.error("Review submission failed in Supabase.");

      return NextResponse.json(
        {
          error: "Could not submit your review. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected review API failure.");

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
