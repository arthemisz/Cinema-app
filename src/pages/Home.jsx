import { Link } from 'react-router-dom'
import useMovies from '../hooks/useMovies'
import { backdrop } from '../lib/api'
import MovieGrid from '../components/MovieGrid'
import { Loading, ErrorState, SectionTitle } from '../components/ui'

function MovieSection({ title, state, action, type = 'movie' }) {
  if (state.loading) {
    return (
      <section className="space-y-4">
        <SectionTitle action={action}>{title}</SectionTitle>
        <Loading count={5} />
      </section>
    )
  }

  if (state.error) {
    return (
      <section className="space-y-4">
        <SectionTitle action={action}>{title}</SectionTitle>
        <ErrorState message={state.error} />
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <SectionTitle action={action}>{title}</SectionTitle>
      <MovieGrid movies={state.data?.results || []} type={type} />
    </section>
  )
}

export default function Home() {
  const trending = useMovies('/trending/movie/week')
  const popular = useMovies('/movie/popular')
  const topRated = useMovies('/movie/top_rated')

  const featured = trending.data?.results?.[0]

  return (
    <main>
      {/* Hero Showcase */}
      <section className="relative min-h-[32rem] overflow-hidden bg-cinema-950 text-white">
        {featured?.backdrop_path && (
          <img
            src={backdrop(featured.backdrop_path)}
            alt={featured.title || 'Featured movie'}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-950 via-cinema-950/85 to-cinema-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-transparent to-cinema-950/20" />

        <div className="relative mx-auto flex min-h-[32rem] max-w-7xl items-end px-4 pb-14 sm:px-6">
          <div className="max-w-xl">
            {featured ? (
              <>
                <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[.25em] text-brand-400">
                  Trending this week
                </p>
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                  {featured.title}
                </h1>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-200">
                  {featured.overview}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Link
                    to={`/movie/${featured.id}`}
                    className="rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-400"
                  >
                    View movie
                  </Link>
                  <Link
                    to="/movies"
                    className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    Browse all
                  </Link>
                </div>
              </>
            ) : trending.loading ? (
              <div className="h-48 w-96 max-w-full animate-pulse rounded-2xl bg-white/10" />
            ) : trending.error ? (
              <ErrorState message={trending.error} />
            ) : null}
          </div>
        </div>
      </section>

      {/* Main Content Grids */}
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6">
        <MovieSection
          title="Trending now"
          state={trending}
          action={
            <Link
              to="/movies"
              className="text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              See all →
            </Link>
          }
        />

        <MovieSection title="Popular movies" state={popular} />

        <MovieSection title="Top rated" state={topRated} />
      </div>
    </main>
  )
}
