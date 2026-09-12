const BASE = 'https://api.themoviedb.org/3'

export const image = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : 'https://placehold.co/500x750/1b1b29/77758e?text=No+Poster'

export const backdrop = (path) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : ''

export async function tmdb(path, signal) {
  const key = import.meta.env.VITE_TMDB_KEY?.trim()
  const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN?.trim()

  if (!key && !token) {
    throw new Error('TMDB API key is missing. Add VITE_TMDB_KEY to your .env file and restart the dev server.')
  }

  const isJwt = (val) => typeof val === 'string' && val.startsWith('eyJ')

  // Support v4 Bearer access token if provided or if key was pasted as a JWT token
  if (token || isJwt(key)) {
    const bearer = token || key
    const separator = path.includes('?') ? '&' : '?'
    const url = `${BASE}${path}${separator}language=en-US`
    const response = await fetch(url, {
      signal,
      headers: {
        Authorization: `Bearer ${bearer}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`TMDB request failed (${response.status})`)
    }
    return response.json()
  }

  // Standard v3 API key query parameter
  const separator = path.includes('?') ? '&' : '?'
  const url = `${BASE}${path}${separator}api_key=${key}&language=en-US`
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`)
  }
  return response.json()
}
