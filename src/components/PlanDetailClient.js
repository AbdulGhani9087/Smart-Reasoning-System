"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function PlanDetailClient({ planId }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStep, setUpdatingStep] = useState(null);

const getStepStatus = (index) => {
  const progressItem = plan?.stepProgress?.find(
    (item) => item.stepIndex === index
  );

  return progressItem?.status || "Pending";
};

const getStatusClass = (status) => {
  if (status === "Completed") {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
  }

  if (status === "In Progress") {
    return "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400";
  }

  return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300";
};

const handleUpdateProgress = async (stepIndex, status) => {
  try {
    setUpdatingStep(stepIndex);

    const response = await fetch(`/api/plans/${planId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stepIndex,
        status,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to update progress.");
    }

    setPlan((prev) => ({
      ...prev,
      stepProgress: data.stepProgress,
    }));
  } catch (error) {
    alert(error.message);
  } finally {
    setUpdatingStep(null);
  }
};

  const fetchPlan = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/plans/${planId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch plan detail.");
      }

      setPlan(data.plan);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (planId) {
      fetchPlan();
    }
  }, [planId]);
  const completedSteps =
  plan?.stepProgress?.filter((item) => item.status === "Completed").length || 0;

const totalSteps = plan?.steps?.length || 0;

const progressPercentage =
  totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const handleExportPDF = () => {
  window.print();
};

  return (
    <main className="flex min-h-screen bg-indigo-50 dark:bg-slate-950">
      <div className="no-print">
  <Sidebar />
</div>

      <section className="flex-1 px-5 py-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                Saved Plan Detail
              </p>
              <h1 className="mt-1 text-3xl font-black text-gray-950 dark:text-white">
                AI Generated Blueprint
              </h1>
            </div>

           <div className="no-print flex flex-wrap gap-3">
  <button
    onClick={handleExportPDF}
    className="rounded-2xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700 transition"
  >
    Export PDF
  </button>

  <Link
    href="/saved-plans"
    className="rounded-2xl border border-indigo-200 px-5 py-3 font-bold text-indigo-700 hover:bg-indigo-50 dark:border-gray-700 dark:text-indigo-400 dark:hover:bg-indigo-950/30 transition"
  >
    Back to Saved Plans
  </Link>
</div>
          </div>

          {loading && (
            <div className="rounded-[2rem] border border-indigo-100 bg-white p-8 text-center card-shadow dark:border-gray-800/85 dark:bg-gray-900">
              <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                Loading plan detail...
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

          {!loading && !error && plan && (
            <div className="space-y-6">
              <section className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900">
                <h2 className="text-2xl font-black text-gray-950 dark:text-white">
                  {plan.goal}
                </h2>

                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Original Task:
                  </span>{" "}
                  {plan.task}
                </p>

                <p className="mt-3 text-sm font-semibold text-gray-500 dark:text-gray-500">
                  Saved on: {new Date(plan.createdAt).toLocaleString()}
                </p>
                <div className="mt-5">
  <div className="flex items-center justify-between">
    <p className="text-sm font-black text-gray-950 dark:text-white">
      Overall Progress
    </p>

    <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">
      {progressPercentage}%
    </p>
  </div>

  <div className="mt-2 h-3 overflow-hidden rounded-full bg-indigo-100 dark:bg-slate-800">
    <div
      className="h-full rounded-full bg-indigo-600 transition-all"
      style={{ width: `${progressPercentage}%` }}
    />
  </div>

  <p className="mt-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
    {completedSteps} of {totalSteps} steps completed
  </p>
</div>
              </section>

              <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900">
                  <h3 className="text-xl font-black text-gray-950 dark:text-white">
                    Assumptions
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {plan.assumptions.map((item, index) => (
                      <li
                        key={index}
                        className="rounded-2xl bg-indigo-50 p-4 font-semibold text-gray-700 dark:bg-slate-800 dark:text-gray-300"
                      >
                        ✅ {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900">
                  <h3 className="text-xl font-black text-gray-950 dark:text-white">
                    Missing Information
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {plan.missingInfo.map((item, index) => (
                      <li
                        key={index}
                        className="rounded-2xl bg-amber-50 p-4 font-semibold text-gray-700 dark:bg-amber-950/20 dark:text-gray-300"
                      >
                        ❓ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900">
                <h3 className="text-2xl font-black text-gray-950 dark:text-white">
                  Step-by-Step Action Plan
                </h3>

                <div className="mt-6 space-y-5">
                  {plan.steps.map((step, index) => (
                    <div
                      key={index}
                      className="rounded-[1.5rem] border border-indigo-100 bg-indigo-50 p-5 dark:border-gray-800 dark:bg-slate-800/70"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-black text-white">
                          {index + 1}
                        </div>

                        <div>
                          <h4 className="text-xl font-black text-gray-950 dark:text-white">
                            {step.title}
                          </h4>

                          <p className="mt-2 text-gray-600 dark:text-gray-400">
                            <span className="font-bold text-gray-900 dark:text-white">
                              Why:
                            </span>{" "}
                            {step.why}
                          </p>

                          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                            {step.tasks.map((task, taskIndex) => (
                              <li key={taskIndex}>{task}</li>
                            ))}
                          </ul>
                          <div className="mt-5 rounded-2xl bg-white p-4 dark:bg-gray-900">
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
      <p className="text-sm font-black text-gray-950 dark:text-white">
        Progress Status
      </p>

      <span
        className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-black ${getStatusClass(
          getStepStatus(index)
        )}`}
      >
        {getStepStatus(index)}
      </span>
    </div>

    <div className="flex flex-wrap gap-2">
      {["Pending", "In Progress", "Completed"].map((status) => (
        <button
          key={status}
          onClick={() => handleUpdateProgress(index, status)}
          disabled={updatingStep === index}
          className={`rounded-xl px-4 py-2 text-xs font-black transition disabled:opacity-50 ${
            getStepStatus(index) === status
              ? "bg-indigo-600 text-white"
              : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  </div>
</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900">
                <h3 className="text-2xl font-black text-gray-950 dark:text-white">
                  Final Action Plan
                </h3>

                <ol className="mt-4 list-decimal space-y-3 pl-6 text-gray-700 dark:text-gray-300">
                  {plan.finalActionPlan.map((item, index) => (
                    <li key={index} className="font-semibold">
                      {item}
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}