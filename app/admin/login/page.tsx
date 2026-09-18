import { loginAdmin } from "./actions";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;

  const configured =
    Boolean(
      process.env.ADMIN_DASHBOARD_PASSWORD
    );

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-md items-center justify-center">
        <div className="w-full overflow-hidden rounded-[32px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-7 py-9 text-white sm:px-9 sm:py-10">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-sm font-extrabold tracking-wide shadow-lg shadow-orange-950/20">
                VB
              </div>

              <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[0.28em] text-orange-300">
                Via Blue
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
                Booking Dashboard
              </h1>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Secure access for Via Blue booking management
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {params.error ? (
              <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                Incorrect admin password
              </div>
            ) : null}

            {!configured ? (
              <div className="mb-5 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-4 text-sm leading-6 text-orange-800">
                Admin dashboard password is not configured yet
              </div>
            ) : null}

            <form
              action={loginAdmin}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="password"
                  className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500"
                >
                  Admin Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-blue-950 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  placeholder="Enter your admin password"
                />
              </div>

              <button
                type="submit"
                disabled={!configured}
                className="w-full rounded-2xl bg-orange-500 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Open Dashboard
              </button>
            </form>

            <p className="mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Via Blue · Tours & Transfers in Egypt
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
