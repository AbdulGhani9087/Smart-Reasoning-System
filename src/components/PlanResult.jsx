"use client";

import { useState } from "react";

export default function PlanResult({ plan, task, onReset }) {
  const [saving, setSaving] = useState(false);

  const handleSavePlan = async () => {
    try {
      setSaving(true);

      const response = await fetch("/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, plan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save plan.");
      }

      alert("Plan saved successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow md:flex-row md:items-center dark:border-gray-800/85 dark:bg-gray-900 transition-all">
        <div>
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            AI Generated Blueprint
          </p>
          <h1 className="mt-2 text-3xl font-black text-gray-950 dark:text-white">
            {plan.goal}
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSavePlan}
            disabled={saving}
            className="rounded-2xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Plan"}
          </button>

          <button
            onClick={onReset}
            className="rounded-2xl border border-indigo-200 px-5 py-3 font-bold text-indigo-700 hover:bg-indigo-50 dark:border-gray-700 dark:text-indigo-400 dark:hover:bg-indigo-950/30 transition cursor-pointer"
          >
            Generate New Plan
          </button>
        </div>
      </div>

      {/* Assumptions + Missing Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900 transition-all">
          <h2 className="text-2xl font-black text-gray-950 dark:text-white">
            Assumptions
          </h2>

          <ul className="mt-4 space-y-3">
            {(plan.assumptions || []).map((item, index) => (
              <li
                key={index}
                className="rounded-2xl bg-indigo-50 p-4 text-gray-700 dark:bg-slate-800/60 dark:text-slate-200"
              >
                ✅ {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900 transition-all">
          <h2 className="text-2xl font-black text-gray-950 dark:text-white">
            Missing Information
          </h2>

          <ul className="mt-4 space-y-3">
            {(plan.missingInfo || []).map((item, index) => (
              <li
                key={index}
                className="rounded-2xl border-l-4 border-amber-500 bg-amber-50/70 p-4 text-gray-700 dark:bg-amber-950/15 dark:text-gray-300"
              >
                ❓ {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Recommended Tools + Overall Risks */}
      {((plan.recommendedTools && plan.recommendedTools.length > 0) ||
        (plan.risks && plan.risks.length > 0)) && (
        <div className="grid gap-6 lg:grid-cols-2">
          {plan.recommendedTools && plan.recommendedTools.length > 0 && (
            <section className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900">
              <h2 className="text-2xl font-black text-gray-950 dark:text-white">
                Recommended Tools
              </h2>

              <ul className="mt-4 space-y-3">
                {plan.recommendedTools.map((tool, index) => (
                  <li
                    key={index}
                    className="rounded-2xl bg-emerald-50 p-4 font-semibold text-gray-700 dark:bg-emerald-950/20 dark:text-gray-300"
                  >
                    🛠️ {tool}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {plan.risks && plan.risks.length > 0 && (
            <section className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900">
              <h2 className="text-2xl font-black text-gray-950 dark:text-white">
                Overall Risks
              </h2>

              <ul className="mt-4 space-y-3">
                {plan.risks.map((risk, index) => (
                  <li
                    key={index}
                    className="rounded-2xl bg-red-50 p-4 font-semibold text-gray-700 dark:bg-red-950/20 dark:text-gray-300"
                  >
                    ⚠️ {risk}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* Agent Assignments */}
      {plan.agentAssignments && plan.agentAssignments.length > 0 && (
        <section className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900">
          <h2 className="text-2xl font-black text-gray-950 dark:text-white">
            Agent Assignments
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {plan.agentAssignments.map((agent, index) => (
              <div
                key={index}
                className="rounded-3xl border border-indigo-100 bg-indigo-50 p-5 dark:border-slate-800 dark:bg-slate-800/60"
              >
                <p className="text-lg font-black text-indigo-700 dark:text-indigo-400">
                  🤖 {agent.agentName}
                </p>

                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-black text-gray-950 dark:text-white">
                    Responsibility:
                  </span>{" "}
                  {agent.responsibility}
                </p>

                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-black text-gray-950 dark:text-white">
                    Output:
                  </span>{" "}
                  {agent.output}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Steps */}
      <section className="rounded-[2rem] border border-indigo-100 bg-white p-6 card-shadow dark:border-gray-800/85 dark:bg-gray-900 transition-all">
        <h2 className="text-2xl font-black text-gray-950 dark:text-white">
          Step-by-Step Action Plan
        </h2>

        <div className="mt-6 space-y-5">
          {(plan.steps || []).map((step, index) => (
            <div
              key={index}
              className="rounded-3xl border border-indigo-100 bg-indigo-50/50 p-5 dark:border-slate-800/60 dark:bg-slate-800/40"
            >
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 font-black text-white">
                  {index + 1}
                </span>

                <div className="w-full">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-black text-gray-950 dark:text-white">
                      {step.title}
                    </h3>

                    {step.priority && (
                      <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-black text-white">
                        {step.priority} Priority
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    <b>Why:</b> {step.why}
                  </p>

                  <ul className="mt-4 grid gap-2 md:grid-cols-2">
                    {(step.tasks || []).map((taskItem, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="rounded-2xl border border-indigo-50/30 bg-white p-3 text-sm font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                      >
                        {taskItem}
                      </li>
                    ))}
                  </ul>

                  {step.tools && step.tools.length > 0 && (
                    <div className="mt-4 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/20">
                      <p className="font-black text-emerald-700 dark:text-emerald-400">
                        Tools
                      </p>

                      <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
                        {step.tools.map((tool, toolIndex) => (
                          <li key={toolIndex}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.risks && step.risks.length > 0 && (
                    <div className="mt-4 rounded-2xl bg-red-50 p-4 dark:bg-red-950/20">
                      <p className="font-black text-red-700 dark:text-red-400">
                        Risks
                      </p>

                      <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
                        {step.risks.map((risk, riskIndex) => (
                          <li key={riskIndex}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Action Plan */}
      <section className="rounded-[2rem] border border-indigo-100 bg-gray-950 p-6 text-white card-shadow dark:border-gray-800 dark:bg-gray-900/60 transition-all">
        <h2 className="text-2xl font-black">Final Action Plan</h2>

        <ol className="mt-4 space-y-3">
          {(plan.finalActionPlan || []).map((item, index) => (
            <li key={index} className="rounded-2xl bg-white/10 p-4 dark:bg-white/5">
              <span className="font-black text-indigo-200">
                {index + 1}.
              </span>{" "}
              {item}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}