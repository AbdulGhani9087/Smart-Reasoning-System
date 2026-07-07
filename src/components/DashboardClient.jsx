"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import PlanResult from "@/components/PlanResult";
import { dummyPlan, suggestionCards } from "@/data/dummyPlan";

export default function DashboardClient() {
  const [task, setTask] = useState("I want to build a data pipeline dashboard for SaaS analytics.");
  const [plan, setPlan] = useState(null);
  const [user, setUser] = useState(null);
  const [highPrecision, setHighPrecision] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [referenceText, setReferenceText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser({ name: storedUser });
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB"
      });
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setUploadedFile(null);
    setReferenceText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };const handleReferenceFile = async (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const allowedExtensions = [".txt", ".md", ".json", ".pdf", ".docx"];

  const isAllowed = allowedExtensions.some((ext) =>
    file.name.toLowerCase().endsWith(ext)
  );

  if (!isAllowed) {
    alert("Please upload only .txt, .md, .json, .pdf, or .docx files.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("File is too large. Please upload a file smaller than 5MB.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/extract-reference", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to extract file text.");
    }

    setUploadedFile(file);
    setReferenceText(data.text);

    console.log("Uploaded file:", data.fileName);
    console.log("Extracted characters:", data.characterCount);
    console.log("Extracted preview:", data.text.slice(0, 300));
  } catch (error) {
    alert(error.message);
    setUploadedFile(null);
    setReferenceText("");
  }
};
const handleGenerate = async () => {
  if (!task.trim()) {
    alert("Please enter your task first");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await fetch("/api/generate-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  task,
  highPrecision,
  fileName: uploadedFile ? uploadedFile.name : null,
  referenceText,
}),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    setPlan(data.plan);
  } catch (err) {
    setError(err.message);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="flex min-h-screen bg-indigo-50 dark:bg-slate-950 transition-colors duration-200">
      <Sidebar />

      <section className="flex-1 px-5 py-6 lg:px-10">
        {!plan ? (
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between rounded-[2rem] border border-indigo-100 bg-white px-6 py-4 card-shadow dark:border-gray-800/85 dark:bg-gray-900 transition-all">
              <div>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Welcome Back{user ? `, ${user.name}` : ""}</p>
                <h1 className="text-2xl font-black text-gray-950 dark:text-white">PlanWise AI Architect</h1>
              </div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-sm">
                {user ? (
                  <>
                    {user.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      : "U"}
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900"></span>
                    </span>
                  </>
                ) : (
                  "👤"
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-indigo-100 bg-white p-8 text-center card-shadow dark:border-gray-800/85 dark:bg-gray-900 transition-all">
              <h2 className="text-4xl font-black text-gray-950 dark:text-white md:text-5xl">
                What shall we build today?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Our AI architect transforms your vision into a precise, step-by-step action plan.
              </p>

              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="mt-8 h-40 w-full rounded-[1.5rem] border border-indigo-100 bg-indigo-50 p-5 text-left text-lg text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:border-indigo-500/80 transition-all"
                placeholder="Example: I want to build an ecommerce website with payment, admin dashboard, and product search."
              />
              <div className="mt-4 rounded-2xl border border-dashed border-indigo-300 bg-indigo-50/60 p-4 dark:border-indigo-900 dark:bg-slate-900/60">
                <label className="block text-sm font-black text-gray-950 dark:text-white">
                  Reference Docs
                </label>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Upload a .txt, .md, or .json file to improve AI planning.
                </p>

                <input
  type="file"
  accept=".txt,.md,.json,.pdf,.docx"
  onChange={handleReferenceFile}
  className="mt-3 block w-full cursor-pointer rounded-xl border border-indigo-100 bg-white p-3 text-sm font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
/>

                {uploadedFile && (
                  <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 flex justify-between items-center">
                    <div>
                      ✅ Attached: {uploadedFile.name}
                      <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        Loaded characters: {referenceText.length}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="ml-1.5 h-6 w-6 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-300 dark:hover:bg-emerald-800 flex items-center justify-center text-[10px] font-black cursor-pointer"
                      title="Remove file"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex justify-start">
                  <button
                    onClick={() => setHighPrecision(!highPrecision)}
                    className={`rounded-full border px-4 py-2 font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      highPrecision
                        ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-500/20 dark:border-indigo-500 dark:bg-indigo-650 dark:text-white"
                        : "border-indigo-200 bg-white text-gray-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700/60"
                    }`}
                  >
                    ✨ {highPrecision ? "High Precision Enabled" : "High Precision"}
                  </button>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full rounded-2xl bg-indigo-600 px-6 py-4 text-lg font-black text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Generating Plan..." : "Generate Action Plan ⚡"}
                </button>
              </div>

              {error && (
                <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:bg-red-950/30 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            <section className="mt-10">
              <h2 className="text-3xl font-black text-gray-950 dark:text-white">💡 Not sure where to start?</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {suggestionCards.map((card) => (
                  <button
                    key={card.title}
                    onClick={() => setTask(card.title)}
                    className="rounded-[2rem] border border-indigo-100 bg-white p-6 text-left card-shadow hover:border-indigo-400 dark:border-gray-800/85 dark:bg-gray-900 dark:hover:border-indigo-500 transition-all cursor-pointer"
                  >
                    <div className="text-3xl">{card.emoji}</div>
                    <h3 className="mt-5 text-xl font-black text-gray-950 dark:text-white">{card.title}</h3>
                    <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">{card.text}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-[2rem] border border-indigo-100 bg-white p-7 card-shadow dark:border-gray-800/85 dark:bg-gray-900 transition-all">
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Visual Logic Mapping</p>
              <h2 className="mt-2 text-2xl font-black text-gray-950 dark:text-white">How your AI pipeline will work</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-5">
                {["User Task", "Planner Agent", "Risk Checker", "Final JSON", "UI Cards"].map((item, index) => (
                  <div key={item} className="rounded-2xl bg-indigo-50 dark:bg-slate-800 p-4 text-center font-bold text-slate-800 dark:text-slate-100 border border-transparent dark:border-slate-700/50 transition-all">
                    <span className="mb-2 block text-2xl">{index === 0 ? "📝" : index === 1 ? "🤖" : index === 2 ? "⚠️" : index === 3 ? "{}" : "🧾"}</span>
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="mx-auto max-w-6xl">
<PlanResult plan={plan} task={task} onReset={() => setPlan(null)} />          </div>
        )}
      </section>
    </main>
  );
}
