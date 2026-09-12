import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import useMovies from '../hooks/useMovies'
import MovieGrid from '../components/MovieGrid'
import { Loading, ErrorState } from '../components/ui'

export default function Search() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [input, setInput] = useState(params.get('q') || '')
  const query = useDebounce(input)

  // Keep input in sync if query param changes from the navbar
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q')
    if (q !== null && q !== input) {
      setInput(q)
    }
  }, [location.search])

  const state = useMovies(
    query
      ? `/search/multi?query=${encodeURIComponent(query)}`
      : '/trending/movie/week'
  )

  const results =
    state.data?.results?.filter(item => item.media_type !== 'person') || []

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Search Header and Input */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Discover
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Find your next favorite
        </h1>
        <input
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search movies and series..."
          className="mt-6 w-full rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-cinema-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-brand-400 sm:py-4 sm:text-base"
        />
      </div>

      {query && (
        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          Results for{' '}
          <span className="font-semibold text-slate-900 dark:text-white">
            “{query}”
          </span>
        </p>
      )}

      {/* Results View */}
      {state.loading ? (
        <Loading count={10} />
      ) : state.error ? (
        <ErrorState message={state.error} />
      ) : results.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No results found
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try searching for another movie or TV show title.
          </p>
        </div>
      ) : (
        <MovieGrid movies={results} type="movie" />
      )}
    </main>
  )
}
