# CINEMA. · Movies & Series Discovery

Deployed link: https://cinema-app-green.vercel.app/

**CINEMA.** is a modern, responsive web application for discovering movies, TV series, and celebrities. Powered by the **TMDB (The Movie Database) API**, it features a sleek dark-themed cinema UI, real-time debounced search, genre filtering, trailer previews, and a persistent personal watchlist.

---

##  Features

- **Trending & Featured Content**: Hero showcase with weekly trending movies, top-rated lists, and popular titles.
- **Explore Movies & Series**: Browse by categories and filter by genres with multiple sorting options (popularity, ratings, release date).
- **Celebrities & Talent**: Discover popular actors, crew members, detailed biographies, and complete filmographies.
- **Media Details & Trailers**: Detailed pages showing runtime, synopsis, ratings, top cast, and embedded YouTube trailer playback.
- **Debounced Instant Search**: Search across movies and TV shows with smooth, debounced querying.
- **Personal Watchlist**: Save favorites locally using React Context and `localStorage` persistence.
- **Cinematic Dark Design**: Crafted with Tailwind CSS using custom typography, glow effects, and smooth card interactions.

---

## 📁 Project Tree

```text
Cinema-app/
├── public/
│   └── logo.svg               # App branding icon
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx      # Individual movie/show card with hover states & watchlist toggle
│   │   ├── MovieGrid.jsx      # Responsive grid layout for movie cards
│   │   ├── Navbar.jsx         # Sticky header with logo, navigation links, and search bar
│   │   └── ui.jsx             # Reusable UI elements (Loading skeletons, ErrorState, Stars, SectionTitle)
│   ├── context/
│   │   └── WatchlistContext.jsx # Global context & hook for saved watchlist (persisted to localStorage)
│   ├── hooks/
│   │   ├── useDebounce.js     # Custom hook to debounce search input values
│   │   └── useMovies.js       # Data-fetching hook for TMDB API endpoints with abort control
│   ├── lib/
│   │   └── api.js             # TMDB API helper (supports v3 API Key & v4 Bearer token) + image URL helpers
│   ├── App.jsx                # Main application layout, routing setup, and footer
│   ├── index.css              # Global styles, Tailwind directives, and custom scrollbar styling
│   ├── main.jsx               # React entry point mounting to root DOM element
│   └── pages.jsx              # Application views (Home, Browse, Detail, PersonDetail, Search, Watchlist, NotFound)
├── .env                       # Environment variables (TMDB credentials)
├── index.html                 # HTML template and document entry point
├── package.json               # Dependencies and build/dev scripts
├── postcss.config.js          # PostCSS configuration for Tailwind CSS
├── tailwind.config.js         # Tailwind CSS theme customization (custom colors, glows, shadows)
└── vite.config.js             # Vite development server and build configuration
```

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Source**: [TMDB API](https://www.themoviedb.org/documentation/api)

---

