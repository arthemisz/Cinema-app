import { Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import MovieGrid from '../components/MovieGrid'

export default function Watchlist() {
  const { items } = useWatchlist()

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-9">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Your library
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Watchlist
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {items.length} {items.length === 1 ? 'title' : 'titles'} saved
        </p>
      </div>

      {/* Watchlist Content */}
      {items.length > 0 ? (
        <MovieGrid movies={items} />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 py-20 text-center dark:border-white/10 dark:bg-cinema-900/30">
          <p className="text-4xl text-slate-400 dark:text-slate-600">♡</p>
          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            Your watchlist is empty
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Save movies and TV series you want to watch later.
          </p>
          <Link
            to="/movies"
            className="mt-6 inline-block rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-600"
          >
            Explore movies
          </Link>
        </div>
      )}
    </main>
  )
}
