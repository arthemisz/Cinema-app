export function Loading({ count = 5 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[2/3] rounded-xl bg-cinema-800" />
          <div className="mt-3 h-4 rounded bg-cinema-800" />
          <div className="mt-2 h-3 w-2/3 rounded bg-cinema-800" />
        </div>
      ))}
    </div>
  )
}

export function ErrorState({ message }) {
  return (
    <div className="rounded-2xl border border-red-900/50 bg-red-950/30 p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/40 text-xl font-bold text-red-400">
        !
      </div>
      <p className="font-semibold text-red-200">Something went wrong</p>
      <p className="mt-2 text-sm text-red-300/80">{message}</p>
    </div>
  )
}

export function SectionTitle({ children, action }) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
        {children}
      </h2>
      {action}
    </div>
  )
}

export function Stars({ rating = 0 }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
      ★ <span className="font-medium text-slate-200">{rating ? rating.toFixed(1) : '—'}</span>
    </span>
  )
}
