import { useState, useEffect } from 'react'
import useMovies from '../hooks/useMovies'
import MovieGrid from '../components/MovieGrid'
import { Loading, ErrorState } from '../components/ui'

export default function Browse({ type = 'movie' }) {
  const isSeries = type === 'tv'
  const [genre, setGenre] = useState('')
  const [sort, setSort] = useState('popularity.desc')

  // Reset selected genre when toggling between movies and TV shows
  useEffect(() => {
    setGenre('')
  }, [type])

  const genres = useMovies(`/genre/${isSeries ? 'tv' : 'movie'}/list`)
  const endpoint = `/${isSeries ? 'discover/tv' : 'discover/movie'}?sort_by=${sort}${
    genre ? `&with_genres=${genre}` : ''
  }`
  const results = useMovies(endpoint)

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Page Header & Sort Selection */}
      <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Explore
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {isSeries ? 'Series' : 'Movies'}
          </h1>
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 dark:border-white/10 dark:bg-cinema-800 dark:text-slate-100 dark:focus:border-brand-400"
        >
          <option value="popularity.desc">Most popular</option>
          <option value="vote_average.desc">Top rated</option>
          <option value="primary_release_date.desc">Newest</option>
        </select>
      </div>

      {/* Genre Filter Pills */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setGenre('')}
          className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
            !genre
              ? 'bg-brand-500 font-bold text-white shadow-sm'
              : 'border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/5 dark:bg-cinema-800 dark:text-slate-300 dark:hover:bg-cinema-700 dark:hover:text-white'
          }`}
        >
          All
        </button>
        {genres.data?.genres?.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setGenre(String(item.id))}
            className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              genre === String(item.id)
                ? 'bg-brand-500 font-bold text-white shadow-sm'
                : 'border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/5 dark:bg-cinema-800 dark:text-slate-300 dark:hover:bg-cinema-700 dark:hover:text-white'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Content Results */}
      {results.loading ? (
        <Loading count={10} />
      ) : results.error ? (
        <ErrorState message={results.error} />
      ) : (
        <MovieGrid movies={results.data?.results || []} type={type} />
      )}
    </main>
  )
}
