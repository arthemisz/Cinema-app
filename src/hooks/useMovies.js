import { useEffect, useState } from 'react'
import { tmdb } from '../lib/api'
export default function useMovies(endpoint) {
  const [state, setState] = useState({ data: null, loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    setState({ data: null, loading: true, error: '' })
    tmdb(endpoint, controller.signal).then(data => setState({ data, loading: false, error: '' }))
      .catch(error => { if (error.name !== 'AbortError') setState({ data: null, loading: false, error: error.message }) })
    return () => controller.abort()
  }, [endpoint])
  return state
}
