import Link from "next/link";

const menu = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/saved-plans", label: "Saved Plans", icon: "📚" },
  { href: "/features", label: "Features", icon: "✨" },
  { href: "/pricing", label: "Pricing", icon: "💳" },
  { href: "/", label: "Landing", icon: "🌐" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar-gradient hidden min-h-screen w-72 flex-col p-6 text-white lg:flex">
      <Link href="/" className="mb-10 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl text-indigo-700">
          ⚡
        </span>
        <div>
          <p className="text-lg font-black">PlanWise AI</p>
          <p className="text-xs text-indigo-100">Task Planner</p>
        </div>
      </Link>

      <div className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-indigo-50 hover:bg-white/10"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto rounded-3xl bg-white/10 p-5">
        <p className="font-bold">MVP Status</p>
        <p className="mt-2 text-sm text-indigo-100">
          Frontend ready. Next step: connect AI API and database.
        </p>
      </div>
    </aside>
  );
}
