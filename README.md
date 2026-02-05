<div align="center">

# 🎬 CineMaster

**Advanced Movie Explorer & Tracker**

[🚀 Demo](#) - [🐛 Issues](https://github.com/n3brrr/CineMaster/issues) - [📖 Docs](#documentation)

</div>

---

## ⚡ Overview

CineMaster is a modern web application designed to seamlessly explore and discover movies. Built with a robust React & TypeScript architecture, it features real-time movie search, genre filtering, and a sleek, responsive interface powered by TailwindCSS.

### ✨ Key Features

- 🔍 **Smart Movie Search** - Instant access to a vast database of movies via TMDB API
- 🎭 **Genre Filtering** - Intuitive category filtering to find exactly what you're looking for
- ⚡ **High Performance** - Powered by Vite for lightning-fast builds and HMR
- 🎨 **Modern Design** - Fully responsive UI with TailwindCSS v4
- 🛡️ **Type Safety** - Comprehensive TypeScript integration for reliability

### 🛠️ Tech Stack

<p align="left">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

---

## 📦 Installation

### Prerequisites

- Node.js 18+ (Recommended)
- npm or pnpm

### Quick Setup

```bash
# Clone repository
git clone https://github.com/n3brrr/CineMaster.git

# Navigate to directory
cd CineMaster

# Install dependencies
npm install

# Start Development Server
npm run dev

# Build for Production
npm run build
```

## 📁 Project Structure

```bash
CineMaster/
├── src/
│   ├── components/      # UI Components (MovieCard, SearchBar, GenreFilters)
│   ├── hooks/          # Custom hooks (useMovies)
│   ├── assets/         # Static assets
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Entry point
├── public/             # Public assets
├── index.html          # Entry HTML
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies and scripts
```

## 🔄 Architecture

```mermaid
graph TD
    User[User Interaction] --> Search[SearchBar]
    User --> Filter[GenreFilters]
    Search --> Hook[useMovies Hook]
    Filter --> Hook
    Hook --> API[TMDB API]
    API --> State[Global State]
    State --> Card[MovieCard Component]
```

## 💻 Usage

```typescript
// Example: Using the custom hook for movie fetching
import useMovies from './hooks/useMovies';

const MyComponent = () => {
  const { movies, loading, getMovies, getMoviesByGenre } = useMovies();

  return (
    <div className="p-4">
      <button onClick={() => getMovies('Inception')}>
        Search "Inception"
      </button>

      <div className="grid gap-4">
        {movies.map(movie => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
};
```

## 🧪 Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 👤 Author

**Rubén Torres** - [@n3brrr](https://github.com/n3brrr)

Frontend Developer | TypeScript Enthusiast

<div align="center">
⭐ Star this repo if you find it useful
</div>
