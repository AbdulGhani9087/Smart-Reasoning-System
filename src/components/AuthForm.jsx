"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AuthForm({ type = "login" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignup = type === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || (isSignup && !form.name)) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isSignup && form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Auth API did not return JSON. Check your API route files.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      localStorage.setItem("user", JSON.stringify(data.user));

const redirectPath = searchParams.get("redirect") || "/dashboard";
router.push(redirectPath);      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 text-slate-100">
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/5 blur-[150px]" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)] backdrop-blur-xl lg:grid-cols-12">
        <div className="hidden flex-col justify-between border-r border-white/5 bg-gradient-to-b from-indigo-950/40 to-slate-950/80 p-10 text-slate-200 lg:col-span-5 lg:flex">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 transition hover:opacity-90">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-xl text-white shadow-lg shadow-indigo-500/30">
                ⚡
              </span>
              <span className="text-xl font-black tracking-tight text-white">
                PlanWise AI
              </span>
            </Link>

            <div className="mt-20 space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white">
                Turn plan complexity into execution clarity.
              </h1>
              <p className="text-base leading-relaxed text-slate-400">
                Unlock automated risk detection, workload balancing, and multi-agent plan refinements with our AI planner.
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold ring-2 ring-slate-900">
                  A
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-xs font-bold ring-2 ring-slate-900">
                  K
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-xs font-bold ring-2 ring-slate-900">
                  M
                </span>
              </div>
              <span className="text-xs font-medium text-slate-400">
                Smart planning for students, developers, and teams.
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-12 lg:col-span-7">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
            >
              <span>←</span> Back to Home
            </Link>

            <h2 className="mt-8 text-3xl font-black tracking-tight text-white md:text-4xl">
              {isSignup ? "Create your account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {isSignup
                ? "Start planning your projects visually and logically with AI."
                : "Log in to resume where you left off."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {isSignup && (
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-300">
                  Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    👤
                  </span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 py-4 pl-11 pr-5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Abdul Ghani"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  ✉️
                </span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 py-4 pl-11 pr-5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-300">
                  Password
                </label>
                {!isSignup && (
                  <a href="#" className="text-xs text-indigo-400 hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  🔒
                </span>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 py-4 pl-11 pr-5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/35 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Please wait...
                </>
              ) : (
                <>{isSignup ? "Create Account" : "Sign In"} ⚡</>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              href={isSignup ? "/login" : "/signup"}
              className="font-bold text-indigo-400 transition-colors hover:text-indigo-300"
            >
              {isSignup ? "Sign In" : "Create one now"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}