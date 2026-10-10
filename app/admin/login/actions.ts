"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { isIdentifierRateLimited } from "@/lib/apiRateLimit";
import { redirect } from "next/navigation";

function hashSecret(value: string) {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}

export async function loginAdmin(
  formData: FormData
) {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ip =
    requestHeaders.get("x-real-ip")?.trim() ||
    forwardedFor?.split(",").at(-1)?.trim() ||
    "unknown";

  if (await isIdentifierRateLimited(ip, "admin-login", 5, 900)) {
    redirect("/admin/login?error=1");
  }

  const password = String(
    formData.get("password") || ""
  );

  if (password.length > 256) {
    redirect("/admin/login?error=1");
  }

  const expectedPassword =
    process.env.ADMIN_DASHBOARD_PASSWORD;

  const passwordBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expectedPassword || "");
  const passwordMatches =
    Boolean(expectedPassword) &&
    passwordBuffer.length === expectedBuffer.length &&
    timingSafeEqual(passwordBuffer, expectedBuffer);

  if (!passwordMatches) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "via_blue_admin",
    hashSecret(expectedPassword || ""),
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    }
  );

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete(
    "via_blue_admin"
  );

  redirect("/admin/login");
}
