import Link from "next/link";

export default function PlanResultPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface">
      <div className="mx-auto max-w-6xl px-gutter py-16">
        <header className="mb-12 flex flex-col gap-4 rounded-[2rem] border-l-4 border-primary bg-surface-container-lowest p-8 shadow-soft">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                AI Generated Blueprint
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-on-surface">
                Building a SaaS MVP
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-secondary-container px-4 py-2 text-sm font-semibold text-on-secondary-container">
                6 Week Timeline
              </span>
              <span className="rounded-full bg-tertiary-fixed px-4 py-2 text-sm font-semibold text-on-tertiary-fixed-variant">
                High Complexity
              </span>
            </div>
          </div>
          <p className="max-w-3xl text-base text-on-surface-variant">
            This comprehensive roadmap details the technical and strategic milestones required to launch a production-ready Software as a Service MVP. It prioritizes core functionality, security, and market feedback loops while minimizing initial infrastructure overhead.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-12">
          <section className="lg:col-span-8 space-y-10">
            <div className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-8 shadow-soft">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-semibold text-on-surface">Execution Roadmap</h2>
                <div className="flex gap-3">
                  <button className="rounded-2xl bg-surface px-4 py-3 text-on-surface-variant transition hover:bg-surface-container-low">
                    <span className="material-symbols-outlined">filter_list</span>
                  </button>
                  <button className="rounded-2xl bg-surface px-4 py-3 text-on-surface-variant transition hover:bg-surface-container-low">
                    <span className="material-symbols-outlined">expand_all</span>
                  </button>
                </div>
              </div>

              <article className="mt-8 rounded-[2rem] border-l-4 border-primary bg-surface p-6 shadow-soft transition hover:shadow-lift">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary text-lg font-bold">
                    01
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-on-surface">Core Architecture Selection</h3>
                        <p className="mt-2 text-sm text-on-surface-variant">
                          Define the tech stack and database schema to ensure long-term scalability without over-engineering.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-error-container px-3 py-1 text-xs font-semibold uppercase text-on-error-container">
                          High
                        </span>
                        <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold uppercase text-on-surface-variant">
                          Week 1
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl bg-surface-container p-5">
                        <h4 className="font-semibold text-primary">Why it Matters</h4>
                        <p className="mt-2 text-sm text-on-surface-variant">
                          Decoupling frontend and backend early prevents technical debt when migrating to microservices later.
                        </p>
                      </div>
                      <div className="rounded-3xl bg-error-container/20 border-l-2 border-error p-5">
                        <h4 className="font-semibold text-error">Critical Risk</h4>
                        <p className="mt-2 text-sm text-on-surface-variant">
                          Choosing a niche framework may limit future hiring capabilities. Stick to industry standards.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                        Key Sub-tasks
                      </p>
                      {[
                        "Select Cloud Provider (AWS vs Vercel)",
                        "Define Entity Relationship Diagram (ERD)",
                      ].map((item) => (
                        <label key={item} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
                          <input type="checkbox" className="h-5 w-5 rounded border-outline focus:ring-2 focus:ring-primary" />
                          <span className="text-sm text-on-surface">{item}</span>
                        </label>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {[
                        "PostgreSQL",
                        "Next.js",
                        "Tailwind CSS",
                      ].map((tag) => (
                        <span key={tag} className="rounded-full bg-secondary-fixed px-3 py-1 text-sm font-semibold text-on-secondary-fixed">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="lg:col-span-4 space-y-6">
            <div className="rounded-[2rem] bg-surface-container-highest p-8 shadow-soft">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                Complexity Score
              </h3>
              <div className="mt-4 text-5xl font-semibold text-primary">
                84<span className="text-base font-normal text-on-surface-variant">/100</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-dim">
                <div className="h-full w-[84%] rounded-full bg-primary" />
              </div>
              <p className="mt-4 text-sm text-on-surface-variant">
                This plan requires high cross-departmental coordination. 3 risks identified.
              </p>
            </div>

            <div className="rounded-[2rem] bg-surface-container-lowest border-l-4 border-error p-8 shadow-soft">
              <div className="mb-4 flex items-center gap-3 text-error">
                <span className="material-symbols-outlined">report</span>
                <p className="font-semibold uppercase">Critical Bottleneck</p>
              </div>
              <h3 className="text-xl font-semibold text-on-surface">Resource Conflict: UI/UX Team</h3>
              <p className="mt-3 text-sm text-on-surface-variant">
                PlanWise detected that the Design team is over capacity for Sprint 12.
              </p>
              <button className="mt-6 rounded-2xl bg-primary-container px-5 py-3 text-sm font-semibold text-on-primary-container hover:brightness-105">
                Auto-reschedule
              </button>
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-sm text-on-surface-variant">
          <p>Not ready yet? Return to the landing page.</p>
          <Link href="/" className="font-semibold text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
