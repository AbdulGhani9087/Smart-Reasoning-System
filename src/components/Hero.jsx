import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-6 py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-5 inline-flex rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
          ✨ Introducing v2.0 Intelligent Architecture
        </div>
        <h1 className="text-5xl font-black leading-tight tracking-tight text-gray-950 dark:text-white md:text-6xl">
          Turn Complex Tasks into{" "}
          <span className="text-indigo-600 dark:text-indigo-400">Clear Action Plans</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          AI-powered reasoning to break down your biggest projects in seconds. From strategy to sub-tasks with zero friction.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-2xl bg-indigo-600 px-7 py-4 text-center font-bold text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700">
            Try it now
          </button>
          <button className="rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-7 py-4 text-center font-bold text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
