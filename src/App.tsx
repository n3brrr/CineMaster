import "./styles/App.css";
import MovieCard from "./components/MovieCard";
import useMovies from "./hooks/useMovies";
import SearchBar from "./components/SearchBar";
import GenreFilters from "./components/GenreFilters";
import SortSelector from "./components/SortSelector";
import Loading from "./components/Loading/Loading";
import { useEffect, useRef } from "react";

/**
 * Main application component for CineMaster.
 * Manages movie discovery through search, genre filtering, and sorting.
 */
function App() {
  const {
    movies,
    loading,
    sortBy,
    setSortBy,
    setGenre,
    setQuery,
    fetchMovies,
  } = useMovies();

  // Reference element used to trigger infinite scrolling when visible
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Initializes IntersectionObserver to detect when the user reaches the bottom
     * of the list, triggering a fetch for the next page of movies.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchMovies(true);
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, fetchMovies]);

  return (
    <div className="m-15">
      {/* Title serves as a reset button for the application state */}
      <h1
        className="text-4xl text-center text-white tracking-wider font-bold uppercase mt-5 cursor-crosshair"
        onClick={() => {
          setGenre(null);
          setQuery("");
          setSortBy("popularity.desc");
        }}
      >
        CineMaster
      </h1>

      <SearchBar
        onSearch={(text) => {
          setGenre(null);
          setQuery(text);
        }}
      />

      <GenreFilters
        onGenreClick={(id) => {
          setQuery("");
          setGenre(id);
        }}
      />

      <SortSelector currentSort={sortBy} onSortChange={setSortBy} />

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Sentinel element for infinite scroll intersection detection */}
      <div ref={observerRef} className="h-20">
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default App;
