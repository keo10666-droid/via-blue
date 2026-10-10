import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

export async function isIdentifierRateLimited(
  identifier: string,
  scope: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const admin = createSupabaseAdminClient();

  // Fail closed if the private server-side key is not configured.
  if (!admin) {
    console.error("Rate-limit check failed: admin client unavailable");
    return true;
  }

  const { data, error } = await admin.rpc(
    "consume_api_rate_limit",
    {
      p_identifier: `${scope}:${identifier}`,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    },
  );

  if (error) {
    console.error("Rate-limit check failed: database request unsuccessful.");
    return true;
  }

  return data !== true;
}

export async function isRateLimited(
  request: Request,
  scope: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  // Only trust the platform-provided client IP header. X-Forwarded-For can
  // contain client-controlled values and must not be used as a rate-limit key.
  const ip = request.headers.get("x-real-ip")?.trim() || "unknown";

  return isIdentifierRateLimited(ip, scope, limit, windowSeconds);
}
