import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useWatchlist } from '../context/WatchlistContext'

export default function Navbar() {
  const { items } = useWatchlist()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const submit = e => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-cinema-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-3.5">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 p-1 transition-transform group-hover:scale-105">
            <img src="/logo.svg" alt="CINEMA Logo" className="h-full w-full object-contain" />
          </div>
          <span className="text-lg font-black tracking-wider text-white">
            CINEMA<span className="text-brand-500">.</span>
          </span>
        </Link>

        <nav className="flex items-center gap-3 text-xs sm:gap-5 sm:text-sm">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? 'font-semibold text-white'
                  : 'text-slate-300 hover:text-white'
              }`
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/series"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? 'font-semibold text-white'
                  : 'text-slate-300 hover:text-white'
              }`
            }
          >
            Series
          </NavLink>
          <NavLink
            to="/celebrities"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? 'font-semibold text-white'
                  : 'text-slate-300 hover:text-white'
              }`
            }
          >
            Celebrities
          </NavLink>
        </nav>

        <form
          onSubmit={submit}
          className="ml-auto flex min-w-0 max-w-xs flex-1 items-center rounded-full border border-white/10 bg-white/5 px-3 text-white transition-colors focus-within:border-brand-400/70 focus-within:bg-white/10"
        >
          <span className="text-slate-500">⌕</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent px-2 py-1.5 text-xs text-white outline-none placeholder:text-slate-400 sm:py-2 sm:text-sm"
          />
        </form>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/watchlist"
            className="relative shrink-0 rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Watchlist"
          >
            <span className="text-base leading-none">♡</span>
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white shadow-sm">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
