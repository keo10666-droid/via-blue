"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function hashSecret(value: string) {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}

export async function loginAdmin(
  formData: FormData
) {
  const password = String(
    formData.get("password") || ""
  );

  const expectedPassword =
    process.env.ADMIN_DASHBOARD_PASSWORD;

  if (
    !expectedPassword ||
    password !== expectedPassword
  ) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "via_blue_admin",
    hashSecret(expectedPassword),
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    }
  );

  redirect("/admin/bookings");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete(
    "via_blue_admin"
  );

  redirect("/admin/login");
}
