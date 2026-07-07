export const dummyPlan = {
  goal: "Build a data pipeline dashboard for SaaS analytics",
  assumptions: [
    "The dashboard will collect data from multiple SaaS tools.",
    "The user wants analytics, charts, and a clean reporting interface.",
    "The MVP should focus on one or two data sources first.",
  ],
  missingInfo: [
    "Which SaaS tools should be connected first?",
    "Which KPIs are most important?",
    "Should reports update in real time or daily?",
  ],
  steps: [
    {
      title: "Define Dashboard Requirements",
      why: "Clear requirements prevent confusion before development starts.",
      tasks: [
        "List the SaaS sources.",
        "Decide the main KPIs.",
        "Choose the first MVP dashboard screens.",
      ],
    },
    {
      title: "Design Data Model",
      why: "A strong data model keeps metrics clean and easy to query.",
      tasks: [
        "Create user and workspace tables.",
        "Create source connection tables.",
        "Create metric and report tables.",
      ],
    },
    {
      title: "Build Dashboard UI",
      why: "Users need a simple interface to understand data quickly.",
      tasks: [
        "Create overview cards.",
        "Create charts section.",
        "Create reports page.",
      ],
    },
    {
      title: "Create Backend APIs",
      why: "Frontend needs secure access to saved plans and analytics data.",
      tasks: [
        "Create authentication APIs.",
        "Create project APIs.",
        "Create analytics APIs.",
      ],
    },
    {
      title: "Test and Deploy",
      why: "Testing prevents broken dashboards and wrong analytics results.",
      tasks: [
        "Test data calculations.",
        "Test login and dashboard flow.",
        "Deploy on Vercel.",
      ],
    },
  ],
  finalActionPlan: [
    "Finalize MVP requirements.",
    "Build dashboard pages with dummy data.",
    "Connect AI planning API.",
    "Save generated plans in database.",
    "Deploy and add project to portfolio.",
  ],
};

export const suggestionCards = [
  {
    emoji: "🛒",
    title: "E-Commerce Launch",
    text: "Plan products, payment, admin dashboard, cart, and deployment.",
  },
  {
    emoji: "📊",
    title: "Data Pipeline",
    text: "Break reporting, ETL, dashboards, APIs, and testing into steps.",
  },
  {
    emoji: "🚀",
    title: "Startup MVP",
    text: "Convert a rough startup idea into a clear build roadmap.",
  },
];
