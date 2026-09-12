import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { WatchlistProvider } from './context/WatchlistContext'
import {
  Browse,
  Celebrities,
  Detail,
  Home,
  NotFound,
  PersonDetail,
  Search,
  Watchlist
} from './pages'

export default function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-cinema-950 text-slate-100">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Browse />} />
              <Route path="/series" element={<Browse type="tv" />} />
              <Route path="/celebrities" element={<Celebrities />} />
              <Route path="/person/:id" element={<PersonDetail />} />
              <Route path="/movie/:id" element={<Detail />} />
              <Route path="/tv/:id" element={<Detail type="tv" />} />
              <Route path="/search" element={<Search />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </div>
          <footer className="border-t border-white/10 bg-cinema-950/60 px-4 py-8 text-slate-400 backdrop-blur-sm sm:px-6">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs sm:flex-row">
              <div className="flex items-center gap-2.5">
                <img src="/logo.svg" alt="CINEMA" className="h-5 w-5 object-contain" />
                <span className="font-bold tracking-wider text-white">
                  CINEMA<span className="text-brand-500">.</span>
                </span>
                <span className="text-slate-500">· Built for movie lovers</span>
              </div>
              <p className="text-slate-400">
                Data provided by TMDB · Powered by Vite &amp; React
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </WatchlistProvider>
  )
}
