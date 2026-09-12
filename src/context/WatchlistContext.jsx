import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const WatchlistContext = createContext(null)
export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem('cinema-watchlist') || '[]') } catch { return [] } })
  useEffect(() => localStorage.setItem('cinema-watchlist', JSON.stringify(items)), [items])
  const toggle = movie => setItems(current => current.some(item => item.id === movie.id) ? current.filter(item => item.id !== movie.id) : [...current, movie])
  const value = useMemo(() => ({ items, toggle, has: id => items.some(item => item.id === id) }), [items])
  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}
export const useWatchlist = () => useContext(WatchlistContext)
