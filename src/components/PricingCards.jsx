const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "For individuals testing the power of AI planning.",
    features: ["3 AI Plans Per Month", "Basic Decomposition", "Cloud Sync"],
    highlight: false,
    buttonText: "Current Plan",
  },
  {
    name: "Go Pro",
    price: "$29",
    period: "/mo",
    description: "Unlock the full potential of high-density AI reasoning.",
    features: ["Unlimited Plans", "Advanced Risk Assessment", "Cloud Sync", "API Access"],
    highlight: true,
    buttonText: "Go Pro Now",
    badge: "POPULAR",
  },
];

export default function PricingCards() {
  return (
    <section className="px-6 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-gray-950 dark:text-white">Pricing for Teams of All Sizes</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Start free, upgrade when you're ready to scale your planning power.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[2rem] border p-8 card-shadow ${
                plan.highlight
                  ? "border-indigo-500 bg-indigo-600 text-white"
                  : "border-indigo-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-950 dark:text-white"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 right-8 rounded-full bg-emerald-400 dark:bg-emerald-500 px-3 py-1 text-xs font-bold text-emerald-900 dark:text-emerald-950">
                  {plan.badge}
                </span>
              )}
              <p className={`text-sm font-bold ${plan.highlight ? "text-indigo-100" : "text-indigo-600 dark:text-indigo-400"}`}>
                {plan.name}
              </p>
              <div className="mt-3 flex items-baseline">
                <h2 className="text-5xl font-black">{plan.price}</h2>
                <span className={`ml-2 ${plan.highlight ? "text-indigo-100" : "text-gray-600 dark:text-gray-400"}`}>{plan.period}</span>
              </div>
              <p className={`mt-3 ${plan.highlight ? "text-indigo-100" : "text-gray-600 dark:text-gray-400"}`}>
                {plan.description}
              </p>
              <ul className="mt-8 space-y-3">
                {plan.features.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-lg">✓</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full rounded-2xl px-5 py-3 font-bold transition ${
                  plan.highlight
                    ? "bg-white text-indigo-700 hover:bg-indigo-50"
                    : "border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
