export default function AppHeader({ onDashboard }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dce2f3] bg-[#f9f9ff]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 lg:px-6">
        <button
          onClick={onDashboard}
          className="text-2xl font-extrabold tracking-tight text-[#151cce]"
        >
          PlanWise AI
        </button>

        <nav className="hidden items-center gap-10 text-sm font-medium text-[#151c27] md:flex">
          <button
            onClick={onDashboard}
            className="border-b-2 border-[#3525cd] pb-1 font-bold text-[#151cce]"
          >
            Dashboard
          </button>
          <a href="#features" className="hover:text-[#3525cd]">
            Features
          </a>
          <a href="#pricing" className="hover:text-[#3525cd]">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-full bg-[#ffddb8] px-5 py-2 text-sm font-bold text-[#2a1700] sm:block">
            🏅 Go Pro
          </button>
          <button className="rounded-full border border-[#c7c4d8] bg-white px-3 py-2 text-sm font-bold">
            👤
          </button>
        </div>
      </div>
    </header>
  );
}
