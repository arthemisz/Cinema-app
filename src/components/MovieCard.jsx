import { Link } from 'react-router-dom'
import { image } from '../lib/api'
import { useWatchlist } from '../context/WatchlistContext'
import { Stars } from './ui'

export default function MovieCard({ movie, type = 'movie' }) {
  const { toggle, has } = useWatchlist()
  const saved = has(movie.id)
  const title = movie.title || movie.name
  const itemType = movie.media_type || (movie.first_air_date && !movie.release_date ? 'tv' : type)

  return (
    <article className="group relative min-w-0">
      <Link to={`/${itemType}/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-cinema-800 border border-white/5 shadow-none transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-glow">
          <img
            src={image(movie.poster_path)}
            alt={title || 'Poster'}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center text-xs font-semibold text-white">
              View details →
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => toggle({ ...movie, media_type: itemType })}
        className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm backdrop-blur-md transition-all ${
          saved
            ? 'bg-brand-500 text-white shadow-md'
            : 'bg-black/60 text-white hover:bg-brand-500'
        }`}
        aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        {saved ? '♥' : '♡'}
      </button>
      <div className="mt-2.5 min-w-0 px-0.5">
        <Link
          to={`/${itemType}/${movie.id}`}
          className="block truncate text-sm font-semibold text-slate-100 transition-colors hover:text-brand-400"
          title={title}
        >
          {title}
        </Link>
        <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
          <span>{(movie.release_date || movie.first_air_date || '').slice(0, 4) || '—'}</span>
          <Stars rating={movie.vote_average} />
        </div>
      </div>
    </article>
  )
}
