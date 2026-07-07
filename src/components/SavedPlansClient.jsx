"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";


export default function SavedPlansClient() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/plans", {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch saved plans.");
      }

      setPlans(data.plans || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDeletePlan = async (planId) => {
  const confirmDelete = confirm("Are you sure you want to delete this plan?");

  if (!confirmDelete) return;

  try {
    const response = await fetch(`/api/plans/${planId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete plan.");
    }

    setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== planId));

    alert("Plan deleted successfully!");
  } catch (err) {
    alert(err.message);
  }
};

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <main className="flex min-h-screen bg-indigo-50 dark:bg-slate-950">
      <Sidebar />

      <section className="flex-1 px-5 py-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900">
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              Saved Work
            </p>

            <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-black text-gray-950 dark:text-white">
                  Saved Plans
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  All AI-generated plans saved in your database.
                </p>
              </div>

              <button
                onClick={fetchPlans}
                className="rounded-2xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700 transition"
              >
                Refresh
              </button>
            </div>
          </div>

          {loading && (
            <div className="rounded-[2rem] border border-indigo-100 bg-white p-8 text-center card-shadow dark:border-gray-800/85 dark:bg-gray-900">
              <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                Loading saved plans...
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 card-shadow dark:border-red-900 dark:bg-red-950/30">
              <p className="font-bold text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          {!loading && !error && plans.length === 0 && (
            <div className="rounded-[2rem] border border-indigo-100 bg-white p-8 text-center card-shadow dark:border-gray-800/85 dark:bg-gray-900">
              <h2 className="text-2xl font-black text-gray-950 dark:text-white">
                No saved plans yet
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Go to dashboard, generate a plan, then click Save Plan.
              </p>
            </div>
          )}

          {!loading && !error && plans.length > 0 && (
            <div className="grid gap-5">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                        AI Generated Plan
                      </p>

                      <h2 className="mt-2 text-2xl font-black text-gray-950 dark:text-white">
                        {plan.goal}
                      </h2>

                      <p className="mt-3 text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-gray-800 dark:text-gray-200">
                          Original Task:
                        </span>{" "}
                        {plan.task}
                      </p>

                      <p className="mt-3 text-sm font-semibold text-gray-500 dark:text-gray-500">
                        Saved on:{" "}
                        {new Date(plan.createdAt).toLocaleString()}
                      </p>
                    </div>

                   <div className="flex shrink-0 flex-wrap gap-3">
  <Link
    href={`/saved-plans/${plan.id}`}
    className="rounded-2xl border border-indigo-200 px-5 py-3 font-bold text-indigo-700 hover:bg-indigo-50 dark:border-gray-700 dark:text-indigo-400 dark:hover:bg-indigo-950/30 transition"
  >
    View Detail
  </Link>

  <button
    onClick={() => handleDeletePlan(plan.id)}
    className="rounded-2xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700 transition"
  >
    Delete
  </button>
</div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-indigo-50 p-4 dark:bg-slate-800/60">
                      <p className="text-sm font-black text-gray-950 dark:text-white">
                        Assumptions
                      </p>
                      <p className="mt-1 text-2xl font-black text-indigo-600 dark:text-indigo-400">
                        {plan.assumptions?.length || 0}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-amber-50 p-4 dark:bg-amber-950/20">
                      <p className="text-sm font-black text-gray-950 dark:text-white">
                        Missing Info
                      </p>
                      <p className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">
                        {plan.missingInfo?.length || 0}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/20">
                      <p className="text-sm font-black text-gray-950 dark:text-white">
                        Steps
                      </p>
                      <p className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {plan.steps?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}