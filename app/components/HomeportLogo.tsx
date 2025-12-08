export default function HomeportLogo() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
          <svg
            className="size-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="3" />
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="11" />
          </svg>
        </div>
        <span className="text-base font-normal tracking-tight text-slate-900">
          HOMEPORT
        </span>
      </div>
      <p className="text-base text-slate-500">
        Your digital home base for transformation tracking
      </p>
    </div>
  );
}
