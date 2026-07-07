const features = [
  {
    icon: "🎯",
    title: "Task Decomposition",
    text: "Our LLM-native engine breaks complex goals into chronological, actionable steps with estimated durations.",
  },
  {
    icon: "⚠️",
    title: "Risk Identification",
    text: "Proactively detect bottlenecks and resource conflicts before they stall your project timeline.",
  },
  {
    icon: "🛠️",
    title: "Tool Recommendations",
    text: "Get smart suggestions for the best software tools (Jira, Slack, Tableau) to execute each specific sub-task.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="px-6 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black text-gray-950 dark:text-white">Engineered for Absolute Precision</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Built by operations experts to handle the complexity of modern enterprise workflows.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-indigo-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-7 card-shadow">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-gray-950 dark:text-white">{feature.title}</h3>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
