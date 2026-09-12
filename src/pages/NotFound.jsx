import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-32 text-center">
      <p className="text-8xl font-black text-brand-500">404</p>
      <h1 className="mt-4 text-3xl font-black text-slate-900 dark:text-white">
        Scene not found
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        The page you are looking for might have been moved, deleted, or does not exist.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-brand-500 px-6 py-3 font-bold text-white shadow-md shadow-brand-500/25 transition hover:bg-brand-600"
      >
        Back home
      </Link>
    </main>
  )
}
