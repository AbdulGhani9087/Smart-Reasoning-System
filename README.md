# PlanWise AI Complete Pages UI

Copy these files into your existing Next.js project.

## Folder Structure

```txt
src/
├── app/
│   ├── dashboard/page.js
│   ├── features/page.js
│   ├── login/page.js
│   ├── pricing/page.js
│   ├── signup/page.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── AuthForm.jsx
│   ├── DashboardClient.jsx
│   ├── FeatureGrid.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── PlanResult.jsx
│   ├── PricingCards.jsx
│   └── Sidebar.jsx
└── data/
    └── dummyPlan.js
```

## Routes

- `/` landing page
- `/dashboard` working planner dashboard with dummy plan
- `/login` login UI
- `/signup` signup UI
- `/features` feature page
- `/pricing` pricing page

## Important

Make sure your project has `postcss.config.mjs` with Tailwind v4 config.

Run:

```bash
npm install tailwindcss @tailwindcss/postcss
npm run dev
```
