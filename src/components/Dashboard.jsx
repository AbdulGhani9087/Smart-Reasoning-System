import { starterPrompts } from "@/data/dummyPlan";

export default function Dashboard({ task, setTask, onGenerate }) {
  const selectPrompt = (title) => {
    if (title === "E-Commerce Launch") {
      setTask(
        "I want to build an ecommerce website with payment, admin dashboard, and product search."
      );
    }
    if (title === "Data Pipeline") {
      setTask("I want to build a data pipeline dashboard for SaaS analytics.");
    }
    if (title === "Product Roadmap") {
      setTask("I want to create a 12-week product roadmap for a new mobile app.");
    }
  };

  return (
    <main className="flex-1 px-5 py-12 lg:px-20">
      <section className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#151c27] md:text-5xl">
          What shall we build today?
        </h1>
        <p className="mt-5 text-lg text-[#464555] md:text-xl">
          Our AI architect transforms your vision into a precise, step-by-step action plan.
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-5xl rounded-[24px] bg-white p-5 card-shadow md:p-8">
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Describe your complex task here, e.g., I want to build an e-commerce site with Stripe integration..."
          className="h-56 w-full resize-none border-none bg-transparent text-lg text-[#151c27] outline-none placeholder:text-[#c7c4d8] focus:ring-0"
        />

        <div className="mt-6 flex flex-col gap-4 border-t border-[#e2e8f8] pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4 text-sm font-medium text-[#151c27]">
            <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-[#eef2ff]">
              📎 Reference Docs
            </button>
            <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-[#eef2ff]">
              ✨ High Precision
            </button>
          </div>

          <button
            onClick={onGenerate}
            className="rounded-xl bg-[#4f46e5] px-8 py-4 text-base font-semibold text-white deep-shadow transition hover:bg-[#3525cd]"
          >
            Generate Action Plan ⚡
          </button>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-5xl">
        <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-[#151c27]">
          <span className="text-[#3525cd]">💡</span> Not sure where to start?
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {starterPrompts.map((item) => (
            <button
              key={item.title}
              onClick={() => selectPrompt(item.title)}
              className="rounded-[16px] border border-[#c7c4d8] bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-2xl">{item.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-[#151c27]">{item.title}</h3>
              <p className="mt-2 text-base leading-6 text-[#464555]">{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="gradient-panel mx-auto mt-14 max-w-5xl overflow-hidden rounded-[24px] p-8 card-shadow md:p-12">
        <span className="rounded-full bg-[#006c49] px-3 py-1 text-xs font-bold uppercase text-white">
          New Feature
        </span>
        <h2 className="mt-4 text-3xl font-extrabold text-[#151c27]">Visual Logic Mapping</h2>
        <p className="mt-2 max-w-xl text-lg text-[#464555]">
          See your tasks structured as interactive flowcharts, milestones, and AI-reviewed execution cards.
        </p>
      </section>
    </main>
  );
}
