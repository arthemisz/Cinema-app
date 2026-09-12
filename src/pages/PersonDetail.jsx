import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { tmdb, image } from '../lib/api'
import MovieGrid from '../components/MovieGrid'
import { Loading, ErrorState, SectionTitle } from '../components/ui'

export default function PersonDetail() {
  const { id } = useParams()
  const [person, setPerson] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setPerson(null)
    setError('')

    tmdb(`/person/${id}?append_to_response=combined_credits`, controller.signal)
      .then(setPerson)
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })

    return () => controller.abort()
  }, [id])

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ErrorState message={error} />
      </main>
    )
  }

  if (!person) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Loading count={5} />
      </main>
    )
  }

  const cast = person.combined_credits?.cast || person.cast || []
  const sortedCast = [...cast]
    .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))
    .slice(0, 24)

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Biography & Actor Profile */}
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center">
        <img
          src={image(person.profile_path, 'w342')}
          alt={person.name}
          className="h-44 w-44 rounded-2xl border border-slate-200/80 bg-slate-200 object-cover shadow-card dark:border-white/10 dark:bg-cinema-800 sm:h-52 sm:w-52"
        />
        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Filmography
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {person.name}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {person.known_for_department ? `${person.known_for_department} · ` : ''}
            Selected movies and series
          </p>
          {person.biography && (
            <p className="mt-4 max-w-3xl line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {person.biography}
            </p>
          )}
        </div>
      </div>

      {/* Filmography Section */}
      <div className="mt-8">
        <SectionTitle>Known For</SectionTitle>
        {sortedCast.length > 0 ? (
          <MovieGrid movies={sortedCast} />
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No filmography credits found.
          </p>
        )}
      </div>
    </main>
  )
}
