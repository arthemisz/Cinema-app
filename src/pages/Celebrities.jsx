import { Link } from 'react-router-dom'
import useMovies from '../hooks/useMovies'
import { image } from '../lib/api'
import { Loading, ErrorState } from '../components/ui'

export default function Celebrities() {
  const state = useMovies('/person/popular')

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-9">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          The talent
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Celebrities
        </h1>
      </div>

      {/* Grid of Celebrities */}
      {state.loading ? (
        <Loading />
      ) : state.error ? (
        <ErrorState message={state.error} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 sm:gap-6">
          {state.data?.results?.map(person => (
            <Link
              key={person.id}
              to={`/person/${person.id}`}
              className="group flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover dark:border-white/5 dark:bg-cinema-900/40 dark:shadow-none dark:hover:shadow-glow"
            >
              <img
                src={image(person.profile_path, 'w342')}
                alt={person.name}
                loading="lazy"
                className="aspect-square w-full rounded-xl bg-slate-200 object-cover dark:bg-cinema-800"
              />
              <h2 className="mt-3 w-full truncate text-center text-sm font-semibold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                {person.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {person.known_for_department}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
