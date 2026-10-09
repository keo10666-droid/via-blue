"import { supabase } from "@/lib/supabase";

export async function isRateLimited(
  request: Request,
  scope: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    request.headers.get("x-real-ip")?.trim() ||
    forwardedFor?.split(",").at(-1)?.trim() ||
    "unknown";

  const { data, error } = await supabase.rpc(
    "consume_api_rate_limit",
    {
      p_identifier: `${scope}:${ip}`,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    },
  );

  if (error) {
    console.error("Rate-limit check failed:", error.code);
    return true;
  }

  return data !== true;
}
