import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { tmdb, image, backdrop } from '../lib/api'
import { Loading, ErrorState, Stars, SectionTitle } from '../components/ui'
import { useWatchlist } from '../context/WatchlistContext'

export default function Detail({ type = 'movie' }) {
  const { id } = useParams()
  const isSeries = type === 'tv'

  const [detail, setDetail] = useState(null)
  const [error, setError] = useState('')
  const [trailer, setTrailer] = useState(null)

  const { toggle, has } = useWatchlist()

  useEffect(() => {
    const controller = new AbortController()
    setDetail(null)
    setError('')

    const mediaPath = isSeries ? 'tv' : 'movie'

    Promise.all([
      tmdb(`/${mediaPath}/${id}`, controller.signal),
      tmdb(`/${mediaPath}/${id}/credits`, controller.signal),
      tmdb(`/${mediaPath}/${id}/videos`, controller.signal)
    ])
      .then(([info, credits, videos]) => {
        setDetail({ info, credits, videos })
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })

    return () => controller.abort()
  }, [id, isSeries])

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ErrorState message={error} />
      </main>
    )
  }

  if (!detail) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Loading count={5} />
      </main>
    )
  }

  const { info, credits, videos } = detail
  const video =
    videos?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer') ||
    videos?.results?.find(v => v.site === 'YouTube')

  const title = info.title || info.name
  const saved = has(info.id)
  const currentItem = { ...info, media_type: isSeries ? 'tv' : 'movie' }

  return (
    <main>
      {/* Backdrop & Hero Details Banner */}
      <section className="relative overflow-hidden bg-cinema-950 text-white">
        {info.backdrop_path && (
          <img
            src={backdrop(info.backdrop_path)}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover opacity-35 blur-sm"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-950/50 via-cinema-950/85 to-cinema-950" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:py-20">
          <img
            src={image(info.poster_path)}
            alt={title}
            className="w-44 rounded-2xl border border-white/10 bg-cinema-900 shadow-2xl md:w-64"
          />

          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-400">
              {isSeries ? 'Series' : 'Movie'} ·{' '}
              {String(info.release_date || info.first_air_date || '').slice(0, 4)}
            </p>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <Stars rating={info.vote_average} />
              <span className="text-sm text-slate-300">
                {info.runtime
                  ? `${info.runtime} min`
                  : info.number_of_seasons
                  ? `${info.number_of_seasons} seasons`
                  : ''}
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-200 sm:text-base">
              {info.overview}
            </p>

            {/* Genre Chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {info.genres?.map(genre => (
                <span
                  key={genre.id}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {video && (
                <button
                  type="button"
                  onClick={() => setTrailer(video.key)}
                  className="rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-400"
                >
                  ▶ Watch trailer
                </button>
              )}
              <button
                type="button"
                onClick={() => toggle(currentItem)}
                className={`rounded-full border px-6 py-3 text-sm font-bold transition ${
                  saved
                    ? 'border-brand-500 bg-brand-500 text-white shadow-md'
                    : 'border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
                }`}
              >
                {saved ? '♥ In Watchlist' : '♡ Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Cast List */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionTitle>Top cast</SectionTitle>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {credits.cast?.slice(0, 12).map(person => (
            <div key={person.id} className="w-24 shrink-0 text-center">
              <Link to={`/person/${person.id}`} className="group block">
                <img
                  src={image(person.profile_path, 'w185')}
                  alt={person.name}
                  className="h-24 w-24 rounded-full border border-slate-200/80 bg-slate-200 object-cover transition-all group-hover:ring-2 group-hover:ring-brand-500 dark:border-white/10 dark:bg-cinema-800"
                />
                <p className="mt-2 truncate text-xs sm:text-sm font-semibold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {person.name}
                </p>
                <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                  {person.character}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Trailer Modal */}
      {trailer && (
        <div
          onClick={() => setTrailer(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div onClick={e => e.stopPropagation()} className="w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setTrailer(null)}
              className="mb-3 float-right text-3xl font-light text-white hover:text-brand-400"
            >
              ×
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
                title="Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
