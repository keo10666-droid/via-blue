import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const tourSlug = String(body.tourSlug || "").trim();
    const tourName = String(body.tourName || "").trim();
    const guestName = String(body.guestName || "").trim();
    const comment = String(body.comment || "").trim();
    const rating = Number(body.rating);

    if (!tourSlug || !tourName || !guestName || !comment) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        tour_slug: tourSlug,
        tour_name: tourName,
        guest_name: guestName,
        rating: rating,
        comment: comment,
        is_visible: true,
      })
      .select()
      .single();

    if (error) {
      console.error("SUPABASE REVIEW ERROR:", error);

      return NextResponse.json(
        {
          error: error.message || "Could not publish your review.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        review: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REVIEW API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}